/** Interactive design-system showcase route.
 * It demonstrates primitives with fictional data before page composition.
 * The route is used for the required visual review gate. */
import { CountUp, ProgressTrack, Reveal, RunwayScene } from "../ui";
export function DesignPage() {
  return <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
    <Reveal>
      <header className="rounded-[2rem] border border-[#dce4dc] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#26704d]">Design System</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#173c2c]">Flight Deck Tokens & Primitives</h1>
        <p className="mt-2 text-sm text-[#52675b]">Original flight-path design system designed for calm study planning.</p>
      </header>
    </Reveal>
    <section className="rounded-[2rem] border border-[#dce4dc] bg-white p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-[#173c2c]">Runway Animation Scene</h2>
      <div className="mt-4 overflow-hidden rounded-2xl bg-[#edf3ed] p-6"><RunwayScene /></div>
    </section>
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-[#dce4dc] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#173c2c]">Exam Rush Simulation</h3>
        <p className="mt-2 text-sm text-[#52675b]" aria-live="polite">Revised countdown: <b className="text-lg text-[#c2410c]"><CountUp value={4} /></b> days</p>
        <div className="mt-4"><ProgressTrack value={68} label="Demo syllabus progress" /></div>
        <p className="mt-3 text-xs text-[#52675b]">Unfinished topics are dynamically surfaced with load-based priority reasons.</p>
      </div>
      <div className="rounded-2xl border border-[#dce4dc] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#173c2c]">Palette Tokens</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-[#dce4dc] bg-[#f6f7f3] p-3 text-[#18372b] font-medium">Warm Ivory (#f6f7f3)</div>
          <div className="rounded-xl bg-[#176543] p-3 text-white font-medium">Forest Green (#176543)</div>
          <div className="rounded-xl bg-[#e5f0e7] p-3 text-[#173c2c] font-medium">Soft Sage (#e5f0e7)</div>
          <div className="rounded-xl bg-[#c2410c] p-3 text-white font-medium">Rush Sunset (#c2410c)</div>
        </div>
      </div>
    </section>
  </main>;
}
