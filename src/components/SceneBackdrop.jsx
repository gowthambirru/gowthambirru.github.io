import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SceneBackdrop() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Use Motion's scroll tracking instead of window.addEventListener('scroll')
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const node = ref.current;
    if (!node) return;
    const progress = Math.min(1, value * (document.documentElement.scrollHeight / window.innerHeight));
    node.style.setProperty('--scene-y', `${reduced ? 0 : -progress * 40}px`);
    node.style.setProperty('--scene-opacity', String(0.62 - progress * 0.4));
    node.style.setProperty('--petal-play', progress > 0.95 || reduced ? 'paused' : 'running');
  });

  return (
    <div ref={ref} className="scene-backdrop" aria-hidden="true">
      <img src={`${import.meta.env.BASE_URL}images/oregairu_bg.jpg`} alt="" />
      <div className="scene-shade" />
      <div className="scene-petals">
        {Array.from({ length: 10 }, (_, index) => (
          <i
            key={index}
            style={{
              '--petal-index': index,
              left: `${index * 11}%`,
              animationDelay: `${index * -2.7}s`,
              animationDuration: `${18 + index % 4 * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="scene-scanlines" />
    </div>
  );
}
