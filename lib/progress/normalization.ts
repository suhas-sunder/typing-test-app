import { getAchievement } from "@/lib/progress/achievements";
import { buildProgressEventId, buildTypingActivityId, isKnownLessonId, isKnownOrLegacyLessonId } from "@/lib/progress/ids";
import {
  MAX_ACTIVITY_DATES,
  MAX_CALCULATOR_HISTORY,
  MAX_WEAK_KEY_SUMMARIES,
  PRACTICE_IDS,
  PRACTICE_LENGTHS,
  type AchievementUnlockRecord,
  type CalculatorRunRecord,
  type GameCompletion,
  type GameProgressRecord,
  type LessonCompletion,
  type LessonProgressRecord,
  type LocalProgress,
  type PracticeCompletion,
  type PracticeProgressRecord,
  type TypingTestCompletion,
  type TypingTestProgressRecord,
} from "@/lib/progress/types";
import {
  earlierDate,
  isActivityDate,
  isRecord,
  isSafeId,
  laterDate,
  optionalInteger,
  optionalNumber,
  safeEventId,
  uniqueBy,
  validDate,
  validInteger,
  validNumber,
} from "@/lib/progress/validation";

const VALID_DURATIONS = new Set([15, 30, 60, 120, 300]);
const VALID_MODES = new Set(["words", "quote"]);
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard", "legacy"]);
const VALID_PRACTICE_IDS = new Set<string>(PRACTICE_IDS);
const VALID_PRACTICE_LENGTHS = new Set<string>(PRACTICE_LENGTHS);

export function normalizeTypingCompletion(completion: TypingTestCompletion): TypingTestProgressRecord | null {
  const completedAt = validDate(completion.completedAt);
  const durationSeconds = validInteger(completion.durationSeconds, 1, 86_400);
  const elapsedSeconds = validInteger(completion.elapsedSeconds, 1, 86_400);
  const wpm = validInteger(completion.wpm, 0, 5_000);
  const accuracy = validNumber(completion.accuracy, 0, 100);
  if (
    !completedAt ||
    durationSeconds === null ||
    elapsedSeconds === null ||
    wpm === null ||
    accuracy === null ||
    (completion.difficulty !== "legacy" && !VALID_DURATIONS.has(durationSeconds)) ||
    !VALID_MODES.has(completion.mode) ||
    !VALID_DIFFICULTIES.has(completion.difficulty)
  ) {
    return null;
  }

  if (completion.numbers !== undefined && typeof completion.numbers !== "boolean") return null;
  if (completion.punctuation !== undefined && typeof completion.punctuation !== "boolean") return null;
  const activityId = buildTypingActivityId(completion.mode, durationSeconds, completion.difficulty, completion.punctuation, completion.numbers);
  const id = safeEventId(completion.eventId) ?? buildProgressEventId("test", [
    activityId,
    completedAt,
    elapsedSeconds,
    wpm,
    accuracy,
    completion.correctedErrors,
    completion.uncorrectedErrors,
    completion.punctuation === undefined ? undefined : String(completion.punctuation),
    completion.numbers === undefined ? undefined : String(completion.numbers),
  ]);
  const characters = optionalInteger(completion.characters, 0, 1_000_000);
  const contentVersion = optionalInteger(completion.contentVersion, 1, 10_000);
  const accuracyStars = optionalNumber(completion.accuracyStars, 0, 5);
  const correctedErrors = optionalInteger(completion.correctedErrors, 0, 100_000);
  const uncorrectedErrors = optionalInteger(completion.uncorrectedErrors, 0, 100_000);
  const score = optionalInteger(completion.score, 0, 10_000_000);
  if (correctedErrors === null || uncorrectedErrors === null || score === null || characters === null || contentVersion === null || accuracyStars === null) return null;

  return {
    accuracy,
    activityId,
    completedAt,
    difficulty: completion.difficulty,
    durationSeconds,
    elapsedSeconds,
    id,
    mode: completion.mode,
    wpm,
    ...(completion.characters === undefined ? {} : { characters }),
    ...(completion.contentVersion === undefined ? {} : { contentVersion }),
    ...(completion.accuracyStars === undefined ? {} : { accuracyStars }),
    ...(completion.numbers === undefined ? {} : { numbers: completion.numbers }),
    ...(completion.punctuation === undefined ? {} : { punctuation: completion.punctuation }),
    ...(completion.correctedErrors === undefined ? {} : { correctedErrors }),
    ...(completion.uncorrectedErrors === undefined ? {} : { uncorrectedErrors }),
    ...(completion.score === undefined ? {} : { score }),
  };
}

