import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'brass';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light';
  const isBrass = variant === 'brass';

  const textColor = isLight ? '#FFFFFF' : isBrass ? '#D4AF37' : '#221713';
  const accentColor = isLight ? '#E5C07B' : isBrass ? '#E6C665' : '#8C5A3C';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon with 100 road motif and coffee cup */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Background rounded seal */}
        <circle cx="50" cy="50" r="47" stroke={textColor} strokeWidth="2.5" opacity={isLight ? 0.35 : 0.2} />
        <circle cx="50" cy="50" r="43" fill={isLight ? 'rgba(255,255,255,0.06)' : 'rgba(197, 155, 39, 0.08)'} />

        {/* 100 with highway road through zeros */}
        {/* The '1' */}
        <path
          d="M24 33 L30 30 L30 65 M24 65 L36 65"
          stroke={textColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Coffee steam/bean over 1 */}
        <ellipse cx="26" cy="24" rx="2" ry="3" fill={accentColor} transform="rotate(-15 26 24)" />

        {/* First '0' */}
        <ellipse cx="48" cy="48" rx="11" ry="17" stroke={textColor} strokeWidth="3" />
        {/* Second '0' */}
        <ellipse cx="70" cy="48" rx="11" ry="17" stroke={textColor} strokeWidth="3" />

        {/* Highway road cutting horizontally through the two zeroes */}
        <path
          d="M38 52 C48 50, 60 48, 80 47"
          stroke={accentColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M39 57 C50 56, 62 55, 81 54"
          stroke={textColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Road dashes */}
        <line x1="47" y1="54" x2="52" y2="53.5" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="58" y1="53" x2="63" y2="52.5" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="69" y1="52" x2="74" y2="51.5" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />

        {/* Mini coffee cup & croissant glyphs at bottom */}
        <path
          d="M40 76 Q44 83 49 83 Q54 83 58 76 Z"
          fill={accentColor}
          opacity="0.8"
        />
        <path
          d="M58 78 Q62 78 62 80 Q62 82 58 82"
          stroke={accentColor}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5 font-serif text-lg tracking-wider font-bold">
          <span style={{ color: textColor }}>100 MILES</span>
        </div>
        {showSubtitle && (
          <div className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: accentColor }}>
            KAFFI & BAKES
          </div>
        )}
      </div>
    </div>
  );
};
