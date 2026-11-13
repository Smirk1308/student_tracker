/** Feature flags keep optional surfaces independently switchable.
 * Judge-path features stay enabled in every build.
 * Tier three remains disabled until intentionally implemented. */
export const features = { subjects: true, examRush: true, settings: true, heatmap: false, focusTimer: false, bulkPaste: false, plan: false } as const;