export function normalizeTypingRecord(value: unknown): TypingTestProgressRecord | null {
  if (!isRecord(value)) return null;
  return normalizeTypingCompletion({
    accuracy: value.accuracy as number,
    completedAt: value.completedAt as string,
    correctedErrors: value.correctedErrors as number | undefined,
    characters: value.characters as number | undefined,
    contentVersion: value.contentVersion as number | undefined,
    accuracyStars: value.accuracyStars as number | undefined,
    difficulty: value.difficulty as TypingTestCompletion["difficulty"],
    durationSeconds: value.durationSeconds as number,
    elapsedSeconds: value.elapsedSeconds as number,
    eventId: value.id as string,
    mode: value.mode as TypingTestCompletion["mode"],
    numbers: value.numbers as boolean | undefined,
    punctuation: value.punctuation as boolean | undefined,
    score: value.score as number | undefined,
    uncorrectedErrors: value.uncorrectedErrors as number | undefined,
    wpm: value.wpm as number,
  });
}

export function normalizeLessonCompletion(completion: LessonCompletion) {
  const completedAt = validDate(completion.completedAt);
  const accuracy = validNumber(completion.accuracy, 0, 100);
  const wpm = validInteger(completion.wpm, 0, 5_000);
  const stars = optionalNumber(completion.stars, 0, 5);
  const characters = optionalInteger(completion.characters, 0, 1_000_000);
  const correctedErrors = optionalInteger(completion.correctedErrors, 0, 100_000);
  const uncorrectedErrors = optionalInteger(completion.uncorrectedErrors, 0, 100_000);
  if (!completedAt || accuracy === null || wpm === null || stars === null || characters === null || correctedErrors === null || uncorrectedErrors === null || !isKnownLessonId(completion.lessonId)) return null;
  return {
    accuracy,
    completedAt,
    eventId:
      safeEventId(completion.eventId) ??
      buildProgressEventId("lesson", [completion.lessonId, completedAt, wpm, accuracy, completion.stars]),
    lessonId: completion.lessonId,
    characters: completion.characters === undefined ? undefined : characters,
    correctedErrors: completion.correctedErrors === undefined ? undefined : correctedErrors,
    stars: completion.stars === undefined ? undefined : stars,
    uncorrectedErrors: completion.uncorrectedErrors === undefined ? undefined : uncorrectedErrors,
    weakKeys: Array.isArray(completion.weakKeys)
      ? completion.weakKeys
          .filter((item) => item && typeof item.key === "string" && item.key.length === 1 && item.key !== " " && Number.isInteger(item.misses) && item.misses > 0)
          .map((item) => ({ key: item.key.toLowerCase(), misses: Math.min(item.misses, 100_000) }))
          .slice(0, 8)
      : undefined,
    wpm,
  };
}

export function normalizePracticeCompletion(completion: PracticeCompletion): PracticeProgressRecord | null {
  const completedAt = validDate(completion.completedAt);
  const elapsedSeconds = validInteger(completion.elapsedSeconds, 1, 86_400);
  const wpm = validInteger(completion.wpm, 0, 5_000);
  const accuracy = validNumber(completion.accuracy, 0, 100);
  const correctedErrors = validInteger(completion.correctedErrors, 0, 100_000);
  const uncorrectedErrors = validInteger(completion.uncorrectedErrors, 0, 100_000);
  if (!completedAt || elapsedSeconds === null || wpm === null || accuracy === null || correctedErrors === null || uncorrectedErrors === null || !VALID_PRACTICE_IDS.has(completion.practiceId) || !VALID_PRACTICE_LENGTHS.has(completion.length) || !isSafeId(completion.variant)) return null;
  return {
    accuracy,
    completedAt,
    correctedErrors,
    elapsedSeconds,
    id: safeEventId(completion.eventId) ?? buildProgressEventId("practice", [completion.practiceId, completion.length, completion.variant, completedAt, wpm, accuracy]),
    length: completion.length,
    practiceId: completion.practiceId,
    uncorrectedErrors,
    variant: completion.variant,
    wpm,
  };
}

