import { describe, expect, it } from "vitest";
import { aggregateLessonResults, buildAdaptiveStage, type TypingAttemptResult } from "@/lib/curriculum/adaptive";

function result(overrides: Partial<TypingAttemptResult> = {}): TypingAttemptResult {
  return {
    accuracy: 100, correctedErrors: 0, correctKeystrokes: 50, elapsedMilliseconds: 60_000,
    trackedKeystrokes: 50, uncorrectedErrors: 0, weakKeys: [], wpm: 10, ...overrides,
  };
}

describe("multi-stage lesson aggregation", () => {
  it("weights accuracy by tracked keystrokes and WPM by total active time", () => {
    const aggregate = aggregateLessonResults([
      result({ correctKeystrokes: 45, trackedKeystrokes: 50, elapsedMilliseconds: 30_000, correctedErrors: 3 }),
      result({ correctKeystrokes: 40, trackedKeystrokes: 50, elapsedMilliseconds: 30_000, uncorrectedErrors: 2 }),
    ]);
    expect(aggregate).toMatchObject({ accuracy: 85, correctedErrors: 3, uncorrectedErrors: 2, wpm: 17 });
  });

  it("adds one deterministic bounded stage for poor accuracy and at most two weak keys", () => {
    const adaptive = buildAdaptiveStage("lesson", [
      result({ accuracy: 88, weakKeys: [{ key: "q", misses: 3 }, { key: "z", misses: 2 }, { key: "x", misses: 1 }] }),
    ], "fallback");
    expect(adaptive).toMatchObject({ required: false, type: "adaptive-reinforcement" });
    expect(adaptive?.text).toBe("q z q z q z q z");
  });

  it("does not add reinforcement to a clean stage set", () => {
    expect(buildAdaptiveStage("lesson", [result()], "fallback")).toBeNull();
  });
});
