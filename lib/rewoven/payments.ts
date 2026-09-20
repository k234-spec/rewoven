import {createHmac,timingSafeEqual,randomUUID} from 'node:crypto';
import {db,transaction,settings,catalog,User} from './server';

export type Line={id:string;size:string;color:string;qty:number};

export function verifySignature(payload:string,signature:string,secret:string){
  if(!/^[a-f0-9]{64}$/i.test(signature))return false;
  return timingSafeEqual(
    Buffer.from(createHmac('sha256',secret).update(payload).digest('hex'),'hex'),
    Buffer.from(signature,'hex'));
}

export function calculate(items:Line[],user:User|null,wholesale=false){
  if(!Array.isArray(items)||!items.length||items.length>100)throw new Error('Please add a valid item to your bag.');
  if(wholesale&&(!user||!user.approved))throw new Error('An approved wholesale account is required.');
  const combined=new Map<string,Line>();
  for(const i of items){
    if(!i||!Number.isInteger(i.qty)||i.qty<1||i.qty>1000)throw new Error('Invalid quantity');
    const key=JSON.stringify([i.id,i.size,i.color]);
    combined.set(key,{...i,qty:i.qty+(combined.get(key)?.qty||0)});
  }
  const lines=Array.from(combined.values());
  let subtotal=0;
  const decorated=lines.map(i=>{
    const p=catalog().find(p=>p.id===i.id);
    const stock=db().prepare('SELECT quantity FROM stock WHERE product_id=? AND size=? AND color=?').get(i.id,i.size,i.color) as {quantity:number}|undefined;
    if(!p||!p.sizes.includes(i.size)||!stock||i.qty>stock.quantity)throw new Error('A selected variant is unavailable or has insufficient stock.');
    let price=p.price;
    if(wholesale){
      const trade=db().prepare('SELECT trade_price,moq FROM catalog WHERE id=?').get(i.id) as {trade_price:number;moq:number};
      const group=lines.filter(l=>l.id===i.id).reduce((n,l)=>n+l.qty,0);
      if(group<trade.moq)throw new Error(`Minimum quantity for ${p.name} is ${trade.moq}.`);
      price=Math.round(trade.trade_price*(group>=24?.9:group>=12?.95:1));
    }
    subtotal+=price*i.qty;
    return {...i,name:p.name,price};
  });
  const config=settings();
  const shipping=Number(config.shipping??0),taxRate=Number(config.taxPercent??0);
  if(!Number.isFinite(shipping)||shipping<0||!Number.isFinite(taxRate)||taxRate<0||taxRate>100)throw new Error('Merchant totals are not configured correctly.');
  const tax=Math.round(subtotal*taxRate)/100;
  return {items:decorated,subtotal,shipping,tax,total:Math.round((subtotal+shipping+tax)*100)/100,configured:config.shipping!==undefined&&config.taxPercent!==undefined};
}

export async function gateway(path:string,method='GET',data?:unknown){
  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
  const isTest=key?.startsWith('rzp_test_'),isLive=process.env.RAZORPAY_LIVE_ENABLED==='true'&&key?.startsWith('rzp_live_');
  if((!isTest&&!isLive)||!secret)throw new Error('Razorpay credentials are not configured. Use test keys (rzp_test_) or set RAZORPAY_LIVE_ENABLED=true with live keys.');
  const res=await fetch('https://api.razorpay.com/v1/'+path,{method,signal:AbortSignal.timeout(15000),
    headers:{Authorization:'Basic '+Buffer.from(key+':'+secret).toString('base64'),'Content-Type':'application/json'},
    ...(data?{body:JSON.stringify(data)}:{})});
  const json=await res.json();
  if(!res.ok)throw new Error('The payment provider is unavailable. Please try again.');
  return json;
}

// BUG 2 FIX: 30-minute reservation window — stock returned if payment never arrives
const RESERVATION_TTL_MS=30*60*1000;

