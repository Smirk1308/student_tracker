/** Ordered proposed study priorities.
 * Syllabus order is preserved inside each subject.
 * Reasons keep ranking understandable. */
import type { PriorityItem } from "../core";
export function PriorityList({ items, titles }: { items: PriorityItem[]; titles: Record<string, string> }) {
  return <ol className="grid gap-2.5">
    {items.map((item) => (
      <li className="flex items-start justify-between gap-3 rounded-xl border border-[#dce4dc] bg-white p-3.5 shadow-xs" key={item.topicId}>
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e5f0e7] text-xs font-bold text-[#176543]">#{item.rank}</span>
            <b className="text-sm font-semibold text-[#173c2c]">{titles[item.topicId] ?? "Untitled topic"}</b>
          </div>
          <p className="mt-1 pl-8 text-xs text-[#52675b]">{item.reason}</p>
        </div>
      </li>
    ))}
  </ol>;
}
