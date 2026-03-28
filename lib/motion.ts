/**
 * Centralized Framer Motion variants and helpers.
 * All animations are GPU-accelerated (transform + opacity only).
 * Components should use useReducedMotion() to skip animations if requested.
 */

import type { Variants } from 'framer-motion'

// ─── Easing curves ────────────────────────────────────────────────────────────
export const ease = {
  out:     [0.16, 1, 0.3, 1]    as [number, number, number, number],
  inOut:   [0.4, 0, 0.2, 1]    as [number, number, number, number],
  spring:  { type: 'spring', stiffness: 260, damping: 28 } as const,
  snappy:  { type: 'spring', stiffness: 400, damping: 32 } as const,
}

// ─── Duration tiers ───────────────────────────────────────────────────────────
export const dur = {
  fast:   0.35,
  normal: 0.55,
  slow:   0.75,
}

// ─── Base variants ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
}

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: dur.slow, ease: ease.out } },
}

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: dur.slow, ease: ease.out } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.normal, ease: ease.out } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: dur.normal, ease: ease.out } },
}

// Tag appears with a small upward pop — for staggered skill tags
export const tagPop: Variants = {
  hidden:  { opacity: 0, y: 8, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: ease.out } },
}

// Word reveal — for contact headline split animation
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
}

// ─── Stagger container factory ────────────────────────────────────────────────
/**
 * Returns a variants object that staggers children.
 * @param staggerChildren - delay between each child (default 0.07s)
 * @param delayChildren   - initial delay before first child (default 0s)
 */
export function staggerContainer(
  staggerChildren = 0.07,
  delayChildren   = 0,
): Variants {
  return {
    hidden:  {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

// Pre-built containers for common use cases
export const staggerFast   = staggerContainer(0.05, 0)
export const staggerNormal = staggerContainer(0.09, 0)
export const staggerSlow   = staggerContainer(0.14, 0)
export const staggerTags   = staggerContainer(0.04, 0)

// ─── Viewport defaults ────────────────────────────────────────────────────────
export const viewport = {
  once:   true,
  margin: '-60px 0px',
}

export const viewportEarly = {
  once:   true,
  margin: '-20px 0px',
}
