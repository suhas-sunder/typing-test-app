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
      wpm: 38,
      cpm: 192,
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

  it.todo("keeps a corrected mistake in historical accuracy");
  it.todo("reports corrected and uncorrected errors separately");
});
