/** Subject, rush, priority, and schedule calculations.
 * Every function is pure and takes today as an input.
 * UI code must render these results rather than recomputing them. */
import { clampDate, daysLeft, earlierDate } from "./dates";
import { loadStatus } from "./rules";
import type { LoadResult, PriorityItem, PriorityResult, RushResult, Subject } from "./types";

export const progressPercent = (topics: Subject["topics"]): number => {
  if (!topics.length) return 0;
  return Math.round((topics.filter((topic) => topic.done).length / topics.length) * 100);
};
export const topicsPerDayNeeded = (subject: Subject, today: string): number =>
  subject.topics.filter((topic) => !topic.done).length / Math.max(1, daysLeft(subject.examDate, today));
export const moveExamEarlier = (subject: Subject, days: number, today: string): Subject => ({
  ...subject,
  originalExamDate: subject.originalExamDate ?? subject.examDate,
  examDate: clampDate(earlierDate(subject.examDate, days), today),
});
export const nextExamSubject = (subjects: Subject[], today: string): Subject | null =>
  subjects.filter((subject) => daysLeft(subject.examDate, today) >= 1)
    .sort((left, right) => left.examDate.localeCompare(right.examDate))[0] ?? null;
export const rushNextExam = (subjects: Subject[], today: string): RushResult | null => {
  const next = nextExamSubject(subjects, today);
  if (!next) return null;
  const moved = moveExamEarlier(next, 3, today);
  return { subjectId: next.id, from: next.examDate, to: moved.examDate, clamped: moved.examDate === today };
};
export const priorityOrder = (subjects: Subject[], capacityPerDay: number, today: string): PriorityResult => {
  const rushed = nextExamSubject(subjects, today);
  const before = rushed ? topicsPerDayNeeded(rushed, today) : 0;
  const items: PriorityItem[] = subjects.slice().sort((a, b) => a.examDate.localeCompare(b.examDate)).flatMap((subject) => {
    const remaining = subject.topics.filter((topic) => !topic.done).length;
    const left = daysLeft(subject.examDate, today);
    return subject.topics.filter((topic) => !topic.done).map((topic) => ({
      subjectId: subject.id, topicId: topic.id,
      reason: `Exam in ${left} days, ${remaining} topics left`, rank: 0,
    }));
  }).map((item, index) => ({ ...item, rank: index + 1 }));
  const after: Subject | null = rushed ? moveExamEarlier(rushed, 3, today) : null;
  return { items, before, after: after ? topicsPerDayNeeded(after, today) : 0,
    loadStatus: after ? loadStatus(after, capacityPerDay, today) : null };
};
export interface PlanDay { date: string; topicIds: string[]; overflow: boolean; }
export const planDays = (subjects: Subject[], capacityPerDay: number, today: string): PlanDay[] => {
  const pending = subjects.slice().sort((a, b) => a.examDate.localeCompare(b.examDate))
    .flatMap((subject) => subject.topics.filter((topic) => !topic.done).map((topic) => ({ ...topic, examDate: subject.examDate })));
  const days = new Map<string, PlanDay>();
  for (const topic of pending) {
    const plan = days.get(today) ?? { date: today, topicIds: [], overflow: false };
    plan.topicIds.push(topic.id); plan.overflow ||= plan.topicIds.length > capacityPerDay; days.set(today, plan);
  }
  return [...days.values()];
};
export const activityByDate = (subjects: Subject[]): Record<string, number> => subjects.flatMap((s) => s.topics)
  .filter((topic) => topic.completedAt).reduce<Record<string, number>>((days, topic) => {
    const date = topic.completedAt!.slice(0, 10); days[date] = (days[date] ?? 0) + 1; return days;
  }, {});
export const streakDays = (subjects: Subject[], today: string): number => {
  const activity = activityByDate(subjects); let streak = 0; let cursor = today;
  while (activity[cursor]) { streak += 1; cursor = earlierDate(cursor, 1); }
  return streak;
};
export const subjectStatus = (subject: Subject, capacity: number, today: string): LoadResult => loadStatus(subject, capacity, today);
