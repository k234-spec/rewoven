'use client';

import { useState, useEffect } from 'react';
import { ProductImageItem } from '@/lib/products-data';

interface ImageGalleryProps {
  images: ProductImageItem[];
  productName: string;
  isSale?: boolean;
  isBestseller?: boolean;
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';

export default function ImageGallery({
  images,
  productName,
  isSale,
  isBestseller,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState(
    images[0]?.url || FALLBACK_IMG
  );

  useEffect(() => {
    setActiveSrc(images[activeIndex]?.url || FALLBACK_IMG);
  }, [activeIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false);
    };
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomOpen]);

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Bar (Desktop side strip / Mobile bottom row) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 pb-2 lg:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1} of ${images.length}`}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-ivory border transition-all shrink-0 overflow-hidden ${
                activeIndex === idx
                  ? 'border-noir shadow-xs ring-1 ring-noir'
                  : 'border-hairline hover:border-noir/40 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `${productName} angle ${idx + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMG;
                }}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main 3:4 Media Preview Area */}
      <div className="relative flex-1 aspect-[3/4] bg-ivory border border-hairline overflow-hidden group cursor-zoom-in">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {isSale && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-pink-accent bg-white/95 border border-pink-accent shadow-sm">
              Sale
            </span>
          )}
          {isBestseller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold bg-white/95 border border-gold shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Click-to-Zoom Tooltip Trigger Button */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-noir/70 hover:text-noir hover:bg-white shadow-sm transition-all"
          title="Click to zoom high-resolution details"
          aria-label="Open image zoom modal"
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
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </button>

        {/* Main Image */}
        <img
          src={activeSrc}
          alt={activeImage?.altText || productName}
          onClick={() => setIsZoomOpen(true)}
          onError={() => setActiveSrc(FALLBACK_IMG)}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Bottom subtle zoom hint */}
        <div
          onClick={() => setIsZoomOpen(true)}
          className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-noir/50 to-transparent text-center text-[10px] uppercase tracking-widest text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Click image to inspect embroidery &amp; craft
        </div>
      </div>

      {/* Click-to-Zoom Fullscreen Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Close high-res view"
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-noir/80 text-white hover:bg-noir transition-colors border border-white/20"
          >
            <svg
              className="w-6 h-6"
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

          {/* Navigation Arrows if multi-image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
                aria-label="Previous image"
                className="absolute left-4 z-50 p-3 rounded-full bg-noir/60 text-white hover:bg-noir transition-colors border border-white/20 hidden sm:block"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next image"
                className="absolute right-4 z-50 p-3 rounded-full bg-noir/60 text-white hover:bg-noir transition-colors border border-white/20 hidden sm:block"
              >
                ›
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[92vh] w-full flex items-center justify-center overflow-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsZoomOpen(false);
            }}
          >
            <img
              src={activeSrc}
              alt={activeImage?.altText || productName}
              className="max-h-[90vh] w-auto object-contain rounded-none shadow-2xl cursor-default"
            />
          </div>
        </div>
      )}
    </div>
  );
}
