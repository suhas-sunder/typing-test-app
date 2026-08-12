import { describe, expect, it } from "vitest";
import { calculateTestScore, calculateTypingStats, formatClock, getPerformanceStars } from "@/lib/typing/metrics";

describe("typing metrics characterization", () => {
  it("counts current correct and error character states", () => {
    const stats = calculateTypingStats({
      statuses: ["correct", "correct", "correct", "correct", "error", "idle"],
      elapsedSeconds: 1,
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
    });

    expect(stats.correctedErrors).toBe(1);
    expect(stats.uncorrectedErrors).toBe(1);
    expect(stats.accuracy).toBe(33);
  });
});

describe("typing score quality contract", () => {
  it.each([
    [30, 100, 30],
    [40, 98, 38],
    [50, 95, 45],
    [60, 90, 48],
    [70, 80, 42],
    [90, 60, 18],
  ])("scores %s WPM at %s% accuracy as %s", (wpm, accuracy, expected) => {
    expect(score(wpm, accuracy)).toBe(expected);
  });

  it("increases with WPM when accuracy is held constant", () => {
    for (const accuracy of [60, 80, 90, 95, 98, 100]) {
      const scores = [20, 30, 40, 50, 60, 80, 100].map((wpm) => score(wpm, accuracy));
      expect(scores).toEqual([...scores].sort((a, b) => a - b));
    }
  });

  it("increases with accuracy when WPM is held constant", () => {
    for (const wpm of [20, 30, 40, 50, 60, 80, 100]) {
      const scores = [50, 60, 70, 80, 90, 95, 98, 100].map((accuracy) => score(wpm, accuracy));
      expect(scores).toEqual([...scores].sort((a, b) => a - b));
    }
  });

  it.each([
    { controlled: [40, 98], rushed: [60, 80] },
    { controlled: [50, 95], rushed: [70, 80] },
    { controlled: [30, 100], rushed: [90, 60] },
  ])("does not reward $rushed WPM/accuracy over the controlled $controlled result", ({ controlled, rushed }) => {
    expect(score(rushed[0], rushed[1])).toBeLessThanOrEqual(score(controlled[0], controlled[1]));
  });

  it("keeps near-perfect accuracy differences proportionate", () => {
    expect(score(50, 100) - score(50, 98)).toBeLessThanOrEqual(2);
    expect(score(50, 99)).toBeGreaterThanOrEqual(score(50, 98));
  });
});

function score(wpm: number, accuracy: number) {
  return calculateTestScore({ accuracy, wpm });
}
