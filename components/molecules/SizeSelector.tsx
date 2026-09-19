'use client';

import { useState } from 'react';
import SizeChartModal from '@/components/molecules/SizeChartModal';
import { ProductVariantItem } from '@/lib/products-data';

interface SizeSelectorProps {
  variants?: ProductVariantItem[];
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  productName: string;
}

export default function SizeSelector({
  variants,
  sizes,
  selectedSize,
  onSelectSize,
  productName,
}: SizeSelectorProps) {
  const [isChartOpen, setIsChartOpen] = useState(false);

  // Map variants by size to inspect stockQty
  const variantMap = new Map<string, number>();
  if (variants && variants.length > 0) {
    variants.forEach((v) => {
      variantMap.set(v.size, v.stockQty);
    });
  }

  const isCustomSelected = selectedSize === 'Custom Stitching';

  return (
    <div className="space-y-3">
      {/* Header: Label + Size Guide Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.16em] text-noir">
            Select Size
          </label>
          <span className="text-xs text-noir/60">
            ({selectedSize || 'Choose a size'})
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsChartOpen(true)}
          className="text-xs text-noir/70 hover:text-gold transition-colors underline flex items-center gap-1 font-medium"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          Size Chart &amp; Fit Guide
        </button>
      </div>

      {/* Size Pills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {sizes.map((size) => {
          const stock = variantMap.has(size) ? (variantMap.get(size) ?? 10) : 10;
          const isOutOfStock = stock <= 0 && size !== 'Custom Stitching';
          const isSelected = selectedSize === size;
          const isCustom = size === 'Custom Stitching';

          return (
            <button
              key={size}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectSize(size)}
              aria-label={
                isOutOfStock ? `${size} - Out of stock` : `Select ${size}`
              }
              className={`relative py-3 px-2 text-xs font-medium border transition-all text-center rounded-none select-none ${
                isCustom ? 'col-span-3 sm:col-span-2 font-semibold' : ''
              } ${
                isOutOfStock
                  ? 'border-hairline bg-ivory/60 text-noir/35 cursor-not-allowed line-through'
                  : isSelected
                    ? 'border-noir bg-noir text-white shadow-xs'
                    : 'border-hairline bg-white text-noir hover:border-noir/50 hover:bg-ivory/50 cursor-pointer'
              }`}
            >
              {size}
              {isOutOfStock && (
                <span className="block text-[9px] no-underline font-normal uppercase tracking-wider text-noir/40">
                  Sold Out
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Alteration Margins Guarantee Note */}
      <div className="p-2.5 bg-ivory border border-hairline/60 text-[11px] text-noir/70 flex items-start gap-2">
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
          Includes <strong>2 inches of inner margin</strong> for effortless tailor alterations.
        </span>
      </div>

      {/* Bespoke Custom Stitching Advice */}
      {isCustomSelected && (
        <div className="p-3.5 bg-ivory border border-gold/40 rounded-none space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir">
              Bespoke Artisan Stitching Selected
            </h4>
          </div>
          <p className="text-xs text-noir/70 leading-relaxed">
            Our atelier will handcraft this blouse to your exact measurements (neckline depth, sleeve style, and bust cup size).
          </p>
          <a
            href={`https://api.whatsapp.com/send/?phone=919911852113&text=${encodeURIComponent(
              `Hi Madamcutie Atelier, I am ordering "${productName}" with Custom Stitching. Here are my measurements:`
            )}&type=phone_number&app_absent=0&wame_ctl=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:underline"
          >
            Send measurements on WhatsApp ↗
          </a>
        </div>
      )}

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isChartOpen}
        onClose={() => setIsChartOpen(false)}
      />
    </div>
  );
}
