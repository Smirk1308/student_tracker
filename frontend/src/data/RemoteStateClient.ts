/** Optional remote persistence client for the deployed app.
 * Local storage remains available when the API URL is not configured.
 * Network errors are ignored so the study flow never blocks. */
import { validateImport, type AppState } from "../core";

const endpoint = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const deviceKey = "syllabus-wallah:device-id";
const deviceId = (): string => {
  const current = localStorage.getItem(deviceKey);
  if (current) return current;
  const created = crypto.randomUUID(); localStorage.setItem(deviceKey, created); return created;
};
export const remoteState = {
  async load(): Promise<AppState | null> {
    if (!endpoint) return null;
    try { const response = await fetch(`${endpoint}/api/state/${deviceId()}`); const body: unknown = await response.json(); const state = (body as { state?: unknown }).state; return validateImport(state) ? state : null; } catch { return null; }
  },
  async save(state: AppState): Promise<void> {
    if (!endpoint) return;
    try { await fetch(`${endpoint}/api/state/${deviceId()}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state }) }); } catch { /* Local persistence remains authoritative offline. */ }
  },
};
