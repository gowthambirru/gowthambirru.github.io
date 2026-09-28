// Primary ease — smooth deceleration with a slight bounce feel
export const sequenceEase = [0.16, 1, 0.3, 1];

// Secondary ease — snappier for UI feedback (button presses, toggles)
export const uiEase = [0.32, 0.72, 0, 1];

// Spring-like transition for reveal animations
export const sequenceTransition = { duration: 0.55, ease: sequenceEase };

// Faster transition for interactive UI feedback
export const uiTransition = { duration: 0.32, ease: uiEase };

// Spring physics for bouncy interactions (hover, press)
export const springTransition = { type: 'spring', stiffness: 260, damping: 25, mass: 0.8 };

// Gentle spring for large elements (cards, panels)
export const gentleSpring = { type: 'spring', stiffness: 120, damping: 20, mass: 1 };

// Stagger config for lists
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export function goToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
}
