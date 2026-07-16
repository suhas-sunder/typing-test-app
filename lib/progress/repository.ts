import { buildProgressEventId, buildTypingActivityId, isKnownLessonId } from "@/lib/progress/ids";
import {
  LEGACY_RESULTS_KEY,
  MAX_ACTIVITY_DATES,
  MAX_PROCESSED_EVENT_IDS,
  MAX_TYPING_TEST_HISTORY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  type GameCompletion,
  type GameProgressRecord,
  type LessonCompletion,
  type LessonProgressRecord,
  type LocalProgress,
  type ProgressReadResult,
  type ProgressWriteResult,
  type StorageCapability,
  type TypingTestCompletion,
  type TypingTestProgressRecord,
} from "@/lib/progress/types";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const SAME_TAB_EVENT = "freeTypingCamp:progress-change";
const VALID_DURATIONS = new Set([15, 30, 60, 120]);
const VALID_MODES = new Set(["words", "quote"]);
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard", "legacy"]);

export function createEmptyProgress(): LocalProgress {
  return {
    activityDates: [],
    games: {},
    lessons: {},
    processedEventIds: [],
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    typingTests: { history: [], totalCompleted: 0 },
    updatedAt: null,
  };
}

export function readLocalProgress(storage = browserStorage()): ProgressReadResult {
  if (!storage) return { data: createEmptyProgress(), migrated: false, status: "unavailable" };

  let canonicalRaw: string | null;
  try {
    canonicalRaw = storage.getItem(PROGRESS_STORAGE_KEY);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  }

  if (canonicalRaw !== null) {
    return parseCanonical(canonicalRaw);
  }

  return migrateLegacyProgress(storage);
}

export function recordTypingTestCompletion(
  completion: TypingTestCompletion,
  storage = browserStorage(),
): ProgressWriteResult {
  const normalized = normalizeTypingCompletion(completion);
  if (!normalized) return unchangedResult(readLocalProgress(storage));
  return updateProgress(normalized.id, normalized.completedAt, storage, (data) => ({
    ...data,
    typingTests: {
      history: [normalized, ...data.typingTests.history.filter((record) => record.id !== normalized.id)].slice(
        0,
        MAX_TYPING_TEST_HISTORY,
      ),
      totalCompleted: data.typingTests.totalCompleted + 1,
    },
  }));
}

export function recordLessonCompletion(completion: LessonCompletion, storage = browserStorage()): ProgressWriteResult {
  const normalized = normalizeLessonCompletion(completion);
  if (!normalized) return unchangedResult(readLocalProgress(storage));

  return updateProgress(normalized.eventId, normalized.completedAt, storage, (data) => {
    const current = data.lessons[normalized.lessonId];
    const next: LessonProgressRecord = {
      attemptCount: (current?.attemptCount ?? 0) + 1,
      bestAccuracy: Math.max(current?.bestAccuracy ?? 0, normalized.accuracy),
      bestWpm: Math.max(current?.bestWpm ?? 0, normalized.wpm),
      completed: true,
      firstCompletedAt: earlierDate(current?.firstCompletedAt, normalized.completedAt),
      lessonId: normalized.lessonId,
      mostRecentCompletedAt: laterDate(current?.mostRecentCompletedAt, normalized.completedAt),
      ...(normalized.stars === undefined && current?.bestStars === undefined
        ? {}
        : { bestStars: Math.max(current?.bestStars ?? 0, normalized.stars ?? 0) }),
    };
    return { ...data, lessons: { ...data.lessons, [next.lessonId]: next } };
  });
}

