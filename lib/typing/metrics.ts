import type { CharStatus, TypingStats } from "@/lib/typing/types";

type CalculateStatsOptions = {
  statuses: CharStatus[];
  elapsedSeconds: number;
  difficultyScore: number;
};

export function calculateTypingStats(options: CalculateStatsOptions): TypingStats {
  const correctChars = options.statuses.filter((status) => status === "correct").length;
  const errorChars = options.statuses.filter((status) => status === "error").length;
  const totalChars = correctChars + errorChars;
  const elapsedSeconds = clampFinite(options.elapsedSeconds, 1, 86_400, 1);
  const elapsedMinutes = elapsedSeconds / 60;
  const rawWpm = Math.ceil(correctChars / 5 / elapsedMinutes);
  const rawCpm = Math.ceil(correctChars / elapsedMinutes);
  const accuracy = totalChars > 0 ? Math.floor((correctChars / totalChars) * 100) : 0;
  const wpm = accuracy > 0 ? Math.round(rawWpm * (accuracy / 100)) : 0;
  const cpm = accuracy > 0 ? Math.round(rawCpm * (accuracy / 100)) : 0;

  return {
    correctChars,
    errorChars,
    totalChars,
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
