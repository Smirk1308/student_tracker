/**
 * Core Domain Type Definitions.
 * 
 * Rules:
 * - Pure TypeScript interfaces and types only.
 * - Zero React, DOM, or framework dependencies.
 * - All date fields are ISO calendar date strings (`YYYY-MM-DD`).
 */

export type Theme = "night" | "day";

/**
 * Load condition classification for student study pacing:
 * - `done`: All topics complete (load = 0)
 * - `overdue`: Exam is today/past with unfinished topics
 * - `comfortable`: Manageable pace (load <= 0.6)
 * - `tight`: High capacity utilization (0.6 < load <= 1.0)
 * - `at-risk`: Pacing exceeds daily capacity (load > 1.0)
 */
export type LoadStatus = "done" | "overdue" | "comfortable" | "tight" | "at-risk";

/** A single syllabus topic within a subject */
export interface Topic {
  id: string;
  title: string;
  done: boolean;
  completedAt: string | null;
}

/** A study subject with an exam date and ordered syllabus topics */
export interface Subject {
  id: string;
  name: string;
  hue: string;
  examDate: string; // ISO format: YYYY-MM-DD
  originalExamDate: string | null; // Saved during exam rush for 1-click restore
  createdAt: string;
  topics: Topic[];
}

/** User preferences and daily topic capacity */
export interface Settings {
  capacityPerDay: number; // Configurable: 1 to 4 topics per day
  theme: Theme;
}

/** Complete persistent application state document */
export interface AppState {
  schemaVersion: number;
  subjects: Subject[];
  settings: Settings;
}

/** Evaluated load result for a subject */
export interface LoadResult {
  status: LoadStatus;
  remaining: number;
  daysLeft: number;
  load: number;
}

/** Result of simulating an earlier exam schedule */
export interface RushResult {
  subjectId: string;
  from: string;
  to: string;
  clamped: boolean;
}

/** A ranked unfinished study topic recommendation */
export interface PriorityItem {
  rank: number;
  subjectId: string;
  topicId: string;
  reason: string;
}

/** Complete outcome of the exam rush simulation */
export interface PriorityResult {
  items: PriorityItem[];
  before: number; // Original topics/day velocity
  after: number;  // Rushed topics/day velocity
  loadStatus: LoadResult | null;
}

