/** Persistence port owned by the data layer.
 * The store depends on this interface, not localStorage itself.
 * Alternative persistence may implement this contract later. */
import type { AppState } from "../core";

export interface Repository { load(): AppState | null; save(state: AppState): void; clear(): void; }
