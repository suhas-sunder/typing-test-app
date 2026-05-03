import { getPerformanceStars } from "@/lib/typing/metrics";

export const LOCAL_RESULTS_KEY = "freeTypingCamp.results.v1";

export type TypingResultRecord = {
  accuracy: number;
  createdAt: string;
  duration: number;
  score: number;
  stars: number;
  testName: string;
  wpm: number;
};

export type ScoreHistoryRow = {
  created_at?: string | null;
  test_accuracy?: number | string | null;
  test_name?: string | null;
  test_score?: number | string | null;
  test_time_sec?: number | string | null;
  wpm?: number | string | null;
};

export function buildLessonTestName(categoryId: string, sectionId: string, levelId: string) {
  return `lesson-${categoryId}-${sectionId}-${levelId}`;
}

export function readLocalTypingResults(): TypingResultRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_RESULTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTypingResultRecord) : [];
  } catch {
    return [];
  }
}

export function saveLocalTypingResult(record: TypingResultRecord) {
  if (typeof window === "undefined") return;

  const results = [record, ...readLocalTypingResults()].slice(0, 250);
  window.localStorage.setItem(LOCAL_RESULTS_KEY, JSON.stringify(results));
}

export function starsFromScoreRow(row: ScoreHistoryRow) {
  return getPerformanceStars(Number(row.wpm ?? 0), Number(row.test_accuracy ?? 0));
}

export function aggregateLessonStars(records: Array<{ stars: number; testName: string }>) {
  return records.reduce<Record<string, number>>((acc, record) => {
    if (!record.testName.startsWith("lesson-")) return acc;
    acc[record.testName] = Math.max(acc[record.testName] ?? 0, record.stars);
    return acc;
  }, {});
}

function isTypingResultRecord(value: unknown): value is TypingResultRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<TypingResultRecord>;
  return (
    typeof record.testName === "string" &&
    typeof record.stars === "number" &&
    typeof record.wpm === "number" &&
    typeof record.accuracy === "number" &&
    typeof record.score === "number" &&
    typeof record.duration === "number" &&
    typeof record.createdAt === "string"
  );
}
