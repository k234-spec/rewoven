export default function QueensSection() {
  const queens = [
    { name: 'Priya', city: 'Delhi', outfit: 'Mirror-Work Corset', id: '01' },
    { name: 'Ananya', city: 'Mumbai', outfit: 'Zardozi V-Neck Blouse', id: '02' },
    { name: 'Meera', city: 'Bengaluru', outfit: 'Handcrafted Emerald Crop Top', id: '03' },
    { name: 'Rhea', city: 'Kolkata', outfit: 'Scalloped Bridal Blouse', id: '04' },
    { name: 'Kavya', city: 'Jaipur', outfit: 'Raw Silk Corset Blouse', id: '05' },
    { name: 'Tanvi', city: 'Chandigarh', outfit: 'Sequin Evening Top', id: '06' },
    { name: 'Ishita', city: 'Hyderabad', outfit: 'Royal Blue Corset', id: '07' },
    { name: 'Simran', city: 'Lucknow', outfit: 'Party Wear Blouse', id: '08' },
  ];

  return (
    <section className="w-full bg-white border-y border-hairline py-16 md:py-20 mb-section-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-noir/60 mb-2">
              Community Spotlight
            </p>
            <h2 className="font-display text-h1 font-normal tracking-tight text-noir">
              Styled By Our Queens
            </h2>
            <p className="text-sm text-noir/70 mt-1">
              Real women celebrating elegance, craftsmanship, and individuality in Madamcutie
            </p>
          </div>

          <span className="text-xs uppercase tracking-[0.14em] text-noir/50 hidden sm:inline-block font-medium">
            ← Drag or scroll to browse →
          </span>
        </div>

        {/* Horizontal Scroll-Snap Carousel Container */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {queens.map((queen) => (
            <div
              key={queen.id}
              className="flex-none w-[220px] sm:w-[240px] md:w-[260px] snap-start flex flex-col group"
            >
              {/* Card Photo Container (4:5 Aspect Ratio) */}
              <div className="relative w-full aspect-[4/5] bg-ivory border border-hairline rounded-sm overflow-hidden mb-3 flex flex-col items-center justify-center p-4">
                <img
                  src={`/assets/images/queens/queen-${queen.id}.jpg`}
                  alt={`${queen.name}, ${queen.city} styled in Madamcutie ${queen.outfit}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Styled Placeholder Badge */}
                <div className="relative z-0 flex flex-col items-center justify-center text-noir/40">
                  <svg
                    className="w-8 h-8 mb-2 opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="font-display text-sm font-medium text-noir/70">
                    {queen.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-noir/40 mt-0.5">
                    Customer Photo
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="flex flex-col">
                <h3 className="font-display text-base font-normal text-noir group-hover:text-gold transition-colors">
                  {queen.name}, {queen.city}
                </h3>
                <span className="text-xs text-noir/60 font-body mt-0.5">{queen.outfit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
