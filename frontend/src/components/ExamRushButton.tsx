/** One-click trigger for the required exam-rush simulation.
 * It names the consequence before activation.
 * Caller supplies the state mutation. */
import { Magnetic } from "../ui";
export function ExamRushButton({ onRush, disabled }: { onRush(): void; disabled?: boolean }) {
  return <Magnetic className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#c2410c] px-5 font-semibold text-white shadow-sm transition-all hover:bg-[#9a3412] active:scale-[0.98] disabled:opacity-50" onClick={onRush} disabled={disabled}>
    <span aria-hidden="true">⚡</span>
    <span>Move next exam 3 days earlier</span>
  </Magnetic>;
}
