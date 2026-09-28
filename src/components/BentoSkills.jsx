import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceTransition, sequenceEase } from '../animation/sequence';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'Ingest & Structural Assembly',
    text: 'Reviewing all recorded footage, tagging key moments, and constructing the primary story assembly. Removing dead air, false starts, and redundant pauses to establish clear narrative momentum.',
    bars: [25, 45, 35, 75, 40, 65, 85, 40, 60, 30, 70, 45]
  },
  {
    step: '02',
    title: 'Rhythmic Pacing & Retention Flow',
    text: 'Crafting seamless J-cuts, L-cuts, and match cuts that breathe naturally with dialogue. Applying intentional punch-in reframing and dynamic cutaways to maintain viewer retention without visual fatigue.',
    bars: [20, 30, 80, 85, 80, 30, 25, 90, 85, 80, 30, 20]
  },
  {
    step: '03',
    title: 'Sound Design & Dialogue Polish',
    text: 'Audio is 50% of the visual experience. Dialogue cleanup, noise removal, multi-track levelling, sub-bass impacts, ambient foley, and micro-risers that anchor each visual cut to a sonic beat.',
    bars: [20, 50, 85, 50, 20, 65, 95, 65, 20, 50, 85, 50]
  },
  {
    step: '04',
    title: 'Motion, Color & Master Delivery',
    text: 'Clean title animation, tracked callouts, dynamic subtitle styling, and neutral-to-stylized color grading. Final master exports rendered and QA-checked for both 16:9 cinematic and 9:16 vertical distribution.',
    bars: [20, 28, 36, 44, 52, 60, 68, 76, 84, 76, 60, 40]
  }
];

const TOOLS = [
  { mark: 'Pr', name: 'Premiere Pro', role: 'Long-Form & Multi-Track Assembly' },
  { mark: 'Ae', name: 'After Effects', role: 'Motion Design & Title Animation' },
  { mark: 'Cc', name: 'CapCut PC', role: 'Rapid Short-Form & Vertical Retention' }
];

const accordionTransition = {
  height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
};

export default function BentoSkills() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="skills-section section-shell">
      <Reveal className="section-heading">
        <div>
          <h2>THE EDITING PIPELINE<span>.</span></h2>
        </div>
        <p>How raw rushes become high-retention videos with pacing, sound, and visual polish.</p>
      </Reveal>

      <div className="skills-layout">
        <Reveal className="tools-column" delay={0.1}>
          <div className="pipeline-intro">
            <h3>Editing Software Stack</h3>
          </div>

          <div className="tool-list">
            {TOOLS.map((tool, index) => (
              <motion.div
                className="tool-row"
                key={tool.name}
                initial={reduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...sequenceTransition, delay: index * 0.08 }}
                whileHover={reduced ? {} : { y: -2 }}
              >
                <span className="tool-mark">{tool.mark}</span>
                <div>
                  <h3>{tool.name}</h3>
                  <span>{tool.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <div className="craft-list">
          {PIPELINE_STAGES.map((stage, index) => (
            <motion.div
              key={stage.title}
              className={`craft-item ${open === index ? 'is-open' : ''}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...sequenceTransition, delay: index * 0.06 }}
            >
              <h3>
                <motion.button
                  type="button"
                  id={`stage-trigger-${index}`}
                  aria-expanded={open === index}
                  aria-controls={`stage-panel-${index}`}
                  onClick={() => setOpen(open === index ? null : index)}
                  whileHover={reduced ? {} : { x: 4 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: sequenceEase }}
                >
                  <span className="craft-index">STAGE {stage.step}</span>
                  <span className="stage-main-title">{stage.title}</span>
                  <motion.span
                    animate={{ rotate: open === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: sequenceEase }}
                    style={{ display: 'inline-flex', marginLeft: 'auto', flexShrink: 0 }}
                  >
                    <Plus size={20} />
                  </motion.span>
                </motion.button>
              </h3>

              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    id={`stage-panel-${index}`}
                    role="region"
                    aria-labelledby={`stage-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduced ? { duration: 0 } : accordionTransition}
                    className="craft-panel"
                  >
                    <div className="craft-content">
                      <div className="edit-waveform" aria-hidden="true">
                        {stage.bars.map((height, i) => (
                          <motion.i
                            key={i}
                            initial={reduced ? false : { height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.45,
                              delay: i * 0.035,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                          />
                        ))}
                      </div>
                      <p>{stage.text}</p>
                      <motion.a
                        href="#work"
                        className="text-action"
                        whileHover={reduced ? {} : { x: 4 }}
                        transition={{ duration: 0.2, ease: sequenceEase }}
                      >
                        VIEW WORK IN THIS STYLE <ArrowUpRight size={16} />
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
