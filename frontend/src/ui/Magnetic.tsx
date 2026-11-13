/** Subtle press feedback for a single prominent control.
 * It never changes surrounding layout.
 * Use sparingly on calls to action. */
import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
export function Magnetic({ children, ...props }: HTMLMotionProps<"button">) { const reduce = useReducedMotion(); return <motion.button whileHover={reduce ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props}>{children}</motion.button>; }
