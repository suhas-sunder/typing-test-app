import { describe, expect, it } from "vitest";
import { readLocalProgress } from "@/lib/progress/repository";

class MemoryStorage {
  readonly values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("Phase 4 progress characterization", () => {
  it("preserves every valid v3 progress family before Phase 5 extends the schema", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      "freeTypingCamp.progress.v3",
      JSON.stringify({
        activityDates: ["2026-07-16", "2026-07-15"],
        games: {
          "calculator-sprint": {
            bestScore: 80,
            completedSessions: 2,
            gameId: "calculator-sprint",
            mostRecentCompletedAt: "2026-07-16T12:00:00.000Z",
          },
        },
        lessons: {
          "home-row-f-j": {
            attemptCount: 2,
            bestAccuracy: 98,
            bestStars: 4,
            bestWpm: 18,
            completed: true,
            firstCompletedAt: "2026-07-15T12:00:00.000Z",
            lessonId: "home-row-f-j",
            mostRecentAttemptAt: "2026-07-16T12:00:00.000Z",
            mostRecentCompletedAt: "2026-07-16T12:00:00.000Z",
          },
        },
        migration: {
          progressV2: {
            completedAt: "2026-07-15T11:00:00.000Z",
            sourceKey: "freeTypingCamp.progress.v2",
          },
        },
        practice: {
          history: [
            {
              accuracy: 96,
              completedAt: "2026-07-16T10:00:00.000Z",
              correctedErrors: 1,
              elapsedSeconds: 45,
              id: "practice-one",
              length: "short",
              practiceId: "asdf-jkl",
              uncorrectedErrors: 0,
              variant: "strict",
              wpm: 24,
            },
          ],
          totalCompleted: 1,
        },
        processedEventIds: ["test-one", "lesson-one", "practice-one", "game-one"],
        schemaVersion: 3,
        typingTests: {
          history: [
            {
              accuracy: 97,
              activityId: "typing-test:words:60:medium:plain:no-numbers",
              completedAt: "2026-07-16T09:00:00.000Z",
              correctedErrors: 1,
              difficulty: "medium",
              durationSeconds: 60,
              elapsedSeconds: 60,
              id: "test-one",
              mode: "words",
              numbers: false,
              punctuation: false,
              uncorrectedErrors: 0,
              wpm: 42,
            },
          ],
          totalCompleted: 1,
        },
        updatedAt: "2026-07-16T12:00:00.000Z",
      }),
    );

    expect(readLocalProgress(storage).data).toMatchObject({
      activityDates: ["2026-07-16", "2026-07-15"],
      games: { "calculator-sprint": { bestScore: 80, completedSessions: 2 } },
      lessons: { "beginner-f-j-space": { attemptCount: 2, bestAccuracy: 98, bestStars: 4 } },
      practice: { history: [{ id: "practice-one", practiceId: "asdf-jkl" }], totalCompleted: 1 },
      processedEventIds: ["test-one", "lesson-one", "practice-one", "game-one"],
      typingTests: { history: [{ id: "test-one", accuracy: 97, wpm: 42 }], totalCompleted: 1 },
      updatedAt: "2026-07-16T12:00:00.000Z",
    });
  });
});
