import { describe, expect, it } from "vitest";
import { createEmptyProgress } from "@/lib/progress/repository";
import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { THEMES, getTheme, isThemeAvailable, selectedTheme } from "@/lib/themes/registry";

describe("theme registry", () => {
  it("defines exactly six unique ordered themes and preserves Base Camp tokens", () => {
    expect(THEMES).toHaveLength(6);
    expect(new Set(THEMES.map((theme) => theme.id)).size).toBe(6);
    expect(THEMES.map((theme) => theme.displayOrder)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(getTheme("base-camp").tokens).toMatchObject({ page: "246 240 229", text: "15 29 50", accent: "241 111 70" });
  });

  it("keeps Base Camp and High Contrast always available", () => {
    const progress = createEmptyProgress();
    expect(isThemeAvailable(getTheme("base-camp"), progress)).toBe(true);
    expect(isThemeAvailable(getTheme("high-contrast"), progress)).toBe(true);
  });

  it("unlocks progress themes from canonical lesson and achievement facts", () => {
    const progress = createEmptyProgress();
    for (const lesson of ENABLED_CURRICULUM_LESSONS.slice(0, 5)) progress.lessons[lesson.id] = lessonRecord(lesson.id, 3);
    expect(isThemeAvailable(getTheme("campfire-glow"), progress)).toBe(true);
    expect(isThemeAvailable(getTheme("pine-trail"), progress)).toBe(true);
    expect(isThemeAvailable(getTheme("summit"), progress)).toBe(false);
    progress.achievements.unlocked.push({ contentVersion: 1, id: "seven-day-streak", retroactive: false, unlockedAt: "2026-01-01T00:00:00.000Z" });
    expect(isThemeAvailable(getTheme("stargazer"), progress)).toBe(true);
    for (const lesson of ENABLED_CURRICULUM_LESSONS) progress.lessons[lesson.id] = lessonRecord(lesson.id, 3);
    expect(isThemeAvailable(getTheme("summit"), progress)).toBe(true);
  });

  it("falls back for invalid or locked selections without auto-selecting unlocks", () => {
    const progress = createEmptyProgress();
    progress.customization.selectedThemeId = "summit";
    expect(selectedTheme(progress).id).toBe("base-camp");
    progress.customization.selectedThemeId = "manipulated";
    expect(selectedTheme(progress).id).toBe("base-camp");
  });
});

function lessonRecord(lessonId: string, bestStars: number) {
  return { attemptCount: 1, bestAccuracy: 95, bestStars, bestWpm: 20, completed: true, firstCompletedAt: "2026-01-01T00:00:00.000Z", lessonId, mostRecentAttemptAt: "2026-01-01T00:00:00.000Z", mostRecentCompletedAt: "2026-01-01T00:00:00.000Z", perfectRun: false };
}
