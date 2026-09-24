import React from 'react';

/**
 * 8 Bespoke NLE / Motion Design SVG Symbols + Brand Outlines
 * Designed specifically for Gowtham's editing portfolio.
 */

export function DiscordOutlineSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="M18.89 4.67a16.32 16.32 0 0 0-4.08-1.27.08.08 0 0 0-.08.04c-.18.32-.38.74-.52 1.07a15.08 15.08 0 0 0-4.42 0c-.14-.33-.35-.75-.53-1.07a.08.08 0 0 0-.08-.04 16.4 16.4 0 0 0-4.08 1.27.07.07 0 0 0-.03.03C2.47 8.65 1.77 12.51 2.12 16.32a.08.08 0 0 0 .03.06 16.42 16.42 0 0 0 4.96 2.51.08.08 0 0 0 .09-.03c.38-.52.72-1.07 1.01-1.66a.08.08 0 0 0-.04-.11 10.74 10.74 0 0 1-1.55-.74.08.08 0 0 1-.01-.13c.1-.08.2-.16.31-.24a.08.08 0 0 1 .08-.01c3.26 1.49 6.78 1.49 10 0a.08.08 0 0 1 .09.01c.1.08.2.16.31.25a.08.08 0 0 1 0 .13 10.3 10.3 0 0 1-1.56.74.08.08 0 0 0-.04.11c.3.59.64 1.14 1.02 1.66a.08.08 0 0 0 .09.03 16.35 16.35 0 0 0 4.97-2.51.08.08 0 0 0 .03-.06c.43-4.42-.74-8.25-3.08-11.62a.06.06 0 0 0-.03-.03z" />
      <circle cx="8.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RazorSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Razor blade outer profile */}
      <rect x="3" y="6" width="18" height="12" rx="2" />
      {/* Center lock slot */}
      <circle cx="12" cy="12" r="2" />
      <line x1="8" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="16" y2="12" />
      {/* Blade side notches */}
      <path d="M3 11 L5 12 L3 13" />
      <path d="M21 11 L19 12 L21 13" />
    </svg>
  );
}

export function SpliceSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Clip left */}
      <path d="M2 5 H9 V19 H2 Z" />
      {/* Clip right */}
      <path d="M15 5 H22 V19 H15 Z" />
      {/* Center splice cut gap with lightning spark */}
      <path d="M13 3 L10 12 L14 13 L11 21" stroke="#38BDF8" strokeWidth="2.2" />
    </svg>
  );
}

export function PlayheadSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Triangular Playhead Needle Head */}
      <polygon points="12,2 18,9 14,9 14,22 10,22 10,9 6,9" fill="currentColor" fillOpacity="0.2" />
      <line x1="12" y1="9" x2="12" y2="22" stroke="#38BDF8" strokeWidth="2.5" />
      <circle cx="12" cy="6" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

export function V1TrackSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Video Track Outer Strip */}
      <rect x="2" y="5" width="20" height="14" rx="2" />
      {/* Frame separator lines */}
      <line x1="8" y1="5" x2="8" y2="19" />
      <line x1="16" y1="5" x2="16" y2="19" />
      {/* V1 typography / symbol */}
      <path d="M4 9 L5.5 14 L7 9" stroke="#38BDF8" strokeWidth="2" />
    </svg>
  );
}

export function A1TrackSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Audio Waveform Track Bars */}
      <line x1="3" y1="12" x2="3" y2="12.01" />
      <line x1="6" y1="8" x2="6" y2="16" />
      <line x1="9" y1="5" x2="9" y2="19" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <line x1="15" y1="3" x2="15" y2="21" stroke="#38BDF8" />
      <line x1="18" y1="7" x2="18" y2="17" />
      <line x1="21" y1="11" x2="21" y2="13" />
    </svg>
  );
}

export function FrameSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* 4 Framing Crop Corners */}
      <path d="M4 9 V5 H8" />
      <path d="M16 5 H20 V9" />
      <path d="M20 15 V19 H16" />
      <path d="M8 19 H4 V15" />
      {/* Center crosshair */}
      <circle cx="12" cy="12" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

export function SpeedRampSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Axes */}
      <line x1="3" y1="20" x2="21" y2="20" />
      {/* S-curve Velocity Bézier */}
      <path d="M4 18 C 9 18, 11 6, 17 6 H 21" stroke="#38BDF8" strokeWidth="2.4" />
      {/* Keyframe handle diamonds */}
      <polygon points="10,12 12,10 14,12 12,14" fill="#38BDF8" />
    </svg>
  );
}

export function TheaterSymbol({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Anamorphic theater monitor screen */}
      <rect x="2" y="4" width="20" height="13" rx="2" />
      {/* Aperture light rays */}
      <line x1="7" y1="20" x2="17" y2="20" strokeWidth="2" />
      <line x1="12" y1="17" x2="12" y2="20" strokeWidth="2" />
      <polygon points="10,8 15,10.5 10,13" fill="#38BDF8" stroke="#38BDF8" />
    </svg>
  );
}
