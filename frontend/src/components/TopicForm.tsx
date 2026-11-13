/** Compact form for adding a topic.
 * It validates before invoking the parent callback.
 * Input remains focused after an invalid attempt. */
import { useState } from "react";
export function TopicForm({ onAdd }: { onAdd(title: string): void }) { const [title, setTitle] = useState(""); const [error, setError] = useState(""); return <form className="flex flex-wrap items-end gap-2" onSubmit={(event) => { event.preventDefault(); if (!title.trim()) { setError("Enter a topic name."); return; } onAdd(title.trim()); setTitle(""); setError(""); }}><label className="grid flex-1 gap-1">Add topic<input className="min-h-11 rounded-lg border border-slate-600 bg-slate-900 px-3" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required /></label><button className="min-h-11 rounded-lg bg-fuchsia-300 px-4 font-semibold text-slate-950" type="submit">Add topic</button>{error && <p role="alert" className="basis-full">{error}</p>}</form>; }
