/** Shared motion tokens for original flight-path interactions.
 * All primitives animate transform and opacity only.
 * Reduced motion is handled in each primitive. */
export const motionTokens = { duration: { fast: 0.18, normal: 0.32, slow: 0.65 }, ease: [0.16, 1, 0.3, 1] as const, spring: { type: "spring", stiffness: 260, damping: 24 } as const };