export function normalizePracticeRecord(value: unknown) {
  if (!isRecord(value)) return null;
  return normalizePracticeCompletion({
    accuracy: value.accuracy as number,
    completedAt: value.completedAt as string,
    correctedErrors: value.correctedErrors as number,
    elapsedSeconds: value.elapsedSeconds as number,
    eventId: value.id as string,
    length: value.length as PracticeCompletion["length"],
    practiceId: value.practiceId as PracticeCompletion["practiceId"],
    uncorrectedErrors: value.uncorrectedErrors as number,
    variant: value.variant as string,
    wpm: value.wpm as number,
  });
}

export function normalizeGameCompletion(completion: GameCompletion) {
  const completedAt = validDate(completion.completedAt);
  const startedAt = completion.startedAt === undefined ? undefined : validDate(completion.startedAt);
  const score = validInteger(completion.score, 0, 10_000_000);
  const roundsCompleted = validInteger(completion.roundsCompleted, 0, 5);
  const cleanRounds = validInteger(completion.cleanRounds, 0, 5);
  const correctedRounds = validInteger(completion.correctedRounds, 0, 5);
  const livesRemaining = validInteger(completion.livesRemaining, 0, 4);
  const totalMistakes = optionalInteger(completion.totalMistakes, 0, 100_000);
  const accuracy = optionalNumber(completion.accuracy, 0, 100);
  const contentVersion = validInteger(completion.contentVersion, 1, 10_000);
  if (!completedAt || (completion.startedAt !== undefined && !startedAt) || score === null || roundsCompleted === null || cleanRounds === null || correctedRounds === null || livesRemaining === null || totalMistakes === null || accuracy === null || contentVersion === null || completion.gameId !== "calculator-sprint" || !["completed", "game-over"].includes(completion.outcome) || cleanRounds + correctedRounds !== roundsCompleted || (completion.outcome === "completed" && roundsCompleted !== 5) || (completion.outcome === "game-over" && livesRemaining !== 0)) return null;
  const id = safeEventId(completion.eventId) ?? buildProgressEventId("game", [completion.gameId, completion.outcome, completedAt, roundsCompleted, cleanRounds, correctedRounds, score]);
  return {
    ...(completion.accuracy === undefined ? {} : { accuracy }),
    cleanRounds,
    completedAt,
    contentVersion,
    correctedRounds,
    eventId: id,
    gameId: completion.gameId,
    id,
    livesRemaining,
    outcome: completion.outcome,
    roundsCompleted,
    score,
    ...(startedAt ? { startedAt } : {}),
    ...(completion.totalMistakes === undefined ? {} : { totalMistakes }),
  };
}

export function normalizeLessonRecord(value: unknown, lessonId: string, allowUnknown = false): LessonProgressRecord | null {
  if (!isRecord(value) || (!allowUnknown && !isKnownOrLegacyLessonId(lessonId)) || typeof value.completed !== "boolean" || value.lessonId !== lessonId) return null;
  const attemptCount = validInteger(value.attemptCount, 1, 1_000_000);
  const bestAccuracy = validNumber(value.bestAccuracy, 0, 100);
  const bestWpm = validInteger(value.bestWpm, 0, 5_000);
  const firstCompletedAt = value.firstCompletedAt === undefined ? undefined : validDate(value.firstCompletedAt);
  const mostRecentCompletedAt = value.mostRecentCompletedAt === undefined ? undefined : validDate(value.mostRecentCompletedAt);
  const mostRecentAttemptAt = validDate(value.mostRecentAttemptAt) ?? mostRecentCompletedAt;
  const bestStars = optionalNumber(value.bestStars, 0, 5);
  if (
    attemptCount === null ||
    bestAccuracy === null ||
    bestWpm === null ||
    !mostRecentAttemptAt ||
    (value.completed && (!firstCompletedAt || !mostRecentCompletedAt)) ||
    bestStars === null
  ) {
    return null;
  }
  return {
    attemptCount,
    bestAccuracy,
    bestWpm,
    completed: value.completed,
    ...(firstCompletedAt ? { firstCompletedAt } : {}),
    lessonId,
    mostRecentAttemptAt,
    ...(mostRecentCompletedAt ? { mostRecentCompletedAt } : {}),
    ...(value.bestStars === undefined ? {} : { bestStars }),
    perfectRun: value.perfectRun === true,
  };
}

