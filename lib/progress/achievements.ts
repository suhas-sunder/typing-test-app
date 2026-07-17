import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { PRACTICE_IDS, type AchievementUnlockRecord, type LocalProgress } from "@/lib/progress/types";

export const ACHIEVEMENT_CATEGORIES = ["progress", "accuracy", "speed", "consistency", "exploration"] as const;
export type AchievementCategory = (typeof ACHIEVEMENT_CATEGORIES)[number];

export const ACHIEVEMENT_EVALUATORS = [
  "first-lesson", "unit-complete", "curriculum-complete", "accurate-lessons", "perfect-run",
  "typing-test-speed", "activity-streak", "practice-explorer", "calculator-finisher",
] as const;
export type AchievementEvaluator = (typeof ACHIEVEMENT_EVALUATORS)[number];

export const ACHIEVEMENT_ICONS = [
  "footprints", "tent-tree", "mountain", "trees", "keyboard", "quote", "hash", "map",
  "hand", "target", "sparkles", "circle-check", "gauge", "trending-up", "trophy",
  "calendar-days", "calendar-check", "calendar-heart", "compass", "calculator",
] as const;
export type AchievementIcon = (typeof ACHIEVEMENT_ICONS)[number];

type AchievementRule =
  | { evaluator: "first-lesson" }
  | { evaluator: "unit-complete"; unitId: (typeof ENABLED_CURRICULUM_LESSONS)[number]["unitId"] }
  | { evaluator: "curriculum-complete" }
  | { evaluator: "accurate-lessons"; count: number; accuracy: number }
  | { evaluator: "perfect-run" }
  | { evaluator: "typing-test-speed"; wpm: number; accuracy: number }
  | { evaluator: "activity-streak"; days: number }
  | { evaluator: "practice-explorer" }
  | { evaluator: "calculator-finisher" };

export type AchievementDefinition = {
  category: AchievementCategory;
  contentVersion: 1;
  description: string;
  displayOrder: number;
  hiddenBeforeUnlock: false;
  icon: AchievementIcon;
  id: string;
  name: string;
  requirement: string;
  rule: AchievementRule;
};

const definitions = [
  ["first-lesson", "First Steps", "Complete your first typing lesson.", "Complete any lesson with at least one star.", "progress", "footprints", { evaluator: "first-lesson" }],
  ["home-row-complete", "Home Row Camper", "Complete every Home Row lesson.", "Complete all seven Home Row lessons with at least one star each.", "progress", "tent-tree", { evaluator: "unit-complete", unitId: "home-row" }],
  ["top-row-complete", "Top Row Climber", "Complete every Top Row lesson.", "Complete all six Top Row lessons with at least one star each.", "progress", "mountain", { evaluator: "unit-complete", unitId: "top-row" }],
  ["bottom-row-complete", "Bottom Row Explorer", "Complete every Bottom Row lesson.", "Complete all six Bottom Row lessons with at least one star each.", "progress", "trees", { evaluator: "unit-complete", unitId: "bottom-row" }],
  ["full-keyboard-complete", "Full Keyboard Ranger", "Complete every Full Keyboard lesson.", "Complete all five Full Keyboard lessons with at least one star each.", "progress", "keyboard", { evaluator: "unit-complete", unitId: "full-keyboard" }],
  ["capitals-punctuation-complete", "Punctuation Guide", "Complete the Capitals and Punctuation unit.", "Complete all three Capitals and Punctuation lessons with at least one star each.", "progress", "quote", { evaluator: "unit-complete", unitId: "capitals-punctuation" }],
  ["numbers-symbols-complete", "Number Trail Guide", "Complete the Numbers and Symbols unit.", "Complete all three Numbers and Symbols lessons with at least one star each.", "progress", "hash", { evaluator: "unit-complete", unitId: "numbers-symbols" }],
  ["curriculum-complete", "Trail Complete", "Complete the entire FreeTypingCamp curriculum.", "Complete all thirty lessons with at least one star each.", "progress", "map", { evaluator: "curriculum-complete" }],
  ["first-accurate-lesson", "Steady Hands", "Finish a lesson with at least 95% accuracy.", "Complete one lesson with at least 95% accuracy.", "accuracy", "hand", { evaluator: "accurate-lessons", count: 1, accuracy: 95 }],
  ["ten-accurate-lessons", "Precision Camper", "Reach at least 95% accuracy on ten lessons.", "Earn at least 95% accuracy on ten distinct lessons.", "accuracy", "target", { evaluator: "accurate-lessons", count: 10, accuracy: 95 }],
  ["near-perfect-lesson", "Near Perfect", "Finish a lesson with at least 99% accuracy.", "Complete one lesson with at least 99% accuracy.", "accuracy", "sparkles", { evaluator: "accurate-lessons", count: 1, accuracy: 99 }],
  ["perfect-run", "Perfect Run", "Complete a lesson without a typing mistake.", "Complete a qualifying lesson at 100% accuracy with zero corrected or uncorrected errors.", "accuracy", "circle-check", { evaluator: "perfect-run" }],
  ["twenty-wpm", "Trail Pace", "Reach 20 WPM while maintaining at least 95% accuracy.", "Reach at least 20 WPM in a completed typing test with at least 95% accuracy.", "speed", "gauge", { evaluator: "typing-test-speed", wpm: 20, accuracy: 95 }],
  ["forty-wpm", "Ridge Pace", "Reach 40 WPM while maintaining at least 95% accuracy.", "Reach at least 40 WPM in a completed typing test with at least 95% accuracy.", "speed", "trending-up", { evaluator: "typing-test-speed", wpm: 40, accuracy: 95 }],
  ["sixty-wpm", "Summit Pace", "Reach 60 WPM while maintaining at least 95% accuracy.", "Reach at least 60 WPM in a completed typing test with at least 95% accuracy.", "speed", "trophy", { evaluator: "typing-test-speed", wpm: 60, accuracy: 95 }],
  ["three-day-streak", "Three-Day Camp", "Complete typing practice on three days in a row.", "Practice on three consecutive local calendar days.", "consistency", "calendar-days", { evaluator: "activity-streak", days: 3 }],
  ["seven-day-streak", "Week at Camp", "Complete typing practice on seven days in a row.", "Practice on seven consecutive local calendar days.", "consistency", "calendar-check", { evaluator: "activity-streak", days: 7 }],
  ["fourteen-day-streak", "Camp Regular", "Complete typing practice on fourteen days in a row.", "Practice on fourteen consecutive local calendar days.", "consistency", "calendar-heart", { evaluator: "activity-streak", days: 14 }],
  ["practice-explorer", "Practice Explorer", "Complete every focused-practice mode.", "Complete at least one valid session in each of the eight focused-practice modes.", "exploration", "compass", { evaluator: "practice-explorer" }],
  ["calculator-finisher", "Calculator Finisher", "Complete a full Calculator Sprint.", "Complete one valid five-round Calculator Sprint.", "exploration", "calculator", { evaluator: "calculator-finisher" }],
] as const;

