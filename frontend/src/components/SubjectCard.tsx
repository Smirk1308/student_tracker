/** Summary card contract for one subject.
 * It consumes already-calculated facts from the caller.
 * Actions remain explicit and keyboard-operable. */
import type { Subject } from "../core";
import { ProgressTrack } from "../ui";
import { SubjectForm } from "./SubjectForm";
export function SubjectCard({ subject, progress, days, onEdit, onDelete }: { subject: Subject; progress: number; days: number; onEdit(name: string, date: string): void; onDelete(): void }) {
  return <article className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
    <div><h2 className="text-xl font-semibold">{subject.name}</h2><p>{days < 0 ? `${Math.abs(days)} days overdue` : `${days} days to exam`}</p></div>
    <p>{progress}% complete</p><ProgressTrack value={progress} label={`${subject.name} progress`} />
    <details><summary className="min-h-11 cursor-pointer py-2">Edit subject</summary><SubjectForm key={`${subject.name}-${subject.examDate}`} onSave={onEdit} initialName={subject.name} initialDate={subject.examDate} submitLabel="Save changes" /></details>
    <button className="min-h-11 justify-self-start text-rose-300 underline" onClick={onDelete}>Delete subject</button>
  </article>;
}
