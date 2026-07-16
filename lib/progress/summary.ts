import type { LocalProgress, TypingTestProgressRecord } from "@/lib/progress/types";

export type ComparableTypingBest = {
  accuracy: number;
  activityId: string;
  record: TypingTestProgressRecord;
  wpm: number;
};

export function summarizeTypingTests(progress: LocalProgress) {
  const history = progress.typingTests.history;
  const bestByActivity = Object.values(
    history.reduce<Record<string, ComparableTypingBest>>((groups, record) => {
      const current = groups[record.activityId];
      if (!current || isBetterComparableResult(record, current.record)) {
        groups[record.activityId] = {
          accuracy: record.accuracy,
          activityId: record.activityId,
          record,
          wpm: record.wpm,
        };
      }
      return groups;
    }, {}),
  ).sort((a, b) => b.record.completedAt.localeCompare(a.record.completedAt));
  const recentSample = history.slice(0, 10);

  return {
    averageRecentAccuracy:
      recentSample.length === 0
        ? null
        : Math.round(recentSample.reduce((total, record) => total + record.accuracy, 0) / recentSample.length),
    bestByActivity,
    mostRecent: history[0] ?? null,
    recent: history.slice(0, 10),
    totalCompleted: progress.typingTests.totalCompleted,
  };
}

function isBetterComparableResult(candidate: TypingTestProgressRecord, current: TypingTestProgressRecord) {
  if (candidate.accuracy !== current.accuracy) return candidate.accuracy > current.accuracy;
  if (candidate.wpm !== current.wpm) return candidate.wpm > current.wpm;
  return candidate.completedAt > current.completedAt;
}
