import { describe, expect, it } from "vitest";
import { daysLeft, moveExamEarlier, nextExamSubject, priorityOrder, progressPercent, rushNextExam, type Subject } from "./index";

const today = "2026-11-13";
const subject = (id: string, examDate: string, topics = [{ id: `${id}-a`, title: "A", done: false, completedAt: null }, { id: `${id}-b`, title: "B", done: false, completedAt: null }]): Subject => ({ id, name: id, hue: "violet", examDate, originalExamDate: null, createdAt: today, topics });

describe("core subject calculations", () => {
  it("calculates rounded progress and handles empty topics", () => {
    expect(progressPercent([])).toBe(0);
    expect(progressPercent([{ id: "1", title: "A", done: true, completedAt: today }, { id: "2", title: "B", done: false, completedAt: null }, { id: "3", title: "C", done: false, completedAt: null }])).toBe(33);
  });
  it("counts calendar days including negative values", () => {
    expect(daysLeft("2026-11-17", today)).toBe(4);
    expect(daysLeft("2026-11-12", today)).toBe(-1);
  });
  it("moves an exam earlier and preserves its first original date", () => {
    const moved = moveExamEarlier(subject("s", "2026-11-20"), 3, today);
    expect(moved.examDate).toBe("2026-11-17");
    expect(moveExamEarlier(moved, 3, today).originalExamDate).toBe("2026-11-20");
  });
  it("clamps an earlier exam to today", () => {
    expect(moveExamEarlier(subject("s", "2026-11-14"), 3, today).examDate).toBe(today);
  });
  it("selects the soonest future exam and ignores today, past, and none", () => {
    expect(nextExamSubject([subject("past", "2026-11-12"), subject("today", today), subject("later", "2026-11-18"), subject("soon", "2026-11-15")], today)?.id).toBe("soon");
    expect(nextExamSubject([subject("past", "2026-11-12"), subject("today", today)], today)).toBeNull();
    expect(nextExamSubject([], today)).toBeNull();
  });
  it("returns a null rush when there is no upcoming exam", () => {
    expect(rushNextExam([subject("past", "2026-11-12")], today)).toBeNull();
  });
  it("stacks repeated rushes by three days while retaining the original date", () => {
    let current = subject("s", "2026-11-25");
    const first = rushNextExam([current], today)!;
    current = moveExamEarlier(current, 3, today);
    const second = rushNextExam([current], today)!;
    current = moveExamEarlier(current, 3, today);
    expect([first.to, second.to, current.examDate, current.originalExamDate]).toEqual(["2026-11-22", "2026-11-19", "2026-11-19", "2026-11-25"]);
  });
  it("prioritizes unfinished topics by exam date and preserves topic order", () => {
    const early = subject("early", "2026-11-15");
    early.topics[0].done = true;
    const result = priorityOrder([subject("late", "2026-11-20"), early], 2, today);
    expect(result.items.map((item) => item.topicId)).toEqual(["early-b", "late-a", "late-b"]);
    expect(result.items[0].reason).toBe("Exam in 2 days, 1 topics left");
    expect(result.items.map((item) => item.rank)).toEqual([1, 2, 3]);
  });
});
