/**
 * Data Storage Repository Port (Hexagonal Architecture).
 * 
 * Invariant: The application store depends exclusively on this abstraction,
 * completely decoupled from browser storage APIs (localStorage, IndexedDB, etc.).
 */
import type { AppState } from "../core";

export interface Repository {
  /** Hydrates the application state from persistent storage */
  load(): AppState | null;

  /** Persists state changes atomically */
  save(state: AppState): void;

  /** Clears persisted state, restoring first-run demo state */
  clear(): void;
}

