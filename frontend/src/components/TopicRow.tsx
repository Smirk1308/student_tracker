/** Single topic action row.
 * Completion uses a native checkbox for keyboard support.
 * Parent supplies mutations to keep state centralized. */
import type { Topic } from "../core";
import { useState } from "react";
export function TopicRow({ topic, onToggle, onDelete, onRename }: { topic: Topic; onToggle(): void; onDelete(): void; onRename(title: string): void }) {
  const [editing, setEditing] = useState(false); const [title, setTitle] = useState(topic.title);
  return <li className={`flex flex-wrap items-center gap-3 rounded-xl border p-3.5 transition-colors ${topic.done ? "border-[#dce4dc] bg-[#f9faf8] text-[#71877b]" : "border-[#c4d7c6] bg-white text-[#173c2c] shadow-xs"}`}>
    <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
      <input type="checkbox" className="h-5 w-5 rounded border-[#9ab7a2] accent-[#176543]" checked={topic.done} onChange={onToggle} />
      <span className={`text-base ${topic.done ? "line-through text-[#7c9185]" : "font-medium text-[#173c2c]"}`}>{topic.title}</span>
    </label>
    {editing ? (
      <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); if (title.trim()) { onRename(title.trim()); setEditing(false); } }}>
        <label className="sr-only" htmlFor={`rename-${topic.id}`}>Rename {topic.title}</label>
        <input id={`rename-${topic.id}`} className="min-h-9 rounded-lg border border-[#dce4dc] bg-white px-2.5 text-sm text-[#173c2c] focus:border-[#176543] focus:outline-none" value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} />
        <button className="rounded-lg bg-[#176543] px-3 py-1.5 text-xs font-semibold text-white" type="submit">Save</button>
        <button className="rounded-lg border border-[#dce4dc] px-3 py-1.5 text-xs font-medium text-[#52675b]" type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    ) : (
      <button className="min-h-9 rounded-lg px-2.5 py-1 text-xs font-medium text-[#3b664d] hover:bg-[#eef5ee]" onClick={() => setEditing(true)}>Rename</button>
    )}
    <button className="min-h-9 rounded-lg px-2.5 py-1 text-xs font-medium text-[#9d343c] hover:bg-[#fdf2f2]" onClick={onDelete} aria-label={`Delete ${topic.title}`}>Delete</button>
  </li>;
}
