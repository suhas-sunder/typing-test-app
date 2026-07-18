import type { CharStatus, TypingStats } from "@/lib/typing/types";
import type { TypingAttemptSummary } from "@/lib/typing/attempt";

type CalculateStatsOptions = {
  attemptSummary?: TypingAttemptSummary;
  statuses: CharStatus[];
  elapsedMilliseconds?: number;
  elapsedSeconds?: number;
  difficultyScore: number;
};

export function calculateTypingStats(options: CalculateStatsOptions): TypingStats {
  const correctChars = options.statuses.filter((status) => status === "correct").length;
  const currentErrors = options.statuses.filter((status) => status === "error").length;
  const summary = options.attemptSummary ?? {
    correctedErrors: 0,
    correctKeystrokes: correctChars,
    incorrectKeypresses: currentErrors,
    trackedKeystrokes: correctChars + currentErrors,
    uncorrectedErrors: currentErrors,
  };
  const elapsedSeconds = normalizeElapsedSeconds(options);
  const elapsedMinutes = elapsedSeconds / 60;
  const rawWpm = Math.ceil(correctChars / 5 / elapsedMinutes);
  const rawCpm = Math.ceil(correctChars / elapsedMinutes);
  const accuracy = summary.trackedKeystrokes > 0 ? Math.floor((summary.correctKeystrokes / summary.trackedKeystrokes) * 100) : 0;

  // WPM = currently correct characters / 5 / elapsed active minutes.
  // Accuracy = correct tracked character keypresses / all tracked character keypresses.
  // Backspace and control/modifier input are not tracked; corrected mistakes remain in the denominator.
  const wpm = rawWpm;
  const cpm = rawCpm;

  return {
    correctedErrors: summary.correctedErrors,
    correctChars,
    correctKeystrokes: summary.correctKeystrokes,
    errorChars: summary.incorrectKeypresses,
    incorrectKeypresses: summary.incorrectKeypresses,
    totalChars: summary.trackedKeystrokes,
    trackedKeystrokes: summary.trackedKeystrokes,
    uncorrectedErrors: summary.uncorrectedErrors,
    accuracy,
    rawWpm,
    wpm,
    cpm,
    score: calculateTestScore({
      accuracy,
      cpm,
      difficultyScore: options.difficultyScore,
      testTimeSec: elapsedSeconds,
      wpm,
    }),
    elapsedSeconds,
  };
}

function normalizeElapsedSeconds(options: CalculateStatsOptions) {
  if (typeof options.elapsedMilliseconds === "number" && Number.isFinite(options.elapsedMilliseconds)) {
    return Math.max(1, Math.min(86_400, options.elapsedMilliseconds / 1_000));
  }

  return clampFinite(options.elapsedSeconds ?? 0, 1, 86_400, 1);
}

type ScoreOptions = {
  accuracy: number;
  cpm: number;
  difficultyScore: number;
  testTimeSec: number;
  wpm: number;
};

export function calculateTestScore(options: ScoreOptions): number {
  const testTimeSec = clampFinite(options.testTimeSec, 1, 86_400, 60);
  const cpm = clampFinite(options.cpm, 0, 25_000, 0);
  const wpm = clampFinite(options.wpm, 0, 5_000, 0);
  const difficultyScore = clampFinite(options.difficultyScore, 0, 10_000, 0);
  const accuracy = clampFinite(options.accuracy, 0, 100, 0);
  const timeBonus = Math.max(0.25, Math.min(2, testTimeSec / 60));
  const baseScore = cpm * 10 + wpm * 24 + difficultyScore;
  const accuracyMultiplier = Math.max(0, accuracy / 100);
  const slowPenalty = wpm < 20 ? 0.75 : 1;

  return Math.max(0, Math.round(baseScore * accuracyMultiplier * timeBonus * slowPenalty));
}

export function getPerformanceStars(wpm: number, accuracy: number): number {
  const safeWpm = clampFinite(wpm, 0, 5_000, 0);
  const safeAccuracy = clampFinite(accuracy, 0, 100, 0);
  if (safeAccuracy < 75 || safeWpm < 20) return 0;
  if (safeWpm >= 80 && safeAccuracy >= 97) return 5;
  if (safeWpm >= 60 && safeAccuracy >= 95) return 4.5;
  if (safeWpm >= 50 && safeAccuracy >= 93) return 4;
  if (safeWpm >= 45 && safeAccuracy >= 90) return 3.5;
  if (safeWpm >= 40 && safeAccuracy >= 88) return 3;
  if (safeWpm >= 30 && safeAccuracy >= 84) return 2;
  return 1;
}

export function formatClock(seconds: number): string {
  const clamped = clampFinite(seconds, 0, 86_400, 0);
  const minutes = Math.floor(clamped / 60);
  const remainingSeconds = clamped % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function clampFinite(value: number, min: number, max: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.round(value)));
}
