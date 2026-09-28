import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Play } from '@phosphor-icons/react';
import gsap from 'gsap';
import { PROJECTS } from '../data/projects';
import { sequenceEase, sequenceTransition, springTransition } from '../animation/sequence';
import { useReducedMotion } from '../hooks/useReducedMotion';
import PreviewMedia from './PreviewMedia';

const FORMATS = [
  'SHORTS.',
  'PODCASTS.',
  'DOCUMENTARIES.',
  'COMMERCIALS.',
  'REELS.',
  'LONG-FORM.'
];

// Map format names to matching preview projects
const FORMAT_TO_PREVIEW = {
  'DOCUMENTARIES.': 0, // James Whitmore
  'COMMERCIALS.': 1,   // Top 10 Juices
  'SHORTS.': 2,        // Pawn Stars
  'REELS.': 2,         // Pawn Stars
  'PODCASTS.': 0,      // Whitmore
  'LONG-FORM.': 0      // Whitmore
};

const PREVIEW_CLIPS = [0, 1, 3]; // Whitmore, Juices, Pawn Stars

export default function Hero({ onOpenModal }) {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [displayText, setDisplayText] = useState(FORMATS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(2); // Start with shorts/reels matching first format
  const [userInteracted, setUserInteracted] = useState(false);

  const reduced = useReducedMotion();
  const monitorRef = useRef(null);
  const progressRef = useRef(null);
  const timeoutRef = useRef(null);

  const project = PROJECTS[PREVIEW_CLIPS[previewIndex]];

  // Classy typewriter animation
  useEffect(() => {
    if (reduced) {
      setDisplayText(FORMATS[selectedFormat]);
      return;
    }

    const currentWord = FORMATS[selectedFormat];

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 70);
      } else {
        // Word complete: pause before deleting (or pause longer if user explicitly selected)
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, userInteracted ? 3200 : 2200);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 38);
      } else {
        // Finished deleting: move to next format
        setIsDeleting(false);
        setUserInteracted(false);
        setSelectedFormat(prev => {
          const next = (prev + 1) % FORMATS.length;
          const mappedClip = FORMAT_TO_PREVIEW[FORMATS[next]];
          if (mappedClip !== undefined) setPreviewIndex(mappedClip);
          return next;
        });
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, selectedFormat, reduced, userInteracted]);

  // User explicitly chooses a format
  const handleSelectFormat = useCallback((index) => {
    clearTimeout(timeoutRef.current);
    setUserInteracted(true);
    setSelectedFormat(index);
    setDisplayText(FORMATS[index]);
    setIsDeleting(false);

    const targetFormat = FORMATS[index];
    const mappedClip = FORMAT_TO_PREVIEW[targetFormat];
    if (mappedClip !== undefined) {
      setPreviewIndex(mappedClip);
      if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
    }
  }, []);

  // Cycle to next format on clicking the headline
  const handleHeadlineClick = useCallback(() => {
    const next = (selectedFormat + 1) % FORMATS.length;
    handleSelectFormat(next);
  }, [selectedFormat, handleSelectFormat]);

  // 3D tilt on monitor
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
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(node);
      gsap.set(node, { clearProps: 'transform' });
    };
  }, [reduced]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-composition">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...sequenceTransition, duration: 0.7 }}
        >
          <h1>
            <span className="hero-line">EDITING FOR</span>
            <button
              type="button"
              className="hero-typing-btn"
              onClick={handleHeadlineClick}
              aria-label={`Editing for ${displayText} Click to cycle format`}
              title="Click to change format"
            >
              <span className="hero-typing-text">{displayText}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </button>
          </h1>

          <div className="hero-format-picker" role="tablist" aria-label="Choose editing format">
            {FORMATS.map((fmt, index) => (
              <button
                key={fmt}
                type="button"
                className={`format-picker-btn ${selectedFormat === index ? 'is-selected' : ''}`}
                onClick={() => handleSelectFormat(index)}
              >
                {fmt.replace('.', '')}
              </button>
            ))}
          </div>

          <p className="hero-description">
            I turn raw footage into high-retention videos people actually watch to the end. Shorts, podcasts, documentaries, and commercial cuts with crisp pacing and punchy sound design.
          </p>

          <div className="hero-actions">
            <motion.a
              className="action-button primary"
              href="#work"
              whileHover={reduced ? {} : { y: -3, boxShadow: '0 12px 35px rgba(56,189,248,0.25)' }}
              whileTap={reduced ? {} : { y: 0, scale: 0.97 }}
              transition={springTransition}
            >
              WATCH MY WORK <ArrowDownRight size={20} />
            </motion.a>
            <motion.a
              className="text-action"
              href="#contact"
              whileHover={reduced ? {} : { x: 3 }}
              transition={{ duration: 0.25, ease: sequenceEase }}
            >
              LET'S WORK TOGETHER <ArrowUpRight size={20} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="monitor-entrance"
          initial={reduced ? false : { opacity: 0, y: 45, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...sequenceTransition, duration: 0.8, delay: reduced ? 0 : 0.12 }}
        >
          <div ref={monitorRef} className="hero-monitor">
            <div className="monitor-top">
              <span><i /> TIMELINE PREVIEW</span>
              <span>{project.categoryLabel}</span>
            </div>

            <button
              className={`hero-screen ${project.aspectRatio === '9:16' ? 'portrait-preview' : ''}`}
              data-project-origin={`hero-${project.id}`}
              type="button"
              aria-label={`Watch ${project.title}`}
              onClick={event => onOpenModal(project, event.currentTarget)}
            >
              <AnimatePresence initial={false}>
                <motion.span
                  className="hero-screen-layer"
                  key={project.id}
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: sequenceEase }}
                >
                  <PreviewMedia
                    project={project}
                    active
                    eager
                    onProgress={progress => {
                      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
                    }}
                  />
                </motion.span>
              </AnimatePresence>
              <span className="screen-corner top-left" />
              <span className="screen-corner bottom-right" />
              <span className="monitor-play"><Play weight="fill" size={20} /> PLAY TIMELINE CUT</span>
              <span className="preview-progress" aria-hidden="true"><i ref={progressRef} /></span>
            </button>

            <div className="monitor-caption">
              <span>{project.title}</span>
              <span>{project.isLongForm ? 'PREVIEW CUT' : project.duration}</span>
            </div>

            <div className="clip-strip" role="group" aria-label="Timeline preview clips">
              {PREVIEW_CLIPS.map((projectIndex, index) => (
                <motion.button
                  key={projectIndex}
                  type="button"
                  aria-label={`Preview ${PROJECTS[projectIndex].title}`}
                  aria-pressed={previewIndex === index}
                  onClick={() => {
                    setPreviewIndex(index);
                    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
                  }}
                  whileHover={reduced ? {} : { y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.2, ease: sequenceEase }}
                >
                  <span className="clip-number">0{index + 1}</span>
                  <span>{['Documentary', 'Commercial', 'Short-Form'][index]}</span>
                  <i />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
