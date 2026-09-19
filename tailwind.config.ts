import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Override default Tailwind colors completely (no default slate/gray/blue/red/etc.)
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      noir: 'var(--color-noir)',
      ivory: 'var(--color-ivory)',
      gold: 'var(--color-gold)', // ACCENT ONLY: logo, divider, CTA hover. No gold-bg utility.
      'pink-accent': 'var(--color-pink-accent)', // Sale badge text + active wishlist icon ONLY.
      emerald: 'var(--color-emerald)', // In-stock, free shipping, "Added to bag" success state.
      hairline: 'var(--color-hairline)', // Structural borders and dividers.
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        body: ['var(--font-body)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        hero: ['var(--font-size-hero)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['var(--font-size-h1)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h2: ['var(--font-size-h2)', { lineHeight: '1.25' }],
        h3: ['var(--font-size-h3)', { lineHeight: '1.3' }],
      },
      spacing: {
        'section-xl': 'var(--section-gap-xl)',
      },
    },
  },
  plugins: [],
};

export default config;
