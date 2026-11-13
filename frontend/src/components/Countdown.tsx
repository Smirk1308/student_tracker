/** Countdown contract with accessible revised-date text.
 * Caller supplies domain-calculated calendar days.
 * It never computes dates in the view layer. */
import { CountUp } from "../ui";
export function Countdown({ days, revised }: { days: number; revised: boolean }) {
  return <div className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium ${revised ? "bg-[#fff1ed] text-[#c2410c] border border-[#ffcfc0]" : "bg-[#f0f6f1] text-[#24533a]"}`} aria-live="polite">
    <span className="text-xs uppercase tracking-wider">{revised ? "⚡ Revised flight date" : "Scheduled landing"}</span>
    <span className="font-bold tabular-nums"><CountUp value={days} /> {days === 1 ? "day left" : "days left"}</span>
  </div>;
}
