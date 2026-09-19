'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/useCartStore';
import FreeShippingProgress from '@/components/molecules/FreeShippingProgress';
import CartItemRow from '@/components/molecules/CartItemRow';
import { launchRazorpayTestCheckout } from '@/lib/razorpay';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    getSubtotal,
    getTotalCount,
    clearCart,
  } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Lock body scroll when drawer is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalCount = getTotalCount();
  const isFreeShipping = subtotal >= 2250;

  // Generate WhatsApp Order Message matching existing flow
  const generateWhatsAppMessage = () => {
    let msg = 'Hi Madamcutie! I would like to place an order for the following couture pieces:\n\n';
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (SKU: ${item.sku || 'MC-COUTURE'})\n`;
      msg += `   - Size: ${item.size}\n`;
      msg += `   - Qty: ${item.quantity}\n`;
      msg += `   - Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    msg += `*Total Order Value:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    msg += `*Shipping:* ${isFreeShipping ? 'FREE Complimentary' : 'Standard'}\n\n`;
    msg += 'Please confirm availability and assist me with custom sizing/payment.';
    return msg;
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=919911852113&text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}&type=phone_number&app_absent=0&wame_ctl=1`;

  // Trigger Razorpay Test Mode Checkout
  const handleRazorpayCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    await launchRazorpayTestCheckout({
      items,
      totalAmount: subtotal,
      onSuccess: (res) => {
        setIsCheckingOut(false);
        setCheckoutSuccess(
          `Payment successful! Payment ID: ${res.razorpay_payment_id}. Your luxury couture order is being prepared.`
        );
        clearCart();
      },
      onError: (err) => {
        setIsCheckingOut(false);
        setCheckoutError(
          err.message || 'Payment could not be processed. Please try again or use WhatsApp checkout.'
        );
      },
      onDismiss: () => {
        setIsCheckingOut(false);
      },
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Bag"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform ease-in-out duration-300 animate-in slide-in-from-right"
        >
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-hairline flex items-center justify-between bg-white shrink-0">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-lg font-normal text-noir uppercase tracking-[0.14em]">
                Shopping Bag
              </h2>
              <span className="text-xs text-noir/50 font-medium">
                ({totalCount} {totalCount === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close shopping bag drawer"
              className="p-2 text-noir/60 hover:text-noir hover:bg-ivory transition-colors rounded-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {items.length > 0 && <FreeShippingProgress subtotal={subtotal} />}

          {/* Success Banner */}
          {checkoutSuccess && (
            <div className="p-4 bg-emerald/10 border-b border-emerald text-xs text-emerald font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{checkoutSuccess}</span>
            </div>
          )}

          {/* Error Banner */}
          {checkoutError && (
            <div className="p-3 bg-red-50 border-b border-red-200 text-xs text-red-600 font-medium flex items-center justify-between">
              <span>{checkoutError}</span>
              <button
                type="button"
                onClick={() => setCheckoutError(null)}
                className="text-red-400 hover:text-red-700 ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Scrollable Cart Items Area */}
          <div className="flex-1 overflow-y-auto px-5 divide-y divide-hairline/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-noir/40 mb-4 border border-hairline">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.25"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="font-display text-base text-noir mb-1 font-normal">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-noir/50 max-w-xs mb-6 leading-relaxed">
                  Discover handcrafted mirror-work blouses, bridal corset tops, and festive co-ords designed to captivate.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-3 bg-noir text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-noir/90 transition-colors"
                >
                  Explore Collection →
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <CartItemRow
                  key={`${item.id}-${item.size}`}
                  item={item}
                />
              ))
            )}
          </div>

          {/* Cart Footer: Summary + Dual Checkout CTAs */}
          {items.length > 0 && (
            <div className="border-t border-hairline bg-white p-5 space-y-4 shrink-0 shadow-lg">
              {/* Summary calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-noir/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-noir">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-noir/70">
                  <span>Shipping</span>
                  <span className={isFreeShipping ? 'text-emerald font-semibold' : 'text-noir/60'}>
                    {isFreeShipping ? 'FREE' : 'Free over ₹2,250'}
                  </span>
                </div>
                <div className="flex justify-between text-noir/50 text-[11px] pt-1">
                  <span>Applicable taxes</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-hairline/60 pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-sm uppercase tracking-wider text-noir">
                    Estimated Total
                  </span>
                  <span className="font-display font-bold text-lg text-noir">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Two Checkout CTAs */}
              <div className="space-y-2.5 pt-1">
                {/* 1. Primary CTA: Proceed to Checkout (Razorpay) */}
                <button
                  type="button"
                  onClick={handleRazorpayCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 px-6 bg-noir hover:bg-noir/90 text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Connecting to Checkout...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Proceed to Checkout • ₹{subtotal.toLocaleString('en-IN')}
                    </>
                  )}
                </button>

                {/* 2. Secondary / Outline CTA: Chat & Order on WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 border border-noir bg-transparent hover:bg-ivory text-noir text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-emerald shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat &amp; Order on WhatsApp
                </a>
              </div>

              {/* Trust & Guarantee badge */}
              <div className="pt-2 text-center text-[10px] uppercase tracking-wider text-noir/40 flex items-center justify-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Chandni Chowk Artisans · Pan-India Dispatch</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
