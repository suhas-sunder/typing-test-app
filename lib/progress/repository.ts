import { addAchievementUnlocks, getAchievement } from "@/lib/progress/achievements";
import {
  browserProgressStorage,
  legacySourceCount,
  notifyProgressChanged,
  readStorageItem,
  subscribeToProgress,
  writeProgress,
  type ProgressStorage,
} from "@/lib/progress/local/storage";
import { migrateStoredProgress, PHASE6_LESSON_MIGRATION_MAP } from "@/lib/progress/migrations";
import { addActivityDate, compareCalculatorRuns } from "@/lib/progress/normalization";
import {
  prepareGameCompletion,
  prepareLessonCompletion,
  preparePracticeCompletion,
  prepareTypingTestCompletion,
  type ProgressMutation,
} from "@/lib/progress/recording";
import { createEmptyProgress, normalizeProgressV5, parseCanonicalProgress } from "@/lib/progress/schema/normalize-v5";
import {
  LEGACY_RESULTS_KEY,
  MAX_PROCESSED_EVENT_IDS,
  PROGRESS_STORAGE_KEY,
  type GameCompletion,
  type LessonCompletion,
  type LocalProgress,
  type PracticeCompletion,
  type ProgressReadResult,
  type ProgressWriteResult,
  type TypingTestCompletion,
} from "@/lib/progress/types";
import { isValidDate, laterDate } from "@/lib/progress/validation";
import { getTheme, isThemeAvailable } from "@/lib/themes/registry";

export { PHASE6_LESSON_MIGRATION_MAP, compareCalculatorRuns, createEmptyProgress, subscribeToProgress };

export function readLocalProgress(storage = browserProgressStorage()): ProgressReadResult {
  if (!storage) return { data: createEmptyProgress(), migrated: false, status: "unavailable" };

  const canonical = readStorageItem(storage, PROGRESS_STORAGE_KEY);
  if (canonical.status === "unavailable") {
    return { data: createEmptyProgress(), migrated: false, status: "unavailable" };
  }
  if (canonical.value !== null) return parseCanonicalProgress(canonical.value);

  return migrateStoredProgress(storage);
}

export function recordTypingTestCompletion(
  completion: TypingTestCompletion,
  storage = browserProgressStorage(),
): ProgressWriteResult {
  return recordPreparedCompletion(prepareTypingTestCompletion(completion), storage);
}

export function recordPracticeCompletion(
  completion: PracticeCompletion,
  storage = browserProgressStorage(),
): ProgressWriteResult {
  return recordPreparedCompletion(preparePracticeCompletion(completion), storage);
}

export function recordLessonCompletion(
  completion: LessonCompletion,
  storage = browserProgressStorage(),
): ProgressWriteResult {
  return recordPreparedCompletion(prepareLessonCompletion(completion), storage);
}

export function recordGameCompletion(
  completion: GameCompletion,
  storage = browserProgressStorage(),
): ProgressWriteResult {
  return recordPreparedCompletion(prepareGameCompletion(completion), storage);
}

export function resetLocalProgress(
  storage = browserProgressStorage(),
  now = new Date().toISOString(),
): ProgressWriteResult {
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

export function selectCampEmblem(
  achievementId: string | null,
  storage = browserProgressStorage(),
  now = new Date().toISOString(),
) {
  return updateCustomization(storage, now, (data) => {
    if (achievementId !== null && (!getAchievement(achievementId) || !data.achievements.unlocked.some((record) => record.id === achievementId))) return null;
    return { ...data, customization: { ...data.customization, selectedEmblemId: achievementId } };
  });
}

export function selectLocalTheme(
  themeId: string,
  storage = browserProgressStorage(),
  now = new Date().toISOString(),
) {
  return updateCustomization(storage, now, (data) => {
    const theme = getTheme(themeId);
    if (theme.id !== themeId || !isThemeAvailable(theme, data)) return null;
    return { ...data, customization: { ...data.customization, selectedThemeId: theme.id } };
  });
}

function recordPreparedCompletion(
  mutation: ProgressMutation | null,
  storage: ProgressStorage | null,
): ProgressWriteResult {
  if (!mutation) return unchangedResult(readLocalProgress(storage));
  return updateProgress(mutation, storage);
}

function updateProgress(mutation: ProgressMutation, storage: ProgressStorage | null): ProgressWriteResult {
  const current = readLocalProgress(storage);
  if (!storage || current.status === "unavailable" || current.status === "quota" || current.status === "unsupported") {
    return unchangedResult(current);
  }
  if (current.data.processedEventIds.includes(mutation.eventId)) return unchangedResult(current);

  const next = mutation.update(current.data);
  next.processedEventIds = [mutation.eventId, ...next.processedEventIds.filter((id) => id !== mutation.eventId)].slice(
    0,
    MAX_PROCESSED_EVENT_IDS,
  );
  next.activityDates = addActivityDate(next.activityDates, mutation.completedAt);
  next.updatedAt = laterDate(next.updatedAt, mutation.completedAt);

  const evaluated = addAchievementUnlocks(next, mutation.completedAt, false);
  const validated = normalizeProgressV5(evaluated.progress);
  const status = writeProgress(storage, validated);
  if (status === "available") notifyProgressChanged();
  return {
    data: validated,
    changed: status === "available",
    migrated: current.migrated,
    status,
    unlockedAchievementIds: status === "available" ? evaluated.unlockedAchievementIds : [],
  };
}

function updateCustomization(
  storage: ProgressStorage | null,
  now: string,
  updater: (data: LocalProgress) => LocalProgress | null,
): ProgressWriteResult {
  const current = readLocalProgress(storage);
  if (!storage || current.status !== "available" || !isValidDate(now)) return unchangedResult(current);
  const next = updater(current.data);
  if (!next) return unchangedResult(current);
  next.updatedAt = laterDate(next.updatedAt, now);
  const validated = normalizeProgressV5(next);
  const status = writeProgress(storage, validated);
  if (status === "available") notifyProgressChanged();
  return { data: validated, changed: status === "available", migrated: current.migrated, status, unlockedAchievementIds: [] };
}

function unchangedResult(result: ProgressReadResult): ProgressWriteResult {
  return { ...result, changed: false, unlockedAchievementIds: [] };
}
