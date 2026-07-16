import { CURRICULUM_LESSONS, CURRICULUM_UNITS } from "@/lib/curriculum/registry";
import { LESSON_ACCURACY_THRESHOLDS } from "@/lib/curriculum/stars";
import type { CurriculumLesson } from "@/lib/curriculum/types";

const SHIFTED_NUMBER_SYMBOLS = new Set("!@#$%^&*()_+");

export function validateCurriculum(lessons: CurriculumLesson[] = CURRICULUM_LESSONS) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const sequences = new Set<number>();
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  if (lessons.length !== 30) errors.push(`Expected 30 lessons; found ${lessons.length}.`);
  if (CURRICULUM_UNITS.length !== 6) errors.push(`Expected 6 units; found ${CURRICULUM_UNITS.length}.`);

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}.`);
    if (sequences.has(lesson.sequence)) errors.push(`Duplicate lesson sequence: ${lesson.sequence}.`);
    ids.add(lesson.id);
    sequences.add(lesson.sequence);

    if (lesson.standardWpm >= lesson.masteryWpm) errors.push(`${lesson.id}: standard WPM must be below mastery WPM.`);
    if (lesson.accuracyThresholds.join(",") !== LESSON_ACCURACY_THRESHOLDS.join(",")) errors.push(`${lesson.id}: accuracy thresholds are not centralized.`);
    if (lesson.stages.length < 3) errors.push(`${lesson.id}: expected at least three stages.`);

    for (const prerequisiteId of lesson.prerequisiteIds) {
      const prerequisite = lessonById.get(prerequisiteId);
      if (!prerequisite) errors.push(`${lesson.id}: unknown prerequisite ${prerequisiteId}.`);
      else if (prerequisite.sequence >= lesson.sequence) errors.push(`${lesson.id}: prerequisite ${prerequisiteId} is not earlier.`);
    }

    const allowed = new Set(lesson.allowedCharacters);
    for (const stage of lesson.stages) {
      for (const character of stage.text) {
        if (!allowed.has(character)) errors.push(`${lesson.id}/${stage.id}: disallowed character ${JSON.stringify(character)}.`);
        if (lesson.sequence < 25 && character !== character.toLowerCase()) errors.push(`${lesson.id}/${stage.id}: capital before Shift lesson.`);
        if (lesson.sequence < 26 && (character === "'" || character === '"')) errors.push(`${lesson.id}/${stage.id}: quote before lesson 26.`);
        if (lesson.sequence < 28 && /\d/.test(character)) errors.push(`${lesson.id}/${stage.id}: number before number-row lessons.`);
        if (lesson.sequence < 30 && SHIFTED_NUMBER_SYMBOLS.has(character) && !(character === "!" && lesson.sequence >= 27)) errors.push(`${lesson.id}/${stage.id}: shifted number-row symbol before lesson 30.`);
      }
    }

    for (const key of lesson.introducedKeys) {
      if (key === "Shift") continue;
      const lower = key.toLowerCase();
      if (!lesson.allowedCharacters.includes(lower) && !lesson.allowedCharacters.includes(key)) errors.push(`${lesson.id}: introduced key ${key} is not allowed.`);
      if (!lesson.fingerAssignments[key]) errors.push(`${lesson.id}: introduced key ${key} lacks a finger assignment.`);
    }
  }

  return errors;
}

export function assertValidCurriculum(lessons: CurriculumLesson[] = CURRICULUM_LESSONS) {
  const errors = validateCurriculum(lessons);
  if (errors.length > 0) throw new Error(`Invalid curriculum:\n${errors.join("\n")}`);
}
