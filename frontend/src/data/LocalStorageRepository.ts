/** Browser implementation of the persistence port.
 * It validates data when reading so corrupt storage never crashes the app.
 * All values remain on the student's browser. */
import { validateImport, type AppState } from "../core";
import type { Repository } from "./Repository";

const key = "syllabus-wallah:v1";
export class LocalStorageRepository implements Repository {
  load(): AppState | null { try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? "null"); return validateImport(value) ? value : null; } catch { return null; } }
  save(state: AppState): void { localStorage.setItem(key, JSON.stringify(state)); }
  clear(): void { localStorage.removeItem(key); }
}
