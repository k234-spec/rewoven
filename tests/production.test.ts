import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {backup,DatabaseSync} from 'node:sqlite';
import {db,createUser} from '../lib/rewoven/server';
import {saveProduct} from '../lib/rewoven/inventory';
import {dataDirectory} from '../lib/rewoven/deployment';
import {createOrder,releaseOrderStock,releaseExpiredReservations,confirmPayment,reconcileOrder,calculate} from '../lib/rewoven/payments';
import {Product} from '../lib/rewoven/catalog';

const directory=mkdtempSync(path.join(tmpdir(),'rewoven-production-'));
process.env.REWOVEN_DATA_DIR=directory;
process.env.RAZORPAY_KEY_ID='rzp_test_local_fixture';
process.env.RAZORPAY_KEY_SECRET='local-test-secret';
const originalFetch=global.fetch;
const customer={name:'Test',email:'test@example.test',phone:'9999999999',address:'Example street',city:'Jaipur',state:'Rajasthan',pincode:'302001'};
let passed=0,sequence=0;
function product(id:string):Product{return {id,name:id,category:'Sherwani',occasion:'Wedding',price:1000,color:'Ivory',hex:'#eee',sizes:['M','L'],image:0,fresh:false}}
function prepare(id:string,qty=10){const p=product(id);saveProduct(p,600,2,p.sizes.map(size=>({size,color:p.color,quantity:qty,expected:0})));return p}
const line=(id:string,qty=2)=>({id,size:'M',color:'Ivory',qty});
function stock(id:string,size='M'){return (db().prepare('SELECT quantity FROM stock WHERE product_id=? AND size=?').get(id,size) as {quantity:number}).quantity}
function status(id:string){return (db().prepare('SELECT status FROM orders WHERE id=?').get(id) as {status:string}).status}
function fakeGateway(onCreate?:()=>void){global.fetch=async()=>{onCreate?.();return new Response(JSON.stringify({id:'gw-'+(++sequence)}),{status:200,headers:{'Content-Type':'application/json'}})}}
async function test(name:string,fn:()=>unknown|Promise<unknown>){await fn();passed++;console.log('PASS:',name)}

