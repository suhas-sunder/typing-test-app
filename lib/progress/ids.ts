import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { LESSON_CATEGORIES } from "@/lib/typing/lessons";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

const legacyLessonIds = new Set(
  LESSON_CATEGORIES.flatMap((category) =>
    category.sections.flatMap((section) => section.levels.map((level) => buildLessonId(category.id, section.id, level.id))),
  ),
);
const lessonIds = new Set(ENABLED_CURRICULUM_LESSONS.map((lesson) => lesson.id));

export function buildLessonId(categoryId: string, sectionId: string, levelId: string) {
  return `lesson-${categoryId}-${sectionId}-${levelId}`;
}

export function isKnownLessonId(value: string) {
  return lessonIds.has(value);
}

export function isKnownOrLegacyLessonId(value: string) {
  return lessonIds.has(value) || legacyLessonIds.has(value);
}

export function buildTypingActivityId(
  mode: TestMode,
  durationSeconds: number,
  difficulty: DifficultyId | "legacy",
  punctuation?: boolean,
  numbers?: boolean,
) {
  const punctuationKey = mode === "quote" ? "authored" : punctuation === undefined ? "unknown" : punctuation ? "punctuation" : "plain";
  const numbersKey = mode === "quote" ? "authored" : numbers === undefined ? "unknown" : numbers ? "numbers" : "no-numbers";
  return `typing-test:${mode}:${durationSeconds}:${difficulty}:${punctuationKey}:${numbersKey}`;
}

export function buildProgressEventId(prefix: string, parts: Array<number | string | undefined>) {
  const source = parts.map((part) => String(part ?? "")).join("|");
  return `${prefix}-${fnv1a(source)}`;
}

function fnv1a(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}
