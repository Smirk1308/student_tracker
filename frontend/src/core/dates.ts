/** Calendar-safe date helpers.
 * All calculation receives today explicitly for deterministic behavior.
 * No browser clock is consulted in the core. */
import { differenceInCalendarDays, format, parseISO, startOfDay, subDays } from "date-fns";

export const daysLeft = (examDate: string, today: string): number =>
  differenceInCalendarDays(startOfDay(parseISO(examDate)), startOfDay(parseISO(today)));
export const earlierDate = (date: string, days: number): string => format(subDays(parseISO(date), days), "yyyy-MM-dd");
export const clampDate = (date: string, earliest: string): string => date < earliest ? earliest : date;
