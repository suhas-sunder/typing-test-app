import { describe, expect, it } from "vitest";
import { calculateTypingStats, formatClock, getPerformanceStars } from "@/lib/typing/metrics";

describe("typing metrics characterization", () => {
  it("counts current correct and error character states", () => {
    const stats = calculateTypingStats({
      statuses: ["correct", "correct", "correct", "correct", "error", "idle"],
      elapsedSeconds: 1,
      difficultyScore: 0,
    });

    expect(stats).toMatchObject({
      correctChars: 4,
      errorChars: 1,
      totalChars: 5,
      accuracy: 80,
      rawWpm: 48,
      wpm: 48,
      cpm: 240,
    });
  });

  it("uses a one-second minimum for an empty or zero-duration sample", () => {
    const stats = calculateTypingStats({
      statuses: ["correct", "correct", "correct", "correct", "correct"],
      elapsedSeconds: 0,
      difficultyScore: 0,
    });

    expect(stats.elapsedSeconds).toBe(1);
    expect(stats.rawWpm).toBe(60);
  });

  it("preserves the existing clock and star boundaries", () => {
    expect(formatClock(65)).toBe("1:05");
    expect(getPerformanceStars(80, 97)).toBe(5);
    expect(getPerformanceStars(19, 100)).toBe(0);
  });

  it("keeps corrected mistakes in historical accuracy and error totals", () => {
    const stats = calculateTypingStats({
      attemptSummary: {
        correctedErrors: 1,
        correctKeystrokes: 2,
        incorrectKeypresses: 1,
        trackedKeystrokes: 3,
        uncorrectedErrors: 0,
      },
      statuses: ["correct", "correct"],
      elapsedMilliseconds: 60_000,
      difficultyScore: 0,
    });

    expect(stats).toMatchObject({
      accuracy: 66,
      correctedErrors: 1,
      errorChars: 1,
      incorrectKeypresses: 1,
      totalChars: 3,
      uncorrectedErrors: 0,
      wpm: 1,
    });
  });

  it("keeps unresolved mistakes distinct from corrected mistakes", () => {
    const stats = calculateTypingStats({
      attemptSummary: {
        correctedErrors: 1,
        correctKeystrokes: 1,
        incorrectKeypresses: 2,
        trackedKeystrokes: 3,
        uncorrectedErrors: 1,
      },
      statuses: ["correct", "error"],
      elapsedMilliseconds: 30_000,
      difficultyScore: 0,
    });

    expect(stats.correctedErrors).toBe(1);
    expect(stats.uncorrectedErrors).toBe(1);
    expect(stats.accuracy).toBe(33);
  });
});
