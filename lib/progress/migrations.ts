import { addAchievementUnlocks } from "@/lib/progress/achievements";
import { PHASE6_LESSON_MIGRATION_MAP } from "@/lib/curriculum/legacy-lesson-ids";
import { buildTypingActivityId, isKnownOrLegacyLessonId } from "@/lib/progress/ids";
import { notifyProgressChanged, readStorageItem, writeProgress, type ProgressStorage } from "@/lib/progress/local/storage";
import {
  addActivityDate,
  latestLocalCompletion,
  mergeLessonRecords,
  normalizeLegacyRecord,
  normalizeLessonRecord,
} from "@/lib/progress/normalization";
import { createEmptyProgress, normalizeProgressV5 } from "@/lib/progress/schema/normalize-v5";
import {
  LEGACY_RESULTS_KEY,
  MAX_LEGACY_CURRICULUM_RECORDS,
  MAX_PROCESSED_EVENT_IDS,
  MAX_TYPING_TEST_HISTORY,
  PREVIOUS_PROGRESS_STORAGE_KEY,
  PROGRESS_SCHEMA_VERSION,
  VERSION_THREE_PROGRESS_STORAGE_KEY,
  VERSION_TWO_PROGRESS_STORAGE_KEY,
  type ProgressReadResult,
  type TypingTestProgressRecord,
} from "@/lib/progress/types";
import { earlierDate, isRecord, laterDate, uniqueBy, uniqueString } from "@/lib/progress/validation";
import { getTheme } from "@/lib/themes/registry";

export { PHASE6_LESSON_MIGRATION_MAP } from "@/lib/curriculum/legacy-lesson-ids";

export function migrateStoredProgress(storage: ProgressStorage): ProgressReadResult {
  const versionFour = migrateVersionFourProgress(storage);
  if (versionFour) return versionFour;

  const versionThree = migrateVersionThreeProgress(storage);
  if (versionThree) return versionThree;

  const versionTwo = migrateVersionTwoProgress(storage);
  if (versionTwo) return versionTwo;

  return migrateLegacyProgress(storage);
}

function migrateVersionFourProgress(storage: ProgressStorage): ProgressReadResult | null {
  const source = readStorageItem(storage, PREVIOUS_PROGRESS_STORAGE_KEY);
  if (source.status === "unavailable") return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  if (source.value === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(source.value);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!isRecord(value) || value.schemaVersion !== 4) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  const completedAt = new Date().toISOString();
  const sourceLessons = isRecord(value.lessons) ? value.lessons : {};
  const requestedThemeId = isRecord(value.customization) && typeof value.customization.selectedThemeId === "string"
    ? value.customization.selectedThemeId
    : "base-camp";
  let data = normalizeProgressV5({ ...value, lessons: {}, schemaVersion: PROGRESS_SCHEMA_VERSION });
  let mappedCount = 0;
  let preservedCount = 0;
  for (const [oldId, candidate] of Object.entries(sourceLessons)) {
    const record = normalizeLessonRecord(candidate, oldId, true);
    if (!record) continue;
    const newId = PHASE6_LESSON_MIGRATION_MAP[oldId];
    if (newId) {
      const mapped = { ...record, lessonId: newId };
      data.lessons[newId] = mergeLessonRecords(data.lessons[newId], mapped);
      mappedCount += 1;
    } else if (preservedCount < MAX_LEGACY_CURRICULUM_RECORDS) {
      data.legacyCurriculum.lessons[oldId] = record;
      preservedCount += 1;
    }
  }
  if (getTheme(requestedThemeId).id === requestedThemeId) {
    data.customization.selectedThemeId = requestedThemeId;
    data.customization.grandfatheredThemeIds = [requestedThemeId];
  }
  data.migration = { ...data.migration, progressV4: { completedAt, mappedCount, preservedCount, sourceKey: PREVIOUS_PROGRESS_STORAGE_KEY } };
  data = addAchievementUnlocks(data, completedAt, true).progress;
  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
}

function migrateVersionThreeProgress(storage: ProgressStorage): ProgressReadResult | null {
  const source = readStorageItem(storage, VERSION_THREE_PROGRESS_STORAGE_KEY);
  if (source.status === "unavailable") return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  if (source.value === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(source.value);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!isRecord(value) || value.schemaVersion !== 3) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  const completedAt = new Date().toISOString();
  const sourceLessons = isRecord(value.lessons) ? value.lessons : {};
  let data = normalizeProgressV5({ ...value, lessons: {}, schemaVersion: PROGRESS_SCHEMA_VERSION });
  for (const [oldId, candidate] of Object.entries(sourceLessons)) {
    const record = normalizeLessonRecord(candidate, oldId, true);
    if (!record) continue;
    const newId = PHASE6_LESSON_MIGRATION_MAP[oldId];
    if (newId) data.lessons[newId] = mergeLessonRecords(data.lessons[newId], { ...record, lessonId: newId });
    else if (Object.keys(data.legacyCurriculum.lessons).length < MAX_LEGACY_CURRICULUM_RECORDS) data.legacyCurriculum.lessons[oldId] = record;
  }
  data.migration = { ...data.migration, progressV3: { completedAt, sourceKey: VERSION_THREE_PROGRESS_STORAGE_KEY } };
  data = addAchievementUnlocks(data, completedAt, true).progress;
  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
}

function migrateVersionTwoProgress(storage: ProgressStorage): ProgressReadResult | null {
  const source = readStorageItem(storage, VERSION_TWO_PROGRESS_STORAGE_KEY);
  if (source.status === "unavailable") return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  if (source.value === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(source.value);
  } catch {
    return { data: createEmptyProgress(), migrated: false, status: "corrupt" };
  }
  if (!isRecord(value) || value.schemaVersion !== 2) return { data: createEmptyProgress(), migrated: false, status: "corrupt" };

  const completedAt = new Date().toISOString();
  let data = normalizeProgressV5({ ...value, schemaVersion: PROGRESS_SCHEMA_VERSION });
  data.migration = { ...data.migration, progressV2: { completedAt, sourceKey: VERSION_TWO_PROGRESS_STORAGE_KEY } };
  data = addAchievementUnlocks(data, completedAt, true).progress;
  const status = writeProgress(storage, data);
  if (status === "available") notifyProgressChanged();
  return { data, migrated: status === "available", status };
}

function migrateLegacyProgress(storage: ProgressStorage): ProgressReadResult {
  const source = readStorageItem(storage, LEGACY_RESULTS_KEY);
  if (source.status === "unavailable") return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  if (source.value === null) return { data: createEmptyProgress(), migrated: false, status: "available" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(source.value);
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
