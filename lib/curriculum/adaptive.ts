import type { LessonStage } from "@/lib/curriculum/types";

export type TypingAttemptResult = {
  accuracy: number;
  correctKeystrokes: number;
  correctedErrors: number;
  elapsedMilliseconds: number;
  trackedKeystrokes: number;
  uncorrectedErrors: number;
  weakKeys: Array<{ key: string; misses: number }>;
  wpm: number;
};

export function buildAdaptiveStage(
  lessonId: string,
  results: TypingAttemptResult[],
  fallbackText: string,
): LessonStage | null {
  const accuracyNeedsSupport = results.some((result) => result.accuracy < 95);
  const counts = new Map<string, number>();
  for (const result of results) {
    for (const weak of result.weakKeys) counts.set(weak.key, (counts.get(weak.key) ?? 0) + weak.misses);
  }
  const keys = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 2)
    .map(([key]) => key);
  if (!accuracyNeedsSupport && keys.length === 0) return null;

  const text = keys.length
    ? Array.from({ length: 8 }, (_, index) => keys[index % keys.length]).join(" ")
    : fallbackText.slice(0, 180);
  return {
    id: `${lessonId}-adaptive`,
    title: "Targeted reinforcement",
    text,
    type: "adaptive-reinforcement",
    required: false,
  };
}

export function aggregateLessonResults(results: TypingAttemptResult[]) {
  const correctKeystrokes = results.reduce((sum, result) => sum + result.correctKeystrokes, 0);
  const trackedKeystrokes = results.reduce((sum, result) => sum + result.trackedKeystrokes, 0);
  const elapsedMilliseconds = results.reduce((sum, result) => sum + result.elapsedMilliseconds, 0);
  const accuracy = trackedKeystrokes > 0 ? Math.floor((correctKeystrokes / trackedKeystrokes) * 100) : 0;
  const activeMinutes = Math.max(elapsedMilliseconds / 60_000, 1 / 60);
  return {
    accuracy,
    characters: correctKeystrokes,
    correctedErrors: results.reduce((sum, result) => sum + result.correctedErrors, 0),
    elapsedMilliseconds,
    uncorrectedErrors: results.reduce((sum, result) => sum + result.uncorrectedErrors, 0),
    weakKeys: mergeWeakKeys(results),
    wpm: Math.ceil(correctKeystrokes / 5 / activeMinutes),
  };
}

function mergeWeakKeys(results: TypingAttemptResult[]) {
  const counts = new Map<string, number>();
  for (const result of results) {
    for (const weak of result.weakKeys) counts.set(weak.key, (counts.get(weak.key) ?? 0) + weak.misses);
  }
  return [...counts.entries()]
    .map(([key, misses]) => ({ key, misses }))
    .sort((a, b) => b.misses - a.misses || a.key.localeCompare(b.key))
    .slice(0, 8);
}
