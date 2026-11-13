/** Semantic subject progress display.
 * UI primitive owns animation and ARIA progress semantics.
 * Render the percentage as text as well as visually. */
import { ProgressTrack } from "../ui";
export function ProgressBar({ value, subject }: { value: number; subject: string }) {
  return <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#3d594b]">
      <span>Progress</span>
      <span className="text-sm font-bold text-[#173c2c]">{value}%</span>
    </div>
    <ProgressTrack value={value} label={`${subject} progress`} />
  </div>;
}
