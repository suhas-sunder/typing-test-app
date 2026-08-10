import {
  compareCalculatorRuns,
  mergeWeakKeySummaries,
  normalizeGameCompletion,
  normalizeLessonCompletion,
  normalizePracticeCompletion,
  normalizeTypingCompletion,
} from "@/lib/progress/normalization";
import {
  MAX_CALCULATOR_HISTORY,
  MAX_TYPING_TEST_HISTORY,
  type GameCompletion,
  type GameProgressRecord,
  type LessonCompletion,
  type LessonProgressRecord,
  type LocalProgress,
  type PracticeCompletion,
  type TypingTestCompletion,
} from "@/lib/progress/types";
import { laterDate } from "@/lib/progress/validation";

export type ProgressMutation = {
  completedAt: string;
  eventId: string;
  update: (data: LocalProgress) => LocalProgress;
};

export function prepareTypingTestCompletion(completion: TypingTestCompletion): ProgressMutation | null {
  const normalized = normalizeTypingCompletion(completion);
  if (!normalized) return null;
  return {
    completedAt: normalized.completedAt,
    eventId: normalized.id,
    update: (data) => ({
      ...data,
      typingTests: {
        history: [normalized, ...data.typingTests.history.filter((record) => record.id !== normalized.id)].slice(
          0,
          MAX_TYPING_TEST_HISTORY,
        ),
        totalCompleted: data.typingTests.totalCompleted + 1,
      },
    }),
  };
}

export function preparePracticeCompletion(completion: PracticeCompletion): ProgressMutation | null {
  const normalized = normalizePracticeCompletion(completion);
  if (!normalized) return null;
  return {
    completedAt: normalized.completedAt,
    eventId: normalized.id,
    update: (data) => ({
      ...data,
      practice: {
        completedPracticeIds: [...new Set([...data.practice.completedPracticeIds, normalized.practiceId])],
        history: [normalized, ...data.practice.history.filter((record) => record.id !== normalized.id)].slice(0, MAX_TYPING_TEST_HISTORY),
        totalCompleted: data.practice.totalCompleted + 1,
      },
    }),
  };
}

export function prepareLessonCompletion(completion: LessonCompletion): ProgressMutation | null {
  const normalized = normalizeLessonCompletion(completion);
  if (!normalized) return null;
  return {
    completedAt: normalized.completedAt,
    eventId: normalized.eventId,
    update: (data) => {
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
      return {
        ...data,
        lessons: { ...data.lessons, [next.lessonId]: next },
        weakKeys: mergeWeakKeySummaries(data.weakKeys, normalized.weakKeys ?? [], normalized.completedAt),
      };
    },
  };
}

export function prepareGameCompletion(completion: GameCompletion): ProgressMutation | null {
  const normalized = normalizeGameCompletion(completion);
  if (!normalized) return null;
  return {
    completedAt: normalized.completedAt,
    eventId: normalized.eventId,
    update: (data) => {
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
    },
  };
}
