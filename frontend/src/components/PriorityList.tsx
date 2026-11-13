/** Ordered proposed study priorities.
 * Syllabus order is preserved inside each subject.
 * Reasons keep ranking understandable. */
import type { PriorityItem } from "../core";
export function PriorityList({ items, titles }: { items: PriorityItem[]; titles: Record<string, string> }) { return <ol className="grid gap-2">{items.map((item) => <li className="rounded-lg border border-amber-300/40 bg-amber-950/20 p-3" key={item.topicId}><b>#{item.rank} {titles[item.topicId] ?? "Untitled topic"}</b><p>{item.reason}</p></li>)}</ol>; }
