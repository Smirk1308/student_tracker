/**
 * Calendar-safe date manipulation utilities.
 * 
 * Invariants:
 * - All date functions receive `today` explicitly as a parameter.
 * - This eliminates timezone discrepancies, host clock drifts, and test flakiness.
 * - Dates are normalized with `startOfDay` to ensure exact calendar day differences.
 */
import { differenceInCalendarDays, format, parseISO, startOfDay, subDays } from "date-fns";

/**
 * Returns the number of calendar days between today and the exam date.
 * Positive = future days remaining; 0 = exam is today; Negative = overdue days.
 */
export const daysLeft = (examDate: string, today: string): number =>
  differenceInCalendarDays(startOfDay(parseISO(examDate)), startOfDay(parseISO(today)));

/**
 * Subtracts N days from an ISO date string (YYYY-MM-DD) and returns the formatted date.
 */
export const earlierDate = (date: string, days: number): string =>
  format(subDays(parseISO(date), days), "yyyy-MM-dd");

/**
 * Clamps a target date so it cannot be earlier than `earliest`.
 * Used during exam rush to guarantee exams do not move into the past.
 */
export const clampDate = (date: string, earliest: string): string =>
  date < earliest ? earliest : date;

