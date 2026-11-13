/**
 * Non-blocking Remote State Synchronization Client.
 * 
 * Design:
 * - Anonymous device isolation: Uses a locally generated device UUID.
 * - Non-blocking: Network timeouts, offline state, or missing backend never interrupt user workflows.
 * - LocalStorage is always the primary offline-first authority.
 */
import { validateImport, type AppState } from "../core";

const endpoint = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const DEVICE_KEY = "syllabus-wallah:device-id";

/** Retrieves or generates a unique anonymous device UUID */
const getDeviceId = (): string => {
  const current = localStorage.getItem(DEVICE_KEY);
  if (current) return current;
  const created = crypto.randomUUID();
  localStorage.setItem(DEVICE_KEY, created);
  return created;
};

export const remoteState = {
  /** Asynchronously queries cloud state for this device */
  async load(): Promise<AppState | null> {
    if (!endpoint) return null;
    try {
      const response = await fetch(`${endpoint}/api/state/${getDeviceId()}`);
      if (!response.ok) return null;
      const body: unknown = await response.json();
      const state = (body as { state?: unknown }).state;
      return validateImport(state) ? state : null;
    } catch {
      return null;
    }
  },

  /** Asynchronously syncs state updates to the cloud */
  async save(state: AppState): Promise<void> {
    if (!endpoint) return;
    try {
      await fetch(`${endpoint}/api/state/${getDeviceId()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      });
    } catch {
      // Local persistence remains authoritative; failures fail silent
    }
  },
};

