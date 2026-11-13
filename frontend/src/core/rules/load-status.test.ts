import { describe, expect, it } from "vitest";
import { loadStatus } from "./load-status";
import type { Subject } from "../types";

const makeSubject = (examDate: string, count: number, done = 0): Subject => ({
  id: "s", name: "Subject", hue: "violet", examDate, originalExamDate: null, createdAt: "2026-11-13",
  topics: Array.from({ length: count }, (_, index) => ({ id: String(index), title: "Topic", done: index < done, completedAt: null })),
});

describe("loadStatus", () => {
  it("returns done when nothing remains", () => expect(loadStatus(makeSubject("2026-11-20", 2, 2), 2, "2026-11-13").status).toBe("done"));
  it("returns overdue when the exam is today or past", () => {
    expect(loadStatus(makeSubject("2026-11-13", 1), 2, "2026-11-13").status).toBe("overdue");
    expect(loadStatus(makeSubject("2026-11-12", 1), 2, "2026-11-13").status).toBe("overdue");
  });
  it("classifies comfortable load at or below 0.6", () => expect(loadStatus(makeSubject("2026-11-15", 2), 2, "2026-11-13").status).toBe("comfortable"));
  it("classifies tight load above 0.6 through 1", () => expect(loadStatus(makeSubject("2026-11-14", 2), 2, "2026-11-13").status).toBe("tight"));
  it("classifies load above 1 as at risk", () => expect(loadStatus(makeSubject("2026-11-14", 3), 2, "2026-11-13").status).toBe("at-risk"));
});
