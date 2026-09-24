import React, { useCallback, useEffect, useRef, useState } from 'react';

const TRACK = `${import.meta.env.BASE_URL}audio/yukitoki-instrumental.m4a`;
const LEVEL = 0.16;

export default function AmbientAudio({ suspended }) {
  const audioRef = useRef(null);
  const requested = useRef(false);
  const blocked = useRef(suspended);
  const generation = useRef(0);
  const fadeFrame = useRef(0);
  const timeout = useRef(0);
  const [status, setStatus] = useState('off');
  const [enabled, setEnabled] = useState(false);
  const [remembered] = useState(() => {
    try { return localStorage.getItem('gowtham:sound') === 'on'; } catch { return false; }
  });
  blocked.current = suspended;

  const fade = useCallback((target, done) => {
    clearInterval(fadeFrame.current);
    const audio = audioRef.current;
    const start = audio.volume;
    const started = performance.now();
    const step = () => {
      const progress = Math.min((performance.now() - started) / 320, 1);
      audio.volume = start + (target - start) * progress;
      if (progress === 1) { clearInterval(fadeFrame.current); done?.(); }
    };
    fadeFrame.current = setInterval(step, 16);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    const attempt = ++generation.current;
    clearTimeout(timeout.current);
    clearInterval(fadeFrame.current);
    if (!audio.getAttribute('src')) audio.src = TRACK;
    if (audio.error) audio.load();
    audio.volume = 0;
    setStatus('loading');
    timeout.current = setTimeout(() => {
      if (attempt !== generation.current) return;
      generation.current++;
      audio.pause();
      setStatus('error');
    }, 12000);
    audio.play().then(() => {
      if (attempt !== generation.current) return;
      clearTimeout(timeout.current);
      if (!requested.current || blocked.current || document.hidden) { audio.pause(); return; }
      setStatus('on');
      fade(LEVEL);
    }).catch((error) => {
      if (attempt !== generation.current) return;
      clearTimeout(timeout.current);
      setStatus(error.name === 'AbortError' ? 'off' : 'error');
    });
  }, [fade]);

  useEffect(() => {
    const audio = audioRef.current;
    const sync = () => {
      if (suspended || document.hidden) {
        generation.current++;
        clearTimeout(timeout.current);
        clearInterval(fadeFrame.current);
        audio.pause();
        audio.volume = 0;
        setStatus(requested.current ? 'paused' : 'off');
      } else if (requested.current) start();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [suspended, start]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      generation.current++;
      clearTimeout(timeout.current);
      clearInterval(fadeFrame.current);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const next = status === 'error' || !requested.current;
    requested.current = next;
    setEnabled(next);
    try { localStorage.setItem('gowtham:sound', next ? 'on' : 'off'); } catch { /* Storage is optional. */ }
    if (next) start();
    else {
      generation.current++;
      clearTimeout(timeout.current);
      setStatus('off');
      fade(0, () => audioRef.current.pause());
    }
  };

  const label = status === 'error' ? 'RETRY SOUND' : status === 'loading' ? 'LOADING' : status === 'paused' ? 'SOUND PAUSED' : `SOUND ${status === 'on' ? 'ON' : 'OFF'}`;
  return <>
    <audio ref={audioRef} loop preload="none" data-testid="ambient-audio" onError={() => {
      clearTimeout(timeout.current);
      setStatus('error');
    }} />
    <button type="button" className={`sound-toggle ${status === 'on' ? 'sound-playing' : ''}`} onClick={toggle}
      aria-pressed={enabled} aria-label={status === 'error' ? 'Retry background music' : enabled ? 'Turn background music off' : 'Turn background music on'}
      title={remembered && !enabled ? 'Resume Yukitoki instrumental' : 'Yukitoki instrumental · background music'}>
      <span className="sound-bars" aria-hidden="true">{[0, 1, 2, 3].map(i => <i key={i} style={{ '--bar': i }} />)}</span>
      <span aria-live="polite">{label}</span>
    </button>
  </>;
}
