'use client';
type Result = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
export async function openPayment(
  data: { key: string; gatewayId: string; total: number; cancelToken: string },
  customer: Record<string, string>,
  status: (s: string) => void,
  success: () => void
) {
  try {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load the payment provider.'));
      document.head.appendChild(script);
    });
    const Razorpay = (
      window as unknown as {
        Razorpay: new (options: unknown) => {
          open: () => void;
          on: (event: string, cb: () => void) => void;
        };
      }
    ).Razorpay;
    const r = new Razorpay({
      key: data.key,
      order_id: data.gatewayId,
      amount: Math.round(data.total * 100),
      currency: 'INR',
      name: 'Rewoven',
      description: 'Occasionwear · Test payment',
      prefill: { name: customer.name, email: customer.email, contact: customer.phone },
      theme: { color: '#692e3c' },
      modal: {
        ondismiss: () => {
          fetch('/api/rewoven/service/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gatewayId: data.gatewayId, token: data.cancelToken }),
          }).catch(() => {});
          status('Payment cancelled. Your bag is preserved; you have not been marked as paid.');
        },
      },
      handler: async (result: Result) => {
        try {
          const response = await fetch('/api/rewoven/service/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result),
          });
          const d = await response.json();
          status(d.message || d.error);
          if (response.ok && d.order) {
            status(`${d.message} Your order reference is ${d.order}.`);
            success();
          }
        } catch {
          status(
            'Payment verification is pending. Please check order tracking before trying again.'
          );
        }
      },
    });
    r.on('payment.failed', () =>
      status(
        'Payment failed. Your order has not been marked paid. Please check your payment method.'
      )
    );
    r.open();
  } catch (e) {
    status(e instanceof Error ? e.message : 'Unable to open checkout.');
  }
}
