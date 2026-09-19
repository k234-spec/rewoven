'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnrichedProduct } from '@/lib/products-data';

interface ProductCardProps {
  product: EnrichedProduct;
  onQuickAdd?: (product: EnrichedProduct) => void;
}

const COLOR_MAP: Record<string, string> = {
  black: '#111111',
  gold: '#d4af37',
  green: '#1b4d3e',
  red: '#990000',
  blue: '#1e3a8a',
  navy: '#0f172a',
  pink: '#ec4899',
  silver: '#9ca3af',
  yellow: '#eab308',
  mustard: '#ca8a04',
  ivory: '#fdfbf7',
  white: '#f3f4f6',
  olive: '#556b2f',
  sorbet: '#f472b6',
  multicolor: '#d4af37',
};

// Generate realistic color swatches for each product
function getProductSwatches(product: EnrichedProduct) {
  const primary = (product.color || 'gold').toLowerCase();
  const hex = COLOR_MAP[primary] || '#d4af37';
  
  // Companion colorways
  const companions: Record<string, string[]> = {
    black: ['gold', 'red', 'silver'],
    gold: ['black', 'green', 'ivory'],
    green: ['gold', 'black', 'pink'],
    red: ['gold', 'black', 'green'],
    blue: ['silver', 'gold', 'black'],
    pink: ['gold', 'silver', 'black'],
    silver: ['black', 'blue', 'pink'],
    yellow: ['green', 'gold', 'red'],
  };
  
  const additional = (companions[primary] || ['black', 'gold']).slice(0, 3);
  return [
    { name: product.color, hex, isCurrent: true },
    ...additional.map(c => ({ name: c, hex: COLOR_MAP[c] || '#111', isCurrent: false }))
  ];
}

// Generate stable deterministic review count from product id
function getProductReviews(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return 15 + Math.abs(hash % 35); // 15 to 49 reviews
}

export default function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const images = product.images && product.images.length > 0
    ? product.images.map(img => img.url)
    : ['/images/products/mirror-corset-red.webp'];

  const primarySrc = images[activeImageIndex] || images[0] || '/images/products/mirror-corset-red.webp';
  const secondarySrc = images[1] || images[0] || '/images/products/mirror-corset-red.webp';
  
  const swatches = getProductSwatches(product);
  const reviewCount = getProductReviews(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-hairline/80 hover:border-hairline hover:shadow-md transition-all duration-300">
      {/* 3:4 Aspect Ratio Image Area with Dual-Image Swap */}
      <div className="relative w-full aspect-[3/4] bg-ivory overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 flex flex-col gap-1 items-start pointer-events-none">
          {product.isSale && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-pink-accent shadow-sm">
              Sale
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-noir bg-gold shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Pink outline / filled on active) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm ${
            isWishlisted
              ? 'bg-white text-pink-accent'
              : 'bg-white/85 text-noir/60 hover:text-pink-accent hover:bg-white'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
            />
          </svg>
        </button>

        {/* Clickable Card Link for image area */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${product.name}`}
        />

        {/* Primary Image */}
        <img
          src={primarySrc}
          alt={product.images[0]?.altText || product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out group-hover:opacity-0 pointer-events-none"
        />

        {/* Secondary Image (Dual-Image Hover Swap) */}
        <img
          src={secondarySrc}
          alt={product.images[1]?.altText || `${product.name} alternate view`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105 transition-transform pointer-events-none"
        />
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category / Subtitle */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-noir/50 uppercase tracking-widest mb-1.5">
            <span>{product.category || 'Couture Blouse'}</span>
            <span className="text-[9px] text-noir/40 font-normal">{product.fabric}</span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block mb-2">
            <h3 className="font-display text-xs sm:text-sm font-normal text-noir group-hover:text-gold transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5 my-2">
            {swatches.map((swatch, idx) => (
              <button
                key={idx}
                type="button"
                title={swatch.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImageIndex(idx % images.length);
                }}
                style={{ backgroundColor: swatch.hex }}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/20 shadow-2xs transition-transform hover:scale-125 cursor-pointer ${
                  swatch.isCurrent ? 'ring-1.5 ring-offset-1 ring-gold scale-110' : ''
                }`}
              />
            ))}
          </div>

          {/* 5-Star Rating */}
          <div className="flex items-center gap-1 my-1 text-gold text-xs">
            <span className="tracking-tighter">★★★★★</span>
            <span className="text-[10px] sm:text-[11px] text-noir/40 font-normal ml-1">
              ({reviewCount})
            </span>
          </div>
        </div>

        <div>
          {/* Price */}
          <div className="mt-2 pt-2 border-t border-hairline/60 flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-noir">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-noir/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Full-width Signature Gold Button matching Reference Screenshots */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onQuickAdd) onQuickAdd(product);
            }}
            className="w-full mt-3 py-2.5 sm:py-3 px-3 bg-[#c5a059] hover:bg-[#b08d46] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 rounded-none"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Quick Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