export function normalizeWeakKeySummary(value: unknown) {
  if (!isRecord(value) || typeof value.key !== "string" || value.key.length !== 1 || value.key === " ") return null;
  const attempts = validInteger(value.attempts, 1, 1_000_000);
  const misses = validInteger(value.misses, 1, 10_000_000);
  const lastSeenAt = validDate(value.lastSeenAt);
  return attempts !== null && misses !== null && lastSeenAt
    ? { attempts, key: value.key.toLowerCase(), lastSeenAt, misses }
    : null;
}

export function mergeWeakKeySummaries(
  current: LocalProgress["weakKeys"],
  incoming: Array<{ key: string; misses: number }>,
  completedAt: string,
) {
  const byKey = new Map(current.map((item) => [item.key, item]));
  for (const item of incoming) {
    const existing = byKey.get(item.key);
    byKey.set(item.key, {
      attempts: (existing?.attempts ?? 0) + 1,
      key: item.key,
      lastSeenAt: laterDate(existing?.lastSeenAt, completedAt),
      misses: (existing?.misses ?? 0) + item.misses,
    });
  }
  return [...byKey.values()]
    .sort((a, b) => b.misses - a.misses || b.lastSeenAt.localeCompare(a.lastSeenAt))
    .slice(0, MAX_WEAK_KEY_SUMMARIES);
}

export function mergeLessonRecords(current: LessonProgressRecord | undefined, incoming: LessonProgressRecord): LessonProgressRecord {
  if (!current) return incoming;
  const completed = current.completed || incoming.completed;
  return {
    attemptCount: current.attemptCount + incoming.attemptCount,
    bestAccuracy: Math.max(current.bestAccuracy, incoming.bestAccuracy),
    bestStars: Math.max(current.bestStars ?? 0, incoming.bestStars ?? 0),
    bestWpm: Math.max(current.bestWpm, incoming.bestWpm),
    completed,
    ...(completed ? { firstCompletedAt: earlierDate(current.firstCompletedAt, incoming.firstCompletedAt ?? incoming.mostRecentAttemptAt) } : {}),
    lessonId: incoming.lessonId,
    mostRecentAttemptAt: laterDate(current.mostRecentAttemptAt, incoming.mostRecentAttemptAt),
    ...(completed ? { mostRecentCompletedAt: laterDate(current.mostRecentCompletedAt, incoming.mostRecentCompletedAt ?? incoming.mostRecentAttemptAt) } : {}),
    perfectRun: current.perfectRun || incoming.perfectRun,
  };
}

export function normalizeGameRecord(value: unknown, gameId: GameProgressRecord["gameId"]): GameProgressRecord | null {
  if (!isRecord(value) || value.gameId !== gameId) return null;
  const bestScore = validInteger(value.bestScore, 0, 10_000_000);
  const completedSessions = validInteger(value.completedSessions, 0, 1_000_000);
  const failedSessions = validInteger(value.failedSessions, 0, 1_000_000) ?? 0;
  const mostRecentCompletedAt = validDate(value.mostRecentCompletedAt);
  if (bestScore === null || completedSessions === null || !mostRecentCompletedAt) return null;
  const history = Array.isArray(value.history) ? value.history.map(normalizeCalculatorRun).filter((run): run is CalculatorRunRecord => Boolean(run)).filter(uniqueBy((run) => run.id)).sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, MAX_CALCULATOR_HISTORY) : [];
  const personalBest = history.filter((run) => run.outcome === "completed" && run.roundsCompleted === 5).sort(compareCalculatorRuns)[0];
  return { bestScore, completedSessions, failedSessions, gameId, history, mostRecentCompletedAt, ...(personalBest ? { personalBestId: personalBest.id } : {}) };
}

