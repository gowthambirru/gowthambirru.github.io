import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePointerFine } from '../hooks/usePointerFine';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const isFinePointer = usePointerFine();
  const reducedMotion = useReducedMotion();
  const cursorRef = useRef(null);
  const rotaterRef = useRef(null);
  const [cursorState, setCursorState] = useState({ text: '', isHovering: false, isScrub: false });

  useEffect(() => {
    if (!isFinePointer || reducedMotion || !cursorRef.current || !rotaterRef.current) return;

    const cursor = cursorRef.current;
    const rotater = rotaterRef.current;

    // GSAP quickTo for buttery smooth linear-interpolated movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3.out" });

    let prevX = 0;
    let prevY = 0;
    let currentAngle = 0;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      xTo(x);
      yTo(y);

      // Compute velocity & rotation angle
      const dx = x - prevX;
      const dy = y - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        // Smooth angle interpolation
        currentAngle += (targetAngle - currentAngle) * 0.25;
        gsap.to(rotater, {
          rotation: currentAngle,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      prevX = x;
      prevY = y;

      // Check hover targets
      const target = e.target.closest('[data-cursor], button, a, .gallery-card, .timeline-scrubber');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'play' || target.closest('.gallery-card')) {
          setCursorState({ text: 'PLAY', isHovering: true, isScrub: false });
        } else if (cursorType === 'scrub' || target.closest('.timeline-scrubber')) {
          setCursorState({ text: 'SCRUB', isHovering: true, isScrub: true });
        } else {
          setCursorState({ text: '', isHovering: true, isScrub: false });
        }
      } else {
        setCursorState({ text: '', isHovering: false, isScrub: false });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFinePointer, reducedMotion]);

  if (!isFinePointer || reducedMotion) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      aria-hidden="true"
    >
      <div 
        ref={rotaterRef}
        className="transition-transform duration-75 flex items-center justify-center will-change-transform"
      >
        {cursorState.isHovering ? (
          <div className="relative flex items-center justify-center">
            {/* Expanded glow ring */}
            <div className={`rounded-full transition-all duration-300 flex items-center justify-center ${
              cursorState.isScrub
                ? 'w-14 h-14 bg-sky-500/20 border border-accent backdrop-blur-sm'
                : 'w-16 h-16 bg-white/10 border border-white/30 backdrop-blur-sm'
            }`}>
              {cursorState.text ? (
                <span className="font-geom text-[10px] font-extrabold text-white tracking-widest uppercase">
                  {cursorState.text}
                </span>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              )}
            </div>
            
            {/* Precision directional guide ticks */}
            <div className="absolute -top-1 w-[2px] h-2 bg-accent" />
            <div className="absolute -bottom-1 w-[2px] h-2 bg-accent" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Aerodynamic rotatable directional needle */}
            <svg 
              className="w-6 h-6 text-accent drop-shadow-[0_2px_8px_rgba(56,189,248,0.5)]" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <polygon points="12,2 22,20 12,16 2,20" />
            </svg>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        )}
      </div>
    </div>
  );
}
