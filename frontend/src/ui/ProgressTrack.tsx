/** Accessible progress visual driven by an explicit percentage.
 * Width is never animated; transform preserves smooth rendering.
 * Use alongside visible numeric progress. */
import { motion, useReducedMotion } from "framer-motion";
export function ProgressTrack({ value, label }: { value: number; label: string }) { const reduce = useReducedMotion(); const safe = Math.min(100, Math.max(0, value)); return <div className="h-3 overflow-hidden rounded-full bg-[#dce7dd]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe}><motion.div className="h-full origin-left rounded-full bg-[#176543]" initial={false} animate={{ scaleX: safe / 100 }} transition={reduce ? { duration: 0 } : { duration: 0.45 }} /></div>; }
