/** Summary card contract for one subject.
 * It consumes already-calculated facts from the caller.
 * Actions remain explicit and keyboard-operable. */
import type { Subject } from "../core";
import { ProgressTrack } from "../ui";
import { SubjectForm } from "./SubjectForm";
export function SubjectCard({ subject, progress, days, onEdit, onDelete }: { subject: Subject; progress: number; days: number; onEdit(name: string, date: string): void; onDelete(): void }) {
  return <article className="grid gap-4 rounded-2xl border border-[#dce4dc] bg-white p-5">
    <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#26704d]">Subject flight</p><h2 className="mt-2 text-xl font-semibold text-[#173c2c]">{subject.name}</h2><p className="mt-1 text-[#52675b]">{days < 0 ? `${Math.abs(days)} days overdue` : `${days} days to exam`}</p></div><span className="grid h-12 w-12 place-items-center rounded-full bg-[#e5f0e7] text-lg text-[#205a40]">↗</span></div>
    <p className="text-sm text-[#52675b]"><b className="text-xl text-[#173c2c]">{progress}%</b> complete</p><ProgressTrack value={progress} label={`${subject.name} progress`} />
    <details><summary className="min-h-11 cursor-pointer py-2">Edit subject</summary><SubjectForm key={`${subject.name}-${subject.examDate}`} onSave={onEdit} initialName={subject.name} initialDate={subject.examDate} submitLabel="Save changes" /></details>
    <button className="min-h-11 justify-self-start text-[#9d343c] underline" onClick={onDelete}>Delete subject</button>
  </article>;
}
