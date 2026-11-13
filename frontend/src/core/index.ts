/** Public domain API for the application.
 * App layers import core only through this file.
 * Keep the exports framework-free and deterministic. */
export * from "./types";
export * from "./dates";
export * from "./logic";
export * from "./validators";
export { demoData } from "./demo";
