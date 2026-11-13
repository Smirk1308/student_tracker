/** Required journey checklist visible from the home route.
 * Parent supplies real completion state from application actions.
 * Each judge step remains one click away. */
export function JudgePath({ done }: { done: boolean[] }) {
  const steps = [
    { label: "1. Add a topic", desc: "Map any topic to a subject runway" },
    { label: "2. Mark it complete", desc: "Watch live progress & days update" },
    { label: "3. Run exam rush", desc: "Simulate a 3-day earlier schedule" },
  ];
  return <div className="rounded-2xl border border-[#b8dfc4] bg-[#f4f9f4] p-5 shadow-xs" aria-label="Evaluation Checklist">
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#26704d]">Judge Journey Checklist</p>
      <span className="rounded-full bg-[#e5f0e7] px-3 py-0.5 text-xs font-bold text-[#176543]">{done.filter(Boolean).length} / 3 complete</span>
    </div>
    <ol className="mt-4 grid gap-3 sm:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.label} className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors ${done[index] ? "border-[#96cc9e] bg-white text-[#173c2c]" : "border-[#dce4dc] bg-white/70 text-[#62776b]"}`}>
          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${done[index] ? "bg-[#176543] text-white" : "bg-[#e5f0e7] text-[#52675b]"}`}>
            {done[index] ? "✓" : index + 1}
          </span>
          <div>
            <p className="text-xs font-semibold">{step.label}</p>
            <p className="mt-0.5 text-[11px] text-[#62776b]">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>;
}