export function recordGameCompletion(completion: GameCompletion, storage = browserStorage()): ProgressWriteResult {
  const normalized = normalizeGameCompletion(completion);
  if (!normalized) return unchangedResult(readLocalProgress(storage));

  return updateProgress(normalized.eventId, normalized.completedAt, storage, (data) => {
    const current = data.games[normalized.gameId];
    const next: GameProgressRecord = {
      bestScore: Math.max(current?.bestScore ?? 0, normalized.score),
      completedSessions: (current?.completedSessions ?? 0) + 1,
      gameId: normalized.gameId,
      mostRecentCompletedAt: laterDate(current?.mostRecentCompletedAt, normalized.completedAt),
    };
    return { ...data, games: { ...data.games, [next.gameId]: next } };
  });
}

export function resetLocalProgress(storage = browserStorage(), now = new Date().toISOString()): ProgressWriteResult {
  if (!storage || !isValidDate(now)) {
    return { data: createEmptyProgress(), changed: false, migrated: false, status: "unavailable" };
  }

  const reset = createEmptyProgress();
  reset.updatedAt = now;
  reset.migration = {
    legacyResultsV1: {
      completedAt: now,
      importedCount: 0,
      sourceCount: legacySourceCount(storage),
      sourceKey: LEGACY_RESULTS_KEY,
    },
  };
  const status = writeProgress(storage, reset);
  if (status === "available") notifyProgressChanged();
  return { data: reset, changed: status === "available", migrated: false, status };
}

export function subscribeToProgress(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === PROGRESS_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(SAME_TAB_EVENT, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SAME_TAB_EVENT, listener);
  };
}

function updateProgress(
  eventId: string,
  completedAt: string,
  storage: StorageLike | null,
  updater: (data: LocalProgress) => LocalProgress,
): ProgressWriteResult {
  const current = readLocalProgress(storage);
  if (!storage || current.status === "unavailable" || current.status === "quota" || current.status === "unsupported") {
    return unchangedResult(current);
  }
  if (current.data.processedEventIds.includes(eventId)) return unchangedResult(current);

  const next = updater(current.data);
  next.processedEventIds = [eventId, ...next.processedEventIds.filter((id) => id !== eventId)].slice(
    0,
    MAX_PROCESSED_EVENT_IDS,
  );
  next.activityDates = addActivityDate(next.activityDates, completedAt);
  next.updatedAt = laterDate(next.updatedAt, completedAt);

  const validated = validateCanonical(next);
  const status = writeProgress(storage, validated);
  if (status === "available") notifyProgressChanged();
  return { data: validated, changed: status === "available", migrated: current.migrated, status };
}

function parseCanonical(raw: string): ProgressReadResult {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }

  if (!isRecord(value) || value.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    return {
      data: createEmptyProgress(),
      migrated: false,
      status: isRecord(value) && typeof value.schemaVersion === "number" ? "unsupported" : "corrupt",
    };
  }

  return { data: validateCanonical(value), migrated: false, status: "available" };
}

