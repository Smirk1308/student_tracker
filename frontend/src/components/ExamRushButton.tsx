/** One-click trigger for the required exam-rush simulation.
 * It names the consequence before activation.
 * Caller supplies the state mutation. */
import { Magnetic } from "../ui";
export function ExamRushButton({ onRush, disabled }: { onRush(): void; disabled?: boolean }) { return <Magnetic className="rounded-xl bg-amber-300 px-4 font-semibold text-slate-950 disabled:opacity-50" onClick={onRush} disabled={disabled}>Move next exam 3 days earlier</Magnetic>; }
