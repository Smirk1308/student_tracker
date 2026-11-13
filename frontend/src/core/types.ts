/** Domain contracts shared by every layer.
 * Keep browser and React dependencies out of this folder.
 * Dates are ISO calendar-day strings unless noted otherwise. */
export type Theme = "night" | "day";
export type LoadStatus = "done" | "overdue" | "comfortable" | "tight" | "at-risk";

export interface Topic { id: string; title: string; done: boolean; completedAt: string | null; }
export interface Subject {
  id: string; name: string; hue: string; examDate: string;
  originalExamDate: string | null; createdAt: string; topics: Topic[];
}
export interface Settings { capacityPerDay: number; theme: Theme; }
export interface AppState { schemaVersion: number; subjects: Subject[]; settings: Settings; }
export interface LoadResult { status: LoadStatus; remaining: number; daysLeft: number; load: number; }
export interface RushResult { subjectId: string; from: string; to: string; clamped: boolean; }
export interface PriorityItem { rank: number; subjectId: string; topicId: string; reason: string; }
export interface PriorityResult { items: PriorityItem[]; before: number; after: number; loadStatus: LoadResult | null; }
