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

  try {
    const results = [sanitizeTypingResult(record), ...readLocalTypingResults()].filter(isTypingResultRecord).slice(0, 250);
    window.localStorage.setItem(LOCAL_RESULTS_KEY, JSON.stringify(results));
  } catch {
    // Private browsing and quota failures should not break the typing flow.
  }
}

export function starsFromScoreRow(row: ScoreHistoryRow) {
  return getPerformanceStars(toFiniteNumber(row.wpm), toFiniteNumber(row.test_accuracy));
}

export function aggregateLessonStars(records: Array<{ stars: number; testName: string }>) {
  return records.reduce<Record<string, number>>((acc, record) => {
    if (!record.testName.startsWith("lesson-")) return acc;
    const stars = clampStars(record.stars);
    acc[record.testName] = Math.max(acc[record.testName] ?? 0, stars);
    return acc;
  }, {});
}

function isTypingResultRecord(value: unknown): value is TypingResultRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<TypingResultRecord>;
  return (
    typeof record.testName === "string" &&
    typeof record.stars === "number" &&
    Number.isFinite(record.stars) &&
    typeof record.wpm === "number" &&
    Number.isFinite(record.wpm) &&
    typeof record.accuracy === "number" &&
    Number.isFinite(record.accuracy) &&
    typeof record.score === "number" &&
    Number.isFinite(record.score) &&
    typeof record.duration === "number" &&
    Number.isFinite(record.duration) &&
    typeof record.createdAt === "string"
  );
}

function sanitizeTypingResult(record: TypingResultRecord): TypingResultRecord {
  return {
    accuracy: Math.max(0, Math.min(100, toFiniteNumber(record.accuracy))),
    createdAt: Number.isNaN(new Date(record.createdAt).getTime()) ? new Date().toISOString() : record.createdAt,
    duration: Math.max(0, Math.min(86_400, Math.round(toFiniteNumber(record.duration)))),
    score: Math.max(0, Math.min(10_000_000, Math.round(toFiniteNumber(record.score)))),
    stars: clampStars(record.stars),
    testName: record.testName.slice(0, 120),
    wpm: Math.max(0, Math.min(5_000, Math.round(toFiniteNumber(record.wpm)))),
  };
}

function toFiniteNumber(value: unknown) {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function clampStars(value: unknown) {
  return Math.max(0, Math.min(5, toFiniteNumber(value)));
}
