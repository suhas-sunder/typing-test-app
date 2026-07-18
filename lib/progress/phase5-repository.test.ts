import { describe, expect, it } from "vitest";
import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { readLocalProgress, recordGameCompletion, recordLessonCompletion, resetLocalProgress, selectCampEmblem, selectLocalTheme } from "@/lib/progress/repository";
import { MAX_CALCULATOR_HISTORY, PROGRESS_STORAGE_KEY, VERSION_THREE_PROGRESS_STORAGE_KEY } from "@/lib/progress/types";

class MemoryStorage {
  readonly values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe("Phase 5 local progress", () => {
  it("migrates v3 to v4 once, preserves facts, and retroactively awards supported achievements", () => {
    const storage = new MemoryStorage();
    const lesson = { id: "home-row-f-j" };
    storage.setItem(VERSION_THREE_PROGRESS_STORAGE_KEY, JSON.stringify({
      schemaVersion: 3,
      activityDates: ["2026-07-14", "2026-07-15", "2026-07-16"],
      games: { "calculator-sprint": { bestScore: 80, completedSessions: 2, gameId: "calculator-sprint", mostRecentCompletedAt: "2026-07-16T12:00:00.000Z" } },
      lessons: { [lesson.id]: { attemptCount: 1, bestAccuracy: 99, bestStars: 1, bestWpm: 20, completed: true, firstCompletedAt: "2026-07-14T12:00:00.000Z", lessonId: lesson.id, mostRecentAttemptAt: "2026-07-14T12:00:00.000Z", mostRecentCompletedAt: "2026-07-14T12:00:00.000Z" } },
      practice: { history: [], totalCompleted: 0 }, processedEventIds: [], typingTests: { history: [], totalCompleted: 0 }, updatedAt: "2026-07-16T12:00:00.000Z",
    }));
    const first = readLocalProgress(storage);
    expect(first.migrated).toBe(true);
    expect(first.data.schemaVersion).toBe(5);
    expect(first.data.games["calculator-sprint"]).toMatchObject({ bestScore: 80, completedSessions: 2, failedSessions: 0, history: [] });
    expect(first.data.achievements.unlocked.map((item) => item.id)).toEqual(expect.arrayContaining(["first-lesson", "first-accurate-lesson", "near-perfect-lesson", "three-day-streak"]));
    expect(first.data.achievements.unlocked.every((item) => item.retroactive)).toBe(true);
    expect(first.data.customization).toEqual({ grandfatheredThemeIds: [], selectedEmblemId: null, selectedThemeId: "base-camp" });
    expect(readLocalProgress(storage).migrated).toBe(false);
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "{}").schemaVersion).toBe(5);
  });

  it("awards a perfect run only for a nontrivial completed mistake-free lesson", () => {
    const storage = new MemoryStorage();
    const lessonId = ENABLED_CURRICULUM_LESSONS[0].id;
    recordLessonCompletion({ accuracy: 100, characters: 9, completedAt: "2026-07-14T12:00:00.000Z", correctedErrors: 0, eventId: "short", lessonId, stars: 5, uncorrectedErrors: 0, wpm: 20 }, storage);
    expect(readLocalProgress(storage).data.achievements.unlocked.map((item) => item.id)).not.toContain("perfect-run");
    recordLessonCompletion({ accuracy: 100, characters: 20, completedAt: "2026-07-15T12:00:00.000Z", correctedErrors: 1, eventId: "corrected", lessonId, stars: 5, uncorrectedErrors: 0, wpm: 20 }, storage);
    expect(readLocalProgress(storage).data.achievements.unlocked.map((item) => item.id)).not.toContain("perfect-run");
    const result = recordLessonCompletion({ accuracy: 100, characters: 20, completedAt: "2026-07-16T12:00:00.000Z", correctedErrors: 0, eventId: "perfect", lessonId, stars: 5, uncorrectedErrors: 0, wpm: 20 }, storage);
    expect(result.unlockedAchievementIds).toContain("perfect-run");
  });

  it("allows only unlocked emblems and available themes, then resets both", () => {
    const storage = new MemoryStorage();
    const lessonId = ENABLED_CURRICULUM_LESSONS[0].id;
    recordLessonCompletion({ accuracy: 95, characters: 20, completedAt: "2026-07-16T12:00:00.000Z", correctedErrors: 1, eventId: "lesson", lessonId, stars: 1, uncorrectedErrors: 0, wpm: 20 }, storage);
    expect(selectCampEmblem("first-lesson", storage, "2026-07-16T12:01:00.000Z").changed).toBe(true);
    expect(selectCampEmblem("curriculum-complete", storage, "2026-07-16T12:02:00.000Z").changed).toBe(false);
    expect(selectLocalTheme("high-contrast", storage, "2026-07-16T12:03:00.000Z").changed).toBe(true);
    expect(selectLocalTheme("summit", storage, "2026-07-16T12:04:00.000Z").changed).toBe(false);
    expect(readLocalProgress(storage).data.customization).toEqual({ grandfatheredThemeIds: [], selectedEmblemId: "first-lesson", selectedThemeId: "high-contrast" });
    resetLocalProgress(storage, "2026-07-16T12:05:00.000Z");
    expect(readLocalProgress(storage).data.customization).toEqual({ grandfatheredThemeIds: [], selectedEmblemId: null, selectedThemeId: "base-camp" });
  });

  it("persists completed and failed calculator runs once and keeps only a completed-run personal best", () => {
    const storage = new MemoryStorage();
    const first = game({ eventId: "one", cleanRounds: 4, correctedRounds: 1, accuracy: 99, score: 90 });
    recordGameCompletion(first, storage);
    recordGameCompletion(first, storage);
    recordGameCompletion(game({ eventId: "two", cleanRounds: 5, correctedRounds: 0, accuracy: 95, score: 100 }), storage);
    recordGameCompletion(game({ eventId: "failed", outcome: "game-over", roundsCompleted: 2, cleanRounds: 2, correctedRounds: 0, livesRemaining: 0, score: 40 }), storage);
    const gameProgress = readLocalProgress(storage).data.games["calculator-sprint"]!;
    expect(gameProgress).toMatchObject({ completedSessions: 2, failedSessions: 1, personalBestId: "two" });
    expect(gameProgress.history).toHaveLength(3);
    expect(readLocalProgress(storage).data.achievements.unlocked.map((item) => item.id)).toContain("calculator-finisher");
  });

  it("bounds calculator history", () => {
    const storage = new MemoryStorage();
    for (let index = 0; index < MAX_CALCULATOR_HISTORY + 5; index += 1) {
      recordGameCompletion(game({ eventId: `run-${index}`, completedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString() }), storage);
    }
    expect(readLocalProgress(storage).data.games["calculator-sprint"]?.history).toHaveLength(MAX_CALCULATOR_HISTORY);
  });
});

function game(overrides: Partial<Parameters<typeof recordGameCompletion>[0]> = {}): Parameters<typeof recordGameCompletion>[0] {
  return { accuracy: 98, cleanRounds: 4, completedAt: "2026-07-16T12:00:00.000Z", contentVersion: 1, correctedRounds: 1, eventId: "game", gameId: "calculator-sprint", livesRemaining: 2, outcome: "completed", roundsCompleted: 5, score: 90, startedAt: "2026-07-16T11:59:00.000Z", totalMistakes: 1, ...overrides };
}
