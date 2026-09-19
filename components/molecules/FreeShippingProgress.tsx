'use client';

import { FREE_SHIPPING_THRESHOLD } from '@/lib/store/useCartStore';

interface FreeShippingProgressProps {
  subtotal: number;
}

export default function FreeShippingProgress({
  subtotal,
}: FreeShippingProgressProps) {
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const isUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="bg-ivory/80 border-b border-hairline p-3.5 sm:p-4 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium text-noir">
          {isUnlocked ? (
            <>
              <span className="text-emerald font-semibold flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                FREE Complimentary Shipping Unlocked!
              </span>
            </>
          ) : (
            <span>
              Add{' '}
              <strong className="text-gold font-bold">
                ₹{amountNeeded.toLocaleString('en-IN')}
              </strong>{' '}
              more to unlock{' '}
              <strong className="text-noir font-semibold">FREE Shipping</strong>
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium text-noir/50">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-hairline/60 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            isUnlocked
              ? 'bg-emerald'
              : 'bg-gradient-to-r from-gold to-gold/80'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
