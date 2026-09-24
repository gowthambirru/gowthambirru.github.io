import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SceneBackdrop() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / window.innerHeight);
        node.style.setProperty('--scene-y', `${reduced ? 0 : -progress * 40}px`);
        node.style.setProperty('--scene-opacity', String(0.62 - progress * 0.4));
        node.style.setProperty('--petal-play', progress > 0.95 || reduced ? 'paused' : 'running');
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, [reduced]);
  return <div ref={ref} className="scene-backdrop" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}images/oregairu_bg.jpg`} alt="" /><div className="scene-shade" /><div className="scene-petals">{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ '--petal-index': index, left: `${index * 11}%`, animationDelay: `${index * -2.7}s`, animationDuration: `${18 + index % 4 * 3}s` }} />)}</div><div className="scene-scanlines" /></div>;
}
