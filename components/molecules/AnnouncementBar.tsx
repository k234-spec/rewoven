'use client';

interface AnnouncementBarProps {
  messages?: string[];
  className?: string;
  speedSeconds?: number;
}

const DEFAULT_PROMO_MESSAGES = [
  'Free complimentary shipping on orders over ₹2250',
  'Use code MADAM15 for 15% off your first purchase',
  'New Summer Edit now live',
];

export default function AnnouncementBar({
  messages = DEFAULT_PROMO_MESSAGES,
  className = '',
  speedSeconds = 35,
}: AnnouncementBarProps) {
  // Combine single announcement string for screen readers (WCAG AA accessible)
  const screenReaderAnnouncement = messages.join(' · ');

  // Repeat sequence 4 times per loop half (8 times total) so there is NEVER an empty gap on any viewport (mobile to 4K)
  const repeatedHalf = [...messages, ...messages, ...messages, ...messages];
  const fullMarqueeList = [...repeatedHalf, ...repeatedHalf];

  return (
    <div
      role="region"
      aria-label="Announcements"
      className={`relative z-50 w-full overflow-hidden bg-noir border-b border-hairline/20 py-2.5 select-none ${className}`}
    >
      {/* Screen Reader accessible announcement (read once, clean) */}
      <span className="sr-only">{screenReaderAnnouncement}</span>

      {/* 
        Marquee track:
        - Gold (#d4af37) text on Noir (#111111) background: Contrast ratio 8.98:1 (exceeds WCAG AA 4.5:1 & AAA 7.0:1)
        - Slow, smooth infinite auto-scroll
        - Pauses on hover
      */}
      <div
        aria-hidden="true"
        style={{ animationDuration: `${speedSeconds}s` }}
        className="animate-marquee flex items-center whitespace-nowrap will-change-transform"
      >
        {fullMarqueeList.map((message, index) => (
          <div key={index} className="inline-flex items-center shrink-0">
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.14em]">
              {message}
            </span>
            <span className="mx-5 sm:mx-8 text-gold/60 text-sm select-none font-bold">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
