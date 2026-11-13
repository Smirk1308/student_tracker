# Handover

Read `AGENTS.md`, `docs/CONTEXT.md`, `docs/STATUS.md`, then only the next task in `docs/TASKS.md`.

Install optional UI assistance with `uipro init --ai codex`, `uipro init --ai antigravity`, or `uipro init --ai all`. Use no new packages. Run `npm run check`, `npm test`, and `npm run build` after every task. Commit after every task and push after every tier. The browser app has no backend, API, secrets, login, or database.

The most important invariant: date/progress logic stays in `core`, persistence stays behind `Repository`, and all animation comes from `ui` primitives.
