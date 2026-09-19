'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: 'What follower count or criteria do you look for?',
    answer:
      'We value authentic engagement, aesthetic storytelling, and passion for Indian luxury fashion far more than raw follower counts. Whether you have 5,000 engaged fashion followers or 500,000, we would love to see your portfolio and discuss bespoke collaboration opportunities.',
  },
  {
    question: 'How do outfit gifting and wardrobe loans work?',
    answer:
      'Approved creators receive curated couture pieces from our latest Chandni Chowk drops delivered directly to their doorstep. Gifting collaborations allow you to keep and style the pieces in your permanent wardrobe. For large-scale editorial shoots or red-carpet events, we also offer couture wardrobe loans.',
  },
  {
    question: 'Can outfits be custom-tailored to my measurements?',
    answer:
      'Yes, absolutely! Every creator piece is hand-finished in our Chandni Chowk workshop. You can choose standard sizes (XS–XXL) or provide custom bust, waist, and length measurements for a flawless red-carpet fit.',
  },
  {
    question: 'How does creator commission and affiliate payout work?',
    answer:
      'Every creator partner receives an exclusive 10% discount code for their audience. You earn a generous 10%–15% commission on all completed orders driven through your link or code, paid out monthly via direct UPI or bank transfer with real-time tracking.',
  },
  {
    question: 'Where will my content be featured?',
    answer:
      'High-performing creator reels and photos are regularly featured on our verified Instagram page (@madamcutie.co), on our website’s "Styled By Our Queens" lookbook, in our email newsletters, and across digital campaign lookbooks with full creator credits and tags.',
  },
];

export default function CreatorFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="border border-hairline bg-white transition-colors duration-200"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-ivory/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base sm:text-lg text-noir font-normal">
                {faq.question}
              </span>
              <span className="text-gold flex-shrink-0 text-xl font-light">
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-noir/70 leading-relaxed font-body border-t border-hairline/40">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