function validateCanonical(value: unknown): LocalProgress {
  const source = isRecord(value) ? value : {};
  const progress = createEmptyProgress();
  progress.updatedAt = validDate(source.updatedAt) ?? null;
  progress.typingTests.history = Array.isArray(isRecord(source.typingTests) ? source.typingTests.history : undefined)
    ? (source.typingTests as { history: unknown[] }).history
        .map(normalizeTypingRecord)
        .filter((record): record is TypingTestProgressRecord => Boolean(record))
        .filter(uniqueBy((record) => record.id))
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
        .slice(0, MAX_TYPING_TEST_HISTORY)
    : [];
  const totalCompleted = isRecord(source.typingTests)
    ? validInteger(source.typingTests.totalCompleted, progress.typingTests.history.length, 10_000_000)
    : null;
  progress.typingTests.totalCompleted = totalCompleted ?? progress.typingTests.history.length;

  if (isRecord(source.lessons)) {
    for (const [lessonId, candidate] of Object.entries(source.lessons)) {
      const lesson = normalizeLessonRecord(candidate, lessonId);
      if (lesson) progress.lessons[lessonId] = lesson;
    }
  }

  if (isRecord(source.games)) {
    const calculator = normalizeGameRecord(source.games["calculator-sprint"], "calculator-sprint");
    if (calculator) progress.games["calculator-sprint"] = calculator;
  }

  progress.activityDates = Array.isArray(source.activityDates)
    ? source.activityDates.filter(isActivityDate).filter(uniqueString).sort().reverse().slice(0, MAX_ACTIVITY_DATES)
    : [];
  progress.processedEventIds = Array.isArray(source.processedEventIds)
    ? source.processedEventIds.filter(isSafeId).filter(uniqueString).slice(0, MAX_PROCESSED_EVENT_IDS)
    : [];

  const migration = isRecord(source.migration) ? source.migration.legacyResultsV1 : undefined;
  if (isRecord(migration)) {
    const completedAt = validDate(migration.completedAt);
    const importedCount = validInteger(migration.importedCount, 0, 10_000);
    const sourceCount = validInteger(migration.sourceCount, 0, 10_000);
    if (completedAt && importedCount !== null && sourceCount !== null && migration.sourceKey === LEGACY_RESULTS_KEY) {
      progress.migration = {
        legacyResultsV1: { completedAt, importedCount, sourceCount, sourceKey: LEGACY_RESULTS_KEY },
      };
    }
  }

  return progress;
}

function migrateLegacyProgress(storage: StorageLike): ProgressReadResult {
  let raw: string | null;
  try {
    raw = storage.getItem(LEGACY_RESULTS_KEY);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  }
  if (raw === null) return { data: createEmptyProgress(), migrated: false, status: "available" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!Array.isArray(parsed)) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };

  const data = createEmptyProgress();
  const importedEvents: string[] = [];
  for (const candidate of parsed) {
    const legacy = normalizeLegacyRecord(candidate);
    if (!legacy) continue;

    if (isKnownLessonId(legacy.testName)) {
      const current = data.lessons[legacy.testName];
      data.lessons[legacy.testName] = {
        attemptCount: (current?.attemptCount ?? 0) + 1,
        bestAccuracy: Math.max(current?.bestAccuracy ?? 0, legacy.accuracy),
        bestStars: Math.max(current?.bestStars ?? 0, legacy.stars),
        bestWpm: Math.max(current?.bestWpm ?? 0, legacy.wpm),
        completed: true,
        firstCompletedAt: earlierDate(current?.firstCompletedAt, legacy.createdAt),
        lessonId: legacy.testName,
        mostRecentCompletedAt: laterDate(current?.mostRecentCompletedAt, legacy.createdAt),
      };
      importedEvents.push(legacy.id);
      data.activityDates = addActivityDate(data.activityDates, legacy.createdAt);
      continue;
    }

    if (legacy.testName === "words" || legacy.testName === "quote") {
      const record: TypingTestProgressRecord = {
        accuracy: legacy.accuracy,
        activityId: buildTypingActivityId(legacy.testName, legacy.duration, "legacy"),
        completedAt: legacy.createdAt,
        difficulty: "legacy",
        durationSeconds: legacy.duration,
        elapsedSeconds: legacy.duration,
        id: legacy.id,
        mode: legacy.testName,
        score: legacy.score,
        wpm: legacy.wpm,
      };
      data.typingTests.history.push(record);
      importedEvents.push(legacy.id);
      data.activityDates = addActivityDate(data.activityDates, legacy.createdAt);
    }
  }

  data.typingTests.history = data.typingTests.history
    .filter(uniqueBy((record) => record.id))
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, MAX_TYPING_TEST_HISTORY);
  data.typingTests.totalCompleted = data.typingTests.history.length;
  data.processedEventIds = importedEvents.filter(uniqueString).slice(0, MAX_PROCESSED_EVENT_IDS);
  const completedAt = new Date().toISOString();
  data.updatedAt = data.typingTests.history[0]?.completedAt ?? latestLocalCompletion(data) ?? completedAt;
  data.migration = {
    legacyResultsV1: {
      completedAt,
      importedCount: data.processedEventIds.length,
      sourceCount: parsed.length,
      sourceKey: LEGACY_RESULTS_KEY,
    },
  };

  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
}

