# Architecture

```mermaid
flowchart TD
  UI[ui primitives] --> C[components] --> F[features] --> P[pages] --> A[app registry/router]
  P --> S[Zustand store]
  S --> D[Repository port] --> L[localStorage]
  S --> Core[core: pure rules and calculations]
```

Decisions: HashRouter supports static hosting; localStorage is the only persistence; core receives `today` so it is deterministic; a registry makes later surprises additive; UI owns motion and pages only compose it.
