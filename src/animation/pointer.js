/**
 * Check if the current device has a fine pointer (mouse / trackpad)
 */
export const hasFinePointer = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
};
