'use client';

import Link from 'next/link';
import { CartItem, useCartStore } from '@/lib/store/useCartStore';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem, closeCart } = useCartStore();

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.size, item.quantity - 1);
    } else {
      removeItem(item.id, item.size);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.size, item.quantity + 1);
  };

  const handleRemove = () => {
    removeItem(item.id, item.size);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex gap-3.5 py-4 border-b border-hairline/60 last:border-b-0 items-start">
      {/* 3:4 Thumbnail Image */}
      <Link
        href={`/product/${item.slug || item.id}`}
        onClick={closeCart}
        className="relative w-20 aspect-[3/4] bg-ivory overflow-hidden shrink-0 border border-hairline/40 group block"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </Link>

      {/* Info & Quantity Controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${item.slug || item.id}`}
              onClick={closeCart}
              className="font-display text-xs sm:text-sm text-noir font-normal hover:text-gold transition-colors line-clamp-2 leading-snug"
            >
              {item.name}
            </Link>

            {/* Instant Remove (Trash icon) */}
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${item.name} from bag`}
              className="p-1 text-noir/40 hover:text-pink-accent transition-colors shrink-0 -mr-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {/* Size Tag & SKU */}
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-ivory border border-hairline text-noir">
              Size: {item.size}
            </span>
            {item.sku && (
              <span className="text-[10px] text-noir/40 tracking-wider">
                {item.sku}
              </span>
            )}
          </div>
        </div>

        {/* Price & Stepper Row */}
        <div className="flex items-baseline justify-between pt-3 mt-auto">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-hairline bg-white">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center text-noir/70 hover:text-noir hover:bg-ivory transition-colors text-xs font-semibold"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-semibold text-noir select-none">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center text-noir/70 hover:text-noir hover:bg-ivory transition-colors text-xs font-semibold"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-bold text-xs sm:text-sm text-noir">
              ₹{lineTotal.toLocaleString('en-IN')}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] text-noir/40">
                ₹{item.price.toLocaleString('en-IN')} each
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
