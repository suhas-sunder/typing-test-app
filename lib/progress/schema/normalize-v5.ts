import {
  normalizeAchievementUnlock,
  normalizeGameRecord,
  normalizeLessonRecord,
  normalizePracticeRecord,
  normalizeTypingRecord,
  normalizeWeakKeySummary,
} from "@/lib/progress/normalization";
import {
  LEGACY_RESULTS_KEY,
  MAX_ACTIVITY_DATES,
  MAX_LEGACY_CURRICULUM_RECORDS,
  MAX_PROCESSED_EVENT_IDS,
  MAX_TYPING_TEST_HISTORY,
  MAX_WEAK_KEY_SUMMARIES,
  PREVIOUS_PROGRESS_STORAGE_KEY,
  PROGRESS_SCHEMA_VERSION,
  PRACTICE_IDS,
  VERSION_THREE_PROGRESS_STORAGE_KEY,
  VERSION_TWO_PROGRESS_STORAGE_KEY,
  type AchievementUnlockRecord,
  type LocalProgress,
  type PracticeProgressRecord,
  type ProgressReadResult,
  type TypingTestProgressRecord,
} from "@/lib/progress/schema/v5";
import { getTheme, isThemeAvailable } from "@/lib/themes/registry";
import {
  isActivityDate,
  isRecord,
  isSafeId,
  uniqueBy,
  uniqueString,
  validDate,
  validInteger,
} from "@/lib/progress/validation";

const VALID_PRACTICE_IDS = new Set<string>(PRACTICE_IDS);

export function createEmptyProgress(): LocalProgress {
  return {
    achievements: { unlocked: [] },
    activityDates: [],
    customization: { grandfatheredThemeIds: [], selectedEmblemId: null, selectedThemeId: "base-camp" },
    games: {},
    lessons: {},
    legacyCurriculum: { lessons: {} },
    weakKeys: [],
    practice: { completedPracticeIds: [], history: [], totalCompleted: 0 },
    processedEventIds: [],
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    typingTests: { history: [], totalCompleted: 0 },
    updatedAt: null,
  };
}

export function parseCanonicalProgress(raw: string): ProgressReadResult {
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

  return { data: normalizeProgressV5(value), migrated: false, status: "available" };
}

export function normalizeProgressV5(value: unknown): LocalProgress {
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
  if (isRecord(source.legacyCurriculum) && isRecord(source.legacyCurriculum.lessons)) {
    for (const [lessonId, candidate] of Object.entries(source.legacyCurriculum.lessons).slice(0, MAX_LEGACY_CURRICULUM_RECORDS)) {
      const lesson = normalizeLessonRecord(candidate, lessonId, true);
      if (lesson) progress.legacyCurriculum.lessons[lessonId] = lesson;
    }
  }
  progress.weakKeys = Array.isArray(source.weakKeys)
    ? source.weakKeys
        .map(normalizeWeakKeySummary)
        .filter((item): item is NonNullable<ReturnType<typeof normalizeWeakKeySummary>> => Boolean(item))
        .filter(uniqueBy((item) => item.key))
        .sort((a, b) => b.misses - a.misses || b.lastSeenAt.localeCompare(a.lastSeenAt))
        .slice(0, MAX_WEAK_KEY_SUMMARIES)
    : [];

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
  const grandfatheredThemeIds = Array.isArray(customization.grandfatheredThemeIds)
    ? customization.grandfatheredThemeIds.filter((id): id is string => typeof id === "string" && getTheme(id).id === id).filter(uniqueString)
    : [];
  progress.customization = {
    grandfatheredThemeIds,
    selectedEmblemId,
    selectedThemeId: requestedThemeDefinition.id === requestedTheme && (isThemeAvailable(requestedThemeDefinition, progress) || grandfatheredThemeIds.includes(requestedTheme)) ? requestedTheme : "base-camp",
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
    if (completedAt && progressV3.sourceKey === VERSION_THREE_PROGRESS_STORAGE_KEY) {
      progress.migration = { ...progress.migration, progressV3: { completedAt, sourceKey: VERSION_THREE_PROGRESS_STORAGE_KEY } };
    }
  }
  const progressV4 = migrationSource?.progressV4;
  if (isRecord(progressV4)) {
    const completedAt = validDate(progressV4.completedAt);
    const mappedCount = validInteger(progressV4.mappedCount, 0, 30);
    const preservedCount = validInteger(progressV4.preservedCount, 0, 30);
    if (completedAt && mappedCount !== null && preservedCount !== null && progressV4.sourceKey === PREVIOUS_PROGRESS_STORAGE_KEY) {
      progress.migration = { ...progress.migration, progressV4: { completedAt, mappedCount, preservedCount, sourceKey: PREVIOUS_PROGRESS_STORAGE_KEY } };
    }
  }

  return progress;
}
