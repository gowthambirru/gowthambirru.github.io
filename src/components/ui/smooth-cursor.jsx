import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { X, Play, Pause } from "@phosphor-icons/react";
import { RazorSymbol } from "../symbols/NleSymbols";

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";

function isTrackablePointer(pointerType) {
  return pointerType !== "touch";
}

export function SmoothCursor() {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState("default"); // "default" | "play" | "scrub" | "action" | "close" | "video-toggle"

  // Fast, instant spring physics - zero lag
  const springConfig = {
    damping: 24,
    stiffness: 950,
    mass: 0.12,
    restDelta: 0.001,
  };

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    damping: 30,
    stiffness: 700,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) setIsVisible(false);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const updateVelocity = (currentPos) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const handlePointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) return;

      setIsVisible(true);
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      // Instant spring tracking
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      // Check context hover targets
      const target = e.target.closest('[data-cursor], .gallery-card, .timeline-scrubber, button, a');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'close') {
          setCursorMode('close');
        } else if (cursorType === 'pause') {
          setCursorMode('pause');
        } else if (cursorType === 'video-toggle') {
          setCursorMode('video-toggle');
        } else if (cursorType === 'play' || target.closest('.gallery-card')) {
          setCursorMode('play');
        } else if (cursorType === 'scrub' || target.closest('.timeline-scrubber')) {
          setCursorMode('scrub');
        } else {
          setCursorMode('action');
        }
      } else {
        setCursorMode('default');
      }

      // Smooth angle interpolation without changing cursor scale/size
      if (speed > 0.08) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;
      }
    };

    // When mouse leaves the window or enters cross-origin iframe, hide smoothly so it never freezes
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, rotation, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: cursorMode === 'default' ? rotation : 0,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      {cursorMode === 'close' ? (
        // Close Popup Cross Badge
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-geom font-black text-[11px] tracking-wider uppercase shadow-[0_4px_20px_rgba(255,255,255,0.4)]">
          <X className="w-3.5 h-3.5 stroke-[3]" />
          <span>CLOSE</span>
        </div>
      ) : cursorMode === 'pause' ? (
        // Pause Badge
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-black font-geom font-black text-[11px] tracking-wider uppercase shadow-[0_4px_20px_rgba(56,189,248,0.5)]">
          <span>PAUSE</span>
          <Pause className="w-3 h-3 fill-current" />
        </div>
      ) : cursorMode === 'video-toggle' ? (
        // Play / Pause Video Badge
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-black font-geom font-black text-[11px] tracking-wider uppercase shadow-[0_4px_20px_rgba(56,189,248,0.5)]">
          <Play className="w-3 h-3 fill-current" />
          <span>/</span>
          <Pause className="w-3 h-3 fill-current" />
        </div>
      ) : cursorMode === 'play' ? (
        // Playback Cut Badge
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-black font-geom font-black text-[11px] tracking-wider uppercase shadow-[0_4px_20px_rgba(56,189,248,0.5)]">
          <span>PLAY</span>
          <span className="text-[10px]">▶</span>
        </div>
      ) : cursorMode === 'scrub' ? (
        // Razor / Playhead Scrub Tool
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/90 border border-accent text-accent font-geom font-black text-[10px] tracking-wider uppercase shadow-[0_4px_20px_rgba(56,189,248,0.4)]">
          <RazorSymbol className="w-3.5 h-3.5 text-accent" />
          <span>SLICE</span>
        </div>
      ) : cursorMode === 'action' ? (
        // Magnetic Action Ring
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-full border-2 border-accent/80 bg-accent/10 backdrop-blur-xs flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        </div>
      ) : (
        // Default Fast Aerodynamic Needle (Fixed size, no sluggish scaling)
        <div className="relative flex items-center justify-center drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={36}
            viewBox="0 0 50 54"
            fill="none"
          >
            <path
              d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
              fill="#050505"
              stroke="#38BDF8"
              strokeWidth={3}
            />
            <circle cx="25.5" cy="24" r="3.5" fill="#38BDF8" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export default SmoothCursor;
