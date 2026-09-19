export default function TrustRibbon() {
  const badges = [
    {
      title: 'Premium Fabrics',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: 'Pan-India Shipping',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: 'Easy Returns',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Secure Payments',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-ivory border-y border-hairline py-8 mb-section-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, idx) => (
            <div key={badge.title} className="flex items-center justify-center relative">
              <div className="flex items-center gap-3 text-noir">
                <span className="text-noir shrink-0">{badge.icon}</span>
                <span className="text-xs uppercase tracking-[0.14em] font-semibold text-noir">
                  {badge.title}
                </span>
              </div>

              {/* Small gold accent divider between items only (not on the last item) */}
              {idx < badges.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/70"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
