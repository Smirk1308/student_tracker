/** Number transition that communicates a changed result.
 * It is intentionally brief and interruptible.
 * Use for progress and countdown values only. */
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";
export function CountUp({ value }: { value: number }) { const reduce = useReducedMotion(); const count = useMotionValue(value); const text = useTransform(count, (current) => Math.round(current)); useEffect(() => { if (reduce) { count.set(value); return; } return animate(count, value, { duration: 0.45 }).stop; }, [count, reduce, value]); return <motion.span>{text}</motion.span>; }
