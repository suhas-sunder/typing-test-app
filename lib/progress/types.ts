import type { DifficultyId, TestMode } from "@/lib/typing/types";

export const PROGRESS_SCHEMA_VERSION = 4 as const;
export const PROGRESS_STORAGE_KEY = "freeTypingCamp.progress.v4";
export const PREVIOUS_PROGRESS_STORAGE_KEY = "freeTypingCamp.progress.v3";
export const VERSION_TWO_PROGRESS_STORAGE_KEY = "freeTypingCamp.progress.v2";
export const LEGACY_RESULTS_KEY = "freeTypingCamp.results.v1";
export const MAX_TYPING_TEST_HISTORY = 50;
export const MAX_ACTIVITY_DATES = 366;
export const MAX_PROCESSED_EVENT_IDS = 250;
export const MAX_CALCULATOR_HISTORY = 50;

export const PRACTICE_IDS = ["asdf-jkl", "qwertyuiop", "zxcvbnm", "quotes", "left-hand", "right-hand", "numbers-symbols", "common-words"] as const;
export const PRACTICE_LENGTHS = ["short", "medium", "long"] as const;
export type PracticeId = (typeof PRACTICE_IDS)[number];
export type PracticeLength = (typeof PRACTICE_LENGTHS)[number];

export type StorageCapability = "available" | "corrupt" | "quota" | "unavailable" | "unsupported";

export type TypingTestProgressRecord = {
  accuracy: number;
  activityId: string;
  completedAt: string;
  correctedErrors?: number;
  characters?: number;
  contentVersion?: number;
  difficulty: DifficultyId | "legacy";
  durationSeconds: number;
  elapsedSeconds: number;
  id: string;
  mode: TestMode;
  numbers?: boolean;
  punctuation?: boolean;
  accuracyStars?: number;
  score?: number;
  uncorrectedErrors?: number;
  wpm: number;
};

export type LessonProgressRecord = {
  attemptCount: number;
  bestAccuracy: number;
  bestStars?: number;
  bestWpm: number;
  completed: boolean;
  firstCompletedAt?: string;
  lessonId: string;
  mostRecentAttemptAt: string;
  mostRecentCompletedAt?: string;
  perfectRun: boolean;
};

export type CalculatorRunRecord = {
  accuracy?: number;
  cleanRounds: number;
  completedAt: string;
  contentVersion: number;
  correctedRounds: number;
  id: string;
  livesRemaining: number;
  outcome: "completed" | "game-over";
  roundsCompleted: number;
  score: number;
  startedAt?: string;
  totalMistakes?: number;
};

export type GameProgressRecord = {
  bestScore: number;
  completedSessions: number;
  failedSessions: number;
  gameId: "calculator-sprint";
  history: CalculatorRunRecord[];
  mostRecentCompletedAt: string;
  personalBestId?: string;
};

export type PracticeProgressRecord = {
  accuracy: number;
  completedAt: string;
  correctedErrors: number;
  elapsedSeconds: number;
  id: string;
  length: PracticeLength;
  practiceId: PracticeId;
  uncorrectedErrors: number;
  variant: string;
  wpm: number;
};

export type LegacyMigration = {
  completedAt: string;
  importedCount: number;
  sourceCount: number;
  sourceKey: typeof LEGACY_RESULTS_KEY;
};

export type LocalProgress = {
  achievements: { unlocked: AchievementUnlockRecord[] };
  activityDates: string[];
  customization: { selectedEmblemId: string | null; selectedThemeId: string };
  games: Partial<Record<GameProgressRecord["gameId"], GameProgressRecord>>;
  lessons: Record<string, LessonProgressRecord>;
  practice: { completedPracticeIds: PracticeId[]; history: PracticeProgressRecord[]; totalCompleted: number };
  migration?: {
    legacyResultsV1?: LegacyMigration;
    progressV2?: { completedAt: string; sourceKey: typeof VERSION_TWO_PROGRESS_STORAGE_KEY };
    progressV3?: { completedAt: string; sourceKey: typeof PREVIOUS_PROGRESS_STORAGE_KEY };
  };
  processedEventIds: string[];
  schemaVersion: typeof PROGRESS_SCHEMA_VERSION;
  typingTests: { history: TypingTestProgressRecord[]; totalCompleted: number };
  updatedAt: string | null;
};

export type ProgressReadResult = {
  data: LocalProgress;
  migrated: boolean;
  status: StorageCapability;
};

export type ProgressWriteResult = ProgressReadResult & {
  changed: boolean;
  unlockedAchievementIds?: string[];
};

export type AchievementUnlockRecord = {
  contentVersion: number;
  id: string;
  retroactive: boolean;
  unlockedAt: string;
};

export type TypingTestCompletion = Omit<TypingTestProgressRecord, "activityId" | "id"> & {
  eventId?: string;
};

export type LessonCompletion = {
  accuracy: number;
  characters?: number;
  completedAt: string;
  correctedErrors?: number;
  eventId?: string;
  lessonId: string;
  stars?: number;
  uncorrectedErrors?: number;
  wpm: number;
};

export type GameCompletion = {
  accuracy?: number;
  cleanRounds: number;
  completedAt: string;
  contentVersion: number;
  correctedRounds: number;
  eventId?: string;
  gameId: GameProgressRecord["gameId"];
  livesRemaining: number;
  outcome: CalculatorRunRecord["outcome"];
  roundsCompleted: number;
  score: number;
  startedAt?: string;
  totalMistakes?: number;
};

export type PracticeCompletion = Omit<PracticeProgressRecord, "id"> & { eventId?: string };
