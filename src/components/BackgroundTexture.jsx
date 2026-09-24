import React from 'react';

export default function BackgroundTexture() {
  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 2px,
          #000000 2px,
          #000000 4px
        )`
      }}
    />
  );
}
