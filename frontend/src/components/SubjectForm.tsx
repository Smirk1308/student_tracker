/** Validated subject form contract.
 * Parent controls save behavior and generated identifiers.
 * Labels remain visible for accessible form use. */
import { useState } from "react";
export function SubjectForm({ onSave, initialName = "", initialDate = "", submitLabel = "Add subject" }: { onSave(name: string, examDate: string): void; initialName?: string; initialDate?: string; submitLabel?: string }) {
  const [name, setName] = useState(initialName); const [date, setDate] = useState(initialDate); const [error, setError] = useState("");
  return <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); if (!name.trim() || !date) { setError("Enter a subject name and exam date."); return; } onSave(name.trim(), date); setName(""); setDate(""); setError(""); }}>
    <label className="grid gap-1">Subject name<input className="min-h-11 rounded-lg border border-slate-600 bg-slate-900 px-3" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} aria-describedby={error ? "subject-error" : undefined} /></label>
    <label className="grid gap-1">Exam date<input className="min-h-11 rounded-lg border border-slate-600 bg-slate-900 px-3" type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
    {error && <p id="subject-error" role="alert">{error}</p>}<button className="rounded-lg bg-amber-300 px-4 font-semibold text-slate-950" type="submit">{submitLabel}</button>
  </form>;
}
