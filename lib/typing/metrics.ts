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
  const elapsedSeconds = Math.max(1, options.elapsedSeconds);
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
  const timeBonus = Math.max(0.25, Math.min(2, options.testTimeSec / 60));
  const baseScore = options.cpm * 10 + options.wpm * 24 + options.difficultyScore;
  const accuracyMultiplier = Math.max(0, options.accuracy / 100);
  const slowPenalty = options.wpm < 20 ? 0.75 : 1;

  return Math.max(0, Math.round(baseScore * accuracyMultiplier * timeBonus * slowPenalty));
}

export function getPerformanceStars(wpm: number, accuracy: number): number {
  if (accuracy < 75 || wpm < 20) return 0;
  if (wpm >= 80 && accuracy >= 97) return 5;
  if (wpm >= 60 && accuracy >= 95) return 4.5;
  if (wpm >= 50 && accuracy >= 93) return 4;
  if (wpm >= 45 && accuracy >= 90) return 3.5;
  if (wpm >= 40 && accuracy >= 88) return 3;
  if (wpm >= 30 && accuracy >= 84) return 2;
  return 1;
}

export function formatClock(seconds: number): string {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const remainingSeconds = clamped % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
