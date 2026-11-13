/** Entrance primitive for short, meaningful content reveals.
 * It respects reduced-motion without changing final layout.
 * Use for headings, cards, and only one sequence per view. */
import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { motionTokens } from "./motion";
export function Reveal({ children }: PropsWithChildren) { const reduce = useReducedMotion(); return <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}>{children}</motion.div>; }
