'use client';

import { useState } from 'react';
import { EnrichedProduct } from '@/lib/products-data';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useCartStore } from '@/lib/store/useCartStore';

interface QuickAddDrawerProps {
  product: EnrichedProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddDrawer({
  product,
  isOpen,
  onClose,
}: QuickAddDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M (36)');
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isCustomNoteOpen, setIsCustomNoteOpen] = useState<boolean>(false);

  const { addItem, openCart } = useCartStore();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    setIsAdded(true);

    addItem({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image:
        product.images[0]?.url ||
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      size: selectedSize,
      quantity: 1,
    });

    setTimeout(() => {
      setIsAdded(false);
      onClose();
      openCart();
    }, 400);
  };

  const primaryImage =
    product.images[0]?.url ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Card */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto transform transition-all animate-in fade-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close size selection"
          className="absolute top-4 right-4 p-2 rounded-full text-noir/60 hover:text-noir hover:bg-ivory transition-colors"
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
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Product Snapshot */}
        <div className="flex gap-4 items-center pb-5 border-b border-hairline">
          <div className="relative w-20 h-24 bg-ivory rounded-md overflow-hidden shrink-0">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-noir/50">
              {product.category}
            </span>
            <h3 className="font-display text-base font-medium text-noir truncate">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-semibold text-noir text-base">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-noir/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.isSale && (
                <span className="text-[10px] uppercase font-bold text-pink-accent">
                  Save {Math.round((1 - product.price / (product.originalPrice || product.price * 1.3)) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-noir">
              Select Size (Bust Measurement)
            </label>
            <span className="text-[11px] text-noir/60 underline cursor-pointer hover:text-gold transition-colors">
              Size Guide
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              const isCustom = size === 'Custom Stitching';

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setIsCustomNoteOpen(isCustom);
                  }}
                  className={`px-3 py-2.5 text-xs font-medium rounded border transition-all text-center ${
                    isSelected
                      ? 'border-noir bg-noir text-white shadow-sm'
                      : 'border-hairline bg-white text-noir hover:border-noir/40 hover:bg-ivory/50'
                  } ${isCustom ? 'col-span-2 sm:col-span-2' : ''}`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Alteration margin guarantee notice */}
          <div className="mt-3 p-2.5 bg-ivory rounded text-[11px] text-noir/70 flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gold shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              All blouses feature <strong>2 inches of inner margin</strong> on each side for effortless alteration.
            </span>
          </div>

          {isCustomNoteOpen && (
            <div className="mt-2 text-[11px] text-noir/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-ivory/80 p-2.5 rounded border border-hairline/60">
              <span>Our master artisans will tailor this silhouette to your bespoke measurements.</span>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          )}
        </div>

        {/* Stock status indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs font-medium text-emerald">
            In Stock — Dispatches within 24 Hours
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-3.5 px-6 rounded-none text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isAdded
                ? 'bg-emerald text-white'
                : 'bg-noir text-white hover:bg-noir/90'
            }`}
          >
            {isAdded ? (
              <>
                <svg
                  className="w-4 h-4"
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
                Added to Bag ({selectedSize})
              </>
            ) : (
              <>Add to Bag • ₹{product.price.toLocaleString('en-IN')}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
