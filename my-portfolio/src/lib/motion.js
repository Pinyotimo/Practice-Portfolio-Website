/* Shared motion vocabulary.
   One easing curve, one duration scale, one set of entrance variants —
   so every section on the page moves the same way. */

export const EASE = [0.22, 0.61, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

/* A section drifting into place. */
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* A card in a list, revealed one after another. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* Props shared by every scroll-triggered section. */
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.15 },
};
