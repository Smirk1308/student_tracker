/** Feature manifest registry drives extension points.
 * Features add their public manifest here, never direct cross-imports.
 * Routes, navigation, commands, and widgets are built from this list. */
import { examRushFeature } from "../features/twist";
export const featureRegistry = [examRushFeature];