/** Restore stock for a specific order that failed/was cancelled/expired. */
export function releaseOrderStock(orderId:string,status:'FAILED'|'CANCELLED'|'EXPIRED'='CANCELLED'){
  return transaction(()=>{
    const order=db().prepare("SELECT items,stock_released FROM orders WHERE id=? AND status IN ('PENDING','FAILED','CANCELLED','EXPIRED')").get(orderId) as {items:string;stock_released:number}|undefined;
    if(!order||order.stock_released)return false;
    for(const i of JSON.parse(order.items) as Line[])
      db().prepare('UPDATE stock SET quantity=quantity+? WHERE product_id=? AND size=? AND color=?').run(i.qty,i.id,i.size,i.color);
    db().prepare('UPDATE orders SET stock_released=1,status=?,reserved_until=NULL WHERE id=?').run(status,orderId);
    db().prepare("UPDATE quotes SET status=? WHERE order_id=? AND status='PAYMENT_PENDING'").run(status,orderId);
    return true;
  });
}

/** Sweep expired PENDING orders and return their stock. Call once per request. */
export function releaseExpiredReservations(){
  const now=Date.now();
  const expired=db().prepare("SELECT id FROM orders WHERE status IN ('PENDING','FAILED','CANCELLED') AND stock_released=0 AND COALESCE(reserved_until, CAST(strftime('%s',created) AS INTEGER)*1000+?)<? LIMIT 100").all(RESERVATION_TTL_MS,now) as {id:string}[];
  for(const {id} of expired){
    releaseOrderStock(id,'EXPIRED');
  }
  return expired.length;
}

export async function createOrder(items:Line[],customer:Record<string,string>,user:User|null,wholesale=false,quoteId?:string){
  if(!/^\S+@\S+\.\S+$/.test(customer.email||'')||!/^\d{6}$/.test(customer.pincode||'')||
     !customer.name||!customer.address||!customer.city||!customer.state||
     !/^[+\d\s()-]{7,20}$/.test(customer.phone||''))
    throw new Error('Please complete valid contact and delivery details.');

  // Pre-compute totals for Razorpay amount (non-authoritative — used only to create the remote order)
  const preview=calculate(items,user,wholesale);
  if(!preview.configured)throw new Error('Shipping and tax settings require merchant configuration before payment.');

  const id='RW-'+randomUUID().slice(0,12).toUpperCase();
  const remote=await gateway('orders','POST',{amount:Math.round(preview.total*100),currency:'INR',receipt:id});
  const reservedUntil=Date.now()+RESERVATION_TTL_MS;

  // BUG 1 FIX: re-validate stock AND deduct inside one BEGIN IMMEDIATE transaction.
  // No concurrent request can decrement stock between the outer calculate and the UPDATE.
  const total=transaction(()=>{
    const t=calculate(items,user,wholesale);  // authoritative re-check inside exclusive lock
    if(JSON.stringify(t)!==JSON.stringify(preview))throw new Error('Pricing changed while opening payment. Please try again.');
    if(quoteId){
      const q=db().prepare("SELECT items,total FROM quotes WHERE id=? AND user_id=? AND status='APPROVED' AND order_id IS NULL").get(quoteId,user?.id||'') as {items:string;total:number}|undefined;
      if(!wholesale||!q||q.total!==t.total||JSON.stringify(JSON.parse(q.items))!==JSON.stringify(t.items))throw new Error('Quotation changed or already has a payment. Request a new approved quotation.');
    }
    for(const i of t.items){
      const r=db().prepare('UPDATE stock SET quantity=quantity-? WHERE product_id=? AND size=? AND color=? AND quantity>=?').run(i.qty,i.id,i.size,i.color,i.qty);
      if(r.changes!==1)throw new Error('Stock changed while processing. Please try again.');
    }
    db().prepare('INSERT INTO orders(id,user_id,email,customer,items,subtotal,shipping,tax,total,gateway_id,reserved_until,created) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)')
      .run(id,user?.id||null,customer.email.toLowerCase(),JSON.stringify(customer),JSON.stringify(t.items),t.subtotal,t.shipping,t.tax,t.total,remote.id,reservedUntil,new Date().toISOString());
    if(quoteId)db().prepare("UPDATE quotes SET order_id=?,status='PAYMENT_PENDING' WHERE id=?").run(id,quoteId);
    return t;
  });

  return {id,gatewayId:remote.id,key:process.env.RAZORPAY_KEY_ID,
    cancelToken:createHmac('sha256',process.env.RAZORPAY_KEY_SECRET!).update('cancel|'+remote.id).digest('hex'),...total};
}

