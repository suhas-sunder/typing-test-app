export const UNIT_IDS = [
  "home-row",
  "top-row",
  "bottom-row",
  "full-keyboard",
  "capitals-punctuation",
  "numbers-symbols",
] as const;

export type CurriculumUnitId = (typeof UNIT_IDS)[number];

export type LessonStage = {
  id: string;
  title: string;
  text: string;
};

export type CurriculumLesson = {
  id: string;
  unitId: CurriculumUnitId;
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
  enabled: boolean;
  indexable: false;
  contentVersion: 1;
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
