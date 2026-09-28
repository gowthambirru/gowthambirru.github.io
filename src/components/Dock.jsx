import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useMotionValue, motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SECTIONS = [
  { id: 'hero', name: 'INTRO', number: '00' },
  { id: 'work', name: 'WORK', number: '01' },
  { id: 'skills', name: 'SKILLS', number: '02' },
  { id: 'contact', name: 'CONTACT', number: '03' },
];

export default function Dock() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const percentRef = useRef(null);
  const scrubberRef = useRef(null);
  const dockRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Drive progress display and scrubber WITHOUT React state (zero re-renders)
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const percent = Math.round(value * 100);

    // Update text directly on the DOM node — no setState
    if (percentRef.current) percentRef.current.textContent = `${String(percent).padStart(2, '0')}%`;
    if (scrubberRef.current) {
      scrubberRef.current.value = percent;
      scrubberRef.current.style.setProperty('--progress', `${percent}%`);
    }

    // Show/hide dock
    const shouldShow = value > 0.03;
    if (shouldShow !== visible) setVisible(shouldShow);

    // Detect active section (cheap DOM reads, batched in rAF by Motion)
    let current = 'hero';
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        current = section.id;
      }
    }
    if (current !== active) setActive(current);
  });

  return (
    <nav
      ref={dockRef}
      className={`sequence-dock ${visible ? '' : 'dock-hidden'}`}
      aria-label="Page sequence"
    >
      <span className="dock-label">SEQUENCE / 01</span>
      <div className="dock-sections">
        {SECTIONS.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'location' : undefined}
          >
            <span>{section.number}</span>{section.name}
          </a>
        ))}
      </div>
      <span className="dock-percent" ref={percentRef}>00%</span>
      <input
        ref={scrubberRef}
        type="range"
        className="page-scrubber"
        min="0"
        max="100"
        step="0.1"
        defaultValue="0"
        aria-label="Page progress"
        style={{ '--progress': '0%' }}
        onChange={e => {
          window.scrollTo({
            top: Number(e.target.value) / 100 * (document.documentElement.scrollHeight - window.innerHeight),
            behavior: 'instant',
          });
        }}
      />
    </nav>
  );
}
