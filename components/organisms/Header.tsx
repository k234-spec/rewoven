'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import SearchBar from '@/components/molecules/SearchBar';
import MobileDrawer from '@/components/molecules/MobileDrawer';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useCartStore } from '@/lib/store/useCartStore';

interface HeaderProps {
  cartItemCount?: number;
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

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openCart, items } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : cartItemCount;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Flat Desktop Navigation (No mega-menu) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.16em] font-semibold text-noir hover:text-noir/60 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] font-semibold text-noir hover:text-noir/60 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Action Icons (Search, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              className="p-2 text-noir hover:text-noir/60 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Shopping Bag Icon with Count Badge (Opens Cart Drawer) */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping Bag with ${totalItems} items`}
              className="relative p-2 text-noir hover:text-noir/60 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 ? (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-emerald rounded-full leading-none animate-in zoom-in duration-200">
                  {totalItems}
                </span>
              ) : (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-noir rounded-full leading-none">
                  0
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 text-noir hover:text-noir/60 transition-colors lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Slide-in Drawer: conditionally rendered when open */}
      {isDrawerOpen && (
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      )}
    </header>
  );
}
