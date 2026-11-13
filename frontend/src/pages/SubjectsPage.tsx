/** Subjects CRUD route built from accessible subject contracts.
 * Date and progress values come from the pure core API.
 * Successful changes give concise, live confirmation. */
import { useState } from "react";
import { daysLeft, progressPercent, type Subject } from "../core";
import { useAppStore } from "../store";
import { Reveal } from "../ui";
import { EmptyState } from "../components/EmptyState";
import { SubjectCard } from "../components/SubjectCard";
import { SubjectForm } from "../components/SubjectForm";

export function SubjectsPage() {
  const subjects = useAppStore((state) => state.subjects); const addSubject = useAppStore((state) => state.addSubject);
  const updateSubject = useAppStore((state) => state.updateSubject); const deleteSubject = useAppStore((state) => state.deleteSubject);
  const [message, setMessage] = useState(""); const today = new Date().toISOString().slice(0, 10);
  const create = (name: string, examDate: string) => { const subject: Subject = { id: crypto.randomUUID(), name, examDate, hue: "violet", originalExamDate: null, createdAt: today, topics: [] }; addSubject(subject); setMessage(`${name} added.`); };
  return <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6"><Reveal><header><p className="text-sm uppercase tracking-[.2em] text-fuchsia-300">Study plan</p><h1 className="text-4xl font-semibold">Your subjects</h1><p>Set an exam date, then map the topics you need to land.</p></header></Reveal>
    <section className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:grid-cols-2 sm:items-end"><div><h2 className="text-xl font-semibold">Add a subject</h2><p className="text-slate-300">Start with the next exam on your calendar.</p></div><SubjectForm onSave={create} /></section>
    {message && <p className="text-emerald-300" role="status" aria-live="polite">{message}</p>}
    {subjects.length ? <section className="grid gap-4 md:grid-cols-2">{subjects.map((subject) => <SubjectCard key={subject.id} subject={subject} progress={progressPercent(subject.topics)} days={daysLeft(subject.examDate, today)} onEdit={(name, examDate) => { updateSubject(subject.id, { name, examDate }); setMessage(`${name} updated.`); }} onDelete={() => { deleteSubject(subject.id); setMessage(`${subject.name} deleted.`); }} />)}</section> : <EmptyState onCreate={() => document.querySelector<HTMLInputElement>('input[aria-label="Subject name"]')?.focus()} />}
  </main>;
}
