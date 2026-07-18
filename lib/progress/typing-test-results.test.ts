import { describe, expect, it } from "vitest";
import { calculateAccuracyStars, compareTypingTestResult, getAccuracyFeedback } from "@/lib/progress/typing-test-results";
import type { TypingTestProgressRecord } from "@/lib/progress/types";

describe("typing-test result rules", () => {
  it.each([[84.9, 0], [85, 1], [90, 2], [95, 3], [97, 4], [99, 5], [100, 5]])("awards accuracy-only stars at %s", (accuracy, stars) => {
    expect(calculateAccuracyStars(accuracy)).toBe(stars);
  });

  it("compares only exact known configurations", () => {
    const exact = record({ activityId: "typing-test:words:60:medium:plain:no-numbers", punctuation: false, numbers: false, wpm: 40, accuracy: 96 });
    const punctuation = record({ activityId: "typing-test:words:60:medium:punctuation:no-numbers", punctuation: true, numbers: false, wpm: 70, accuracy: 100 });
    const unknown = record({ activityId: "typing-test:words:60:medium:unknown:unknown", wpm: 80, accuracy: 100 });
    const comparison = compareTypingTestResult([exact, punctuation, unknown], input({ wpm: 42, accuracy: 97 }));
    expect(comparison.prior).toBe(exact);
    expect(comparison.wpmDelta).toBe(2);
    expect(comparison.accuracyDelta).toBe(1);
  });

  it("gates speed personal bests at 95% accuracy and tracks accuracy separately", () => {
    const previous = record({ activityId: "typing-test:words:60:medium:plain:no-numbers", punctuation: false, numbers: false, wpm: 40, accuracy: 97 });
    expect(compareTypingTestResult([previous], input({ wpm: 60, accuracy: 94 }))).toMatchObject({ isSpeedPersonalBest: false, isAccuracyPersonalBest: false });
    expect(compareTypingTestResult([previous], input({ wpm: 41, accuracy: 97 }))).toMatchObject({ isSpeedPersonalBest: true, isAccuracyPersonalBest: true });
    expect(compareTypingTestResult([previous], input({ wpm: 35, accuracy: 99 }))).toMatchObject({ isSpeedPersonalBest: false, isAccuracyPersonalBest: true });
  });

  it("uses deterministic accuracy-first feedback ranges", () => {
    expect(getAccuracyFeedback(70)).toMatch(/Slow down/);
    expect(getAccuracyFeedback(87)).toMatch(/control is developing/);
    expect(getAccuracyFeedback(92)).toMatch(/95%/);
    expect(getAccuracyFeedback(96)).toMatch(/Strong accuracy/);
    expect(getAccuracyFeedback(99)).toMatch(/Excellent control/);
  });
});

function input(overrides: Partial<Parameters<typeof compareTypingTestResult>[1]> = {}) {
  return { accuracy: 96, difficulty: "medium" as const, durationSeconds: 60, mode: "words" as const, numbers: false, punctuation: false, wpm: 40, ...overrides };
}

function record(overrides: Partial<TypingTestProgressRecord>): TypingTestProgressRecord {
  return { accuracy: 96, activityId: "typing-test:words:60:medium:plain:no-numbers", completedAt: "2026-01-01T00:00:00.000Z", difficulty: "medium", durationSeconds: 60, elapsedSeconds: 60, id: Math.random().toString(36), mode: "words", wpm: 40, ...overrides };
}
