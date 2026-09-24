import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Play } from '@phosphor-icons/react';
import gsap from 'gsap';
import { PROJECTS } from '../data/projects';
import { sequenceEase, sequenceTransition } from '../animation/sequence';
import { useReducedMotion } from '../hooks/useReducedMotion';
import PreviewMedia from './PreviewMedia';

const FORMATS = ['REELS.', 'PODCASTS.', 'PODCAST CLIPS.', 'SHORTS.', 'COMMENTARY.', 'STORIES.', 'THE INTERNET.'];
const CLIPS = [0, 1, 3];

export default function Hero({ onOpenModal }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const monitorRef = useRef(null);
  const progressRef = useRef(null);
  const project = PROJECTS[CLIPS[selected]];

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      if (!document.hidden && !document.querySelector('dialog[open]')) setWordIndex(index => (index + 1) % FORMATS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [reduced, wordIndex]);

  useEffect(() => {
    const node = monitorRef.current;
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const rotateX = gsap.quickTo(node, 'rotationX', { duration: 0.65, ease: 'power3.out' });
    const rotateY = gsap.quickTo(node, 'rotationY', { duration: 0.65, ease: 'power3.out' });
    const moveY = gsap.quickTo(node, 'y', { duration: 0.65, ease: 'power3.out' });
    const move = event => {
      const bounds = node.getBoundingClientRect();
      rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
      rotateX(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
      moveY(-5);
    };
    const reset = () => { rotateX(0); rotateY(0); moveY(0); };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', reset);
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset); gsap.killTweensOf(node); gsap.set(node, { clearProps: 'transform' }); };
  }, [reduced]);

  return <section id="hero" className="hero-section">
    <div className="hero-topline"><span className="status-dot" /> AVAILABLE FOR FREELANCE</div>
    <div className="hero-composition">
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...sequenceTransition, duration: 0.7 }}>
        <p className="eyebrow">FOR CREATORS. FOR AGENCIES. FOR YOUR NEXT VIDEO.</p>
        <h1><span className="hero-line">EDITING FOR</span><button type="button" className={`hero-word ${FORMATS[wordIndex].length > 11 ? 'long-word' : ''}`}
          aria-label={`Editing for ${FORMATS[wordIndex].toLowerCase()} Show next format`} onClick={() => setWordIndex(index => (index + 1) % FORMATS.length)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={wordIndex} initial={{ y: reduced ? 0 : '90%', opacity: 0, filter: reduced ? 'none' : 'blur(4px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: reduced ? 0 : '-90%', opacity: 0, filter: reduced ? 'none' : 'blur(4px)' }} transition={{ duration: reduced ? 0 : 0.32, ease: sequenceEase }}>{FORMATS[wordIndex]}</motion.span>
          </AnimatePresence><span className="pixel-stop" aria-hidden="true" />
        </button></h1>
        <p className="hero-description">Multiple years of experience editing Shorts, Reels, podcasts, podcast clips, commentary, and long-form videos with clean pacing, motion, and sound.</p>
        <p className="hero-outsourcing">Your footage. My timeline. One less thing on your plate.</p>
        <div className="hero-actions">
          <a className="action-button primary" href="#work">WATCH THE CUTS <ArrowDownRight size={21} /></a>
          <a className="text-action" href="#contact">LET'S WORK TOGETHER <ArrowUpRight size={21} /></a>
        </div>
        <div className="hero-format-note"><span className="status-dot" /> ONE-OFF EDITS & ONGOING WORK</div>
      </motion.div>
      <motion.div className="monitor-entrance" initial={reduced ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ ...sequenceTransition, duration: 0.8, delay: reduced ? 0 : 0.12 }}>
        <div ref={monitorRef} className="hero-monitor">
          <div className="monitor-top"><span><i /> ON MY TIMELINE</span><span>{project.categoryLabel}</span></div>
          <button className={`hero-screen ${project.aspectRatio === '9:16' ? 'portrait-preview' : ''}`} data-project-origin={`hero-${project.id}`}
            type="button" aria-label={`Watch ${project.title}`} onClick={event => onOpenModal(project, event.currentTarget)}>
            <AnimatePresence initial={false}>
              <motion.span className="hero-screen-layer" key={project.id} initial={{ opacity: 0, scale: reduced ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.4 }}>
                <PreviewMedia project={project} active eager onProgress={progress => { if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`; }} />
              </motion.span>
            </AnimatePresence>
            <span className="screen-corner top-left" /><span className="screen-corner bottom-right" />
            <span className="monitor-play"><Play weight="fill" size={22} /> WATCH THIS CUT</span>
            <span className="preview-progress" aria-hidden="true"><i ref={progressRef} /></span>
          </button>
          <div className="monitor-caption"><span>{project.shortTitle}</span><span>{project.isLongForm ? '90 SEC PREVIEW' : project.duration}</span></div>
          <div className="clip-strip" role="group" aria-label="Preview clips">
            {CLIPS.map((projectIndex, index) => <button key={projectIndex} type="button" aria-label={`Preview ${PROJECTS[projectIndex].shortTitle}`} aria-pressed={selected === index}
              onClick={() => { setSelected(index); if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'; }}><span className="clip-number">0{index + 1}</span><span>{['Commercial', 'Documentary', 'Shorts'][index]}</span><i /></button>)}
          </div>
        </div>
      </motion.div>
    </div>
    <a className="hero-handoff" href="#work"><span>SCROLL INTO THE WORK</span><span className="handoff-line" /><ArrowDownRight size={24} /></a>
    <div className="format-ribbon" aria-label="Reels, podcasts, shorts, commentary, long-form"><div aria-hidden="true">{[0,1].map(copy => <span key={copy}>REELS <i>✳</i> PODCASTS <i>✳</i> SHORTS <i>✳</i> COMMENTARY <i>✳</i> LONG-FORM <i>✳</i>&nbsp;</span>)}</div></div>
  </section>;
}
