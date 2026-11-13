/** Lightweight visual offset wrapper for decorative artwork.
 * Do not use it for essential information or controls.
 * Reduced-motion users receive a static result. */
import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
export function Parallax({ children }: PropsWithChildren) { const reduce = useReducedMotion(); return <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>; }
