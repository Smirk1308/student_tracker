/**
 * Pure domain calculations for subjects, syllabus progress, and exam rush simulation.
 * 
 * Architectural Invariants:
 * 1. Pure Functions: All functions are deterministic and take `today` as an explicit input.
 * 2. Zero DOM/React: Can be evaluated in any JavaScript runtime or headless test runner.
 * 3. Explainability: Priority ranking supplies human-readable reasoning for students and judges.
 */
import { clampDate, daysLeft, earlierDate } from "./dates";
import { loadStatus } from "./rules";
import type { LoadResult, PriorityItem, PriorityResult, RushResult, Subject } from "./types";

/**
 * Calculates the percentage of completed topics in a subject.
 * Returns an integer between 0 and 100.
 */
export const progressPercent = (topics: Subject["topics"]): number => {
  if (!topics.length) return 0;
  const completed = topics.filter((topic) => topic.done).length;
  return Math.round((completed / topics.length) * 100);
};

/**
 * Calculates study velocity: how many topics must be finished per day before the exam.
 * At minimum 1 day is used as the divisor to avoid division by zero.
 */
export const topicsPerDayNeeded = (subject: Subject, today: string): number => {
  const unfinished = subject.topics.filter((topic) => !topic.done).length;
  const remainingDays = Math.max(1, daysLeft(subject.examDate, today));
  return unfinished / remainingDays;
};

/**
 * Moves an exam earlier by a specified number of days.
 * Preserves the first original exam date so students can revert anytime.
 * Dates are clamped to `today` so an exam cannot be moved into the past.
 */
export const moveExamEarlier = (subject: Subject, days: number, today: string): Subject => ({
  ...subject,
  originalExamDate: subject.originalExamDate ?? subject.examDate,
  examDate: clampDate(earlierDate(subject.examDate, days), today),
});

/**
 * Finds the nearest upcoming exam (at least 1 day in the future).
 * Returns null if all exams are past, today, or empty.
 */
export const nextExamSubject = (subjects: Subject[], today: string): Subject | null =>
  subjects
    .filter((subject) => daysLeft(subject.examDate, today) >= 1)
    .sort((left, right) => left.examDate.localeCompare(right.examDate))[0] ?? null;

/**
 * Executes an exam rush simulation on the closest exam:
 * Advances the earliest upcoming exam date by 3 days.
 */
export const rushNextExam = (subjects: Subject[], today: string): RushResult | null => {
  const next = nextExamSubject(subjects, today);
  if (!next) return null;
  const moved = moveExamEarlier(next, 3, today);
  return {
    subjectId: next.id,
    from: next.examDate,
    to: moved.examDate,
    clamped: moved.examDate === today,
  };
};

/**
 * Generates an ordered priority recommendation of unfinished topics.
 * 
 * Algorithm:
 * 1. Sort subjects by earliest exam date.
 * 2. Flatten unfinished topics preserving syllabus order within each subject.
 * 3. Attach load status and explainable reason strings to each priority item.
 */
export const priorityOrder = (
  subjects: Subject[],
  capacityPerDay: number,
  today: string
): PriorityResult => {
  const rushed = nextExamSubject(subjects, today);
  const before = rushed ? topicsPerDayNeeded(rushed, today) : 0;

  const items: PriorityItem[] = subjects
    .slice()
    .sort((a, b) => a.examDate.localeCompare(b.examDate))
    .flatMap((subject) => {
      const remaining = subject.topics.filter((topic) => !topic.done).length;
      const left = daysLeft(subject.examDate, today);
      return subject.topics
        .filter((topic) => !topic.done)
        .map((topic) => ({
          subjectId: subject.id,
          topicId: topic.id,
          reason: `Exam in ${left} days, ${remaining} topics left`,
          rank: 0,
        }));
    })
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const afterSubject: Subject | null = rushed ? moveExamEarlier(rushed, 3, today) : null;
  const after = afterSubject ? topicsPerDayNeeded(afterSubject, today) : 0;
  const status = afterSubject ? loadStatus(afterSubject, capacityPerDay, today) : null;

  return { items, before, after, loadStatus: status };
};

export interface PlanDay {
  date: string;
  topicIds: string[];
  overflow: boolean;
}

/**
 * Allocates pending topics to daily study buckets based on student capacity.
 */
export const planDays = (
  subjects: Subject[],
  capacityPerDay: number,
  today: string
): PlanDay[] => {
  const pending = subjects
    .slice()
    .sort((a, b) => a.examDate.localeCompare(b.examDate))
    .flatMap((subject) =>
      subject.topics
        .filter((topic) => !topic.done)
        .map((topic) => ({ ...topic, examDate: subject.examDate }))
    );

  const days = new Map<string, PlanDay>();
  for (const topic of pending) {
    const plan = days.get(today) ?? { date: today, topicIds: [], overflow: false };
    plan.topicIds.push(topic.id);
    plan.overflow ||= plan.topicIds.length > capacityPerDay;
    days.set(today, plan);
  }
  return [...days.values()];
};

/**
 * Aggregates completed topics by date to track study momentum.
 */
export const activityByDate = (subjects: Subject[]): Record<string, number> =>
  subjects
    .flatMap((s) => s.topics)
    .filter((topic) => topic.completedAt)
    .reduce<Record<string, number>>((days, topic) => {
      const date = topic.completedAt!.slice(0, 10);
      days[date] = (days[date] ?? 0) + 1;
      return days;
    }, {});

/**
 * Calculates current consecutive study streak days up to today.
 */
export const streakDays = (subjects: Subject[], today: string): number => {
  const activity = activityByDate(subjects);
  let streak = 0;
  let cursor = today;
  while (activity[cursor]) {
    streak += 1;
    cursor = earlierDate(cursor, 1);
  }
  return streak;
};

/**
 * Helper to query load status for a single subject.
 */
export const subjectStatus = (
  subject: Subject,
  capacity: number,
  today: string
): LoadResult => loadStatus(subject, capacity, today);

