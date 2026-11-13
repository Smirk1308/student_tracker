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

const studyPhoto = "https://images.pexels.com/photos/5588404/pexels-photo-5588404.jpeg?auto=compress&cs=tinysrgb&w=1200";

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
  return <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6"><Reveal><header className="overflow-hidden rounded-[2rem] border border-[#dce4dc] bg-white shadow-sm"><div className="grid md:grid-cols-[1.08fr_.92fr]"><div className="p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#26704d]">Study runway</p><h1 className="mt-3 text-4xl font-semibold text-[#173c2c] sm:text-5xl">Map every subject<br />before takeoff.</h1><p className="mt-4 max-w-xl leading-7 text-[#52675b]">Create your subjects, divide them into topics, and keep the next exam calmly in view.</p><div className="mt-6 flex gap-5 text-sm"><span><b className="text-xl text-[#173c2c]">{subjects.length}</b> subjects</span><span><b className="text-xl text-[#173c2c]">{subjects.flatMap((subject) => subject.topics).filter((topic) => topic.done).length}</b> topics cleared</span></div></div><img className="h-56 w-full object-cover md:h-full" src={studyPhoto} alt="Student study desk with notebook and learning materials" /></div></header></Reveal>
    <section className="grid gap-5 rounded-2xl border border-[#dce4dc] bg-white p-6 shadow-sm lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#26704d]">New subject</p><h2 className="mt-2 text-2xl font-semibold text-[#173c2c]">Give your next exam a runway.</h2><p className="mt-2 text-[#52675b]">A subject becomes a focused sequence of topics.</p></div><SubjectForm onSave={create} /></section>
    {message && <p className="rounded-xl border border-[#b8dfc4] bg-[#e6f4ea] px-4 py-2.5 text-sm font-semibold text-[#176543] shadow-xs" role="status" aria-live="polite">{message}</p>}
    <section className="grid gap-4 rounded-[2rem] border border-[#9ab7a2] bg-[#e8f1e9] p-6 sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#26704d]">Change in plan</p><h2 className="mt-2 text-2xl font-semibold text-[#173c2c]">Exam moved sooner?</h2><p className="mt-1 text-[#52675b]">Preview a three-day rush and get a simple, usable priority order.</p></div><ExamRushButton disabled={!subjects.length} onRush={() => { setRushImpact(priorityOrder(subjects, useAppStore.getState().settings.capacityPerDay, today)); rush(today); setMessage("Exam moved earlier. Unfinished topics are highlighted and priorities are ready."); setShowUndo(true); }} /></div>{rushedSubject && <div className="mt-2 grid gap-4 lg:grid-cols-[.85fr_1.15fr]"><div><button className="mb-3 inline-flex min-h-11 items-center rounded-xl border border-[#b8dfc4] bg-white px-4 text-xs font-semibold uppercase tracking-wider text-[#176543] shadow-xs hover:bg-[#f6f9f6]" onClick={() => { restoreExam(rushedSubject.id); setRushImpact(null); setMessage("Original exam date restored."); }}>↺ Restore original exam date</button><ImpactPanel before={impact.before} after={impact.after} status={impact.loadStatus} /></div><div><h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#173c2c]">Priority study order</h3><PriorityList items={impact.items} titles={titleMap} /></div></div>}</section>
    <UndoToast visible={showUndo} message={message} onUndo={() => { undo(); setShowUndo(false); setMessage("Last change undone."); }} />
    {subjects.length ? <section className="grid gap-5">{subjects.map((subject) => <Reveal key={subject.id}><div className="grid gap-6 rounded-[2rem] border border-[#dce4dc] bg-white p-5 shadow-sm sm:p-7"><div className="grid gap-5 lg:grid-cols-[.76fr_1.24fr]"><SubjectCard subject={subject} progress={progressPercent(subject.topics)} days={daysLeft(subject.examDate, today)} onEdit={(name, examDate) => { updateSubject(subject.id, { name, examDate }); setMessage(`${name} updated.`); }} onDelete={() => { deleteSubject(subject.id); setMessage(`${subject.name} deleted.`); }} /><section className="grid gap-3 rounded-2xl bg-[#f3f7f2] p-5"><ProgressBar value={progressPercent(subject.topics)} subject={subject.name} /><Countdown days={daysLeft(subject.examDate, today)} revised={Boolean(subject.originalExamDate)} /></section></div><section className="grid gap-3 border-t border-[#e2e9e2] pt-6"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-[#173c2c]">Topics</h3><span className="rounded-full bg-[#e5f0e7] px-3 py-1 text-sm text-[#286448]">{subject.topics.filter((topic) => !topic.done).length} to go</span></div><TopicForm onAdd={(title) => { addTopic(subject.id, title, crypto.randomUUID()); setMessage(`Topic ${title} added to ${subject.name}.`); }} /><TopicList topics={subject.topics} onToggle={(id) => { toggleTopic(subject.id, id, new Date().toISOString()); setMessage("Topic completion updated."); }} onDelete={(id) => { deleteTopic(subject.id, id); setMessage("Topic deleted."); }} onRename={(id, title) => { renameTopic(subject.id, id, title); setMessage("Topic renamed."); }} /></section></div></Reveal>)}</section> : <EmptyState onCreate={() => document.querySelector<HTMLInputElement>('input')?.focus()} />}
  </main>;
}
