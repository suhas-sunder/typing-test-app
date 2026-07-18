import { describe, expect, it } from "vitest";
import { PHASE6_LESSON_MIGRATION_MAP, readLocalProgress } from "@/lib/progress/repository";
import { PREVIOUS_PROGRESS_STORAGE_KEY, PROGRESS_STORAGE_KEY } from "@/lib/progress/types";

describe("v4 to v5 curriculum migration", () => {
  it("maps only approved equivalents and preserves other lesson facts as bounded legacy history", () => {
    const storage = new MemoryStorage({
      [PREVIOUS_PROGRESS_STORAGE_KEY]: JSON.stringify({
        schemaVersion: 4,
        achievements: { unlocked: [{ contentVersion: 1, id: "first-lesson", retroactive: false, unlockedAt: "2026-01-01T00:00:00.000Z" }] },
        activityDates: ["2026-01-01"],
        customization: { selectedEmblemId: "first-lesson", selectedThemeId: "summit" },
        games: {},
        lessons: { "home-row-f-j": lesson("home-row-f-j", 3), "home-row-d-k": lesson("home-row-d-k", 2) },
        practice: { completedPracticeIds: [], history: [], totalCompleted: 0 },
        processedEventIds: [],
        typingTests: { history: [], totalCompleted: 0 },
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    });
    const result = readLocalProgress(storage);
    expect(result.migrated).toBe(true);
    expect(result.data.lessons["beginner-f-j-space"]?.bestStars).toBe(3);
    expect(result.data.legacyCurriculum.lessons["home-row-d-k"]?.bestStars).toBe(2);
    expect(result.data.lessons["home-row-d-k"]).toBeUndefined();
    expect(result.data.customization).toMatchObject({ selectedEmblemId: "first-lesson", selectedThemeId: "summit", grandfatheredThemeIds: ["summit"] });
    expect(result.data.migration?.progressV4).toMatchObject({ mappedCount: 1, preservedCount: 1 });
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "{}").schemaVersion).toBe(5);
  });

  it("contains exactly the twelve approved strong mappings", () => {
    expect(Object.keys(PHASE6_LESSON_MIGRATION_MAP)).toHaveLength(12);
  });
});

function lesson(lessonId: string, bestStars: number) {
  return { attemptCount: 1, bestAccuracy: 97, bestStars, bestWpm: 20, completed: true, firstCompletedAt: "2026-01-01T00:00:00.000Z", lessonId, mostRecentAttemptAt: "2026-01-01T00:00:00.000Z", mostRecentCompletedAt: "2026-01-01T00:00:00.000Z", perfectRun: false };
}

class MemoryStorage {
  private values = new Map<string, string>();
  constructor(seed: Record<string, string>) { this.values = new Map(Object.entries(seed)); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}
