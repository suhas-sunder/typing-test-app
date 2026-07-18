import { describe, expect, it } from "vitest";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_EVALUATORS, ACHIEVEMENT_ICONS, addAchievementUnlocks, evaluateAchievementIds, longestActivityStreak } from "@/lib/progress/achievements";
import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { createEmptyProgress } from "@/lib/progress/repository";

describe("achievement registry", () => {
  it("defines exactly twenty complete, ordered achievements", () => {
    expect(ACHIEVEMENTS).toHaveLength(20);
    expect(new Set(ACHIEVEMENTS.map((item) => item.id)).size).toBe(20);
    expect(ACHIEVEMENTS.map((item) => item.displayOrder)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    for (const item of ACHIEVEMENTS) {
      expect(ACHIEVEMENT_CATEGORIES).toContain(item.category);
      expect(ACHIEVEMENT_ICONS).toContain(item.icon);
      expect(ACHIEVEMENT_EVALUATORS).toContain(item.rule.evaluator);
      expect(item.description).not.toBe("");
      expect(item.requirement).not.toBe("");
    }
  });

  it("evaluates lesson, accuracy, perfect-run, and curriculum facts", () => {
    const progress = createEmptyProgress();
    for (const lesson of ENABLED_CURRICULUM_LESSONS) {
      progress.lessons[lesson.id] = { attemptCount: 1, bestAccuracy: 99, bestStars: 1, bestWpm: 20, completed: true, firstCompletedAt: "2026-01-01T00:00:00.000Z", lessonId: lesson.id, mostRecentAttemptAt: "2026-01-01T00:00:00.000Z", mostRecentCompletedAt: "2026-01-01T00:00:00.000Z", perfectRun: false };
    }
    let ids = evaluateAchievementIds(progress, "2026-01-20T00:00:00.000Z");
    expect(ids).toEqual(expect.arrayContaining(["first-lesson", "home-row-complete", "top-row-complete", "bottom-row-complete", "full-keyboard-complete", "capitals-punctuation-complete", "numbers-symbols-complete", "curriculum-complete", "first-accurate-lesson", "ten-accurate-lessons", "near-perfect-lesson"]));
    expect(ids).not.toContain("perfect-run");
    progress.lessons[ENABLED_CURRICULUM_LESSONS[0].id].perfectRun = true;
    ids = evaluateAchievementIds(progress, "2026-01-20T00:00:00.000Z");
    expect(ids).toContain("perfect-run");
    progress.lessons["beginner-f-j-space"].bestStars = 0;
    expect(evaluateAchievementIds(progress, "2026-01-20T00:00:00.000Z")).not.toContain("home-row-complete");
  });

  it("uses only qualifying typing tests for speed and all distinct practice modes", () => {
    const progress = createEmptyProgress();
    progress.typingTests.history.push({ accuracy: 94, activityId: "x", completedAt: "2026-01-01T00:00:00.000Z", difficulty: "medium", durationSeconds: 60, elapsedSeconds: 60, id: "x", mode: "words", wpm: 80 });
    expect(evaluateAchievementIds(progress)).not.toContain("twenty-wpm");
    progress.typingTests.history[0].accuracy = 95;
    expect(evaluateAchievementIds(progress)).toEqual(expect.arrayContaining(["twenty-wpm", "forty-wpm", "sixty-wpm"]));
    progress.practice.completedPracticeIds = ["asdf-jkl", "qwertyuiop", "zxcvbnm", "quotes", "left-hand", "right-hand", "numbers-symbols", "common-words"];
    expect(evaluateAchievementIds(progress)).toContain("practice-explorer");
  });

  it("evaluates the longest unique valid non-future streak", () => {
    expect(longestActivityStreak(["2026-01-01", "2026-01-02", "2026-01-02", "bad", "2027-01-01", "2026-01-04", "2026-01-05", "2026-01-06"], "2026-01-06T12:00:00.000Z")).toBe(3);
  });

  it("adds simultaneous unlocks once with explicit retroactive metadata", () => {
    const progress = createEmptyProgress();
    progress.lessons[ENABLED_CURRICULUM_LESSONS[0].id] = { attemptCount: 1, bestAccuracy: 99, bestStars: 1, bestWpm: 20, completed: true, firstCompletedAt: "2026-01-01T00:00:00.000Z", lessonId: ENABLED_CURRICULUM_LESSONS[0].id, mostRecentAttemptAt: "2026-01-01T00:00:00.000Z", mostRecentCompletedAt: "2026-01-01T00:00:00.000Z", perfectRun: false };
    const first = addAchievementUnlocks(progress, "2026-01-02T00:00:00.000Z", true);
    expect(first.unlockedAchievementIds).toEqual(["first-lesson", "first-accurate-lesson", "near-perfect-lesson"]);
    expect(first.progress.achievements.unlocked.every((item) => item.retroactive)).toBe(true);
    expect(addAchievementUnlocks(first.progress, "2026-01-03T00:00:00.000Z", false).unlockedAchievementIds).toEqual([]);
  });
});
