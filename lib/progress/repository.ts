import { buildProgressEventId, buildTypingActivityId, isKnownLessonId, isKnownOrLegacyLessonId } from "@/lib/progress/ids";
import { addAchievementUnlocks, getAchievement } from "@/lib/progress/achievements";
import { getTheme, isThemeAvailable } from "@/lib/themes/registry";
import {
  LEGACY_RESULTS_KEY,
  MAX_ACTIVITY_DATES,
  MAX_CALCULATOR_HISTORY,
  MAX_PROCESSED_EVENT_IDS,
  MAX_TYPING_TEST_HISTORY,
  PREVIOUS_PROGRESS_STORAGE_KEY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  PRACTICE_IDS,
  PRACTICE_LENGTHS,
  VERSION_TWO_PROGRESS_STORAGE_KEY,
  type AchievementUnlockRecord,
  type CalculatorRunRecord,
  type GameCompletion,
  type GameProgressRecord,
  type LessonCompletion,
  type LessonProgressRecord,
  type LocalProgress,
  type PracticeCompletion,
  type PracticeProgressRecord,
  type ProgressReadResult,
  type ProgressWriteResult,
  type StorageCapability,
  type TypingTestCompletion,
  type TypingTestProgressRecord,
} from "@/lib/progress/types";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const SAME_TAB_EVENT = "freeTypingCamp:progress-change";
const VALID_DURATIONS = new Set([15, 30, 60, 120, 300]);
const VALID_MODES = new Set(["words", "quote"]);
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard", "legacy"]);
const VALID_PRACTICE_IDS = new Set<string>(PRACTICE_IDS);
const VALID_PRACTICE_LENGTHS = new Set<string>(PRACTICE_LENGTHS);

