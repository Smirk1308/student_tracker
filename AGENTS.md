# Agent instructions

- Read `docs/CONTEXT.md`, `docs/STATUS.md`, and only the next task in `docs/TASKS.md`; do not scan the repository. Use `rg` for focused discovery.
- Work on tasks in order. Print `TASK Tnn START` and `TASK Tnn DONE`.
- After each task run `npm run check`, `npm test`, and `npm run build`; fix failures before finishing.
- Update `docs/STATUS.md`, commit after every task, and push after every tier. Never force-push.
- Edit only files named by the active task. Never edit `core/`, registries, repository port, or `ui/` primitives unless that task explicitly says so.
- Never change tests to make them pass. Add no packages, `any`, TODOs, or placeholders. Keep files near or under 200 lines.
- Do not start later-tier tasks early. For UI tasks use only `frontend/src/ui` primitives and `docs/DESIGN.md` patterns; do not invent animation code.
- Verify UI tasks at 390px and 1440px when a browser exists. If an error survives two attempts, stop and report it in three lines with two options.
- Code freeze: 16:10 IST, 13 Nov 2026.
