/** Rush-impact summary for revised planning facts.
 * Values are supplied by the core priority calculation.
 * This makes the simulation explainable to judges. */
import type { LoadResult } from "../core";
import { StatusChip } from "./StatusChip";

export function ImpactPanel({ before, after, status }: { before: number; after: number; status: LoadResult | null }) {
  return <aside className="rounded-2xl border border-[#b8dfc4] bg-[#f0f8f1] p-5 shadow-xs" aria-live="polite">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-[#173c2c]">Rush Impact Analysis</h2>
      {status && <StatusChip status={status.status} />}
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <div className="rounded-xl bg-white/80 p-3 border border-[#dce4dc]">
        <p className="text-xs text-[#52675b]">Original pace</p>
        <p className="text-lg font-bold text-[#173c2c]">{before.toFixed(1)} <span className="text-xs font-normal">topics/day</span></p>
      </div>
      <div className="rounded-xl bg-white/80 p-3 border border-[#dce4dc]">
        <p className="text-xs text-[#52675b]">Rushed pace</p>
        <p className="text-lg font-bold text-[#c2410c]">{after.toFixed(1)} <span className="text-xs font-normal">topics/day</span></p>
      </div>
    </div>
    <p className="mt-3 text-xs text-[#52675b]">
      {status ? `Load condition: ${status.status.replace("-", " ")} (${status.remaining} topics remaining with ${status.daysLeft} days to exam)` : "No upcoming exam"}
    </p>
  </aside>;
}
