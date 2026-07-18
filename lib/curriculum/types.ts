export const UNIT_IDS = [
  "home-row",
  "top-row",
  "bottom-row",
  "full-keyboard",
  "capitals-punctuation",
  "numbers-symbols",
] as const;

export type CurriculumUnitId = (typeof UNIT_IDS)[number];

export const CURRICULUM_LEVEL_IDS = ["beginner", "intermediate", "advanced"] as const;
export type CurriculumLevelId = (typeof CURRICULUM_LEVEL_IDS)[number];

export const LESSON_STAGE_TYPES = [
  "instruction",
  "anchor",
  "key-isolation",
  "alternating-pattern",
  "pair-practice",
  "word-practice",
  "phrase-practice",
  "sentence-practice",
  "paragraph-practice",
  "adaptive-reinforcement",
  "accuracy-challenge",
  "timed-challenge",
  "assessment",
] as const;
export type LessonStageType = (typeof LESSON_STAGE_TYPES)[number];

export type LessonStage = {
  id: string;
  title: string;
  text: string;
  type: LessonStageType;
  required: boolean;
  timedSeconds?: number;
};

export type CurriculumLesson = {
  id: string;
  unitId: CurriculumUnitId;
  levelId: CurriculumLevelId;
  sequence: number;
  title: string;
  objective: string;
  introducedKeys: string[];
  allowedCharacters: string[];
  fingerAssignments: Record<string, string>;
  prerequisiteIds: string[];
  stages: LessonStage[];
  standardWpm: number;
  masteryWpm: number;
  accuracyThresholds: readonly [85, 90, 95, 97, 99];
  supportingPracticeIds: string[];
  skillTags: CurriculumUnitId[];
  milestoneTags: CurriculumUnitId[];
  adaptiveSource: "attempt" | "persistent-weak-keys" | null;
  enabled: boolean;
  indexable: false;
  contentVersion: 2;
};

export type CurriculumUnit = {
  id: CurriculumUnitId;
  sequence: number;
  title: string;
  shortTitle: string;
  summary: string;
  route: `/lessons/${CurriculumUnitId}`;
  practiceRoute: string;
  indexable: true;
};

export type CurriculumLevel = {
  id: CurriculumLevelId;
  sequence: number;
  title: string;
  summary: string;
};
