/** Route-level fade and lift transition.
 * Routes remain immediately interactive while animating.
 * Use once around route outlet content. */
import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
export function PageTransition({ children }: PropsWithChildren) { const reduce = useReducedMotion(); return <motion.main initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>{children}</motion.main>; }
