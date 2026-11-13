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
import { TopicForm } from "../components/TopicForm";
import { TopicList } from "../components/TopicList";
import { Countdown } from "../components/Countdown";
import { ProgressBar } from "../components/ProgressBar";

export function SubjectsPage() {
  const subjects = useAppStore((state) => state.subjects); const addSubject = useAppStore((state) => state.addSubject);
  const updateSubject = useAppStore((state) => state.updateSubject); const deleteSubject = useAppStore((state) => state.deleteSubject);
  const addTopic = useAppStore((state) => state.addTopic); const renameTopic = useAppStore((state) => state.renameTopic);
  const toggleTopic = useAppStore((state) => state.toggleTopic); const deleteTopic = useAppStore((state) => state.deleteTopic);
  const [message, setMessage] = useState(""); const today = new Date().toISOString().slice(0, 10);
  const create = (name: string, examDate: string) => { const subject: Subject = { id: crypto.randomUUID(), name, examDate, hue: "violet", originalExamDate: null, createdAt: today, topics: [] }; addSubject(subject); setMessage(`${name} added.`); };
  return <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6"><Reveal><header><p className="text-sm uppercase tracking-[.2em] text-fuchsia-300">Study plan</p><h1 className="text-4xl font-semibold">Your subjects</h1><p>Set an exam date, then map the topics you need to land.</p></header></Reveal>
    <section className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:grid-cols-2 sm:items-end"><div><h2 className="text-xl font-semibold">Add a subject</h2><p className="text-slate-300">Start with the next exam on your calendar.</p></div><SubjectForm onSave={create} /></section>
    {message && <p className="text-emerald-300" role="status" aria-live="polite">{message}</p>}
    {subjects.length ? <section className="grid gap-4">{subjects.map((subject) => <Reveal key={subject.id}><div className="grid gap-5 rounded-2xl border border-slate-700 p-4 sm:p-6"><SubjectCard subject={subject} progress={progressPercent(subject.topics)} days={daysLeft(subject.examDate, today)} onEdit={(name, examDate) => { updateSubject(subject.id, { name, examDate }); setMessage(`${name} updated.`); }} onDelete={() => { deleteSubject(subject.id); setMessage(`${subject.name} deleted.`); }} /><section className="grid gap-2 rounded-xl bg-slate-950/50 p-4"><ProgressBar value={progressPercent(subject.topics)} subject={subject.name} /><Countdown days={daysLeft(subject.examDate, today)} revised={Boolean(subject.originalExamDate)} /></section><section className="grid gap-3"><h3 className="text-lg font-semibold">Topics</h3><TopicForm onAdd={(title) => { addTopic(subject.id, title, crypto.randomUUID()); setMessage(`Topic ${title} added to ${subject.name}.`); }} /><TopicList topics={subject.topics} onToggle={(id) => { toggleTopic(subject.id, id, new Date().toISOString()); setMessage("Topic completion updated."); }} onDelete={(id) => { deleteTopic(subject.id, id); setMessage("Topic deleted."); }} onRename={(id, title) => { renameTopic(subject.id, id, title); setMessage("Topic renamed."); }} /></section></div></Reveal>)}</section> : <EmptyState onCreate={() => document.querySelector<HTMLInputElement>('input')?.focus()} />}
  </main>;
}
