import React from 'react';

export default function FlyJatriLogo({ 
  variant = 'red', 
  showSubtext = true, 
  className = '', 
  height = 30 
}) {
  const isRed = variant === 'red';
  const logoSrc = isRed 
    ? '/flyjatri-logo-red-transparent.png' 
    : '/flyjatri-logo-white-transparent.png';
  const subtextColor = isRed ? '#1E293B' : '#E2E8F0';

  return (
    <div className={`inline-flex flex-col items-start justify-center select-none ${className}`}>
      {/* High-Resolution Exact Cloned Logo Artwork */}
      <img
        src={logoSrc}
        alt="FlyJatri"
        style={{ height: `${height}px` }}
        className="w-auto object-contain block select-none pointer-events-none"
        loading="eager"
      />

      {/* Subtext: YOUR TRIP OUR ASSISTANCE */}
      {showSubtext && (
        <span 
          style={{ 
            color: subtextColor,
            letterSpacing: '0.22em'
          }}
          className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-[0.22em] mt-0.5 whitespace-nowrap block"
        >
          YOUR TRIP OUR ASSISTANCE
        </span>
      )}
    </div>
  );
}
