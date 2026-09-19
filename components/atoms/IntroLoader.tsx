'use client';

import { useState, useEffect } from 'react';

const INTRO_SESSION_KEY = 'madamcutie_intro_shown';

/**
 * MM-Inspired Couture-House Intro Loading Animation:
 * 1. Shows once per session (checks & sets sessionStorage).
 * 2. Displays the signature MC monogram logo appearing from the center and growing in size.
 * 3. Restrained "Madamcutie" wordmark in Playfair Display (600 weight, 0.5px kerning) + 1px gold rule.
 * 4. Average duration: ~2 seconds total, then smoothly fades out (350ms) and unmounts from DOM.
 * 5. Respects prefers-reduced-motion (skips scale-growth, static display, then dismisses).
 * 6. Zero blocking — page content loads and paints in parallel behind it.
 */
export default function IntroLoader() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Only run in browser client
    if (typeof window === 'undefined') return;

    // 2. Query param override for instant local preview (?intro=1)
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get('intro') === '1';

    if (!forceIntro) {
      try {
        const hasShown = sessionStorage.getItem(INTRO_SESSION_KEY);
        if (hasShown) {
          // Already shown this browser session; do not render on route changes
          return;
        }
        sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
      } catch {
        // Fallback for restricted storage environments
        return;
      }
    }

    // First visit in session — mount the intro overlay
    setShouldRender(true);

    // 3. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Reduced motion: static display for 1.4s, fade out over 300ms, unmount at 1.7s
      const fadeTimer = setTimeout(() => setIsFadingOut(true), 1400);
      const unmountTimer = setTimeout(() => setShouldRender(false), 1700);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
      };
    }

    // 4. Standard 2-Second Couture Animation Choreography:
    // - 0ms -> 1400ms: MC Monogram appears from center, smoothly growing in size (scale 0.6 -> 1.06)
    // - 400ms -> 1000ms: Wordmark and 1px gold rule glide in below
    // - 1400ms -> 1650ms: Lingers at full scale
    // - 1650ms -> 2000ms: Smooth fade-out (350ms, pointer-events: none)
    // - 2000ms: Completely unmounts from DOM
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1650);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // When unmounted, remove completely from DOM so accessibility & interactions are unobstructed
  if (!shouldRender) {
    return null;
  }

  return (
    <aside
      role="status"
      aria-label="Madamcutie Loading"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-noir transition-opacity duration-350 ease-out select-none ${
        isFadingOut
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="flex flex-col items-center justify-center px-4 text-center">
        {/* MC Monogram Logo appearing from center and growing in size */}
        <div className="intro-mc-monogram relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
          <img
            src="/images/brand/mc-monogram-clean.webp"
            alt="Madamcutie Monogram Crest"
            width={192}
            height={192}
            fetchPriority="high"
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            onError={(e) => {
              // Fallback to original crest jpg if clean webp not yet loaded
              e.currentTarget.src = '/images/brand/mc-crest.jpg';
            }}
          />
        </div>

        {/* Wordmark in Playfair Display (600 weight, 0.5px letter-spacing) */}
        <div className="intro-mc-wordmark mt-4 flex flex-col items-center justify-center">
          <h1
            style={{ letterSpacing: '0.5px' }}
            className="font-display font-semibold text-white text-2xl sm:text-3xl md:text-4xl leading-none m-0"
          >
            Madamcutie
          </h1>

          {/* Thin 1px gold rule drawn directly below wordmark */}
          <div className="w-12 sm:w-16 h-[1px] mt-2.5 mx-auto overflow-hidden relative">
            <div className="intro-mc-line h-full bg-gold" />
          </div>
        </div>
      </div>
    </aside>
  );
}
