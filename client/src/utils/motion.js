// Shared framer-motion presets replacing the old AOS scroll animations.
// Spread onto a motion.* element: <motion.div {...fadeUp(100)}>
const viewport = { once: true, amount: 0.2 };

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay: delay / 1000 },
  viewport,
});

export const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay: delay / 1000 },
  viewport,
});

export const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay: delay / 1000 },
  viewport,
});
