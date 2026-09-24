import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../animation/reducedMotion';

export default function ColdOpen({ onComplete }) {
  const [booted, setBooted] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [status, setStatus] = useState("INITIALIZING TIMELINE BUFFER");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const shutterTopRef = useRef(null);
  const shutterBottomRef = useRef(null);
  const hudRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setBooted(true);
      if (onComplete) onComplete();
      return;
    }

    let frame = 0;
    const totalFrames = 48;
    const intervalTime = 32;

    const tickInterval = setInterval(() => {
      frame += 1;
      const ff = (frame % 24).toString().padStart(2, '0');
      const ss = Math.floor(frame / 24).toString().padStart(2, '0');
      setTimecode(`00:00:${ss}:${ff}`);
      
      const pct = Math.min(100, Math.round((frame / totalFrames) * 100));
      setProgress(pct);

      if (pct > 25 && pct <= 65) {
        setStatus("LOADING AUDIO TRANSITIONS // 48kHz");
      } else if (pct > 65) {
        setStatus("TIMELINE READY // 60.000 FPS");
      }

      if (frame >= totalFrames) {
        clearInterval(tickInterval);
        startExitAnimation();
      }
    }, intervalTime);

    const startExitAnimation = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setBooted(true);
            if (onComplete) onComplete();
          }
        });

        tl.to(hudRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          ease: "power2.in"
        });

        tl.to(shutterTopRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.45,
          ease: "power4.inOut"
        }, "-=0.05");

        tl.to(shutterBottomRef.current, {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.45,
          ease: "power4.inOut"
        }, "<");
      }, containerRef);
    };

    const handleSkip = () => {
      clearInterval(tickInterval);
      startExitAnimation();
    };

    window.addEventListener('keydown', handleSkip, { once: true });

    return () => {
      clearInterval(tickInterval);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete]);

  if (booted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Top Shutter Half */}
      <div 
        ref={shutterTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b border-surface-border will-change-transform"
      />

      {/* Bottom Shutter Half */}
      <div 
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t border-surface-border will-change-transform"
      />

      {/* Center Cinematic Broadcast HUD (No Mono Font) */}
      <div 
        ref={hudRef}
        className="relative z-10 flex flex-col items-center justify-center space-y-4 px-6 text-center will-change-transform"
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-geom tracking-widest text-slate-300">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-extrabold uppercase">GOWTHAM // NLE SYSTEM SEQUENCE</span>
        </div>

        {/* Large Counter with Jersey 10 */}
        <div className="font-jersey text-6xl sm:text-7xl md:text-8xl text-white tracking-widest tabular-nums">
          {timecode}
        </div>

        {/* Loading Progress Bar */}
        <div className="w-56 sm:w-72 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <div 
            style={{ width: `${progress}%` }} 
            className="h-full bg-accent transition-all duration-75"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-geom text-slate-400 font-semibold tracking-wide">
          <span className="text-accent">{status}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500 uppercase">PRESS ANY KEY TO SKIP</span>
        </div>
      </div>
    </div>
  );
}
