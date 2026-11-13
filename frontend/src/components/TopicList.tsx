/** Ordered topic list preserves syllabus order.
 * It delegates individual mutations to TopicRow.
 * Unfinished state is also exposed in text. */
import type { Topic } from "../core";
import { TopicRow } from "./TopicRow";
export function TopicList({ topics, onToggle, onDelete, onRename }: { topics: Topic[]; onToggle(id: string): void; onDelete(id: string): void; onRename(id: string, title: string): void }) { return <ul className="grid gap-2">{topics.map((topic) => <TopicRow key={topic.id} topic={topic} onToggle={() => onToggle(topic.id)} onDelete={() => onDelete(topic.id)} onRename={(title) => onRename(topic.id, title)} />)}</ul>; }
