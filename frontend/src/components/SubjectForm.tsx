/** Validated subject form contract.
 * Parent controls save behavior and generated identifiers.
 * Labels remain visible for accessible form use. */
import { useState } from "react";
export function SubjectForm({ onSave, initialName = "", initialDate = "", submitLabel = "Add subject" }: { onSave(name: string, examDate: string): void; initialName?: string; initialDate?: string; submitLabel?: string }) {
  const [name, setName] = useState(initialName); const [date, setDate] = useState(initialDate); const [error, setError] = useState("");
  return <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); if (!name.trim() || !date) { setError("Enter a subject name and exam date."); return; } onSave(name.trim(), date); setName(""); setDate(""); setError(""); }}>
    <label className="grid gap-1 text-xs font-semibold uppercase tracking-[.18em] text-[#3d594b]">Subject name<input className="min-h-11 rounded-xl border border-[#dce4dc] bg-[#fafbf9] px-3.5 text-base text-[#173c2c] placeholder:text-[#8ba293] focus:border-[#176543] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176543]/20" placeholder="e.g. Operating Systems" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} aria-describedby={error ? "subject-error" : undefined} /></label>
    <label className="grid gap-1 text-xs font-semibold uppercase tracking-[.18em] text-[#3d594b]">Exam date<input className="min-h-11 rounded-xl border border-[#dce4dc] bg-[#fafbf9] px-3.5 text-base text-[#173c2c] focus:border-[#176543] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176543]/20" type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
    {error && <p id="subject-error" role="alert" className="text-sm font-medium text-[#9d343c]">{error}</p>}
    <button className="min-h-11 rounded-xl bg-[#176543] px-5 font-semibold text-white transition-colors hover:bg-[#145337] active:scale-[0.98]" type="submit">{submitLabel}</button>
  </form>;
}
