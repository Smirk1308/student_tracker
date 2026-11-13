/**
 * Browser LocalStorage implementation of the Repository port.
 * 
 * Safety:
 * - Validates schema upon loading via `validateImport`.
 * - Malformed or corrupt storage payloads are rejected cleanly without throwing.
 * - Entirely private to the user's browser profile.
 */
import { validateImport, type AppState } from "../core";
import type { Repository } from "./Repository";

const STORAGE_KEY = "syllabus-wallah:v1";

export class LocalStorageRepository implements Repository {
  /** Retrieves and defensively validates stored JSON */
  load(): AppState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return validateImport(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  /** Serializes and saves current application state */
  save(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage quota or private browsing exceptions handled silently
    }
  }

  /** Deletes stored key, resetting the local storage space */
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Handled silently
    }
  }
}

