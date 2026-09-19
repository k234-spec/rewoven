import Link from 'next/link';

export default function BrandStory() {
  return (
    <div className="w-full mb-section-xl">
      {/* OUR STORY SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image with Gold Frame from Chandni Chowk Tab */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[460px] p-2 sm:p-3.5 bg-white border border-gold shadow-md">
              <div className="relative aspect-[896/976] w-full overflow-hidden bg-ivory">
                <img
                  src="/images/about/our-story.webp"
                  alt="Madamcutie Handcrafted Black Embellished Blouse - Chandni Chowk"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2 max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gold mb-3">
              Chandni Chowk Atelier
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-noir tracking-tight mb-6 sm:mb-8 leading-[1.2]">
              Our Story
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-noir/80 leading-[1.8] font-body mb-8">
              <p>
                Welcome to MadamCutie – where fashion meets confidence and elegance. Based in the
                vibrant heart of Chandni Chowk, we bring you thoughtfully curated women&apos;s
                apparel that blends timeless charm with modern trends.
              </p>
              <p>
                At MadamCutie, we believe every woman deserves to feel beautiful, confident, and
                comfortable in what she wears. Our collections are designed to celebrate
                individuality, offering stylish outfits that suit every occasion—from everyday wear to
                special moments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-noir text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-noir/85 transition-colors shadow-sm"
              >
                EXPLORE COLLECTION
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-4 border border-hairline text-noir text-xs font-semibold uppercase tracking-[0.16em] hover:border-gold hover:text-gold transition-colors"
              >
                Read Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="w-full bg-white/70 border-y border-hairline py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gold mb-3">
            Our Purpose
          </p>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-noir tracking-tight mb-6">
            Our Mission
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-noir/80 font-body leading-[1.85] max-w-3xl mx-auto">
            Inspired by the rich fashion heritage of Chandni Chowk and driven by contemporary style,
            we focus on quality craftsmanship, attention to detail, and designs that make a lasting
            impression. Every piece is created with the goal of helping women express their unique
            personality through fashion.
          </p>
        </div>
      </section>
    </div>
  );
}
