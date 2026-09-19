import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showRule?: boolean;
}

/**
 * MM-inspired restrained wordmark for Madamcutie:
 * 1. Pure text wordmark: "Madamcutie" in Playfair Display, weight 600, letter-spacing 0.5px.
 * 2. Solid color: solid --color-noir (#111111) on light, solid white on dark/footer. NO gradient clip-text.
 * 3. A single thin horizontal rule (1px, --color-gold-base, 40px wide) centered directly below the wordmark.
 * 4. No tagline in header context.
 * 5. Styled vector typography — scalable, ultra-crisp at all screen sizes.
 */
export default function Logo({
  className = '',
  size = 'md',
  variant = 'light',
  showRule = true,
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-[26px] md:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-[34px]',
  };

  const textColor = variant === 'dark' ? 'text-white' : 'text-noir';

  return (
    <Link
      href="/"
      className={`group inline-flex flex-col items-center justify-center text-center select-none ${className}`}
      aria-label="Madamcutie Home"
    >
      <span
        style={{ letterSpacing: '0.5px' }}
        className={`font-display font-semibold ${textColor} leading-tight transition-opacity duration-200 group-hover:opacity-85 ${sizeClasses[size]}`}
      >
        Madamcutie
      </span>

      {showRule && (
        <span
          aria-hidden="true"
          className="block w-10 h-[1px] bg-gold mt-1 transition-all duration-300 group-hover:w-12"
        />
      )}
    </Link>
  );
}