export function normalizeCalculatorRun(value: unknown): CalculatorRunRecord | null {
  if (!isRecord(value)) return null;
  const completedAt = validDate(value.completedAt);
  const startedAt = value.startedAt === undefined ? undefined : validDate(value.startedAt);
  const accuracy = optionalNumber(value.accuracy, 0, 100);
  const cleanRounds = validInteger(value.cleanRounds, 0, 5);
  const contentVersion = validInteger(value.contentVersion, 1, 10_000);
  const correctedRounds = validInteger(value.correctedRounds, 0, 5);
  const livesRemaining = validInteger(value.livesRemaining, 0, 4);
  const roundsCompleted = validInteger(value.roundsCompleted, 0, 5);
  const score = validInteger(value.score, 0, 10_000_000);
  const totalMistakes = optionalInteger(value.totalMistakes, 0, 100_000);
  if (!completedAt || (value.startedAt !== undefined && !startedAt) || accuracy === null || cleanRounds === null || contentVersion === null || correctedRounds === null || livesRemaining === null || roundsCompleted === null || score === null || totalMistakes === null || !isSafeId(value.id) || (value.outcome !== "completed" && value.outcome !== "game-over") || cleanRounds + correctedRounds !== roundsCompleted || (value.outcome === "completed" && roundsCompleted !== 5) || (value.outcome === "game-over" && livesRemaining !== 0)) return null;
  return {
    ...(value.accuracy === undefined ? {} : { accuracy }), cleanRounds, completedAt, contentVersion, correctedRounds,
    id: value.id, livesRemaining, outcome: value.outcome, roundsCompleted, score,
    ...(startedAt ? { startedAt } : {}), ...(value.totalMistakes === undefined ? {} : { totalMistakes }),
  };
}

export function normalizeAchievementUnlock(value: unknown): AchievementUnlockRecord | null {
  if (!isRecord(value) || !getAchievement(typeof value.id === "string" ? value.id : "") || typeof value.retroactive !== "boolean") return null;
  const unlockedAt = validDate(value.unlockedAt);
  const contentVersion = validInteger(value.contentVersion, 1, 10_000);
  return unlockedAt && contentVersion !== null ? { contentVersion, id: value.id as string, retroactive: value.retroactive, unlockedAt } : null;
}

export function compareCalculatorRuns(a: CalculatorRunRecord, b: CalculatorRunRecord) {
  if (a.cleanRounds !== b.cleanRounds) return b.cleanRounds - a.cleanRounds;
  if (a.accuracy !== undefined && b.accuracy !== undefined && a.accuracy !== b.accuracy) return b.accuracy - a.accuracy;
  if (a.score !== b.score) return b.score - a.score;
  if (a.totalMistakes !== undefined && b.totalMistakes !== undefined && a.totalMistakes !== b.totalMistakes) return a.totalMistakes - b.totalMistakes;
  return a.completedAt.localeCompare(b.completedAt);
}

export function normalizeLegacyRecord(value: unknown) {
  if (!isRecord(value)) return null;
  const createdAt = validDate(value.createdAt);
  const duration = validInteger(value.duration, 1, 86_400);
  const wpm = validInteger(value.wpm, 0, 5_000);
  const accuracy = validNumber(value.accuracy, 0, 100);
  const score = validInteger(value.score, 0, 10_000_000);
  const stars = validNumber(value.stars, 0, 5);
  const testName = typeof value.testName === "string" ? value.testName : "";
  if (!createdAt || duration === null || wpm === null || accuracy === null || score === null || stars === null || !testName) return null;
  return {
    accuracy,
    createdAt,
    duration,
    id: buildProgressEventId("legacy", [testName, createdAt, duration, wpm, accuracy, score, stars]),
    score,
    stars,
    testName,
    wpm,
  };
}

export function addActivityDate(current: string[], timestamp: string) {
  const date = timestamp.slice(0, 10);
  return [date, ...current.filter((value) => value !== date)].filter(isActivityDate).sort().reverse().slice(0, MAX_ACTIVITY_DATES);
}

export function latestLocalCompletion(data: LocalProgress) {
  return [
    ...Object.values(data.lessons).map((lesson) => lesson.mostRecentAttemptAt),
    ...data.practice.history.map((record) => record.completedAt),
    ...Object.values(data.games).flatMap((game) => (game ? [game.mostRecentCompletedAt] : [])),
  ].sort().reverse()[0];
}
