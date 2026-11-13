/** Cinematic study-flight home inspired by immersive mission pages.
 * The hero moves directly into the working syllabus in one click.
 * All progress and countdown values come from pure core functions. */
import { Link } from "react-router-dom";
import { daysLeft, progressPercent } from "../core";
import { useAppStore } from "../store";
import { ProgressTrack, Reveal, RunwayScene, ScrollSection } from "../ui";

export function HomePage() {
  const subjects = useAppStore((state) => state.subjects);
  const today = new Date().toISOString().slice(0, 10);
  const next = subjects.filter((subject) => daysLeft(subject.examDate, today) >= 1).sort((a, b) => a.examDate.localeCompare(b.examDate))[0];
  const topics = subjects.flatMap((subject) => subject.topics);
  const complete = topics.filter((topic) => topic.done).length;
  return <main className="overflow-hidden bg-[#080b19] text-white">
    <section className="relative flex min-h-[calc(100svh-76px)] flex-col items-center justify-center overflow-hidden px-5 py-14 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_35%,rgba(125,45,180,.54),transparent_52%),radial-gradient(ellipse_at_8%_90%,rgba(87,29,145,.5),transparent_42%),linear-gradient(145deg,#090c1b_15%,#1d1237_58%,#090c1b)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-200/10 shadow-[0_0_100px_rgba(204,75,255,.12)] sm:h-[42rem] sm:w-[42rem]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 z-0 w-full max-w-2xl -translate-x-1/2 opacity-70" aria-hidden="true"><RunwayScene /></div>
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-7 text-xs font-semibold uppercase tracking-[.32em] text-amber-200 sm:text-sm">Your syllabus, cleared for takeoff</p>
        <Reveal><h1 className="font-heading text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-7xl md:text-8xl">Every topic.<br /><span className="text-fuchsia-200">One clear landing.</span></h1></Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-200 sm:text-xl">syllabus ka scene ab ekdam clean</p>
        <Link className="mt-5 inline-flex min-h-14 items-center gap-4 rounded-full bg-amber-300 px-7 font-semibold text-slate-950 shadow-[0_10px_50px_rgba(245,158,11,.24)] transition-transform hover:scale-[1.03] focus-visible:outline-amber-100" to="/subjects">Begin your study plan <span aria-hidden="true">↗</span></Link>
        <p className="mt-4 text-sm text-slate-300">Your tracker is ready in one tap <span aria-hidden="true">↓</span></p>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-[120%] rotate-[-5deg] rounded-[50%] border-t border-fuchsia-300/20 bg-gradient-to-t from-violet-950/35 to-transparent" aria-hidden="true" />
    </section>

    <ScrollSection label="Mission overview"><section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[.8fr_1.2fr] md:items-center md:px-10">
      <div><p className="text-xs uppercase tracking-[.28em] text-fuchsia-200">Mission control</p><h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Know the distance.<br />Own the landing.</h2><p className="mt-5 max-w-lg leading-7 text-slate-300">Break your syllabus into topics, watch progress take shape, and adjust your flight path when an exam moves closer.</p><Link className="mt-6 inline-flex min-h-12 items-center rounded-full border border-white/25 px-5 hover:bg-white/10" to="/subjects">Open mission control <span className="ml-3" aria-hidden="true">→</span></Link></div>
      <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-900/60 to-slate-950 p-6 shadow-2xl sm:p-9"><div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-amber-100/40 shadow-[0_0_55px_rgba(251,191,36,.16)]" aria-hidden="true" /><p className="text-xs uppercase tracking-[.24em] text-slate-300">Your payload</p><p className="mt-4 text-6xl font-semibold tabular-nums">{complete}<span className="text-3xl text-slate-400"> / {topics.length}</span></p><p className="mt-2 text-slate-300">topics completed</p><div className="mt-7"><ProgressTrack value={progressPercent(topics)} label="Overall syllabus progress" /></div><p className="mt-3 text-sm text-fuchsia-100">{progressPercent(topics)}% of your syllabus is mission-ready</p></div>
    </section></ScrollSection>

    <ScrollSection label="Upcoming exams"><section className="mx-auto max-w-6xl px-5 pb-24 md:px-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.28em] text-amber-200">Flight path</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">The next landing</h2></div><Link className="min-h-11 py-2 text-fuchsia-100 underline underline-offset-4" to="/subjects">Manage subjects</Link></div>
      {next ? <div className="mt-7 grid gap-4 sm:grid-cols-2">{subjects.slice().sort((a, b) => a.examDate.localeCompare(b.examDate)).map((subject) => <article className="rounded-2xl border border-white/10 bg-white/[.045] p-5 backdrop-blur-sm" key={subject.id}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-slate-400">{subject.id === next.id ? "Next exam" : "On your horizon"}</p><h3 className="mt-2 text-xl font-semibold">{subject.name}</h3></div><p className="rounded-full border border-amber-200/40 px-3 py-1 text-sm text-amber-100">{daysLeft(subject.examDate, today)} days</p></div><div className="mt-5"><ProgressTrack value={progressPercent(subject.topics)} label={`${subject.name} progress`} /></div><p className="mt-2 text-sm text-slate-300">{progressPercent(subject.topics)}% cleared · {subject.topics.filter((topic) => !topic.done).length} topics to go</p></article>)}</div> : <div className="mt-7 rounded-2xl border border-white/10 p-6 text-slate-300">No upcoming exams yet. <Link className="text-fuchsia-100 underline" to="/subjects">Add your first subject</Link>.</div>}
    </section></ScrollSection>
    <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-400">सा Wallah <span className="mx-2">·</span> syllabus ka scene ab ekdam clean</footer>
  </main>;
}
