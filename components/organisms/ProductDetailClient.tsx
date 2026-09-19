'use client';

import { useState } from 'react';
import { EnrichedProduct } from '@/lib/products-data';
import ImageGallery from '@/components/molecules/ImageGallery';
import SizeSelector from '@/components/molecules/SizeSelector';
import PincodeChecker from '@/components/molecules/PincodeChecker';
import ProductAccordion from '@/components/molecules/ProductAccordion';
import { useCartStore } from '@/lib/store/useCartStore';

interface ProductDetailClientProps {
  product: EnrichedProduct;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M (36)');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isAddedToBag, setIsAddedToBag] = useState<boolean>(false);

  const { addItem, openCart } = useCartStore();

  // Check if selected size is out of stock
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const isOutOfStock =
    Boolean(selectedVariant && selectedVariant.stockQty <= 0) &&
    selectedSize !== 'Custom Stitching';

  const handleAddToBag = () => {
    if (isOutOfStock) return;
    setIsAddedToBag(true);

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

    openCart();

    setTimeout(() => {
      setIsAddedToBag(false);
    }, 2000);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Media Gallery with Click-to-Zoom (7 cols on lg) */}
        <div className="lg:col-span-7">
          <ImageGallery
            images={product.images}
            productName={product.name}
            isSale={product.isSale}
            isBestseller={product.isBestseller}
          />
        </div>

        {/* Right Column: Product Specs & Actions (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div className="space-y-2 border-b border-hairline pb-5">
            <div className="flex items-center justify-between text-xs text-noir/50 uppercase tracking-[0.18em]">
              <span>{product.category}</span>
              <span className="text-[11px] text-noir/40">SKU: {product.sku}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl text-noir font-normal leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-bold text-2xl sm:text-3xl text-noir">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-noir/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent && (
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-pink-accent bg-pink-accent/10 rounded">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <p className="text-[11px] text-noir/50">
              Inclusive of all taxes. Free shipping across India.
            </p>
          </div>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-noir/70 leading-relaxed">
            {product.description}
          </p>

          {/* Real Size Selector (XS-XXL + Custom Stitching) */}
          <SizeSelector
            variants={product.variants}
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={(s) => setSelectedSize(s)}
            productName={product.name}
          />

          {/* Actions: Add to Bag (Primary) + Wishlist (Icon) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Primary Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={isOutOfStock}
                className={`flex-1 py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-none ${
                  isOutOfStock
                    ? 'bg-hairline text-noir/40 cursor-not-allowed'
                    : isAddedToBag
                      ? 'bg-emerald text-white'
                      : 'bg-noir text-white hover:bg-noir/90'
                }`}
              >
                {isOutOfStock ? (
                  'Size Out of Stock'
                ) : isAddedToBag ? (
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

              {/* Wishlist Heart Icon Button (Pink only when active) */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label={
                  isWishlisted
                    ? 'Remove from wishlist'
                    : 'Save to wishlist'
                }
                className={`p-4 border transition-colors flex items-center justify-center shrink-0 ${
                  isWishlisted
                    ? 'border-pink-accent bg-pink-accent/10 text-pink-accent'
                    : 'border-hairline bg-white text-noir/70 hover:border-noir hover:text-pink-accent'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Direct WhatsApp Concierge Assistance Link */}
            <a
              href={`https://api.whatsapp.com/send/?phone=919911852113&text=${encodeURIComponent(
                `Hi Madamcutie! I am interested in "${product.name}" (SKU: ${product.sku}) in size ${selectedSize}. Could you share more details or photos?`
              )}&type=phone_number&app_absent=0&wame_ctl=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 border border-hairline bg-ivory text-noir text-xs uppercase tracking-wider font-semibold hover:border-noir transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4 text-emerald"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                />
              </svg>
              Chat With Stylist on WhatsApp
            </a>
          </div>

          {/* Pincode Courier Delivery Checker */}
          <PincodeChecker />

          {/* Details Accordion: Fabric, Styling Suggestions, Care, Shipping */}
          <ProductAccordion product={product} />
        </div>
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div className="fixed sm:hidden inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-hairline p-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-noir truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-noir">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-noir/50">Size: {selectedSize}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToBag}
          disabled={isOutOfStock}
          className={`py-3 px-5 text-xs uppercase tracking-wider font-semibold shrink-0 transition-colors ${
            isOutOfStock
              ? 'bg-hairline text-noir/40'
              : isAddedToBag
                ? 'bg-emerald text-white'
                : 'bg-noir text-white'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : isAddedToBag ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}
