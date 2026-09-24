import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const MediaSuspendedContext = createContext(false);

export default function PreviewMedia({ project, active = false, eager = false, onProgress }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const suspended = useContext(MediaSuspendedContext);
  const reduced = useReducedMotion();
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;
  const canPreview = active && visible && !suspended && !reduced && !saveData;

  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    let current = true;
    const sync = () => {
      if (canPreview && !document.hidden) {
        if (!video.getAttribute('src')) video.src = project.previewUrl;
        video.play().then(() => {
          if (current && document.hidden) video.pause();
        }).catch(() => {}); // The poster remains the usable fallback for optional previews.
      } else video.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      current = false;
      video.pause();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [canPreview, project.previewUrl]);

  return <>
    <img src={project.thumbnail} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" className="media-poster" />
    <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true"
      onTimeUpdate={event => onProgress?.(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)}
      onPlaying={() => setReady(true)} onError={() => setReady(false)}
      className={`media-preview ${ready && canPreview ? 'is-ready' : ''}`} />
  </>;
}
