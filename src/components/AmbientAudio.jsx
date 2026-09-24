import React, { useCallback, useEffect, useRef, useState } from 'react';

const TRACK = `${import.meta.env.BASE_URL}audio/yukitoki-instrumental.m4a`;
const LEVEL = 0.18;

export default function AmbientAudio({ suspended }) {
  const audioRef = useRef(null);
  const userWantsAudio = useRef(true);
  const suspendedRef = useRef(suspended);
  const fadeFrame = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  suspendedRef.current = suspended;

  const fade = useCallback((target, done) => {
    clearInterval(fadeFrame.current);
    const audio = audioRef.current;
    if (!audio) return;
    const startVol = audio.volume;
    const started = performance.now();
    const step = () => {
      const progress = Math.min((performance.now() - started) / 360, 1);
      if (audioRef.current) audioRef.current.volume = startVol + (target - startVol) * progress;
      if (progress === 1) {
        clearInterval(fadeFrame.current);
        done?.();
      }
    };
    fadeFrame.current = setInterval(step, 16);
  }, []);

  // Try autoplay on mount; if blocked by browser policy, listen for first user gesture anywhere
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unlockEvents = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'];
    const unlock = () => {
      unlockEvents.forEach(evt => {
        document.removeEventListener(evt, unlock, true);
        window.removeEventListener(evt, unlock, true);
      });
      if (userWantsAudio.current && !suspendedRef.current && !document.hidden && audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          fade(LEVEL);
        }).catch(() => {});
      }
    };

    audio.volume = 0;
    audio.play().then(() => {
      fade(LEVEL);
    }).catch(() => {
      // Browser blocked unprompted autoplay: attach unlock listeners
      unlockEvents.forEach(evt => {
        document.addEventListener(evt, unlock, { capture: true, passive: true });
        window.addEventListener(evt, unlock, { capture: true, passive: true });
      });
    });

    return () => {
      unlockEvents.forEach(evt => {
        document.removeEventListener(evt, unlock, true);
        window.removeEventListener(evt, unlock, true);
      });
      clearInterval(fadeFrame.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [fade]);

  // Handle suspended prop (video modals)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (suspended) {
      fade(0, () => audio.pause());
    } else if (userWantsAudio.current && !document.hidden) {
      audio.play().then(() => fade(LEVEL)).catch(() => {});
    }
  }, [suspended, fade]);

  // Handle background tab visibility
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (userWantsAudio.current && !suspendedRef.current) {
        audio.play().then(() => fade(LEVEL)).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [fade]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // Currently playing -> pause on this click
      userWantsAudio.current = false;
      fade(0, () => audio.pause());
    } else {
      // Currently paused/stopped -> play immediately on this click!
      userWantsAudio.current = true;
      audio.volume = 0;
      audio.play().then(() => {
        fade(LEVEL);
      }).catch(err => {
        console.warn('Playback request failed:', err);
      });
    }
  };

  const label = isPlaying ? 'SOUND ON' : 'SOUND OFF';

  return <>
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src={TRACK}
      data-testid="ambient-audio"
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onError={() => setIsPlaying(false)}
    />
    <button
      type="button"
      className={`sound-toggle ${isPlaying ? 'sound-playing' : ''}`}
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Turn background music off' : 'Turn background music on'}
      title="Yukitoki instrumental · background music"
    >
      <span className="sound-bars" aria-hidden="true">
        {[0, 1, 2, 3].map(i => <i key={i} style={{ '--bar': i }} />)}
      </span>
      <span aria-live="polite">{label}</span>
    </button>
  </>;
}
