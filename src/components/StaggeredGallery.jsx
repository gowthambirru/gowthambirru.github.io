import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Play } from '@phosphor-icons/react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceTransition } from '../animation/sequence';
import PreviewMedia from './PreviewMedia';
import Reveal from './Reveal';

const ProjectCard = React.forwardRef(function ProjectCard({ project, index, lead, onOpenModal }, ref) {
  const [preview, setPreview] = useState(false);
  const reduced = useReducedMotion();
  return <motion.article ref={ref} layout={!reduced} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={reduced ? { duration: 0 } : sequenceTransition}
    className={`project-card ${lead ? 'project-lead' : ''} ${project.aspectRatio === '9:16' ? 'project-portrait' : ''}`}
    onPointerEnter={e => { if (e.pointerType === 'mouse') setPreview(true); }} onPointerLeave={() => setPreview(false)}>
    <button type="button" className="project-media" data-project-origin={`work-${project.id}`} aria-label={`Watch ${project.title}`}
      onFocus={() => setPreview(true)} onBlur={() => setPreview(false)} onClick={e => onOpenModal(project, e.currentTarget)}>
      <PreviewMedia project={project} active={preview} />
      <span className="media-index">{String(index + 1).padStart(2, '0')} / {project.categoryLabel.toUpperCase()}</span>
      <span className="media-duration">{project.isLongForm ? '90 SEC PREVIEW' : project.duration}</span>
      <span className="project-play"><Play weight="fill" size={20} /><span>WATCH CUT</span></span>
      <span className="media-aspect">{project.aspectRatio}</span>
    </button>
    <div className="project-caption">
      <div className="project-caption-top"><span>{project.tools.join(' + ')}</span><ArrowUpRight size={19} /></div>
      <h3><button type="button" onClick={() => onOpenModal(project, document.querySelector(`[data-project-origin="work-${project.id}"]`))}>{project.title}</button></h3>
      <p>{project.description}</p>
      {lead && <span className="featured-label">↳ FEATURED CUT / 01</span>}
    </div>
  </motion.article>;
});

export default function StaggeredGallery({ onOpenModal }) {
  const [filter, setFilter] = useState('all');
  const reduced = useReducedMotion();
  const projects = PROJECTS.filter(project => filter === 'all' || (filter === 'long-form' ? project.isLongForm : project.category === filter));
  return <section id="work" className="work-section section-shell">
    <Reveal className="section-heading">
      <div><span className="eyebrow section-index">01 / SELECTED WORK</span><h2>THE CUTS<span>.</span></h2></div>
      <p>A few edits. Different formats.<br />The same attention to the little things.</p>
    </Reveal>
    <div className="work-toolbar">
      <div className="filter-group" role="group" aria-label="Filter cuts">
        {CATEGORIES.map(category => <button key={category.id} type="button" aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}>
          {filter === category.id && <motion.span className="filter-indicator" layoutId="work-filter" transition={reduced ? { duration: 0 } : sequenceTransition} />}
          <span>{category.label}</span>
        </button>)}
      </div>
      <span className="work-count" role="status">{String(projects.length).padStart(2, '0')} CUTS</span>
    </div>
    <motion.div layout={!reduced} className={`project-grid ${filter !== 'all' ? 'is-filtered' : ''}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {projects.map(project => <ProjectCard key={project.id} project={project} index={PROJECTS.indexOf(project)} lead={filter === 'all' && project.id === PROJECTS[0].id} onOpenModal={onOpenModal} />)}
      </AnimatePresence>
    </motion.div>
    <div className="section-end"><span>EVERY FRAME HAS A JOB.</span><span>KEEP GOING ↓</span></div>
  </section>;
}
