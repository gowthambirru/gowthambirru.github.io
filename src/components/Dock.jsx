import React, { useEffect, useState } from 'react';

const SECTIONS = [{ id: 'hero', name: 'INTRO', number: '00' }, { id: 'work', name: 'WORK', number: '01' }, { id: 'skills', name: 'SKILLS', number: '02' }, { id: 'contact', name: 'CONTACT', number: '03' }];
export default function Dock() {
  const [position, setPosition] = useState({ progress: 0, active: 'hero' });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0;
        const active = SECTIONS.reduce((current, section) => document.getElementById(section.id)?.getBoundingClientRect().top <= window.innerHeight * 0.45 ? section.id : current, 'hero');
        setPosition({ progress, active });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', measure); window.removeEventListener('resize', measure); };
  }, []);
  return <nav className="sequence-dock" aria-label="Page sequence">
    <span className="dock-label">SEQUENCE / 01</span>
    <div className="dock-sections">{SECTIONS.map(section => <a key={section.id} href={`#${section.id}`} aria-current={position.active === section.id ? 'location' : undefined}><span>{section.number}</span>{section.name}</a>)}</div>
    <span className="dock-percent">{String(Math.round(position.progress)).padStart(2, '0')}%</span>
    <input type="range" className="page-scrubber" min="0" max="100" step="0.1" value={position.progress} aria-label="Page progress" aria-valuetext={`${Math.round(position.progress)} percent`}
      style={{ '--progress': `${position.progress}%` }} onChange={e => window.scrollTo({ top: Number(e.target.value) / 100 * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' })} />
  </nav>;
}
