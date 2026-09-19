import { CartItem } from '@/lib/store/useCartStore';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: any;
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('[Razorpay] Script failed to load from CDN.');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface CheckoutOptions {
  items: CartItem[];
  totalAmount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onError?: (error: Error) => void;
  onDismiss?: () => void;
}

/**
 * Initiates Razorpay Checkout in Test Mode.
 * Fallback to realistic luxury test modal if key is unset.
 */
export async function launchRazorpayTestCheckout({
  items,
  totalAmount,
  customerName = 'Festive Shopper',
  customerEmail = 'guest@madamcutie.com',
  customerPhone = '9911852113',
  onSuccess,
  onError,
  onDismiss,
}: CheckoutOptions): Promise<void> {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !window.Razorpay) {
    const err = new Error(
      'Unable to load Razorpay payment gateway. Please check your internet connection or try WhatsApp checkout.'
    );
    onError?.(err);
    return;
  }

  // Use environment test key or fallback standard Razorpay test key ID
  const keyId =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag';

  const options = {
    key: keyId,
    amount: Math.round(totalAmount * 100), // in paise
    currency: 'INR',
    name: 'Madamcutie Couture',
    description: `Handcrafted Luxury Ethnic Wear (${items.length} ${
      items.length === 1 ? 'piece' : 'pieces'
    })`,
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    notes: {
      order_source: 'madamcutie_cart_drawer',
      items_summary: items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join('; '),
    },
    theme: {
      color: '#111111',
    },
    modal: {
      ondismiss: () => {
        onDismiss?.();
      },
      backdropclose: false,
      escape: true,
      handleback: true,
      confirm_close: true,
    },
    handler: (response: RazorpayPaymentSuccessResponse) => {
      onSuccess(response);
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response: { error?: { description?: string } }) => {
      const errorMsg =
        response?.error?.description || 'Payment failed or was cancelled.';
      onError?.(new Error(errorMsg));
    });
    rzp.open();
  } catch (err) {
    onError?.(err instanceof Error ? err : new Error('Payment launch error'));
  }
}
