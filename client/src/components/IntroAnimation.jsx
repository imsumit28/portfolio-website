import React, { useEffect, useState } from 'react';
import './IntroAnimation.css';
import useScrollLock from '../hooks/useScrollLock';

const STORAGE_KEY = 'introSeen';

const safeStorage = {
  get: (key) => {
    try { return sessionStorage.getItem(key); } catch { return null; }
  },
  set: (key, value) => {
    try { sessionStorage.setItem(key, value); } catch { /* private mode / disabled */ }
  },
};

const IntroAnimation = () => {
  const [stage, setStage] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    return safeStorage.get(STORAGE_KEY) === '1' ? 'done' : 'initial';
  });

  // Lock scroll while the intro is playing
  useScrollLock(stage !== 'done');

  useEffect(() => {
    if (stage === 'done') return undefined;

    const timers = [
      setTimeout(() => setStage('revealed'), 80),
      setTimeout(() => setStage('holding'), 1100),
      setTimeout(() => setStage('exiting'), 2600),
      setTimeout(() => {
        safeStorage.set(STORAGE_KEY, '1');
        setStage('done');
      }, 3500),
    ];

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`intro-overlay intro-${stage}`} aria-hidden="true">
      <div className="intro-bar intro-bar-top" />
      <div className="intro-bar intro-bar-bottom" />

      <div className="intro-text-wrap">
        <h1 className="intro-text">
          Sumit <span className="intro-text-accent">Kumar</span>
        </h1>
        <div className="intro-line" />
        <p className="intro-subtitle">
          Full-Stack Engineer<span className="intro-blink">_</span>
        </p>
      </div>

      <div className="intro-curtain" />
    </div>
  );
};

export default IntroAnimation;