export function createEmptyProgress(): LocalProgress {
  return {
    achievements: { unlocked: [] },
    activityDates: [],
    customization: { selectedEmblemId: null, selectedThemeId: "base-camp" },
    games: {},
    lessons: {},
    practice: { completedPracticeIds: [], history: [], totalCompleted: 0 },
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

  const versionThree = migrateVersionThreeProgress(storage);
  if (versionThree) return versionThree;

  const versionTwo = migrateVersionTwoProgress(storage);
  if (versionTwo) return versionTwo;

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

export function recordPracticeCompletion(completion: PracticeCompletion, storage = browserStorage()): ProgressWriteResult {
  const normalized = normalizePracticeCompletion(completion);
  if (!normalized) return unchangedResult(readLocalProgress(storage));
  return updateProgress(normalized.id, normalized.completedAt, storage, (data) => ({
    ...data,
    practice: {
      completedPracticeIds: [...new Set([...data.practice.completedPracticeIds, normalized.practiceId])],
      history: [normalized, ...data.practice.history.filter((record) => record.id !== normalized.id)].slice(0, MAX_TYPING_TEST_HISTORY),
      totalCompleted: data.practice.totalCompleted + 1,
    },
  }));
}

export function recordLessonCompletion(completion: LessonCompletion, storage = browserStorage()): ProgressWriteResult {
  const normalized = normalizeLessonCompletion(completion);
  if (!normalized) return unchangedResult(readLocalProgress(storage));

  return updateProgress(normalized.eventId, normalized.completedAt, storage, (data) => {
    const current = data.lessons[normalized.lessonId];
    const completedNow = (normalized.stars ?? 0) >= 1;
    const completed = Boolean(current?.completed || completedNow);
    const next: LessonProgressRecord = {
      attemptCount: (current?.attemptCount ?? 0) + 1,
      bestAccuracy: Math.max(current?.bestAccuracy ?? 0, normalized.accuracy),
      bestWpm: Math.max(current?.bestWpm ?? 0, normalized.wpm),
      completed,
      lessonId: normalized.lessonId,
      mostRecentAttemptAt: laterDate(current?.mostRecentAttemptAt, normalized.completedAt),
      perfectRun: Boolean(
        current?.perfectRun ||
          (completedNow && normalized.accuracy === 100 && normalized.correctedErrors === 0 && normalized.uncorrectedErrors === 0 && (normalized.characters ?? 0) >= 10),
      ),
      ...(completed ? { firstCompletedAt: current?.firstCompletedAt ?? normalized.completedAt } : {}),
      ...(completedNow || current?.mostRecentCompletedAt
        ? { mostRecentCompletedAt: completedNow ? laterDate(current?.mostRecentCompletedAt, normalized.completedAt) : current?.mostRecentCompletedAt }
        : {}),
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
    const history = [normalized, ...(current?.history ?? []).filter((run) => run.id !== normalized.id)].slice(0, MAX_CALCULATOR_HISTORY);
    const personalBest = history.filter((run) => run.outcome === "completed" && run.roundsCompleted === 5).sort(compareCalculatorRuns)[0];
    const next: GameProgressRecord = {
      bestScore: Math.max(current?.bestScore ?? 0, normalized.outcome === "completed" ? normalized.score : 0),
      completedSessions: (current?.completedSessions ?? 0) + (normalized.outcome === "completed" ? 1 : 0),
      failedSessions: (current?.failedSessions ?? 0) + (normalized.outcome === "game-over" ? 1 : 0),
      gameId: normalized.gameId,
      history,
      mostRecentCompletedAt: laterDate(current?.mostRecentCompletedAt, normalized.completedAt),
      ...(personalBest ? { personalBestId: personalBest.id } : current?.personalBestId ? { personalBestId: current.personalBestId } : {}),
    };
    return { ...data, games: { ...data.games, [next.gameId]: next } };
  });
}

export function resetLocalProgress(storage = browserStorage(), now = new Date().toISOString()): ProgressWriteResult {
  if (!storage || !isValidDate(now)) {
    return { data: createEmptyProgress(), changed: false, migrated: false, status: "unavailable", unlockedAchievementIds: [] };
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
  if (status === "available" && typeof document !== "undefined") document.documentElement.dataset.theme = "base-camp";
  return { data: reset, changed: status === "available", migrated: false, status, unlockedAchievementIds: [] };
}

export function selectCampEmblem(achievementId: string | null, storage = browserStorage(), now = new Date().toISOString()) {
  return updateCustomization(storage, now, (data) => {
    if (achievementId !== null && (!getAchievement(achievementId) || !data.achievements.unlocked.some((record) => record.id === achievementId))) return null;
    return { ...data, customization: { ...data.customization, selectedEmblemId: achievementId } };
  });
}

export function selectLocalTheme(themeId: string, storage = browserStorage(), now = new Date().toISOString()) {
  return updateCustomization(storage, now, (data) => {
    const theme = getTheme(themeId);
    if (theme.id !== themeId || !isThemeAvailable(theme, data)) return null;
    return { ...data, customization: { ...data.customization, selectedThemeId: theme.id } };
  });
}

function updateCustomization(
  storage: StorageLike | null,
  now: string,
  updater: (data: LocalProgress) => LocalProgress | null,
): ProgressWriteResult {
  const current = readLocalProgress(storage);
  if (!storage || current.status !== "available" || !isValidDate(now)) return unchangedResult(current);
  const next = updater(current.data);
  if (!next) return unchangedResult(current);
  next.updatedAt = laterDate(next.updatedAt, now);
  const validated = validateCanonical(next);
  const status = writeProgress(storage, validated);
  if (status === "available") notifyProgressChanged();
  return { data: validated, changed: status === "available", migrated: current.migrated, status, unlockedAchievementIds: [] };
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

  const evaluated = addAchievementUnlocks(next, completedAt, false);
  const validated = validateCanonical(evaluated.progress);
  const status = writeProgress(storage, validated);
  if (status === "available") notifyProgressChanged();
  return { data: validated, changed: status === "available", migrated: current.migrated, status, unlockedAchievementIds: status === "available" ? evaluated.unlockedAchievementIds : [] };
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

  progress.practice.history = Array.isArray(isRecord(source.practice) ? source.practice.history : undefined)
    ? (source.practice as { history: unknown[] }).history
        .map(normalizePracticeRecord)
        .filter((record): record is PracticeProgressRecord => Boolean(record))
        .filter(uniqueBy((record) => record.id))
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
        .slice(0, MAX_TYPING_TEST_HISTORY)
    : [];
  const practiceTotal = isRecord(source.practice)
    ? validInteger(source.practice.totalCompleted, progress.practice.history.length, 10_000_000)
    : null;
  progress.practice.totalCompleted = practiceTotal ?? progress.practice.history.length;
  const completedPracticeIds = Array.isArray(isRecord(source.practice) ? source.practice.completedPracticeIds : undefined)
    ? (source.practice as { completedPracticeIds: unknown[] }).completedPracticeIds.filter((id): id is LocalProgress["practice"]["completedPracticeIds"][number] => typeof id === "string" && VALID_PRACTICE_IDS.has(id))
    : [];
  progress.practice.completedPracticeIds = [...new Set([...completedPracticeIds, ...progress.practice.history.map((record) => record.practiceId)])];

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

  const achievementSource = isRecord(source.achievements) && Array.isArray(source.achievements.unlocked)
    ? source.achievements.unlocked
    : [];
  progress.achievements.unlocked = achievementSource
    .map(normalizeAchievementUnlock)
    .filter((record): record is AchievementUnlockRecord => Boolean(record))
    .filter(uniqueBy((record) => record.id))
    .sort((a, b) => a.unlockedAt.localeCompare(b.unlockedAt));

  const customization = isRecord(source.customization) ? source.customization : {};
  const selectedEmblemId = typeof customization.selectedEmblemId === "string" && progress.achievements.unlocked.some((record) => record.id === customization.selectedEmblemId)
    ? customization.selectedEmblemId
    : null;
  const requestedTheme = typeof customization.selectedThemeId === "string" ? customization.selectedThemeId : "base-camp";
  const requestedThemeDefinition = getTheme(requestedTheme);
  progress.customization = {
    selectedEmblemId,
    selectedThemeId: requestedThemeDefinition.id === requestedTheme && isThemeAvailable(requestedThemeDefinition, progress) ? requestedTheme : "base-camp",
  };

  const migrationSource = isRecord(source.migration) ? source.migration : undefined;
  const migration = migrationSource?.legacyResultsV1;
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
  const progressV2 = migrationSource?.progressV2;
  if (isRecord(progressV2)) {
    const completedAt = validDate(progressV2.completedAt);
    if (completedAt && progressV2.sourceKey === VERSION_TWO_PROGRESS_STORAGE_KEY) {
      progress.migration = { ...progress.migration, progressV2: { completedAt, sourceKey: VERSION_TWO_PROGRESS_STORAGE_KEY } };
    }
  }
  const progressV3 = migrationSource?.progressV3;
  if (isRecord(progressV3)) {
    const completedAt = validDate(progressV3.completedAt);
    if (completedAt && progressV3.sourceKey === PREVIOUS_PROGRESS_STORAGE_KEY) {
      progress.migration = { ...progress.migration, progressV3: { completedAt, sourceKey: PREVIOUS_PROGRESS_STORAGE_KEY } };
    }
  }

  return progress;
}

function migrateVersionThreeProgress(storage: StorageLike): ProgressReadResult | null {
  let raw: string | null;
  try {
    raw = storage.getItem(PREVIOUS_PROGRESS_STORAGE_KEY);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  }
  if (raw === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!isRecord(value) || value.schemaVersion !== 3) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  const completedAt = new Date().toISOString();
  let data = validateCanonical({ ...value, schemaVersion: PROGRESS_SCHEMA_VERSION });
  data.migration = { ...data.migration, progressV3: { completedAt, sourceKey: PREVIOUS_PROGRESS_STORAGE_KEY } };
  data = addAchievementUnlocks(data, completedAt, true).progress;
  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
}

function migrateVersionTwoProgress(storage: StorageLike): ProgressReadResult | null {
  let raw: string | null;
  try {
    raw = storage.getItem(VERSION_TWO_PROGRESS_STORAGE_KEY);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  }
  if (raw === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!isRecord(value) || value.schemaVersion !== 2) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };

  const completedAt = new Date().toISOString();
  let data = validateCanonical({ ...value, schemaVersion: PROGRESS_SCHEMA_VERSION });
  data.migration = { ...data.migration, progressV2: { completedAt, sourceKey: VERSION_TWO_PROGRESS_STORAGE_KEY } };
  data = addAchievementUnlocks(data, completedAt, true).progress;
  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
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

    if (isKnownOrLegacyLessonId(legacy.testName)) {
      const current = data.lessons[legacy.testName];
      data.lessons[legacy.testName] = {
        attemptCount: (current?.attemptCount ?? 0) + 1,
        bestAccuracy: Math.max(current?.bestAccuracy ?? 0, legacy.accuracy),
        bestWpm: Math.max(current?.bestWpm ?? 0, legacy.wpm),
        completed: true,
        firstCompletedAt: earlierDate(current?.firstCompletedAt, legacy.createdAt),
        lessonId: legacy.testName,
        mostRecentAttemptAt: laterDate(current?.mostRecentAttemptAt, legacy.createdAt),
        mostRecentCompletedAt: laterDate(current?.mostRecentCompletedAt, legacy.createdAt),
        perfectRun: false,
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

  const evaluated = addAchievementUnlocks(data, completedAt, true);
  const status = writeProgress(storage, evaluated.progress);
  if (status === "available") notifyProgressChanged();
  return { data: evaluated.progress, migrated: status === "available", status };
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

function normalizeTypingRecord(value: unknown): TypingTestProgressRecord | null {
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

function normalizeLessonCompletion(completion: LessonCompletion) {
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
    wpm,
  };
}

function normalizePracticeCompletion(completion: PracticeCompletion): PracticeProgressRecord | null {
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

function normalizePracticeRecord(value: unknown) {
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

function normalizeGameCompletion(completion: GameCompletion) {
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

function normalizeLessonRecord(value: unknown, lessonId: string): LessonProgressRecord | null {
  if (!isRecord(value) || !isKnownOrLegacyLessonId(lessonId) || typeof value.completed !== "boolean" || value.lessonId !== lessonId) return null;
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

function normalizeGameRecord(value: unknown, gameId: GameProgressRecord["gameId"]): GameProgressRecord | null {
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

function normalizeCalculatorRun(value: unknown): CalculatorRunRecord | null {
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

function normalizeAchievementUnlock(value: unknown): AchievementUnlockRecord | null {
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
  return { ...result, changed: false, unlockedAchievementIds: [] };
}

function addActivityDate(current: string[], timestamp: string) {
  const date = timestamp.slice(0, 10);
  return [date, ...current.filter((value) => value !== date)].filter(isActivityDate).sort().reverse().slice(0, MAX_ACTIVITY_DATES);
}

function latestLocalCompletion(data: LocalProgress) {
  return [
    ...Object.values(data.lessons).map((lesson) => lesson.mostRecentAttemptAt),
    ...data.practice.history.map((record) => record.completedAt),
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