async function main(){
 db().prepare('INSERT INTO settings VALUES(?,?)').run('shipping','0');
 db().prepare('INSERT INTO settings VALUES(?,?)').run('taxPercent','0');
 await test('metadata saves preserve different stock quantities; new variants start unavailable',()=>{
  const p=prepare('inventory');
  saveProduct(p,600,2,[{size:'M',color:'Ivory',quantity:3,expected:10}]);
  saveProduct({...p,name:'Renamed'},650,3);
  assert.equal(stock(p.id),3);assert.equal(stock(p.id,'L'),10);
  saveProduct({...p,sizes:['M','L','XL']},650,3);assert.equal(stock(p.id,'XL'),0);
 });
 await test('stale stock edits reject and roll back metadata and earlier variant changes',()=>{
  const p=product('inventory');
  assert.throws(()=>saveProduct({...p,name:'Should not save'},600,2,[{size:'L',color:'Ivory',quantity:5,expected:10},{size:'M',color:'Ivory',quantity:12,expected:10}]),/Stock changed/);
  assert.equal(stock(p.id,'L'),10);assert.notEqual(JSON.parse((db().prepare('SELECT data FROM catalog WHERE id=?').get(p.id) as {data:string}).data).name,'Should not save');
 });
 await test('repeated cancellation/failure/expiry releases each reservation only once',async()=>{
  prepare('cancel');fakeGateway();const order=await createOrder([line('cancel')],customer,null);
  assert.equal(stock('cancel'),8);assert.equal(releaseOrderStock(order.id,'CANCELLED'),true);
  assert.equal(releaseOrderStock(order.id,'FAILED'),false);assert.equal(stock('cancel'),10);
  releaseExpiredReservations();assert.equal(stock('cancel'),10);
 });
 await test('late captured payment reacquires released stock once, even with duplicate notifications',async()=>{
  prepare('late');fakeGateway();const order=await createOrder([line('late')],customer,null);
  releaseOrderStock(order.id,'EXPIRED');confirmPayment(order.gatewayId,'pay-late',200000,'late-event');
  assert.equal(stock('late'),8);assert.equal(status(order.id),'PAID');
  assert.equal(confirmPayment(order.gatewayId,'pay-late',200000,'late-event'),'duplicate');
  confirmPayment(order.gatewayId,'pay-late',200000,'late-event-2');releaseOrderStock(order.id,'FAILED');assert.equal(stock('late'),8);
 });
 await test('late capture with insufficient stock records a paid review case without overselling; reconciliation can resolve it',async()=>{
  prepare('review');fakeGateway();const order=await createOrder([line('review')],customer,null);
  releaseOrderStock(order.id,'EXPIRED');db().prepare("UPDATE stock SET quantity=0 WHERE product_id='review' AND size='M'").run();
  confirmPayment(order.gatewayId,'pay-review',200000,'review-event');assert.equal(status(order.id),'PAYMENT_REVIEW');assert.equal(stock('review'),0);
  db().prepare("UPDATE stock SET quantity=4 WHERE product_id='review' AND size='M'").run();
  global.fetch=async()=>new Response(JSON.stringify({items:[{id:'pay-review',order_id:order.gatewayId,currency:'INR',status:'captured',amount:200000}]}));
  await reconcileOrder(order.id);assert.equal(status(order.id),'PAID');assert.equal(stock('review'),2);
 });
 await test('quote creation and confirmation use the exact order link, never another quote or a retail order',async()=>{
  prepare('quote');const id=createUser('trade@example.test','Trade','test-password-long');
  const user={id,email:'trade@example.test',name:'Trade',role:'customer',approved:1,addresses:'[]'};
  db().prepare('UPDATE users SET approved=1 WHERE id=?').run(id);
  const total=calculate([line('quote')],user,true);
  for(const quoteId of ['quote-one','quote-two'])db().prepare('INSERT INTO quotes(id,user_id,items,total,status,created) VALUES(?,?,?,?,?,?)').run(quoteId,id,JSON.stringify(total.items),total.total,'APPROVED',new Date().toISOString());
  fakeGateway();const retail=await createOrder([line('quote')],customer,user);
  confirmPayment(retail.gatewayId,'retail-pay',200000);
  assert.equal((db().prepare("SELECT status FROM quotes WHERE id='quote-one'").get() as {status:string}).status,'APPROVED');
  const trade=await createOrder([line('quote')],customer,user,true,'quote-one');
  assert.equal((db().prepare("SELECT order_id FROM quotes WHERE id='quote-one'").get() as {order_id:string}).order_id,trade.id);
  confirmPayment(trade.gatewayId,'trade-pay',120000);
  assert.equal((db().prepare("SELECT status FROM quotes WHERE id='quote-one'").get() as {status:string}).status,'PAID');
  assert.equal((db().prepare("SELECT status FROM quotes WHERE id='quote-two'").get() as {status:string}).status,'APPROVED');
  await assert.rejects(createOrder([line('quote')],customer,user,true,'quote-one'),/Quotation changed/);
 });
 await test('price changes during gateway order creation cannot create a differently priced local order',async()=>{
  const p=prepare('repriced');fakeGateway(()=>saveProduct({...p,price:1100},600,2));
  await assert.rejects(createOrder([line(p.id)],customer,null),/Pricing changed/);
  assert.equal(stock(p.id),10);
 });
 await test('simultaneous attempts cannot reserve the same last item twice',async()=>{
  prepare('last-piece',1);fakeGateway();
  const attempts=await Promise.allSettled([createOrder([line('last-piece',1)],customer,null),createOrder([line('last-piece',1)],customer,null)]);
  assert.equal(attempts.filter(a=>a.status==='fulfilled').length,1);assert.equal(stock('last-piece'),0);
 });
 await test('SQLite backup restores readable order and stock records',async()=>{
  const file=path.join(directory,'backup.sqlite');await backup(db(),file);
  const restored=new DatabaseSync(file,{readOnly:true});
  try{
    assert.deepEqual(restored.prepare('SELECT count(*) AS n FROM orders').get(),db().prepare('SELECT count(*) AS n FROM orders').get());
    assert.deepEqual(restored.prepare('SELECT * FROM stock ORDER BY product_id,size').all(),db().prepare('SELECT * FROM stock ORDER BY product_id,size').all());
  }finally{restored.close()}
 });
 await test('production refuses temporary or serverless SQLite storage',()=>{
  assert.throws(()=>dataDirectory({NODE_ENV:'production',VERCEL:'1',REWOVEN_DATA_DIR:path.resolve('data')}),/Vercel/);
  assert.throws(()=>dataDirectory({NODE_ENV:'production'}),/absolute persistent/);
  assert.throws(()=>dataDirectory({NODE_ENV:'production',REWOVEN_DATA_DIR:directory}),/temporary/);
  assert.equal(dataDirectory({NODE_ENV:'production',REWOVEN_DATA_DIR:path.resolve('persistent-data')}),path.resolve('persistent-data'));
 });
 console.log(`${passed} production regression tests passed.`);
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{
 global.fetch=originalFetch;db().close();
 const target=path.resolve(directory);if(path.dirname(target)!==path.resolve(tmpdir())||!path.basename(target).startsWith('rewoven-production-'))throw new Error('Unsafe cleanup path');
 rmSync(target,{recursive:true});
});
