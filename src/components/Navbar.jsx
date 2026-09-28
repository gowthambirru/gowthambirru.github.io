import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import AmbientAudio from './AmbientAudio';

export default function Navbar({ suspended }) {
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Track scroll position with Motion instead of window scroll listener
  useMotionValueEvent(scrollY, 'change', value => {
    setScrolled(value > 40);
  });

  return (
    <motion.header
      className="site-header"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      style={{
        borderBottomColor: scrolled ? 'rgba(178,203,225,0.12)' : 'rgba(178,203,225,0.05)',
      }}
    >
      <a className="brand" href="#hero" aria-label="Gowtham - back to top">
        <img src={`${import.meta.env.BASE_URL}favicon.jpg`} alt="" width="34" height="34" />
        <span>GOWTHAM<span className="brand-sub">VIDEO EDITOR</span></span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        {[
          { href: '#work', label: 'WORK', num: '01' },
          { href: '#skills', label: 'SKILLS', num: '02' },
          { href: '#contact', label: 'CONTACT', num: '03' },
        ].map(item => (
          <motion.a
            key={item.href}
            href={item.href}
            whileHover={reduced ? {} : { y: -1, color: '#38bdf8' }}
            transition={{ duration: 0.2 }}
          >
            {item.label} <span>{item.num}</span>
          </motion.a>
        ))}
      </nav>
      <AmbientAudio suspended={suspended} />
    </motion.header>
  );
}
