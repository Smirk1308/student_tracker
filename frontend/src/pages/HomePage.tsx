/** Cinematic study-flight home inspired by immersive mission pages.
 * The hero moves directly into the working syllabus in one click.
 * All progress and countdown values come from pure core functions. */
import { Link } from "react-router-dom";
import { daysLeft, progressPercent } from "../core";
import { useAppStore } from "../store";
import { ProgressTrack, Reveal, RunwayScene, ScrollSection } from "../ui";
import { JudgePath } from "../components/JudgePath";

export function HomePage() {
  const subjects = useAppStore((state) => state.subjects);
  const today = new Date().toISOString().slice(0, 10);
  const next = subjects.filter((subject) => daysLeft(subject.examDate, today) >= 1).sort((a, b) => a.examDate.localeCompare(b.examDate))[0];
  const topics = subjects.flatMap((subject) => subject.topics);
  const complete = topics.filter((topic) => topic.done).length;
  const rushed = subjects.some((subject) => subject.originalExamDate !== null);
  return <main className="overflow-hidden bg-[#f6f7f3] text-[#18372b]">
    <section className="relative flex min-h-[calc(100svh-76px)] flex-col items-center justify-center overflow-hidden px-5 py-14 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_35%,rgba(187,215,190,.76),transparent_52%),radial-gradient(ellipse_at_8%_90%,rgba(229,237,222,.9),transparent_42%),linear-gradient(145deg,#f7f8f4_15%,#e9f0e8_58%,#f7f8f4)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#42765c]/15 shadow-[0_0_100px_rgba(55,108,75,.08)] sm:h-[42rem] sm:w-[42rem]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 z-0 w-full max-w-2xl -translate-x-1/2 opacity-70" aria-hidden="true"><RunwayScene /></div>
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-7 text-xs font-semibold uppercase tracking-[.32em] text-[#26704d] sm:text-sm">Your syllabus, cleared for takeoff</p>
        <Reveal><h1 className="font-heading text-5xl font-semibold leading-[.98] tracking-[-.045em] text-[#17392b] sm:text-7xl md:text-8xl">Every topic.<br /><span className="text-[#317650]">One clear landing.</span></h1></Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#52675b] sm:text-xl">syllabus ka scene ab ekdam clean</p>
        <Link className="mt-5 inline-flex min-h-14 items-center gap-4 rounded-full bg-[#176543] px-7 font-semibold text-white shadow-[0_10px_40px_rgba(25,100,65,.2)] transition-transform hover:scale-[1.03] focus-visible:outline-[#176543]" to="/subjects">Begin your study plan <span aria-hidden="true">↗</span></Link>
        <p className="mt-4 text-sm text-[#52675b]">Your tracker is ready in one tap <span aria-hidden="true">↓</span></p>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-[120%] rotate-[-5deg] rounded-[50%] border-t border-[#558467]/25 bg-gradient-to-t from-[#dce9dc]/55 to-transparent" aria-hidden="true" />
    </section>

    <div className="mx-auto max-w-6xl px-5 pt-10 md:px-10">
      <JudgePath done={[topics.length > 0, complete > 0, rushed]} />
    </div>

    <ScrollSection label="Mission overview"><section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[.8fr_1.2fr] md:items-center md:px-10">
      <div><p className="text-xs uppercase tracking-[.28em] text-[#26704d]">Mission control</p><h2 className="mt-4 text-4xl font-semibold text-[#17392b] sm:text-5xl">Know the distance.<br />Own the landing.</h2><p className="mt-5 max-w-lg leading-7 text-[#52675b]">Break your syllabus into topics, watch progress take shape, and adjust your flight path when an exam moves closer.</p><Link className="mt-6 inline-flex min-h-12 items-center rounded-full border border-[#aabaae] px-5 hover:bg-white/70" to="/subjects">Open mission control <span className="ml-3" aria-hidden="true">→</span></Link></div>
      <div className="relative rounded-[2rem] border border-[#dce4dc] bg-gradient-to-br from-white to-[#edf3ed] p-6 shadow-xl sm:p-9"><div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-[#8caf97]/50 shadow-[0_0_55px_rgba(70,130,85,.12)]" aria-hidden="true" /><p className="text-xs uppercase tracking-[.24em] text-[#52675b]">Your payload</p><p className="mt-4 text-6xl font-semibold tabular-nums text-[#17392b]">{complete}<span className="text-3xl text-[#7a8c80]"> / {topics.length}</span></p><p className="mt-2 text-[#52675b]">topics completed</p><div className="mt-7"><ProgressTrack value={progressPercent(topics)} label="Overall syllabus progress" /></div><p className="mt-3 text-sm text-[#26704d]">{progressPercent(topics)}% of your syllabus is mission-ready</p></div>
    </section></ScrollSection>

    <ScrollSection label="Upcoming exams"><section className="mx-auto max-w-6xl px-5 pb-24 md:px-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.28em] text-[#26704d]">Flight path</p><h2 className="mt-3 text-3xl font-semibold text-[#17392b] sm:text-4xl">The next landing</h2></div><Link className="min-h-11 py-2 text-[#26704d] underline underline-offset-4" to="/subjects">Manage subjects</Link></div>
      {next ? <div className="mt-7 grid gap-4 sm:grid-cols-2">{subjects.slice().sort((a, b) => a.examDate.localeCompare(b.examDate)).map((subject) => <article className="rounded-2xl border border-[#dce4dc] bg-white/85 p-5 shadow-sm" key={subject.id}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-[#62776b]">{subject.id === next.id ? "Next exam" : "On your horizon"}</p><h3 className="mt-2 text-xl font-semibold text-[#17392b]">{subject.name}</h3></div><p className="rounded-full border border-[#8caf97] px-3 py-1 text-sm text-[#205a40]">{daysLeft(subject.examDate, today)} days</p></div><div className="mt-5"><ProgressTrack value={progressPercent(subject.topics)} label={`${subject.name} progress`} /></div><p className="mt-2 text-sm text-[#52675b]">{progressPercent(subject.topics)}% cleared · {subject.topics.filter((topic) => !topic.done).length} topics to go</p></article>)}</div> : <div className="mt-7 rounded-2xl border border-[#dce4dc] p-6 text-[#52675b]">No upcoming exams yet. <Link className="text-[#26704d] underline" to="/subjects">Add your first subject</Link>.</div>}
    </section></ScrollSection>
    <footer className="border-t border-[#dce4dc] px-5 py-8 text-center text-sm text-[#62776b]">सा Wallah <span className="mx-2">·</span> syllabus ka scene ab ekdam clean</footer>
  </main>;
}
