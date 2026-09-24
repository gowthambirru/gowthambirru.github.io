export const sequenceEase = [0.22, 1, 0.36, 1];
export const sequenceTransition = { duration: 0.48, ease: sequenceEase };

export function goToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
}
