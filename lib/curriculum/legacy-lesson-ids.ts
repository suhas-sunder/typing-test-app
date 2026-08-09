export type LegacyCurriculumLessonMapping = {
  legacyId: string;
  legacyUnitId: string;
  currentId: string;
  currentUnitId: string;
};

/**
 * Human-reviewed equivalents from the 30-lesson curriculum that preceded the
 * current staged curriculum. These mappings already preserve local progress;
 * the route migration uses the same evidence rather than maintaining a second
 * list of lesson successors.
 */
export const LEGACY_CURRICULUM_LESSON_MAPPINGS = [
  {
    legacyId: "home-row-f-j",
    legacyUnitId: "home-row",
    currentId: "beginner-f-j-space",
    currentUnitId: "home-row",
  },
  {
    legacyId: "home-row-words",
    legacyUnitId: "home-row",
    currentId: "intermediate-home-row-words",
    currentUnitId: "home-row",
  },
  {
    legacyId: "top-row-words",
    legacyUnitId: "top-row",
    currentId: "intermediate-top-row-words",
    currentUnitId: "top-row",
  },
  {
    legacyId: "bottom-row-words",
    legacyUnitId: "bottom-row",
    currentId: "intermediate-bottom-row-words",
    currentUnitId: "bottom-row",
  },
  {
    legacyId: "full-keyboard-common-words-one",
    legacyUnitId: "full-keyboard",
    currentId: "intermediate-common-words-one",
    currentUnitId: "full-keyboard",
  },
  {
    legacyId: "full-keyboard-common-words-two",
    legacyUnitId: "full-keyboard",
    currentId: "intermediate-common-words-two",
    currentUnitId: "full-keyboard",
  },
  {
    legacyId: "full-keyboard-alternating-hands",
    legacyUnitId: "full-keyboard",
    currentId: "intermediate-alternating-hands",
    currentUnitId: "full-keyboard",
  },
  {
    legacyId: "capitals-shift",
    legacyUnitId: "capitals-punctuation",
    currentId: "intermediate-shift-capitals",
    currentUnitId: "capitals-punctuation",
  },
  {
    legacyId: "punctuation-apostrophes-quotes",
    legacyUnitId: "capitals-punctuation",
    currentId: "intermediate-apostrophes-quotes",
    currentUnitId: "capitals-punctuation",
  },
  {
    legacyId: "numbers-one-through-five",
    legacyUnitId: "numbers-symbols",
    currentId: "advanced-numbers-one-five",
    currentUnitId: "numbers-symbols",
  },
  {
    legacyId: "numbers-six-through-zero",
    legacyUnitId: "numbers-symbols",
    currentId: "advanced-numbers-six-zero",
    currentUnitId: "numbers-symbols",
  },
  {
    legacyId: "numbers-symbols-values",
    legacyUnitId: "numbers-symbols",
    currentId: "advanced-practical-values",
    currentUnitId: "numbers-symbols",
  },
] as const satisfies readonly LegacyCurriculumLessonMapping[];

export const PHASE6_LESSON_MIGRATION_MAP: Readonly<Record<string, string>> =
  Object.fromEntries(
    LEGACY_CURRICULUM_LESSON_MAPPINGS.map(({ legacyId, currentId }) => [
      legacyId,
      currentId,
    ]),
  );
