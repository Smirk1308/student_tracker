/** Subjects CRUD route built from accessible subject contracts.
 * Date and progress values come from the pure core API.
 * Successful changes give concise, live confirmation. */
import { useState } from "react";
import { daysLeft, priorityOrder, progressPercent, type Subject } from "../core";
import { useAppStore } from "../store";
import { Reveal } from "../ui";
import { EmptyState } from "../components/EmptyState";
import { SubjectCard } from "../components/SubjectCard";
import { SubjectForm } from "../components/SubjectForm";
import { TopicForm } from "../components/TopicForm";
import { TopicList } from "../components/TopicList";
import { Countdown } from "../components/Countdown";
import { ProgressBar } from "../components/ProgressBar";
import { ExamRushButton } from "../components/ExamRushButton";
import { ImpactPanel } from "../components/ImpactPanel";
import { PriorityList } from "../components/PriorityList";
import { UndoToast } from "../components/UndoToast";

export function SubjectsPage() {
  const subjects = useAppStore((state) => state.subjects); const addSubject = useAppStore((state) => state.addSubject);
  const updateSubject = useAppStore((state) => state.updateSubject); const deleteSubject = useAppStore((state) => state.deleteSubject);
  const addTopic = useAppStore((state) => state.addTopic); const renameTopic = useAppStore((state) => state.renameTopic);
  const toggleTopic = useAppStore((state) => state.toggleTopic); const deleteTopic = useAppStore((state) => state.deleteTopic);
  const rush = useAppStore((state) => state.rushNextExam); const restoreExam = useAppStore((state) => state.restoreExam); const undo = useAppStore((state) => state.undo);
  const [message, setMessage] = useState(""); const [showUndo, setShowUndo] = useState(false); const [rushImpact, setRushImpact] = useState<ReturnType<typeof priorityOrder> | null>(null); const today = new Date().toISOString().slice(0, 10);
  const rushedSubject = subjects.find((subject) => subject.originalExamDate !== null);
  const impact = rushImpact ?? priorityOrder(subjects, useAppStore.getState().settings.capacityPerDay, today);
  const titleMap = Object.fromEntries(subjects.flatMap((subject) => subject.topics.map((topic) => [topic.id, topic.title])));
  const create = (name: string, examDate: string) => { const subject: Subject = { id: crypto.randomUUID(), name, examDate, hue: "violet", originalExamDate: null, createdAt: today, topics: [] }; addSubject(subject); setMessage(`${name} added.`); };
  return <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6"><Reveal><header><p className="text-sm uppercase tracking-[.2em] text-fuchsia-300">Study plan</p><h1 className="text-4xl font-semibold">Your subjects</h1><p>Set an exam date, then map the topics you need to land.</p></header></Reveal>
    <section className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:grid-cols-2 sm:items-end"><div><h2 className="text-xl font-semibold">Add a subject</h2><p className="text-slate-300">Start with the next exam on your calendar.</p></div><SubjectForm onSave={create} /></section>
    {message && <p className="text-emerald-300" role="status" aria-live="polite">{message}</p>}
    <section className="grid gap-3 rounded-2xl border border-amber-300/40 p-4"><div><h2 className="text-lg font-semibold">Exam moved sooner?</h2><p>Preview a three-day rush and get a simple priority order.</p></div><ExamRushButton disabled={!subjects.length} onRush={() => { setRushImpact(priorityOrder(subjects, useAppStore.getState().settings.capacityPerDay, today)); rush(today); setMessage("Exam moved earlier. Unfinished topics are highlighted and priorities are ready."); setShowUndo(true); }} />{rushedSubject && <><button className="min-h-11 justify-self-start underline" onClick={() => { restoreExam(rushedSubject.id); setRushImpact(null); setMessage("Original exam date restored."); }}>Restore original exam date</button><ImpactPanel before={impact.before} after={impact.after} status={impact.loadStatus} /><h3 className="font-semibold">Priority order</h3><PriorityList items={impact.items} titles={titleMap} /></>}</section>
    <UndoToast visible={showUndo} message={message} onUndo={() => { undo(); setShowUndo(false); setMessage("Last change undone."); }} />
    {subjects.length ? <section className="grid gap-4">{subjects.map((subject) => <Reveal key={subject.id}><div className="grid gap-5 rounded-2xl border border-slate-700 p-4 sm:p-6"><SubjectCard subject={subject} progress={progressPercent(subject.topics)} days={daysLeft(subject.examDate, today)} onEdit={(name, examDate) => { updateSubject(subject.id, { name, examDate }); setMessage(`${name} updated.`); }} onDelete={() => { deleteSubject(subject.id); setMessage(`${subject.name} deleted.`); }} /><section className="grid gap-2 rounded-xl bg-slate-950/50 p-4"><ProgressBar value={progressPercent(subject.topics)} subject={subject.name} /><Countdown days={daysLeft(subject.examDate, today)} revised={Boolean(subject.originalExamDate)} /></section><section className="grid gap-3"><h3 className="text-lg font-semibold">Topics</h3><TopicForm onAdd={(title) => { addTopic(subject.id, title, crypto.randomUUID()); setMessage(`Topic ${title} added to ${subject.name}.`); }} /><TopicList topics={subject.topics} onToggle={(id) => { toggleTopic(subject.id, id, new Date().toISOString()); setMessage("Topic completion updated."); }} onDelete={(id) => { deleteTopic(subject.id, id); setMessage("Topic deleted."); }} onRename={(id, title) => { renameTopic(subject.id, id, title); setMessage("Topic renamed."); }} /></section></div></Reveal>)}</section> : <EmptyState onCreate={() => document.querySelector<HTMLInputElement>('input')?.focus()} />}
  </main>;
}
