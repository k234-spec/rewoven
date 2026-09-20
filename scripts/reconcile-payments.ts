import {loadEnvConfig} from '@next/env';
loadEnvConfig(process.cwd());

async function main(){
  const {db}=await import('../lib/rewoven/server');
  const {releaseExpiredReservations,reconcileOrder}=await import('../lib/rewoven/payments');
  try{
    const released=releaseExpiredReservations();
    console.log(`Released ${released} expired reservations.`);
    const orders=db().prepare("SELECT id FROM orders WHERE status IN ('PENDING','FAILED','CANCELLED','EXPIRED','PAYMENT_REVIEW') AND gateway_id IS NOT NULL ORDER BY COALESCE(payment_checked_at,0),created LIMIT 100").all() as {id:string}[];
    if(orders.length&&(!process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_')||!process.env.RAZORPAY_KEY_SECRET))throw new Error('Configure Razorpay test credentials to reconcile gateway payments.');
    for(const order of orders){
      try{console.log(await reconcileOrder(order.id))}
      catch(e){console.error(order.id,e instanceof Error?e.message:'Reconciliation failed');process.exitCode=1}
    }
  }finally{db().close()}
}
main().catch(e=>{console.error(e instanceof Error?e.message:e);process.exitCode=1});
