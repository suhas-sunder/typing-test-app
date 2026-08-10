import { describe, expect, it } from "vitest";
import { normalizeProgressV5 } from "@/lib/progress/schema/normalize-v5";
import {
  MAX_LEGACY_CURRICULUM_RECORDS,
  MAX_PROCESSED_EVENT_IDS,
  MAX_TYPING_TEST_HISTORY,
  MAX_WEAK_KEY_SUMMARIES,
  PROGRESS_SCHEMA_VERSION,
} from "@/lib/progress/types";

const completedAt = "2026-07-16T12:00:00.000Z";

describe("v5 progress normalization", () => {
  it("enforces persisted collection bounds without changing completion totals", () => {
    const practiceHistory = Array.from({ length: MAX_TYPING_TEST_HISTORY + 7 }, (_, index) => ({
      accuracy: 98,
      completedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
      correctedErrors: 1,
      elapsedSeconds: 30,
      id: `practice-${index}`,
      length: "short",
      practiceId: "asdf-jkl",
      uncorrectedErrors: 0,
      variant: "strict",
      wpm: 24,
    }));
    const legacyLessons = Object.fromEntries(
      Array.from({ length: MAX_LEGACY_CURRICULUM_RECORDS + 5 }, (_, index) => [
        `legacy-${index}`,
        lesson(`legacy-${index}`),
      ]),
    );
    const weakKeys = "abcdefghijklmnopqrstuvwxyz".split("").map((key, index) => ({
      attempts: index + 1,
      key,
      lastSeenAt: completedAt,
      misses: index + 1,
    }));

    const progress = normalizeProgressV5({
      legacyCurriculum: { lessons: legacyLessons },
      practice: { completedPracticeIds: [], history: practiceHistory, totalCompleted: 200 },
      processedEventIds: Array.from({ length: MAX_PROCESSED_EVENT_IDS + 5 }, (_, index) => `event-${index}`),
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      weakKeys,
    });

    expect(progress.practice.history).toHaveLength(MAX_TYPING_TEST_HISTORY);
    expect(progress.practice.totalCompleted).toBe(200);
    expect(progress.processedEventIds).toHaveLength(MAX_PROCESSED_EVENT_IDS);
    expect(progress.weakKeys).toHaveLength(MAX_WEAK_KEY_SUMMARIES);
    expect(Object.keys(progress.legacyCurriculum.lessons)).toHaveLength(MAX_LEGACY_CURRICULUM_RECORDS);
  });

  it("deduplicates activity records and weak keys while retaining the newest valid facts", () => {
    const duplicate = {
      accuracy: 96,
      completedAt,
      correctedErrors: 1,
      elapsedSeconds: 30,
      id: "practice-one",
      length: "short",
      practiceId: "asdf-jkl",
      uncorrectedErrors: 0,
      variant: "strict",
      wpm: 22,
    };
    const progress = normalizeProgressV5({
      practice: { completedPracticeIds: [], history: [duplicate, duplicate], totalCompleted: 2 },
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      weakKeys: [
        { attempts: 2, key: "f", lastSeenAt: completedAt, misses: 3 },
        { attempts: 1, key: "F", lastSeenAt: completedAt, misses: 1 },
      ],
    });

    expect(progress.practice.history).toHaveLength(1);
    expect(progress.practice.completedPracticeIds).toEqual(["asdf-jkl"]);
    expect(progress.weakKeys).toEqual([{ attempts: 2, key: "f", lastSeenAt: completedAt, misses: 3 }]);
  });

  it("recovers valid families from a partially malformed v5 value", () => {
    const progress = normalizeProgressV5({
      activityDates: ["bad-date", "2026-07-16"],
      lessons: {
        "beginner-f-j-space": lesson("beginner-f-j-space"),
        invalid: { completed: true },
      },
      practice: "not-an-object",
      processedEventIds: ["valid-event", "unsafe event"],
      schemaVersion: PROGRESS_SCHEMA_VERSION,
    });

    expect(progress.activityDates).toEqual(["2026-07-16"]);
    expect(Object.keys(progress.lessons)).toEqual(["beginner-f-j-space"]);
    expect(progress.practice.history).toEqual([]);
    expect(progress.processedEventIds).toEqual(["valid-event"]);
  });
});

function lesson(lessonId: string) {
  return {
    attemptCount: 1,
    bestAccuracy: 97,
    bestStars: 2,
    bestWpm: 20,
    completed: true,
    firstCompletedAt: completedAt,
    lessonId,
    mostRecentAttemptAt: completedAt,
    mostRecentCompletedAt: completedAt,
    perfectRun: false,
  };
}
