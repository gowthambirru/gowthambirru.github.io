import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceTransition } from '../animation/sequence';

const CRAFT = [
  { title: 'Pacing & story', text: 'Cut the dead air. Keep the good bits. Give every moment enough room to land.', bars: [28, 48, 35, 76, 42, 65, 88, 44, 60, 32, 72, 45] },
  { title: 'Shorts & podcast clips', text: 'Find the moment worth sharing, then shape it into a short that makes sense on its own.', bars: [25, 30, 80, 85, 80, 30, 25, 90, 85, 80, 30, 20] },
  { title: 'Sound & beat sync', text: 'Cuts that hit the beat. Sound effects that support the action. Voices you can hear clearly.', bars: [20, 50, 85, 50, 20, 65, 95, 65, 20, 50, 85, 50] },
  { title: 'Motion, text & graphics', text: 'Clean captions, punch-in zooms, animated titles, and graphics that help tell the story.', bars: [20, 28, 36, 44, 52, 60, 68, 76, 84, 76, 60, 40] },
];

export default function BentoSkills() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();
  return <section id="skills" className="skills-section section-shell">
    <Reveal className="section-heading"><div><span className="eyebrow section-index">02 / BEHIND THE EDIT</span><h2>SMALL DETAILS.<br /><span>BIG DIFFERENCE.</span></h2></div></Reveal>
    <div className="skills-layout">
      <Reveal className="tools-column"><p>The tools matter.<br />Knowing when to cut matters more.</p>
        <div className="tool-list">
          {[['Cc', 'CapCut PC', 'Shorts, Reels & quick cuts'], ['Pr', 'Premiere Pro', 'Podcasts & long-form'], ['Ae', 'After Effects', 'Motion, titles & overlays']].map(([mark, name, description]) => <div className="tool-row" key={name}><span className="tool-mark">{mark}</span><div><h3>{name}</h3><span>{description}</span></div></div>)}
        </div>
        <span className="experience-note"><strong>MULTIPLE YEARS</strong> OF MAKING THE CUT</span>
      </Reveal>
      <div className="craft-list">
        {CRAFT.map((item, index) => <div key={item.title} className={`craft-item ${open === index ? 'is-open' : ''}`}>
          <h3><button type="button" id={`craft-trigger-${index}`} aria-expanded={open === index} aria-controls={`craft-panel-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="craft-index">0{index + 1}</span>{item.title}<Plus size={22} /></button></h3>
          <AnimatePresence initial={false}>{open === index && <motion.div id={`craft-panel-${index}`} role="region" aria-labelledby={`craft-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={reduced ? { duration: 0 } : sequenceTransition} className="craft-panel">
            <div className="craft-content"><div className="edit-waveform" aria-hidden="true">{item.bars.map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><p>{item.text}</p><a href="#work" className="text-action">SEE IT IN THE WORK <ArrowUpRight size={16} /></a></div>
          </motion.div>}</AnimatePresence>
        </div>)}
      </div>
    </div>
  </section>;
}
