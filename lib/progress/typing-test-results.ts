import { buildTypingActivityId } from "@/lib/progress/ids";
import type { TypingTestProgressRecord } from "@/lib/progress/types";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

export type TypingTestResultInput = {
  accuracy: number;
  difficulty: DifficultyId;
  durationSeconds: number;
  mode: TestMode;
  numbers: boolean;
  punctuation: boolean;
  wpm: number;
};

export type TypingTestComparison = {
  accuracyDelta: number | null;
  isAccuracyPersonalBest: boolean;
  isSpeedPersonalBest: boolean;
  prior: TypingTestProgressRecord | null;
  wpmDelta: number | null;
};

export function calculateAccuracyStars(accuracy: number) {
  if (accuracy >= 99) return 5;
  if (accuracy >= 97) return 4;
  if (accuracy >= 95) return 3;
  if (accuracy >= 90) return 2;
  if (accuracy >= 85) return 1;
  return 0;
}

export function compareTypingTestResult(history: TypingTestProgressRecord[], result: TypingTestResultInput): TypingTestComparison {
  const activityId = buildTypingActivityId(result.mode, result.durationSeconds, result.difficulty, result.punctuation, result.numbers);
  const comparable = history.filter((record) => record.activityId === activityId && record.punctuation !== undefined && record.numbers !== undefined);
  const prior = comparable[0] ?? null;
  const speedBest = comparable.filter((record) => record.accuracy >= 95).sort(compareSpeedRecords)[0] ?? null;
  const accuracyBest = [...comparable].sort(compareAccuracyRecords)[0] ?? null;

  return {
    accuracyDelta: prior ? round(result.accuracy - prior.accuracy) : null,
    isAccuracyPersonalBest: !accuracyBest || compareAccuracyValues(result, accuracyBest) < 0,
    isSpeedPersonalBest: result.accuracy >= 95 && (!speedBest || compareSpeedValues(result, speedBest) < 0),
    prior,
    wpmDelta: prior ? result.wpm - prior.wpm : null,
  };
}

export function getAccuracyFeedback(accuracy: number) {
  if (accuracy < 85) return "Slow down and aim for cleaner keystrokes before building speed.";
  if (accuracy < 90) return "Your control is developing. Repeat this setup and focus on the difficult transitions.";
  if (accuracy < 95) return "Good progress. Keep the pace steady and work toward 95% accuracy.";
  if (accuracy < 98) return "Strong accuracy. Speed can build gradually from this controlled result.";
  return "Excellent control. Your accuracy stayed high, so this is a solid base for speed.";
}

function compareSpeedRecords(a: TypingTestProgressRecord, b: TypingTestProgressRecord) {
  if (a.wpm !== b.wpm) return b.wpm - a.wpm;
  if (a.accuracy !== b.accuracy) return b.accuracy - a.accuracy;
  return a.completedAt.localeCompare(b.completedAt);
}

function compareAccuracyRecords(a: TypingTestProgressRecord, b: TypingTestProgressRecord) {
  if (a.accuracy !== b.accuracy) return b.accuracy - a.accuracy;
  if (a.wpm !== b.wpm) return b.wpm - a.wpm;
  return a.completedAt.localeCompare(b.completedAt);
}

function compareSpeedValues(result: TypingTestResultInput, record: TypingTestProgressRecord) {
  if (result.wpm !== record.wpm) return record.wpm - result.wpm;
  if (result.accuracy !== record.accuracy) return record.accuracy - result.accuracy;
  return 1;
}

function compareAccuracyValues(result: TypingTestResultInput, record: TypingTestProgressRecord) {
  if (result.accuracy !== record.accuracy) return record.accuracy - result.accuracy;
  if (result.wpm !== record.wpm) return record.wpm - result.wpm;
  return 1;
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}
