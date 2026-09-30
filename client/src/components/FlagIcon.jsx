import React from 'react';

/**
 * High-definition Vector Flag Icons for all supported countries.
 * Guaranteed to render visual graphic flags on Windows/macOS/Linux/Android/iOS without emoji font dependencies.
 */
export default function FlagIcon({ countryCode = 'BD', className = 'w-5 h-3.5' }) {
  const code = (countryCode || 'BD').toUpperCase();

  switch (code) {
    case 'BD':
      // Bangladesh Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#006A4E" />
          <circle cx="9" cy="6" r="4" fill="#F42A41" />
        </svg>
      );

    case 'MY':
      // Malaysia Flag
      return (
        <svg viewBox="0 0 28 14" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          {/* 14 Red/White stripes */}
          <rect width="28" height="14" fill="#CC0001" />
          <rect y="1" width="28" height="1" fill="#FFFFFF" />
          <rect y="3" width="28" height="1" fill="#FFFFFF" />
          <rect y="5" width="28" height="1" fill="#FFFFFF" />
          <rect y="7" width="28" height="1" fill="#FFFFFF" />
          <rect y="9" width="28" height="1" fill="#FFFFFF" />
          <rect y="11" width="28" height="1" fill="#FFFFFF" />
          <rect y="13" width="28" height="1" fill="#FFFFFF" />
          {/* Blue Canton */}
          <rect width="14" height="8" fill="#010066" />
          {/* Yellow Crescent & Star */}
          <circle cx="6.5" cy="4" r="2.8" fill="#FFCC00" />
          <circle cx="7.2" cy="4" r="2.4" fill="#010066" />
          <polygon points="10,4 8.5,4.7 9,3.2 7.8,2.2 9.3,2.2 9.8,0.8 10.3,2.2 11.8,2.2 10.6,3.2 11.1,4.7" fill="#FFCC00" />
        </svg>
      );

    case 'US':
      // United States Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#B22234" />
          <rect y="0.92" width="20" height="0.92" fill="#FFFFFF" />
          <rect y="2.76" width="20" height="0.92" fill="#FFFFFF" />
          <rect y="4.6" width="20" height="0.92" fill="#FFFFFF" />
          <rect y="6.44" width="20" height="0.92" fill="#FFFFFF" />
          <rect y="8.28" width="20" height="0.92" fill="#FFFFFF" />
          <rect y="10.12" width="20" height="0.92" fill="#FFFFFF" />
          <rect width="8" height="6.44" fill="#3C3B6E" />
          {/* Stars representation */}
          <circle cx="2" cy="1.6" r="0.4" fill="#FFF" />
          <circle cx="4" cy="1.6" r="0.4" fill="#FFF" />
          <circle cx="6" cy="1.6" r="0.4" fill="#FFF" />
          <circle cx="3" cy="3.2" r="0.4" fill="#FFF" />
          <circle cx="5" cy="3.2" r="0.4" fill="#FFF" />
          <circle cx="2" cy="4.8" r="0.4" fill="#FFF" />
          <circle cx="4" cy="4.8" r="0.4" fill="#FFF" />
          <circle cx="6" cy="4.8" r="0.4" fill="#FFF" />
        </svg>
      );

    case 'AE':
      // UAE Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="4" fill="#00732F" />
          <rect y="4" width="20" height="4" fill="#FFFFFF" />
          <rect y="8" width="20" height="4" fill="#000000" />
          <rect width="5" height="12" fill="#FF0000" />
        </svg>
      );

    case 'SA':
      // Saudi Arabia Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#006C35" />
          {/* Sword symbol */}
          <rect x="5" y="7" width="10" height="0.9" rx="0.4" fill="#FFFFFF" />
          <rect x="13" y="6" width="1" height="2.8" fill="#FFFFFF" />
          <rect x="6" y="4" width="8" height="1.2" rx="0.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'SG':
      // Singapore Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="6" fill="#ED2939" />
          <rect y="6" width="20" height="6" fill="#FFFFFF" />
          <circle cx="4" cy="3" r="2" fill="#FFFFFF" />
          <circle cx="4.6" cy="3" r="1.7" fill="#ED2939" />
        </svg>
      );

    case 'IN':
      // India Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="4" fill="#FF9933" />
          <rect y="4" width="20" height="4" fill="#FFFFFF" />
          <rect y="8" width="20" height="4" fill="#138808" />
          <circle cx="10" cy="6" r="1.5" fill="none" stroke="#000080" strokeWidth="0.5" />
          <circle cx="10" cy="6" r="0.4" fill="#000080" />
        </svg>
      );

    case 'EU':
      // European Union Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#003399" />
          <circle cx="10" cy="3" r="0.5" fill="#FFCC00" />
          <circle cx="10" cy="9" r="0.5" fill="#FFCC00" />
          <circle cx="7" cy="6" r="0.5" fill="#FFCC00" />
          <circle cx="13" cy="6" r="0.5" fill="#FFCC00" />
          <circle cx="7.9" cy="3.9" r="0.5" fill="#FFCC00" />
          <circle cx="12.1" cy="3.9" r="0.5" fill="#FFCC00" />
          <circle cx="7.9" cy="8.1" r="0.5" fill="#FFCC00" />
          <circle cx="12.1" cy="8.1" r="0.5" fill="#FFCC00" />
        </svg>
      );

    case 'GB':
    case 'UK':
      // United Kingdom (Union Jack) Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#012169" />
          <path d="M0,0 L20,12 M20,0 L0,12" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0,0 L20,12 M20,0 L0,12" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M10,0 V12 M0,6 H20" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M10,0 V12 M0,6 H20" stroke="#C8102E" strokeWidth="2.4" />
        </svg>
      );

    case 'TH':
      // Thailand Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="2" fill="#A51931" />
          <rect y="2" width="20" height="2" fill="#F4F5F8" />
          <rect y="4" width="20" height="4" fill="#2D2A4A" />
          <rect y="8" width="20" height="2" fill="#F4F5F8" />
          <rect y="10" width="20" height="2" fill="#A51931" />
        </svg>
      );

    case 'CA':
      // Canada Flag
      return (
        <svg viewBox="0 0 20 12" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] flex-shrink-0 ${className}`}>
          <rect width="20" height="12" fill="#FF0000" />
          <rect x="5" width="10" height="12" fill="#FFFFFF" />
          {/* Maple Leaf */}
          <polygon points="10,3 10.8,5.2 12.5,5 11.5,6.5 12.8,7.5 10.8,7.6 10.3,9.5 9.7,9.5 9.2,7.6 7.2,7.5 8.5,6.5 7.5,5 9.2,5.2" fill="#FF0000" />
        </svg>
      );

    default:
      return (
        <span className="text-xs font-bold text-slate-700">{code}</span>
      );
  }
}
