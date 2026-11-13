/** Defensive validators for local JSON imports.
 * They accept only the documented schema and bounded user strings.
 * Invalid data is rejected before it reaches app state. */
import type { AppState, Subject, Topic } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
const validTopic = (value: unknown): value is Topic => isRecord(value) && typeof value.id === "string" && typeof value.title === "string" && value.title.length > 0 && value.title.length <= 120 && typeof value.done === "boolean" && (value.completedAt === null || typeof value.completedAt === "string");
const validSubject = (value: unknown): value is Subject => isRecord(value) && typeof value.id === "string" && typeof value.name === "string" && value.name.length > 0 && value.name.length <= 80 && typeof value.hue === "string" && isDate(value.examDate) && (value.originalExamDate === null || isDate(value.originalExamDate)) && typeof value.createdAt === "string" && Array.isArray(value.topics) && value.topics.every(validTopic);
export const validateImport = (value: unknown): value is AppState => isRecord(value) && value.schemaVersion === 1 && isRecord(value.settings) && Number.isInteger(value.settings.capacityPerDay) && Number(value.settings.capacityPerDay) >= 1 && Number(value.settings.capacityPerDay) <= 24 && (value.settings.theme === "night" || value.settings.theme === "day") && Array.isArray(value.subjects) && value.subjects.every(validSubject);