function normalizeTypingCompletion(completion: TypingTestCompletion): TypingTestProgressRecord | null {
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

  const activityId = buildTypingActivityId(completion.mode, durationSeconds, completion.difficulty);
  const id = safeEventId(completion.eventId) ?? buildProgressEventId("test", [
    activityId,
    completedAt,
    elapsedSeconds,
    wpm,
    accuracy,
    completion.correctedErrors,
    completion.uncorrectedErrors,
  ]);
  const correctedErrors = optionalInteger(completion.correctedErrors, 0, 100_000);
  const uncorrectedErrors = optionalInteger(completion.uncorrectedErrors, 0, 100_000);
  const score = optionalInteger(completion.score, 0, 10_000_000);
  if (correctedErrors === null || uncorrectedErrors === null || score === null) return null;

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
    ...(completion.correctedErrors === undefined ? {} : { correctedErrors }),
    ...(completion.uncorrectedErrors === undefined ? {} : { uncorrectedErrors }),
    ...(completion.score === undefined ? {} : { score }),
  };
}

function normalizeTypingRecord(value: unknown): TypingTestProgressRecord | null {
  if (!isRecord(value)) return null;
  return normalizeTypingCompletion({
    accuracy: value.accuracy as number,
    completedAt: value.completedAt as string,
    correctedErrors: value.correctedErrors as number | undefined,
    difficulty: value.difficulty as TypingTestCompletion["difficulty"],
    durationSeconds: value.durationSeconds as number,
    elapsedSeconds: value.elapsedSeconds as number,
    eventId: value.id as string,
    mode: value.mode as TypingTestCompletion["mode"],
    score: value.score as number | undefined,
    uncorrectedErrors: value.uncorrectedErrors as number | undefined,
    wpm: value.wpm as number,
  });
}

function normalizeLessonCompletion(completion: LessonCompletion) {
  const completedAt = validDate(completion.completedAt);
  const accuracy = validNumber(completion.accuracy, 0, 100);
  const wpm = validInteger(completion.wpm, 0, 5_000);
  const stars = optionalNumber(completion.stars, 0, 5);
  if (!completedAt || accuracy === null || wpm === null || stars === null || !isKnownLessonId(completion.lessonId)) return null;
  return {
    accuracy,
    completedAt,
    eventId:
      safeEventId(completion.eventId) ??
      buildProgressEventId("lesson", [completion.lessonId, completedAt, wpm, accuracy, completion.stars]),
    lessonId: completion.lessonId,
    stars: completion.stars === undefined ? undefined : stars,
    wpm,
  };
}

function normalizeGameCompletion(completion: GameCompletion) {
  const completedAt = validDate(completion.completedAt);
  const score = validInteger(completion.score, 0, 10_000_000);
  if (!completedAt || score === null || completion.gameId !== "calculator-sprint") return null;
  return {
    completedAt,
    eventId:
      safeEventId(completion.eventId) ?? buildProgressEventId("game", [completion.gameId, completedAt, completion.score]),
    gameId: completion.gameId,
    score,
  };
}

