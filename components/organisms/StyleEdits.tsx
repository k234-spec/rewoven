import Link from 'next/link';

export default function StyleEdits() {
  const edits = [
    {
      title: 'Shimmer Party Top',
      category: 'Curated Edit',
      href: '/shop?edit=datenight',
      image: '/assets/images/madam/party_wear_1.jpg',
      gradient: 'from-noir/80 via-noir/40 to-transparent',
    },
    {
      title: 'Black Chevron Sequin Top',
      category: 'Curated Edit',
      href: '/shop?edit=office',
      image: '/assets/images/madam/party_wear_2.jpg',
      gradient: 'from-noir/80 via-noir/40 to-transparent',
    },
    {
      title: 'Glamour Evening Wear',
      category: 'Curated Edit',
      href: '/shop?edit=weekend',
      image: '/assets/images/madam/party_wear_3.jpg',
      gradient: 'from-noir/80 via-noir/40 to-transparent',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-section-xl">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-noir/60 mb-2">
          Trending Silhouettes
        </p>
        <h2 className="font-display text-h1 font-normal tracking-tight text-noir mb-3">
          Style Edits
        </h2>
        <p className="text-sm text-noir/70">
          Handcrafted ensembles tailored for celebratory moments and evening occasions
        </p>
      </div>

      {/* 3 Curated Category Tiles with 1.08x Hover Zoom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {edits.map((edit) => (
          <Link
            key={edit.title}
            href={edit.href}
            className="group relative h-[380px] sm:h-[440px] rounded-sm overflow-hidden block border border-hairline/60 bg-noir"
          >
            {/* Background Image with 1.08x Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-ivory">
              <img
                src={edit.image}
                alt={edit.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />
            </div>

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/35 to-transparent z-10" />

            {/* Bottom Tile Text */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold mb-1.5">
                {edit.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-white font-normal leading-snug group-hover:text-gold transition-colors duration-300">
                {edit.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 mt-3 group-hover:translate-x-1 transition-transform">
                Explore Edit →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
