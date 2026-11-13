# Context map

Syllabus Wallah is a browser-only syllabus tracker. Data is fictional and persists in localStorage.

- `src/core`: pure domain types, dates, rules, calculations, validators, demo data. It imports no React or DOM.
- `src/core/rules`: registered small rules; add a file and one export in `index.ts`.
- `src/data`: `Repository` port and `LocalStorageRepository` implementation.
- `src/store`: Zustand actions; it depends on the data port and calls core logic.
- `src/ui`: motion tokens and primitives. Features compose them; do not write new motion in pages.
- `src/components`: typed presentational contracts.
- `src/features`: independent manifests; cross-feature imports are forbidden.
- `src/pages`: route compositions only; never do domain calculation here.
- `src/app/registry.ts`: feature registry used for routes, commands, nav, and widgets.
- `src/config/features.ts`: feature flags.

Judge path:

1. Subject and topic mutations: `store/useAppStore.ts`; UI task T01–T03.
2. Progress: `core/progressPercent`; render via `components/ProgressBar.tsx`.
3. Rush click: `store.rushNextExam` → `core/rushNextExam`/`moveExamEarlier`; render `ExamRushButton`, `Countdown`, `ImpactPanel`, `PriorityList`.
4. Design review: `#/design`, showcasing the reusable original flight-path primitives.

Use `rg` for focused discovery. Read `docs/STATUS.md` then only the next task.
