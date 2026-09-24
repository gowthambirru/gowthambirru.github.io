import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

function VideoSession({ project, onMediaRef }) {
  const ref = useRef(null);
  const timer = useRef(0);
  const [status, setStatus] = useState('loading');
  const [retry, setRetry] = useState(0);
  const clearWaiting = () => clearTimeout(timer.current);
  const waiting = () => {
    clearWaiting();
    setStatus('loading');
    timer.current = setTimeout(() => {
      ref.current?.pause();
      setStatus('error');
    }, 12000);
  };

  useEffect(() => {
    const video = ref.current;
    let current = true;
    onMediaRef(video);
    waiting();
    video.load();
    video.play().catch(error => {
      if (!current || error.name === 'AbortError') return;
      if (error.name === 'NotAllowedError') { clearWaiting(); setStatus('ready'); }
      else { clearWaiting(); setStatus('error'); }
    });
    return () => {
      current = false;
      clearWaiting();
      video.pause();
      onMediaRef(null);
    };
  }, [project.videoUrl, retry, onMediaRef]);

  return <div className={`player-media ${project.aspectRatio === '9:16' ? 'is-portrait' : ''}`} data-player-frame>
    <video ref={ref} src={project.videoUrl} poster={project.thumbnail} controls playsInline preload="metadata"
      aria-label={project.title} data-testid="project-video" tabIndex={0}
      onPlaying={() => { clearWaiting(); setStatus('playing'); }}
      onCanPlay={() => { clearWaiting(); setStatus(ref.current?.paused ? 'ready' : 'playing'); }}
      onPause={() => setStatus(previous => previous === 'error' ? previous : 'paused')}
      onEnded={() => setStatus('ended')}
      onWaiting={waiting} onSeeking={waiting}
      onSeeked={() => { clearWaiting(); setStatus(ref.current?.paused ? 'paused' : 'playing'); }}
      onError={() => { clearWaiting(); setStatus('error'); }} />
    {status === 'loading' && <div className="player-loading" role="status"><span className="loading-mark" /> LOADING YOUR CUT</div>}
    {status === 'error' && <div className="player-error" role="alert">
      <span className="eyebrow">LET'S TRY THAT AGAIN</span><p>This cut couldn't load.</p>
      <button type="button" className="action-button primary" onClick={() => setRetry(value => value + 1)}>RETRY VIDEO</button>
      <a href={project.driveUrl} target="_blank" rel="noreferrer">Watch on Google Drive <ArrowUpRight size={16} /></a>
    </div>}
    <span className="sr-only" role="status">{status === 'playing' ? 'Video playing' : status === 'paused' ? 'Video paused' : status === 'ended' ? 'Video ended' : ''}</span>
  </div>;
}

export default function VideoPlayerModal({ project, allProjects, origin, onClose, onSelectProject }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const ghostRef = useRef(null);
  const mediaRef = useRef(null);
  const closing = useRef(false);
  const initialOrigin = useRef(origin);
  const opener = useRef(document.activeElement);
  const reduced = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const index = allProjects.findIndex(item => item.id === project.id);
  const setMediaRef = useCallback(video => { mediaRef.current = video; }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    mediaRef.current?.pause();
    const panel = panelRef.current;
    const ghost = ghostRef.current;
    let source = initialOrigin.current;
    if (source?.dataset.projectOrigin?.endsWith(project.id) !== true) source = document.querySelector(`[data-project-origin="work-${project.id}"]`);
    const end = source?.getBoundingClientRect();
    const start = panel.querySelector('[data-player-frame]')?.getBoundingClientRect();
    const visible = end && end.bottom > 80 && end.top < window.innerHeight - 60 && end.width > 0;
    gsap.killTweensOf([panel, ghost]);
    if (reduced) { onClose(); return; }
    gsap.to(panel, { opacity: 0, duration: 0.18 });
    if (visible && start) {
      ghost.src = project.thumbnail;
      gsap.set(ghost, { display: 'block', opacity: 1, left: start.left, top: start.top, width: start.width, height: start.height });
      gsap.to(ghost, { left: end.left, top: end.top, width: end.width, height: end.height, duration: 0.42, ease: 'power3.inOut', onComplete: onClose });
    } else gsap.to(panel, { opacity: 0, duration: 0.2, onComplete: onClose });
  }, [onClose, project.id, project.thumbnail, reduced]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const ghost = ghostRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    dialog.showModal();
    dialog.querySelector('[aria-label="Close project"]')?.focus({ preventScroll: true });
    const source = initialOrigin.current?.getBoundingClientRect();
    const target = panel.querySelector('[data-player-frame]')?.getBoundingClientRect();
    const timeline = gsap.timeline();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && source && target) {
      gsap.set(panel, { opacity: 0 });
      gsap.set(ghost, { display: 'block', opacity: 1, left: source.left, top: source.top, width: source.width, height: source.height });
      timeline.to(ghost, { left: target.left, top: target.top, width: target.width, height: target.height, duration: 0.48, ease: 'power3.inOut' })
        .to(panel, { opacity: 1, duration: 0.16 }, '-=0.1').set(ghost, { display: 'none' });
    }
    return () => {
      timeline.kill();
      gsap.killTweensOf([panel, ghost]);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, []);

  const select = delta => {
    if (closing.current) return;
    mediaRef.current?.pause();
    setDirection(delta);
    onSelectProject(allProjects[(index + delta + allProjects.length) % allProjects.length]);
  };

  const containFocus = event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialogRef.current.querySelectorAll('button, a[href], video[controls], input')].filter(element => element.getClientRects().length && !element.disabled);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };

  return <dialog ref={dialogRef} className="player-dialog" aria-labelledby="project-title" onKeyDown={containFocus} onCancel={e => { e.preventDefault(); close(); }}
    onClick={e => { if (e.target === e.currentTarget) close(); }}>
    <img ref={ghostRef} src={project.thumbnail} className="transition-frame" alt="" aria-hidden="true" />
    <div ref={panelRef} className={`player-panel ${project.aspectRatio === '9:16' ? 'portrait-panel' : ''}`}>
      <header className="player-header"><span><i className="status-dot" /> NOW VIEWING / {String(index + 1).padStart(2, '0')} OF {String(allProjects.length).padStart(2, '0')}</span>
        <button type="button" onClick={close} aria-label="Close project">CLOSE <span className="dim">ESC</span><X size={20} /></button></header>
      <div className="player-body" key={project.id} style={{ '--entry-x': `${reduced ? 0 : direction * 18}px` }}>
        <VideoSession project={project} onMediaRef={setMediaRef} />
        <div className="player-details">
          <span className="eyebrow">{project.categoryLabel} / {project.isLongForm ? '90 SECOND PREVIEW' : project.duration}</span>
          <h2 id="project-title">{project.title}</h2><p>{project.description}</p>
          <span className="project-tools">{project.tools.join(' + ')}</span>
          <a className="text-action" href={project.driveUrl} target="_blank" rel="noreferrer">{project.isLongForm ? 'WATCH THE FULL EDIT' : 'OPEN ON GOOGLE DRIVE'}<ArrowUpRight size={18} /></a>
        </div>
      </div>
      <footer className="player-footer"><button type="button" onClick={() => select(-1)}><ArrowLeft size={18} /> PREVIOUS CUT</button>
        <span>SOUNDTRACK PAUSED WHILE YOU WATCH</span><button type="button" onClick={() => select(1)}>NEXT CUT <ArrowRight size={18} /></button></footer>
    </div>
  </dialog>;
}
