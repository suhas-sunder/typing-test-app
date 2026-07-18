import { CURRICULUM_LESSONS, CURRICULUM_UNITS } from "@/lib/curriculum/registry";
import { LESSON_ACCURACY_THRESHOLDS } from "@/lib/curriculum/stars";
import { LESSON_STAGE_TYPES } from "@/lib/curriculum/types";
import type { CurriculumLesson } from "@/lib/curriculum/types";

export function validateCurriculum(lessons: CurriculumLesson[] = CURRICULUM_LESSONS) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const sequences = new Set<number>();
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  if (lessons.length !== 45) errors.push(`Expected 45 lessons; found ${lessons.length}.`);
  if (CURRICULUM_UNITS.length !== 6) errors.push(`Expected 6 skill hubs; found ${CURRICULUM_UNITS.length}.`);

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}.`);
    if (sequences.has(lesson.sequence)) errors.push(`Duplicate lesson sequence: ${lesson.sequence}.`);
    ids.add(lesson.id);
    sequences.add(lesson.sequence);

    if (lesson.standardWpm >= lesson.masteryWpm) errors.push(`${lesson.id}: standard WPM must be below mastery WPM.`);
    if (lesson.accuracyThresholds.join(",") !== LESSON_ACCURACY_THRESHOLDS.join(",")) errors.push(`${lesson.id}: accuracy thresholds are not centralized.`);
    if (lesson.stages.length < 4) errors.push(`${lesson.id}: expected at least four stages.`);
    if (new Set(lesson.stages.map((stage) => stage.text)).size !== lesson.stages.length) errors.push(`${lesson.id}: stage text must be distinct.`);
    if (lesson.stages[0]?.type !== "instruction") errors.push(`${lesson.id}: first stage must be instruction.`);
    if (lesson.stages.filter((stage) => stage.type !== "instruction").length < 4) errors.push(`${lesson.id}: expected at least four typed stages.`);

    for (const prerequisiteId of lesson.prerequisiteIds) {
      const prerequisite = lessonById.get(prerequisiteId);
      if (!prerequisite) errors.push(`${lesson.id}: unknown prerequisite ${prerequisiteId}.`);
      else if (prerequisite.sequence >= lesson.sequence) errors.push(`${lesson.id}: prerequisite ${prerequisiteId} is not earlier.`);
    }

    const allowed = new Set(lesson.allowedCharacters);
    for (const stage of lesson.stages) {
      if (!LESSON_STAGE_TYPES.includes(stage.type)) errors.push(`${lesson.id}/${stage.id}: unknown stage type.`);
      if (!stage.required) errors.push(`${lesson.id}/${stage.id}: registry stages must be required.`);
      if (stage.type === "instruction") continue;
      for (const character of stage.text) {
        if (!allowed.has(character)) errors.push(`${lesson.id}/${stage.id}: disallowed character ${JSON.stringify(character)}.`);
      }
    }

    for (const key of lesson.introducedKeys) {
      if (key === "Shift" || key === "Enter") continue;
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