// BUG 3 FIX: confirmPayment now also transitions the linked wholesale quote PAYMENT_PENDING → PAID
export function confirmPayment(gatewayId:string,paymentId:string,amount:number,eventId?:string){
  return transaction(()=>{
    if(eventId&&db().prepare('SELECT id FROM payment_events WHERE id=?').get(eventId))return 'duplicate';
    const order=db().prepare('SELECT id,total,status,items,stock_released,payment_id FROM orders WHERE gateway_id=?').get(gatewayId) as {id:string;total:number;status:string;items:string;stock_released:number;payment_id:string|null}|undefined;
    if(!order)throw new Error('Unknown payment order');
    if(Math.round(order.total*100)!==amount)throw new Error('Payment amount mismatch');
    if(order.payment_id&&order.payment_id!==paymentId)throw new Error('Order already has a different payment. Manual reconciliation required.');
    if(['PENDING','FAILED','CANCELLED','EXPIRED','PAYMENT_REVIEW'].includes(order.status)){
      let available=true;
      const lines=JSON.parse(order.items) as Line[];
      if(order.stock_released){
        // A delayed capture can arrive after released stock has been sold again.
        // Reserve all lines atomically, or keep the payment visible for merchant review.
        available=lines.every(i=>{const stock=db().prepare('SELECT quantity FROM stock WHERE product_id=? AND size=? AND color=?').get(i.id,i.size,i.color) as {quantity:number}|undefined;return stock&&stock.quantity>=i.qty});
        if(available)for(const i of lines)db().prepare('UPDATE stock SET quantity=quantity-? WHERE product_id=? AND size=? AND color=?').run(i.qty,i.id,i.size,i.color);
      }
      const status=available?'PAID':'PAYMENT_REVIEW';
      db().prepare('UPDATE orders SET status=?,payment_id=?,reserved_until=NULL,stock_released=? WHERE id=?').run(status,paymentId,available?0:1,order.id);
      db().prepare("UPDATE quotes SET status=? WHERE order_id=? OR (user_id=(SELECT user_id FROM orders WHERE id=?) AND status='PAYMENT_PENDING')").run(status,order.id,order.id);
    }
    if(eventId)db().prepare('INSERT INTO payment_events VALUES(?,?)').run(eventId,new Date().toISOString());
    return order.id;
  });
}

/** Reconcile missed captures and late captures flagged for stock review. */
export async function reconcileOrder(orderId:string){
  const order=db().prepare('SELECT gateway_id FROM orders WHERE id=?').get(orderId) as {gateway_id:string}|undefined;
  if(!order)throw new Error('Order not found.');
  db().prepare('UPDATE orders SET payment_checked_at=? WHERE id=?').run(Date.now(),orderId);
  const result=await gateway('orders/'+encodeURIComponent(order.gateway_id)+'/payments');
  if(!Array.isArray(result.items))throw new Error('Invalid payment provider response.');
  const captured=result.items.filter((p:{status:string;order_id:string;currency:string})=>p.status==='captured'&&p.order_id===order.gateway_id&&p.currency==='INR');
  for(const p of captured)confirmPayment(order.gateway_id,p.id,p.amount);
  return db().prepare('SELECT id,status FROM orders WHERE id=?').get(orderId);
}