function normalizeLessonRecord(value: unknown, lessonId: string): LessonProgressRecord | null {
  if (!isRecord(value) || !isKnownLessonId(lessonId) || value.completed !== true || value.lessonId !== lessonId) return null;
  const attemptCount = validInteger(value.attemptCount, 1, 1_000_000);
  const bestAccuracy = validNumber(value.bestAccuracy, 0, 100);
  const bestWpm = validInteger(value.bestWpm, 0, 5_000);
  const firstCompletedAt = validDate(value.firstCompletedAt);
  const mostRecentCompletedAt = validDate(value.mostRecentCompletedAt);
  const bestStars = optionalNumber(value.bestStars, 0, 5);
  if (
    attemptCount === null ||
    bestAccuracy === null ||
    bestWpm === null ||
    !firstCompletedAt ||
    !mostRecentCompletedAt ||
    bestStars === null
  ) {
    return null;
  }
  return {
    attemptCount,
    bestAccuracy,
    bestWpm,
    completed: true,
    firstCompletedAt,
    lessonId,
    mostRecentCompletedAt,
    ...(value.bestStars === undefined ? {} : { bestStars }),
  };
}

function normalizeGameRecord(value: unknown, gameId: GameProgressRecord["gameId"]): GameProgressRecord | null {
  if (!isRecord(value) || value.gameId !== gameId) return null;
  const bestScore = validInteger(value.bestScore, 0, 10_000_000);
  const completedSessions = validInteger(value.completedSessions, 1, 1_000_000);
  const mostRecentCompletedAt = validDate(value.mostRecentCompletedAt);
  if (bestScore === null || completedSessions === null || !mostRecentCompletedAt) return null;
  return { bestScore, completedSessions, gameId, mostRecentCompletedAt };
}

function normalizeLegacyRecord(value: unknown) {
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

function writeProgress(storage: StorageLike, data: LocalProgress): StorageCapability {
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    return "available";
  } catch (error) {
    return isQuotaError(error) ? "quota" : "unavailable";
  }
}

function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function notifyProgressChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(SAME_TAB_EVENT));
}

function unchangedResult(result: ProgressReadResult): ProgressWriteResult {
  return { ...result, changed: false };
}

function addActivityDate(current: string[], timestamp: string) {
  const date = timestamp.slice(0, 10);
  return [date, ...current.filter((value) => value !== date)].filter(isActivityDate).sort().reverse().slice(0, MAX_ACTIVITY_DATES);
}

function latestLocalCompletion(data: LocalProgress) {
  return [
    ...Object.values(data.lessons).map((lesson) => lesson.mostRecentCompletedAt),
    ...Object.values(data.games).flatMap((game) => (game ? [game.mostRecentCompletedAt] : [])),
  ].sort().reverse()[0];
}

function legacySourceCount(storage: StorageLike) {
  try {
    const raw = storage.getItem(LEGACY_RESULTS_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? Math.min(parsed.length, 10_000) : 0;
  } catch {
    return 0;
  }
}

function earlierDate(current: string | undefined, candidate: string) {
  return !current || candidate < current ? candidate : current;
}

function laterDate(current: string | null | undefined, candidate: string) {
  return !current || candidate > current ? candidate : current;
}

function validDate(value: unknown) {
  return typeof value === "string" && isValidDate(value) ? value : null;
}

function isValidDate(value: string) {
  if (value.length > 40 || !Number.isFinite(Date.parse(value))) return false;
  try {
    return new Date(value).toISOString() === value;
  } catch {
    return false;
  }
}

function isActivityDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && isValidDate(`${value}T00:00:00.000Z`);
}

function validInteger(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= min && value <= max ? value : null;
}

function validNumber(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : null;
}

function optionalInteger(value: unknown, min: number, max: number) {
  return value === undefined ? undefined : validInteger(value, min, max);
}

function optionalNumber(value: unknown, min: number, max: number) {
  return value === undefined ? undefined : validNumber(value, min, max);
}

function safeEventId(value: unknown) {
  return isSafeId(value) ? value : null;
}

function isSafeId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 160 && /^[A-Za-z0-9:._-]+$/.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function uniqueString(value: string, index: number, values: string[]) {
  return values.indexOf(value) === index;
}

function uniqueBy<T>(getKey: (value: T) => string) {
  const seen = new Set<string>();
  return (value: T) => {
    const key = getKey(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };
}

function isQuotaError(error: unknown) {
  return error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED");
}
