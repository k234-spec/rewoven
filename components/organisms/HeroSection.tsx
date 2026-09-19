import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden mb-section-xl">
      {/* 
        Hero Background Images:
        CSS-only 3-image auto-crossfade (15s cycle: 5s display + smooth crossfade)
        prefers-reduced-motion displays static first image only
      */}
      <div className="absolute inset-0 w-full h-full">
        {/* Image 1 */}
        <div
          role="img"
          aria-label="Madamcutie Luxury Fashion - Royal Emerald Handcrafted Silhouette"
          style={{ backgroundImage: "url('/images/hero/hero-1.webp')" }}
          className="hero-crossfade-1 absolute inset-0 w-full h-full bg-cover bg-right md:bg-center bg-no-repeat"
        />

        {/* Image 2 */}
        <div
          role="img"
          aria-label="Madamcutie Luxury Fashion - Midnight Blue Velvet Corset"
          style={{ backgroundImage: "url('/images/hero/hero-2.webp')" }}
          className="hero-crossfade-2 absolute inset-0 w-full h-full bg-cover bg-right md:bg-center bg-no-repeat opacity-0"
        />

        {/* Image 3 */}
        <div
          role="img"
          aria-label="Madamcutie Luxury Fashion - Ruby Red Zardozi Bridal Silhouette"
          style={{ backgroundImage: "url('/images/hero/hero-3.webp')" }}
          className="hero-crossfade-3 absolute inset-0 w-full h-full bg-cover bg-right md:bg-center bg-no-repeat opacity-0"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/90 via-noir/75 md:via-noir/60 to-transparent" />

      {/* Hero Content (Strictly NO gold elements per design rules) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
        <div className="max-w-xl text-white">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-white/80 mb-4">
            Premium Luxury Fashion
          </p>

          <h1 className="font-display text-hero font-normal leading-[1.1] tracking-tight mb-6 text-white">
            Effortless Style for
            <br />
            Modern Queens
          </h1>

          <p className="text-sm md:text-base text-white/80 font-normal leading-relaxed mb-8 max-w-lg">
            Discover our curated collection of luxury apparel designed to empower and inspire.
            Elegance redefined for the contemporary woman.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA: Solid black button */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-noir text-white text-xs font-semibold uppercase tracking-[0.16em] border border-white hover:bg-white hover:text-noir transition-all duration-300 min-w-[150px] text-center"
            >
              Shop Now
            </Link>

            {/* Secondary CTA: Outline button */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-xs font-semibold uppercase tracking-[0.16em] border border-white/60 hover:border-white hover:bg-white/10 transition-all duration-300 min-w-[150px] text-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
