import { LESSON_CATEGORIES } from "@/lib/typing/lessons";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

const lessonIds = new Set(
  LESSON_CATEGORIES.flatMap((category) =>
    category.sections.flatMap((section) => section.levels.map((level) => buildLessonId(category.id, section.id, level.id))),
  ),
);

export function buildLessonId(categoryId: string, sectionId: string, levelId: string) {
  return `lesson-${categoryId}-${sectionId}-${levelId}`;
}

export function isKnownLessonId(value: string) {
  return lessonIds.has(value);
}

export function buildTypingActivityId(mode: TestMode, durationSeconds: number, difficulty: DifficultyId | "legacy") {
  return `typing-test:${mode}:${durationSeconds}:${difficulty}`;
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

