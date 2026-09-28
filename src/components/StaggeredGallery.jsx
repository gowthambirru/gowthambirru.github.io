import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Play } from '@phosphor-icons/react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceTransition, sequenceEase, springTransition } from '../animation/sequence';
import PreviewMedia from './PreviewMedia';
import Reveal from './Reveal';

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
};

const ProjectCard = React.forwardRef(function ProjectCard({ project, index, lead, onOpenModal }, ref) {
  const [preview, setPreview] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      layout={!reduced}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...sequenceTransition, delay: reduced ? 0 : (index % 4) * 0.05 }}
      className={`project-card ${lead ? 'project-lead' : ''} ${project.aspectRatio === '9:16' ? 'project-portrait' : ''}`}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setPreview(true); }}
      onPointerLeave={() => setPreview(false)}
    >
      <motion.button
        type="button"
        className="project-media"
        data-project-origin={`work-${project.id}`}
        aria-label={`Watch ${project.title}`}
        onFocus={() => setPreview(true)}
        onBlur={() => setPreview(false)}
        onClick={e => onOpenModal(project, e.currentTarget)}
        whileHover={reduced ? {} : { y: -5, boxShadow: '0 20px 45px rgba(0,0,0,0.45)' }}
        whileTap={reduced ? {} : { scale: 0.98, y: 0 }}
        transition={springTransition}
      >
        <PreviewMedia project={project} active={preview} />
        <span className="media-index">{project.categoryLabel.toUpperCase()}</span>
        <span className="media-duration">{project.isLongForm ? 'PREVIEW CUT' : project.duration}</span>
        <span className="project-play"><Play weight="fill" size={18} /><span>PLAY CUT</span></span>
        <span className="media-aspect">{project.aspectRatio}</span>
      </motion.button>

      <div className="project-caption">
        <div className="project-caption-top">
          <span className="project-role-badge">{project.role || project.tools.join(' · ')}</span>
          <ArrowUpRight size={18} />
        </div>
        <h3>
          <button type="button" onClick={() => onOpenModal(project, document.querySelector(`[data-project-origin="work-${project.id}"]`))}>
            {project.title}
          </button>
        </h3>
        <p>{project.description}</p>
        {lead && <span className="featured-label">FEATURED CUT</span>}
      </div>
    </motion.article>
  );
});

export default function StaggeredGallery({ onOpenModal }) {
  const [filter, setFilter] = useState('all');
  const reduced = useReducedMotion();
  const projects = PROJECTS.filter(project => filter === 'all' || (filter === 'long-form' ? project.isLongForm : project.category === filter));

  return (
    <section id="work" className="work-section section-shell">
      <Reveal className="section-heading">
        <div>
          <h2>SELECTED WORK<span>.</span></h2>
        </div>
        <p>Real edits across documentary, commercial, and vertical short-form. Zero dead air.</p>
      </Reveal>

      <div className="work-toolbar">
        <div className="filter-group" role="group" aria-label="Filter cuts">
          {CATEGORIES.map(category => (
            <motion.button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
              whileHover={reduced ? {} : { y: -1 }}
              whileTap={reduced ? {} : { scale: 0.96 }}
              transition={{ duration: 0.18, ease: sequenceEase }}
            >
              {filter === category.id && (
                <motion.span
                  className="filter-indicator"
                  layoutId="work-filter"
                  transition={reduced ? { duration: 0 } : { ...sequenceTransition, type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
        <span className="work-count" role="status">{String(projects.length).padStart(2, '0')} PRODUCTIONS</span>
      </div>

      <motion.div layout={!reduced} className={`project-grid ${filter !== 'all' ? 'is-filtered' : ''}`}>
        <AnimatePresence initial={false} mode="popLayout">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              lead={filter === 'all' && project.id === PROJECTS[0].id}
              onOpenModal={onOpenModal}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
