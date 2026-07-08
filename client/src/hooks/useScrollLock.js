import { useEffect } from 'react';

/**
 * Reference-counted body scroll lock.
 *
 * Multiple overlays (project modal, mobile nav, intro animation) can request a
 * lock at the same time without stomping on each other. The page is only
 * unlocked once every requester has released, and the original inline styles are
 * restored exactly — so smooth scrolling and scroll position keep working after
 * everything closes.
 */
let lockCount = 0;
let saved = null;

const lock = () => {
  if (lockCount === 0) {
    const { body, documentElement: html } = document;
    // With `html { overflow-x: hidden }` the <html> element is the real scroll
    // container, so it must be locked too — locking <body> alone does nothing.
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    saved = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    // Compensate for the disappearing scrollbar so content doesn't shift.
    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }
  lockCount += 1;
};

const unlock = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && saved) {
    const { body, documentElement: html } = document;
    html.style.overflow = saved.htmlOverflow;
    body.style.overflow = saved.bodyOverflow;
    body.style.touchAction = saved.bodyTouchAction;
    body.style.paddingRight = saved.bodyPaddingRight;
    saved = null;
  }
};

const useScrollLock = (active = true) => {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return unlock;
  }, [active]);
};

export default useScrollLock;
