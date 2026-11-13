/** Helpful empty state with one clear action.
 * It provides instructions without decorative dead ends.
 * Parent controls the primary action. */
export function EmptyState({ onCreate }: { onCreate(): void }) {
  return <section className="grid place-items-center rounded-[2rem] border border-dashed border-[#aabaae] bg-white/70 p-12 text-center shadow-xs">
    <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e5f0e7] text-2xl text-[#176543]" aria-hidden="true">✈️</span>
    <h2 className="mt-4 text-2xl font-semibold text-[#173c2c]">Your runway is clear</h2>
    <p className="mt-2 max-w-md text-sm text-[#52675b]">No subjects are scheduled on your calendar yet. Add your next exam and start mapping topics to land it smoothly.</p>
    <button className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#176543] px-6 font-semibold text-white shadow-sm hover:bg-[#145337]" onClick={onCreate}>Add your first subject</button>
  </section>;
}
