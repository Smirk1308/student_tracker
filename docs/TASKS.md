# Build tasks

Tasks are ordered. Each is intended to fit within eight minutes.

## Tier 1 — judge path

### T01 — Subjects CRUD
Goal: let the student create, edit, and delete subjects with visible validation and success feedback.
Files: `frontend/src/pages/SubjectsPage.tsx`, `frontend/src/components/SubjectForm.tsx`, `frontend/src/components/SubjectCard.tsx`.
Use: store `addSubject`, `updateSubject`, `deleteSubject`; core `progressPercent`, `daysLeft`; UI `Reveal`, `ProgressTrack`.
Visible behavior: validated subject form and cards with date and progress.
Browser acceptance: at 390px and 1440px add a subject, edit its name/date, delete it, and verify feedback each time.

### T02 — Topic management
Goal: add, rename, complete, and delete ordered topics.
Files: `frontend/src/pages/SubjectsPage.tsx`, `frontend/src/components/TopicForm.tsx`, `frontend/src/components/TopicList.tsx`, `frontend/src/components/TopicRow.tsx`.
Use: store `addTopic`, `renameTopic`, `toggleTopic`, `deleteTopic`; UI `Reveal`.
Visible behavior: labeled topic controls with completion and unfinished emphasis.
Browser acceptance: add a topic, mark it done, verify it remains in syllabus order, then delete it.

### T03 — Progress and countdown
Goal: show each subject's live progress and exam countdown.
Files: `frontend/src/pages/SubjectsPage.tsx`, `frontend/src/components/ProgressBar.tsx`, `frontend/src/components/Countdown.tsx`.
Use: core `progressPercent`, `daysLeft`; UI `ProgressTrack`, `CountUp`.
Visible behavior: numeric percentage and days update after topic completion.
Browser acceptance: complete an unfinished topic and verify percentage and countdown display.

### T04 — Exam rush and priority
Goal: simulate moving the next exam three days earlier and explain the impact.
Files: `frontend/src/pages/SubjectsPage.tsx`, `frontend/src/components/ExamRushButton.tsx`, `frontend/src/components/ImpactPanel.tsx`, `frontend/src/components/PriorityList.tsx`, `frontend/src/components/UndoToast.tsx`.
Use: store `rushNextExam`, `restoreExam`, `undo`; core `priorityOrder`, `daysLeft`; UI `CountUp`, `Reveal`.
Visible behavior: revised countdown, highlighted unfinished topics, reasoned priority list, restore/undo.
Browser acceptance: click rush once, verify the earliest exam changes by three days, unfinished topics are highlighted and priority order appears; restore the original date.

## Tier 2 — dashboard and finishing

### T05 — Home dashboard
Goal: make the home route a useful overview with the hero scene and subject progress.
Files: `frontend/src/pages/HomePage.tsx`, `frontend/src/app/App.tsx`.
Use: UI `RunwayScene`, `ScrollSection`, `Reveal`, `ProgressTrack`; store selectors.
Visible behavior: one-click route to the judge path and clear overview.
Browser acceptance: verify hero and a subject summary at 390px and 1440px.

### T06 — Navigation and feature registry
Goal: build navigation and route entries from enabled feature manifests.
Files: `frontend/src/app/App.tsx`, `frontend/src/app/registry.ts`.
Use: `featureRegistry`, `features`; UI `PageTransition`.
Visible behavior: working home, subjects, settings, and design navigation.
Browser acceptance: visit every navigation item and verify the correct route.

### T07 — Command palette
Goal: expose registered commands through a keyboard-operable palette.
Files: `frontend/src/components/CommandPalette.tsx`, `frontend/src/app/App.tsx`.
Use: feature registry `commands`; UI `Reveal`.
Visible behavior: open, search/select, and dismiss commands with keyboard.
Browser acceptance: open palette, trigger rush, escape to close, and verify focus remains usable.

### T08 — Settings and data portability
Goal: edit capacity/theme and export/import validated local data.
Files: `frontend/src/pages/SettingsPage.tsx`.
Use: store `setSettings`, `exportJson`, `importJson`, `resetAll`.
Visible behavior: settings persist; invalid import shows an error; valid import restores state.
Browser acceptance: export, change a setting, import the export, and verify state returns.

### T09 — Judge path checklist
Goal: show the three required demo steps and tick them from real app state.
Files: `frontend/src/components/JudgePath.tsx`, `frontend/src/pages/HomePage.tsx`.
Use: store selectors; UI `Reveal`.
Visible behavior: topic add, completion, and rush steps reflect current state.
Browser acceptance: perform the three actions and verify checklist updates automatically.

### T10 — Intro and skip
Goal: add a short skippable intro while keeping the tracker one click away.
Files: `frontend/src/app/App.tsx`.
Use: UI `Reveal`, `RunwayScene`; motion tokens only.
Visible behavior: intro ends under five seconds and has a skip control.
Browser acceptance: skip intro and reach subjects immediately; verify reduced-motion skips animation.

## Final delivery

### T11 — Security and documentation
Goal: document local-only data handling, import validation, security headers, and demo steps.
Files: `README.md`, `docs/DEMO.md`, `docs/SECURITY.md`.
Use: current routes and controls; no new packages.
Visible behavior: docs allow a teammate to run and demo the app independently.
Browser acceptance: follow the three-step demo script using the app.

### T12 — Deploy configuration review
Goal: verify static build and Render configuration.
Files: `render.yaml`, `.github/workflows/ci.yml`.
Use: `npm ci`, `npm run build`, existing checks.
Visible behavior: static app builds with documented headers.
Browser acceptance: CI build succeeds and deployment preview serves the app.
