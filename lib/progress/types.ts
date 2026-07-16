import type { DifficultyId, TestMode } from "@/lib/typing/types";

export const PROGRESS_SCHEMA_VERSION = 2 as const;
export const PROGRESS_STORAGE_KEY = "freeTypingCamp.progress.v2";
export const LEGACY_RESULTS_KEY = "freeTypingCamp.results.v1";
export const MAX_TYPING_TEST_HISTORY = 50;
export const MAX_ACTIVITY_DATES = 366;
export const MAX_PROCESSED_EVENT_IDS = 250;

export type StorageCapability = "available" | "corrupt" | "quota" | "unavailable" | "unsupported";

export type TypingTestProgressRecord = {
  accuracy: number;
  activityId: string;
  completedAt: string;
  correctedErrors?: number;
  difficulty: DifficultyId | "legacy";
  durationSeconds: number;
  elapsedSeconds: number;
  id: string;
  mode: TestMode;
  score?: number;
  uncorrectedErrors?: number;
  wpm: number;
};

export type LessonProgressRecord = {
  attemptCount: number;
  bestAccuracy: number;
  bestStars?: number;
  bestWpm: number;
  completed: true;
  firstCompletedAt: string;
  lessonId: string;
  mostRecentCompletedAt: string;
};

export type GameProgressRecord = {
  bestScore: number;
  completedSessions: number;
  gameId: "calculator-sprint";
  mostRecentCompletedAt: string;
};

export type LegacyMigration = {
  completedAt: string;
  importedCount: number;
  sourceCount: number;
  sourceKey: typeof LEGACY_RESULTS_KEY;
};

export type LocalProgress = {
  activityDates: string[];
  games: Partial<Record<GameProgressRecord["gameId"], GameProgressRecord>>;
  lessons: Record<string, LessonProgressRecord>;
  migration?: { legacyResultsV1: LegacyMigration };
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
};

export type TypingTestCompletion = Omit<TypingTestProgressRecord, "activityId" | "id"> & {
  eventId?: string;
};

export type LessonCompletion = {
  accuracy: number;
  completedAt: string;
  eventId?: string;
  lessonId: string;
  stars?: number;
  wpm: number;
};

export type GameCompletion = {
  completedAt: string;
  eventId?: string;
  gameId: GameProgressRecord["gameId"];
  score: number;
};
