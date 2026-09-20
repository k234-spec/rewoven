/**
 * Rewoven bug regression tests — run: npm run test:bugs
 * Tests: Bug 1 (stock race), Bug 2 (abandoned reservation), Bug 3 (quote PAID), + idempotency
 */
import {rmSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import assert from 'node:assert';

const TEST_DIR=mkdtempSync(path.join(tmpdir(),'rewoven-bugs-'));
process.env.REWOVEN_DATA_DIR=TEST_DIR;

import {db} from '../lib/rewoven/server';
db().prepare("INSERT OR IGNORE INTO settings VALUES('shipping',JSON('0'))").run();
db().prepare("INSERT OR IGNORE INTO settings VALUES('taxPercent',JSON('0'))").run();

import {calculate,releaseOrderStock,releaseExpiredReservations,confirmPayment} from '../lib/rewoven/payments';
import type {Line} from '../lib/rewoven/payments';

let passed=0,failed=0;
function test(name:string,fn:()=>void){
  try{fn();console.log('  PASS',name);passed++}
  catch(e:unknown){console.error('  FAIL',name,'\n      ',(e as Error).message);failed++}
}

function addProduct(id:string,size:string,color='Black',qty=10,price=1000){
  db().prepare('INSERT OR REPLACE INTO catalog(id,data,trade_price,moq) VALUES(?,?,?,?)').run(
    id,JSON.stringify({id,name:'Test '+id,category:'Blouse',price,color,hex:'#000',sizes:[size],image:0,fresh:false}),600,6);
  db().prepare('INSERT OR REPLACE INTO stock(product_id,size,color,quantity) VALUES(?,?,?,?)').run(id,size,color,qty);
}
function stockOf(id:string,size:string,color='Black'):number{
  return (db().prepare('SELECT quantity FROM stock WHERE product_id=? AND size=? AND color=?').get(id,size,color) as {quantity:number}|undefined)?.quantity??-1;
}
function insertOrder(id:string,gatewayId:string,items:Line[],total:number,status='PENDING',reservedUntil?:number){
  db().prepare('INSERT OR REPLACE INTO orders(id,user_id,email,customer,items,subtotal,shipping,tax,total,gateway_id,reserved_until,created) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(id,null,'t@t.com','{}',JSON.stringify(items),total,0,0,total,gatewayId,reservedUntil??null,new Date().toISOString());
}
function insertUser(id:string){
  db().prepare("INSERT OR IGNORE INTO users(id,email,name,password,role,approved,created) VALUES(?,?,?,?,?,?,?)").run(id,id+'@t.com','Test',':','wholesale',1,new Date().toISOString());
}
function insertQuote(id:string,userId:string,status:string){
  db().prepare('INSERT OR REPLACE INTO quotes(id,user_id,items,total,status,created) VALUES(?,?,?,?,?,?)').run(id,userId,'[]',1000,status,new Date().toISOString());
}

console.log('\n=== BUG REGRESSION TESTS ===\n');

// ── Bug 1: stock race ─────────────────────────────────────────────────────────
console.log('Bug 1 — Stock race condition');
test('calculate() throws when qty > stock',()=>{
  addProduct('p1','M','Red',2);
  assert.throws(()=>calculate([{id:'p1',size:'M',color:'Red',qty:3}],null),/unavailable|insufficient/i);
});
test('calculate() accepts qty == stock',()=>{
  addProduct('p2','L','Blue',5);
  assert.strictEqual(calculate([{id:'p2',size:'L',color:'Blue',qty:5}],null).items[0].qty,5);
});
test('calculate() rejects after concurrent deduction empties stock',()=>{
  addProduct('p3','S','Green',1);
  db().prepare('UPDATE stock SET quantity=0 WHERE product_id=? AND size=? AND color=?').run('p3','S','Green');
  assert.throws(()=>calculate([{id:'p3',size:'S',color:'Green',qty:1}],null),/unavailable|insufficient/i);
});

// ── Bug 2: abandoned reservations ─────────────────────────────────────────────
console.log('\nBug 2 — Abandoned payment stock release');
test('releaseOrderStock() restores qty for PENDING order',()=>{
  addProduct('p4','M','White',10);
  const items:Line[]=[{id:'p4',size:'M',color:'White',qty:3}];
  db().prepare('UPDATE stock SET quantity=7 WHERE product_id=? AND size=? AND color=?').run('p4','M','White');
  insertOrder('ord1','gw1',items,3000,'PENDING');
  releaseOrderStock('ord1');
  assert.strictEqual(stockOf('p4','M','White'),10);
});
test('releaseExpiredReservations() sweeps past-TTL PENDING orders',()=>{
  addProduct('p5','L','Navy',10);
  const items:Line[]=[{id:'p5',size:'L',color:'Navy',qty:2}];
  db().prepare('UPDATE stock SET quantity=8 WHERE product_id=? AND size=? AND color=?').run('p5','L','Navy');
  insertOrder('ord2','gw2',items,2000,'PENDING',Date.now()-1000);
  releaseExpiredReservations();
  assert.strictEqual(stockOf('p5','L','Navy'),10);
  assert.strictEqual((db().prepare("SELECT status FROM orders WHERE id='ord2'").get() as {status:string}).status,'EXPIRED');
});
test('releaseExpiredReservations() skips future reservations',()=>{
  addProduct('p6','XL','Maroon',10);
  const items:Line[]=[{id:'p6',size:'XL',color:'Maroon',qty:4}];
  db().prepare('UPDATE stock SET quantity=6 WHERE product_id=? AND size=? AND color=?').run('p6','XL','Maroon');
  insertOrder('ord3','gw3',items,4000,'PENDING',Date.now()+3600000);
  releaseExpiredReservations();
  assert.strictEqual(stockOf('p6','XL','Maroon'),6,'active reservation must not change');
});

// ── Bug 3: wholesale quote PAID transition ────────────────────────────────────
console.log('\nBug 3 — Wholesale quote PAID after payment');
test('confirmPayment() transitions PAYMENT_PENDING quote to PAID',()=>{
  insertUser('u1');
  insertQuote('qt1','u1','PAYMENT_PENDING');
  insertOrder('ord4','gw4',[],1000,'PENDING');
  db().prepare("UPDATE orders SET user_id='u1' WHERE id='ord4'").run();
  db().prepare("UPDATE quotes SET order_id='ord4' WHERE id='qt1'").run();
  confirmPayment('gw4','pay4',100000);
  assert.strictEqual((db().prepare("SELECT status FROM quotes WHERE id='qt1'").get() as {status:string}).status,'PAID');
});

// ── Idempotency ───────────────────────────────────────────────────────────────
console.log('\nIdempotency — duplicate webhook events');
test('confirmPayment() returns duplicate for repeated eventId',()=>{
  insertOrder('ord5','gw5',[],1000,'PENDING');
  assert.notStrictEqual(confirmPayment('gw5','pay5',100000,'evt5'),'duplicate');
  assert.strictEqual(confirmPayment('gw5','pay5',100000,'evt5'),'duplicate');
});

// ── Report ─────────────────────────────────────────────────────────────────────
console.log(`\n${passed+failed} tests: ${passed} passed, ${failed} failed\n`);
db().close();
if(path.dirname(path.resolve(TEST_DIR))!==path.resolve(tmpdir())||!path.basename(TEST_DIR).startsWith('rewoven-bugs-'))throw new Error('Unsafe cleanup path');
rmSync(TEST_DIR,{recursive:true});
process.exit(failed>0?1:0);
