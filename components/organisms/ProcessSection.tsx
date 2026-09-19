export default function ProcessSection() {
  const steps = [
    {
      num: '1',
      title: 'Fabric & Mirror Sourcing',
      desc: 'We ethically source hand-loomed raw silks, rich velvets, and authentic cut mirrors selected for clarity, weight, and enduring luster.',
      alt: 'Fabric and Mirror Sourcing — hand-selected raw silks and artisan cut mirrors',
      icon: (
        <svg
          className="w-7 h-7 text-noir/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      num: '2',
      title: 'Hand Embroidery',
      desc: 'Centuries of zardozi, pita, and delicate mirror needlework are hand-sewn by fourth-generation Chandni Chowk artisans in Old Delhi.',
      alt: 'Hand Embroidery — Chandni Chowk artisans stitching zardozi and mirror needlework',
      icon: (
        <svg
          className="w-7 h-7 text-noir/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
        </svg>
      ),
    },
    {
      num: '3',
      title: 'Fit & Stitching',
      desc: 'Structured corsetry boning, tailored bust cups, and generous seam margins are meticulously stitched to sculpt and celebrate the female form.',
      alt: 'Fit & Stitching — boned corset sculpting and tailored silhouette construction',
      icon: (
        <svg
          className="w-7 h-7 text-noir/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
          <path d="m14 7 3 3" />
          <path d="M5 6v4" />
          <path d="M19 14v4" />
          <path d="M10 2v2" />
        </svg>
      ),
    },
    {
      num: '4',
      title: 'Quality Check & Dispatch',
      desc: 'Each garment undergoes rigorous tension testing, mirror inspection, and luxury steaming before being packaged in custom noir boxes for dispatch.',
      alt: 'Quality Check & Dispatch — hand steaming, inspection, and luxury courier dispatch',
      icon: (
        <svg
          className="w-7 h-7 text-noir/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white border-y border-hairline py-16 md:py-24 mb-section-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-noir/60 mb-2">
            Artisanal Craftsmanship
          </p>
          <h2 className="font-display text-h1 font-normal tracking-tight text-noir mb-4">
            The Madamcutie Process
          </h2>
          <div className="w-12 h-px bg-hairline mx-auto" />
        </div>

        {/* 4-Step Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step) => (
            <article key={step.num} className="flex flex-col items-start group">
              {/* Image Placeholder with Alt Text & Craft Icon */}
              <div className="w-full aspect-[4/3] bg-ivory border border-hairline rounded-sm overflow-hidden mb-6 flex flex-col items-center justify-center p-4 relative text-center">
                <img
                  src={`/assets/images/process/step-${step.num}.jpg`}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="relative z-0 flex flex-col items-center justify-center text-noir/60">
                  {step.icon}
                  <span className="text-[11px] uppercase tracking-[0.16em] font-medium mt-2 text-noir/40">
                    Artisan Craft Photo
                  </span>
                </div>
              </div>

              {/* Number Badge: Gold Outline ONLY (not filled) */}
              <div className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center font-display text-base font-medium mb-4 select-none">
                {step.num}
              </div>

              {/* Step Title & Description */}
              <h3 className="font-display text-lg font-normal text-noir mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-noir/70 leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
