/**
 * Pure business rule: Evaluates study load status for a single subject.
 * 
 * Formula:
 *   load = remainingTopics / (daysLeft * capacityPerDay)
 * 
 * Thresholds:
 *   - load === 0      => "done" (all topics finished)
 *   - daysLeft <= 0   => "overdue" (exam date reached or passed with unfinished topics)
 *   - load <= 0.6     => "comfortable" (study pace easily manageable within capacity)
 *   - load <= 1.0     => "tight" (student will consume nearly all daily topic capacity)
 *   - load > 1.0      => "at-risk" (required velocity exceeds student daily capacity)
 */
import { daysLeft } from "../dates";
import type { LoadResult, Subject } from "../types";

export const loadStatus = (
  subject: Subject,
  capacityPerDay: number,
  today: string
): LoadResult => {
  const remaining = subject.topics.filter((topic) => !topic.done).length;
  const left = daysLeft(subject.examDate, today);

  // 1. All syllabus topics completed
  if (remaining === 0) {
    return { status: "done", remaining, daysLeft: left, load: 0 };
  }

  // 2. Exam is today or already passed with unfinished topics
  if (left <= 0) {
    return { status: "overdue", remaining, daysLeft: left, load: Infinity };
  }

  // 3. Normal schedule: evaluate relative to student's daily capacity
  const effectiveCapacity = Math.max(1, capacityPerDay);
  const load = remaining / (left * effectiveCapacity);

  const status =
    load <= 0.6
      ? "comfortable"
      : load <= 1.0
      ? "tight"
      : "at-risk";

  return { status, remaining, daysLeft: left, load };
};

