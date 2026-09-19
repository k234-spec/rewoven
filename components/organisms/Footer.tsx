import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-noir text-white pt-16 pb-8 border-t border-hairline/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand, Contact & Social */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <Logo size="lg" variant="dark" />
            </div>
            <p className="text-xs text-white/70 leading-relaxed pt-2">
              Madamcutie — Elegance. Style. You. Handcrafted luxury designer blouses, mirror-work corsets, and bespoke ethnic silhouettes designed for the modern woman.
            </p>
            <div className="text-sm space-y-1.5 pt-2 text-white/80">
              <p>
                <span className="text-white font-semibold">Phone:</span>{' '}
                <a href={`tel:${SOCIAL_LINKS.phoneRaw}`} className="hover:text-gold transition-colors">
                  {SOCIAL_LINKS.phone}
                </a>
              </p>
              <p>
                <span className="text-white font-semibold">Email:</span>{' '}
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-pink-accent hover:border-pink-accent transition-colors"
                title="Instagram"
                aria-label="Follow Madamcutie on Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-emerald hover:border-emerald transition-colors"
                title="WhatsApp Support"
                aria-label="Chat with Madamcutie on WhatsApp"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  />
                </svg>
              </a>
            </div>

            {/* Subtle Admin Link */}
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider"
              >
                Admin Access
              </Link>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/90">Shop</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dresses" className="hover:text-white transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?collection=lookbook"
                  className="hover:text-white transition-colors"
                >
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=all" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/90">
              About
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>For Wholesale</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <Link href="/creators" className="hover:text-white transition-colors">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/90">Help</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/policy" className="hover:text-white transition-colors">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Madamcutie. All rights reserved. Handcrafted luxury ethnic couture.</p>

          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70">
              UPI / QR
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70">
              NetBanking
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70">
              Cards
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
