import React, { useCallback, useEffect, useRef, useState } from 'react';

const TRACK = `${import.meta.env.BASE_URL}audio/yukitoki-instrumental.m4a`;
const LEVEL = 0.18;

export default function AmbientAudio({ suspended }) {
  const audioRef = useRef(null);
  const requested = useRef(true);
  const blocked = useRef(suspended);
  const generation = useRef(0);
  const fadeFrame = useRef(0);
  const timeout = useRef(0);
  const unlockHandlerRef = useRef(null);
  const [status, setStatus] = useState('on');
  const [enabled, setEnabled] = useState(true);
  blocked.current = suspended;

  const fade = useCallback((target, done) => {
    clearInterval(fadeFrame.current);
    const audio = audioRef.current;
    if (!audio) return;
    const startVol = audio.volume;
    const started = performance.now();
    const step = () => {
      const progress = Math.min((performance.now() - started) / 360, 1);
      if (audioRef.current) audioRef.current.volume = startVol + (target - startVol) * progress;
      if (progress === 1) { clearInterval(fadeFrame.current); done?.(); }
    };
    fadeFrame.current = setInterval(step, 16);
  }, []);

  const cleanUnlock = useCallback(() => {
    if (unlockHandlerRef.current) {
      const handler = unlockHandlerRef.current;
      unlockHandlerRef.current = null;
      ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(evt => {
        window.removeEventListener(evt, handler, true);
      });
    }
  }, []);

  const attachUnlock = useCallback(() => {
    if (unlockHandlerRef.current) return;
    const handler = () => {
      const audio = audioRef.current;
      if (!audio || !requested.current || blocked.current || document.hidden) return;
      if (!audio.getAttribute('src')) audio.src = TRACK;
      audio.play().then(() => {
        cleanUnlock();
        setStatus('on');
        fade(LEVEL);
      }).catch(() => {
        // Still waiting for valid activation; keep listeners intact
      });
    };
    unlockHandlerRef.current = handler;
    ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(evt => {
      window.addEventListener(evt, handler, { capture: true, passive: true });
    });
  }, [fade, cleanUnlock]);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const attempt = ++generation.current;
    clearTimeout(timeout.current);
    clearInterval(fadeFrame.current);
    if (!audio.getAttribute('src')) audio.src = TRACK;
    if (audio.error) audio.load();
    audio.volume = 0;
    timeout.current = setTimeout(() => {
      if (attempt !== generation.current) return;
      generation.current++;
      audio.pause();
      setStatus('error');
    }, 12000);

    audio.play().then(() => {
      if (attempt !== generation.current) return;
      clearTimeout(timeout.current);
      cleanUnlock();
      if (!requested.current || blocked.current || document.hidden) { audio.pause(); return; }
      setStatus('on');
      fade(LEVEL);
    }).catch((error) => {
      if (attempt !== generation.current) return;
      clearTimeout(timeout.current);
      if (error.name === 'NotAllowedError') {
        // Browser requires gesture before unmuting; attach unlock listeners
        setStatus('on');
        attachUnlock();
      } else {
        setStatus(error.name === 'AbortError' ? 'off' : 'error');
      }
    });
  }, [fade, cleanUnlock, attachUnlock]);

  // Initial playback attempt and background sync
  useEffect(() => {
    if (requested.current && !suspended && !document.hidden) {
      start();
      // Pre-emptively attach unlock listeners so the very first interaction activates audio immediately
      attachUnlock();
    }
    return () => cleanUnlock();
  }, [start, attachUnlock, cleanUnlock, suspended]);

  // Visibility and suspension handler
  useEffect(() => {
    const audio = audioRef.current;
    const sync = () => {
      if (suspended || document.hidden) {
        generation.current++;
        clearTimeout(timeout.current);
        clearInterval(fadeFrame.current);
        if (audio) {
          audio.pause();
          audio.volume = 0;
        }
        setStatus(requested.current ? 'paused' : 'off');
      } else if (requested.current) {
        start();
      }
    };
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [suspended, start]);

  useEffect(() => {
    return () => {
      generation.current++;
      clearTimeout(timeout.current);
      clearInterval(fadeFrame.current);
      cleanUnlock();
      if (audioRef.current) audioRef.current.pause();
    };
  }, [cleanUnlock]);

  const toggle = () => {
    const next = status === 'error' || !requested.current;
    requested.current = next;
    setEnabled(next);
    cleanUnlock();
    if (next) {
      start();
    } else {
      generation.current++;
      clearTimeout(timeout.current);
      setStatus('off');
      fade(0, () => audioRef.current?.pause());
    }
  };

  const isPlaying = status === 'on';
  const label = status === 'error' ? 'RETRY SOUND' : status === 'loading' ? 'LOADING' : status === 'paused' ? 'SOUND PAUSED' : `SOUND ${isPlaying || enabled ? 'ON' : 'OFF'}`;

  return <>
    <audio ref={audioRef} loop preload="auto" src={TRACK} data-testid="ambient-audio" onError={() => {
      clearTimeout(timeout.current);
      setStatus('error');
    }} />
    <button type="button" className={`sound-toggle ${isPlaying ? 'sound-playing' : ''}`} onClick={toggle}
      aria-pressed={enabled} aria-label={status === 'error' ? 'Retry background music' : enabled ? 'Turn background music off' : 'Turn background music on'}
      title="Yukitoki instrumental · ambient background music">
      <span className="sound-bars" aria-hidden="true">{[0, 1, 2, 3].map(i => <i key={i} style={{ '--bar': i }} />)}</span>
      <span aria-live="polite">{label}</span>
    </button>
  </>;
}
