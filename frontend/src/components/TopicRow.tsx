/** Single topic action row.
 * Completion uses a native checkbox for keyboard support.
 * Parent supplies mutations to keep state centralized. */
import type { Topic } from "../core";
import { useState } from "react";
export function TopicRow({ topic, onToggle, onDelete, onRename }: { topic: Topic; onToggle(): void; onDelete(): void; onRename(title: string): void }) {
  const [editing, setEditing] = useState(false); const [title, setTitle] = useState(topic.title);
  return <li className={`flex flex-wrap items-center gap-3 rounded-xl border p-3 ${topic.done ? "border-slate-700 opacity-70" : "border-fuchsia-400/50 bg-fuchsia-950/20"}`}>
    <label className="flex min-h-11 flex-1 items-center gap-3"><input type="checkbox" checked={topic.done} onChange={onToggle} /><span className={topic.done ? "line-through" : ""}>{topic.title}</span></label>
    {editing ? <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); if (title.trim()) { onRename(title.trim()); setEditing(false); } }}><label className="sr-only" htmlFor={`rename-${topic.id}`}>Rename {topic.title}</label><input id={`rename-${topic.id}`} className="min-h-11 rounded border bg-slate-900 px-2" value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} /><button type="submit">Save</button><button type="button" onClick={() => setEditing(false)}>Cancel</button></form> : <button onClick={() => setEditing(true)}>Rename</button>}
    <button className="text-rose-300" onClick={onDelete} aria-label={`Delete ${topic.title}`}>Delete</button>
  </li>;
}
