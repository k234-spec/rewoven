import Link from 'next/link';
import { FEATURED_PRODUCTS } from '@/lib/products';

export default function FeaturedLooks() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-section-xl">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-noir/60 mb-2">
            Curated Collection
          </p>
          <h2 className="font-display text-h1 font-normal tracking-tight text-noir">
            Featured Looks
          </h2>
          <p className="text-sm text-noir/70 mt-1">
            Discover our most coveted handcrafted silhouettes
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden md:inline-flex items-center text-xs uppercase tracking-[0.16em] font-semibold text-noir hover:text-gold transition-colors pb-1 border-b border-noir"
        >
          View All Styles →
        </Link>
      </div>

      {/* 8-Product Grid (2 columns on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {FEATURED_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white border border-hairline/60 overflow-hidden hover:border-hairline transition-all duration-300"
          >
            {/* 3:4 Aspect Ratio Image Wrapper */}
            <div className="relative w-full aspect-[3/4] bg-ivory overflow-hidden">
              {/* Badges container */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                {product.sale && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-accent bg-white border border-pink-accent shadow-sm">
                    Sale
                  </span>
                )}
                {product.bestseller && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold bg-white border border-gold shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Wishlist Heart Icon (Neutral outline; pink when active only) */}
              <button
                type="button"
                aria-label={`Save ${product.name} to wishlist`}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-noir/70 hover:text-pink-accent transition-colors shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              {/* Product Image */}
              <Link href={`/product/${product.id}`} className="block w-full h-full">
                {/* Fallback pattern + real image with hover zoom */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>

              {/* Single "Quick Add" Primary Button (Reveals on hover desktop, always accessible) */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-noir/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Link
                  href={`/product/${product.id}`}
                  className="w-full py-2.5 bg-noir text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center hover:bg-noir/90 transition-colors shadow-md text-center"
                >
                  Quick Add
                </Link>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-noir/50 font-semibold block mb-1">
                  {product.category}
                </span>

                <h3 className="font-display text-sm md:text-base font-normal text-noir line-clamp-2 leading-snug mb-2 hover:text-gold transition-colors">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
              </div>

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1.5 text-gold text-xs mb-2">
                  <span>★★★★★</span>
                  <span className="text-[11px] text-noir/50">({product.reviews})</span>
                </div>

                {/* Price in bold */}
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-base text-noir">₹{product.price}</span>
                  {product.sale && product.original_price && (
                    <span className="text-xs text-noir/40 line-through">
                      ₹{product.original_price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all link */}
      <div className="text-center mt-8 md:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-noir text-noir text-xs font-semibold uppercase tracking-[0.16em] hover:bg-noir hover:text-white transition-colors w-full"
        >
          View All Styles
        </Link>
      </div>
    </section>
  );
}
