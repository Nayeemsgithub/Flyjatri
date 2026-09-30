import React from 'react';

export default function FlyJatriLogo({ variant = 'red', showSubtext = true, className = '' }) {
  const isRed = variant === 'red';
  const primaryColor = isRed ? '#E11D48' : '#FFFFFF';
  const subtextColor = isRed ? '#334155' : '#CBD5E1';

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-1">
        
        {/* Exact Vector Aerodynamic Wing / Ribbon Mark from uploaded logo */}
        <svg
          className="h-6 sm:h-7 w-auto flex-shrink-0"
          viewBox="0 0 120 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wing Ribbon Contour */}
          <path
            d="M5 24C12 24 16 18 24 18C34 18 38 28 42 34C40 34 32 32 26 27C20 22 14 26 5 24Z"
            fill={primaryColor}
          />
          {/* Aerodynamic Wing Tip */}
          <path
            d="M3 24L18 19L23 23L12 27L3 24Z"
            fill={primaryColor}
          />
        </svg>

        {/* Exact Stylized Wordmark FLYJATRI */}
        <div className="flex items-center tracking-tighter italic font-black text-2xl sm:text-[28px] leading-none -ml-1">
          <span style={{ color: primaryColor }} className="font-extrabold transform -skew-x-12">
            FLY
          </span>
          <span style={{ color: primaryColor }} className="font-black transform -skew-x-12 ml-0.5 tracking-tight">
            JATRI
          </span>
        </div>

      </div>

      {/* Subtext: YOUR TRIP OUR ASSISTANCE */}
      {showSubtext && (
        <span 
          style={{ color: subtextColor }}
          className="text-[7.5px] sm:text-[8px] font-black tracking-[0.22em] uppercase -mt-0.5 pl-1"
        >
          YOUR TRIP OUR ASSISTANCE
        </span>
      )}
    </div>
  );
}
