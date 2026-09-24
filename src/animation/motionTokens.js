/**
 * Centralized motion tokens for the NLE portfolio experience.
 * Deliberate, calibrated durations and easings inspired by professional video editing transitions.
 */

export const DURATION = {
  instant: 0.12,
  fast: 0.22,
  ui: 0.32,
  standard: 0.48,
  section: 0.72,
  cinematic: 0.95
};

export const EASE = {
  // Snappy responsive UI ease
  out: "power3.out",
  // Symmetrical state transitions
  inOut: "power3.inOut",
  // Dramatic editorial cut
  expo: "expo.out",
  // Custom video-shutter / editorial deceleration
  editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
  // Immediate deceleration for playheads and transport controls
  snap: "power4.out"
};

export const STAGGER = {
  rapid: 0.04,
  standard: 0.08,
  deliberate: 0.14
};
