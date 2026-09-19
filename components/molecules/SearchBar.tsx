'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Focus input when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  return (
    <div
      role="search"
      className="absolute top-full left-0 w-full bg-white border-b border-hairline shadow-lg py-5 px-4 transition-all duration-200 z-40"
    >
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search handcrafted corsets, bridal lehengas, silk blouses..."
              className="w-full pl-11 pr-4 py-3 text-sm text-noir placeholder:text-noir/40 bg-ivory/50 border border-hairline focus:border-noir focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-noir text-white text-xs font-semibold uppercase tracking-wider hover:bg-noir/90 transition-colors shrink-0"
          >
            Search
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-3 text-noir/60 hover:text-noir transition-colors shrink-0"
            aria-label="Close search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
