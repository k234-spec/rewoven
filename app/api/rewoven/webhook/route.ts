import {NextResponse} from 'next/server';
import {verifySignature,confirmPayment,releaseOrderStock} from '@/lib/rewoven/payments';
import {db} from '@/lib/rewoven/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function POST(req:Request){
  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
  if(!secret)return NextResponse.json({error:'Webhook not configured'},{status:503});
  const raw=await req.text();
  if(!verifySignature(raw,req.headers.get('x-razorpay-signature')||'',secret))
    return NextResponse.json({error:'Invalid signature'},{status:400});
  try{
    const body=JSON.parse(raw);
    const p=body.payload?.payment?.entity;
    if(body.event==='payment.captured'&&p?.currency==='INR'&&p?.status==='captured')
      confirmPayment(p.order_id,p.id,p.amount,req.headers.get('x-razorpay-event-id')||p.id);
    if(body.event==='payment.failed'&&p?.order_id){
      // BUG 2 FIX: immediately restore stock when Razorpay reports a failed payment
      const order=db().prepare('SELECT id FROM orders WHERE gateway_id=?').get(p.order_id) as {id:string}|undefined;
      if(order)releaseOrderStock(order.id,'FAILED');
    }
    return NextResponse.json({received:true});
  }catch{return NextResponse.json({error:'Unable to reconcile payment; retry required'},{status:500})}
}