export const ACHIEVEMENTS: AchievementDefinition[] = definitions.map((definition, index) => ({
  id: definition[0], name: definition[1], description: definition[2], requirement: definition[3],
  category: definition[4], icon: definition[5], rule: definition[6] as AchievementRule,
  contentVersion: 1, displayOrder: index + 1, hiddenBeforeUnlock: false,
}));

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find((achievement) => achievement.id === id) ?? null;
}

export function evaluateAchievementIds(progress: LocalProgress, now = new Date().toISOString()) {
  return ACHIEVEMENTS.filter((achievement) => evaluateRule(achievement.rule, progress, now)).map((achievement) => achievement.id);
}

export function addAchievementUnlocks(progress: LocalProgress, now: string, retroactive: boolean) {
  const existing = new Set(progress.achievements.unlocked.map((record) => record.id));
  const unlockedAchievementIds = evaluateAchievementIds(progress, now).filter((id) => !existing.has(id));
  const records: AchievementUnlockRecord[] = unlockedAchievementIds.map((id) => ({
    contentVersion: getAchievement(id)?.contentVersion ?? 1, id, retroactive, unlockedAt: now,
  }));
  return {
    progress: records.length === 0 ? progress : { ...progress, achievements: { unlocked: [...progress.achievements.unlocked, ...records] } },
    unlockedAchievementIds,
  };
}

export function longestActivityStreak(activityDates: string[], now: string) {
  const today = now.slice(0, 10);
  const dates = [...new Set(activityDates.filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= today && validDay(date)))]
    .sort();
  let longest = 0;
  let current = 0;
  let previous: number | null = null;
  for (const date of dates) {
    const day = Date.parse(`${date}T00:00:00.000Z`) / 86_400_000;
    current = previous !== null && day === previous + 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = day;
  }
  return longest;
}

function evaluateRule(rule: AchievementRule, progress: LocalProgress, now: string) {
  const lessonQualifies = (lessonId: string) => (progress.lessons[lessonId]?.bestStars ?? 0) >= 1;
  switch (rule.evaluator) {
    case "first-lesson": return ENABLED_CURRICULUM_LESSONS.some((lesson) => lessonQualifies(lesson.id));
    case "unit-complete": return ENABLED_CURRICULUM_LESSONS.filter((lesson) => lesson.unitId === rule.unitId).every((lesson) => lessonQualifies(lesson.id));
    case "curriculum-complete": return ENABLED_CURRICULUM_LESSONS.every((lesson) => lessonQualifies(lesson.id));
    case "accurate-lessons": return ENABLED_CURRICULUM_LESSONS.filter((lesson) => (progress.lessons[lesson.id]?.bestAccuracy ?? 0) >= rule.accuracy).length >= rule.count;
    case "perfect-run": return ENABLED_CURRICULUM_LESSONS.some((lesson) => progress.lessons[lesson.id]?.perfectRun);
    case "typing-test-speed": return progress.typingTests.history.some((test) => test.accuracy >= rule.accuracy && test.wpm >= rule.wpm);
    case "activity-streak": return longestActivityStreak(progress.activityDates, now) >= rule.days;
    case "practice-explorer": return PRACTICE_IDS.every((id) => progress.practice.completedPracticeIds.includes(id));
    case "calculator-finisher": return Boolean(progress.games["calculator-sprint"]?.history.some((run) => run.outcome === "completed" && run.roundsCompleted === 5));
  }
}

function validDay(date: string) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
}
