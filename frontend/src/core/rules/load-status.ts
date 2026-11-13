/** Load-status rule for a single subject.
 * It is deliberately pure so UI can only render its result.
 * Register new rules through rules/index.ts. */
import { daysLeft } from "../dates";
import type { LoadResult, Subject } from "../types";

export const loadStatus = (subject: Subject, capacityPerDay: number, today: string): LoadResult => {
  const remaining = subject.topics.filter((topic) => !topic.done).length;
  const left = daysLeft(subject.examDate, today);
  if (remaining === 0) return { status: "done", remaining, daysLeft: left, load: 0 };
  if (left <= 0) return { status: "overdue", remaining, daysLeft: left, load: Infinity };
  const load = remaining / (left * Math.max(1, capacityPerDay));
  const status = load <= 0.6 ? "comfortable" : load <= 1 ? "tight" : "at-risk";
  return { status, remaining, daysLeft: left, load };
};
