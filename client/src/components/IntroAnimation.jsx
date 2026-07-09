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

  useScrollLock(stage !== 'done');

  useEffect(() => {
    if (stage === 'done') return undefined;

    const timers = [
      setTimeout(() => setStage('revealed'), 80),
      setTimeout(() => setStage('holding'), 900),
      setTimeout(() => setStage('exiting'), 1050),
      setTimeout(() => {
        safeStorage.set(STORAGE_KEY, '1');
        setStage('done');
      }, 1450),
    ];

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`intro-overlay intro-${stage}`} aria-hidden="true">
      <div className="intro-backdrop">
        <div className="intro-grid" />
        <div className="intro-orb intro-orb-a" />
        <div className="intro-orb intro-orb-b" />
        <div className="intro-scanline" />
      </div>

      <div className="intro-shell">
        <div className="intro-card">
          <div className="intro-card-chrome">
            <span className="intro-dot intro-dot-red" />
            <span className="intro-dot intro-dot-amber" />
            <span className="intro-dot intro-dot-green" />
            <span className="intro-chrome-label">sumit@portfolio — boot</span>
          </div>

          <div className="intro-card-content">
            <p className="intro-eyebrow">Portfolio / 00</p>
            <h1 className="intro-title">
              Sumit <span className="intro-title-accent">Kumar</span>
            </h1>
            <p className="intro-role">
              Full-Stack Engineer
              <span className="intro-cursor" />
            </p>

            <div className="intro-loader">
              <div className="intro-loader-track">
                <div className="intro-loader-fill" />
              </div>
              <span className="intro-loader-label">Loading systems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
