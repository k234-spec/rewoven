'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import { SOCIAL_LINKS } from '@/lib/constants';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Our Story', href: '/about' },
  {
    label: 'For Wholesale',
    href: SOCIAL_LINKS.whatsapp,
    external: true,
  },
  { label: 'For Creators', href: '/creators' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Conditional rendering: do not render anything to DOM if closed or before hydration
  if (!isOpen || !mounted) {
    return null;
  }

  // Render via portal to document.body to ensure it cleanly covers full viewport
  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Semi-transparent black backdrop overlay (click to close) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-noir/70 backdrop-blur-sm z-[100] transition-opacity duration-300"
      />

      {/* Slide-in drawer panel: solid white background, 100dvh, 85% width */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        style={{ backgroundColor: '#ffffff' }}
        className="fixed top-0 right-0 z-[101] h-[100dvh] w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col justify-between border-l border-hairline transition-transform duration-300 ease-out overflow-hidden"
      >
        {/* Drawer Header with Logo & Close (X) button */}
        <div className="flex items-center justify-between p-6 border-b border-hairline bg-white">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-noir hover:text-noir/70 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 bg-white">
          <ul className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-between py-4 text-base font-medium tracking-wider uppercase text-noir hover:text-gold transition-colors border-b border-hairline/60"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-noir/40">↗</span>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 text-base font-medium tracking-wider uppercase text-noir hover:text-gold transition-colors border-b border-hairline/60"
                  >
                    <span>{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer / Support Info */}
        <div className="p-6 bg-ivory border-t border-hairline space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-noir/50 mb-1">
              WhatsApp Support
            </p>
            <a
              href={`tel:${SOCIAL_LINKS.phoneRaw}`}
              className="text-sm font-semibold text-noir hover:text-noir/80 block"
            >
              {SOCIAL_LINKS.phone}
            </a>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-noir hover:text-emerald transition-colors"
            >
              <span>WhatsApp</span>
              <span>↗</span>
            </a>
            <span className="text-hairline">•</span>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-noir hover:text-pink-accent transition-colors"
            >
              <span>Instagram</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
