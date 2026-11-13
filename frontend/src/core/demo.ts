/** Fictional first-run data used only in the browser.
 * It keeps the judge journey ready immediately after launch.
 * Nothing is fetched from a network or external service. */
import type { AppState } from "./types";

export const demoData: AppState = { schemaVersion: 1, settings: { capacityPerDay: 2, theme: "night" }, subjects: [
  { id: "math", name: "Discrete Mathematics", hue: "violet", examDate: "2026-11-20", originalExamDate: null, createdAt: "2026-11-13", topics: [
    { id: "sets", title: "Sets and relations", done: true, completedAt: "2026-11-12T10:00:00.000Z" },
    { id: "graphs", title: "Graph theory", done: false, completedAt: null }, { id: "logic", title: "Propositional logic", done: false, completedAt: null },
  ] },
  { id: "db", name: "Database Systems", hue: "amber", examDate: "2026-11-25", originalExamDate: null, createdAt: "2026-11-13", topics: [
    { id: "sql", title: "SQL joins", done: false, completedAt: null }, { id: "normal", title: "Normalization", done: false, completedAt: null },
  ] },
] };
