/** Rush-impact summary for revised planning facts.
 * Values are supplied by the core priority calculation.
 * This makes the simulation explainable to judges. */
import type { LoadResult } from "../core";
export function ImpactPanel({ before, after, status }: { before: number; after: number; status: LoadResult | null }) { return <aside className="rounded-xl border border-fuchsia-400/40 bg-fuchsia-950/30 p-4" aria-live="polite"><h2 className="font-semibold">Rush impact</h2><p>Topics/day: {before.toFixed(1)} → {after.toFixed(1)}</p><p>Status: {status?.status ?? "No upcoming exam"}</p></aside>; }
