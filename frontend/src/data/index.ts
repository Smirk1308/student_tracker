/** Public API for browser persistence.
 * Other layers depend on Repository rather than browser storage.
 * Keep migration and serialization isolated in this folder. */
export type { Repository } from "./Repository";
export { LocalStorageRepository } from "./LocalStorageRepository";
export { remoteState } from "./RemoteStateClient";
