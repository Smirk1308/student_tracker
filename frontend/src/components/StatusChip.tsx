/** Text-labelled load status indicator.
 * Status is never represented by color alone.
 * Parent provides the pure domain status. */
import type { LoadStatus } from "../core";
export function StatusChip({ status }: { status: LoadStatus }) {
  const styles: Record<LoadStatus, string> = {
    comfortable: "bg-[#e5f0e7] text-[#1b5e3f] border-[#b8dfc4]",
    tight: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
    "at-risk": "bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]",
    overdue: "bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]",
    done: "bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold capitalize ${styles[status] ?? "border-[#dce4dc] bg-white text-[#52675b]"}`}>{status.replace("-", " ")}</span>;
}
