import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildLessonId } from "@/lib/progress/ids";
import {
  createEmptyProgress,
  readLocalProgress,
  recordGameCompletion,
  recordLessonCompletion,
  recordTypingTestCompletion,
  resetLocalProgress,
  subscribeToProgress,
} from "@/lib/progress/repository";
import { summarizeTypingTests } from "@/lib/progress/summary";
import {
  LEGACY_RESULTS_KEY,
  MAX_TYPING_TEST_HISTORY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
} from "@/lib/progress/types";

class MemoryStorage {
  readonly values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: new MemoryStorage(),
  });
});

const baseCompletion = {
  accuracy: 98,
  completedAt: "2026-07-16T12:00:00.000Z",
  correctedErrors: 1,
  difficulty: "medium" as const,
  durationSeconds: 60,
  elapsedSeconds: 60,
  mode: "words" as const,
  score: 400,
  uncorrectedErrors: 0,
  wpm: 42,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("local progress repository", () => {
  it("returns an empty, versioned schema when canonical storage is absent", () => {
    const result = readLocalProgress(new MemoryStorage());
    expect(result.status).toBe("available");
    expect(result.data).toEqual(createEmptyProgress());
  });

  it("reads valid canonical storage", () => {
    const storage = new MemoryStorage();
    const progress = createEmptyProgress();
    progress.updatedAt = baseCompletion.completedAt;
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    expect(readLocalProgress(storage).data.updatedAt).toBe(baseCompletion.completedAt);
  });

  it("tolerates malformed JSON without crashing or overwriting it", () => {
    const storage = new MemoryStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, "{not-json");
    const result = readLocalProgress(storage);
    expect(result.status).toBe("corrupt");
    expect(result.data).toEqual(createEmptyProgress());
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe("{not-json");
  });

  it("does not overwrite an unsupported future schema", () => {
    const storage = new MemoryStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ schemaVersion: 99, data: "future" }));
    const result = recordTypingTestCompletion(baseCompletion, storage);
    expect(result.status).toBe("unsupported");
    expect(result.changed).toBe(false);
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "{}").schemaVersion).toBe(99);
  });

  it("recovers valid records from a partially valid canonical envelope", () => {
    const storage = new MemoryStorage();
    const valid = recordTypingTestCompletion(baseCompletion, storage).data.typingTests.history[0];
    storage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        typingTests: { history: [valid, { ...valid, id: "bad", accuracy: 140 }] },
        lessons: { nonsense: { completed: true } },
        activityDates: ["2026-07-16", "invalid"],
      }),
    );
    const result = readLocalProgress(storage);
    expect(result.data.typingTests.history).toHaveLength(1);
    expect(result.data.activityDates).toEqual(["2026-07-16"]);
    expect(result.data.lessons).toEqual({});
  });

  it.each([
    ["negative WPM", { wpm: -1 }],
    ["infinite WPM", { wpm: Number.POSITIVE_INFINITY }],
    ["accuracy over 100", { accuracy: 101 }],
    ["negative duration", { durationSeconds: -1 }],
    ["bad date", { completedAt: "not-a-date" }],
  ])("rejects impossible typing metrics: %s", (_name, invalid) => {
    const storage = new MemoryStorage();
    const result = recordTypingTestCompletion({ ...baseCompletion, ...invalid }, storage);
    expect(result.changed).toBe(false);
    expect(result.data.typingTests.history).toHaveLength(0);
  });

  it("migrates only compatible legacy typing and lesson records and preserves the source", () => {
    const storage = new MemoryStorage();
    const lessonId = buildLessonId("beginner", "home-row-left-hand", "as");
    const legacy = [
      legacyRecord("words", "2026-07-15T12:00:00.000Z"),
      legacyRecord(lessonId, "2026-07-14T12:00:00.000Z"),
      legacyRecord("unknown-activity", "2026-07-13T12:00:00.000Z"),
      { bad: true },
    ];
    storage.setItem(LEGACY_RESULTS_KEY, JSON.stringify(legacy));
    const result = readLocalProgress(storage);
    expect(result.migrated).toBe(true);
    expect(result.data.typingTests.history).toHaveLength(1);
    expect(result.data.typingTests.history[0]).not.toHaveProperty("correctedErrors");
    expect(result.data.lessons[lessonId].attemptCount).toBe(1);
    expect(result.data.migration?.legacyResultsV1).toMatchObject({ importedCount: 2, sourceCount: 4 });
    expect(storage.getItem(LEGACY_RESULTS_KEY)).toBe(JSON.stringify(legacy));
  });

  it("makes migration idempotent", () => {
    const storage = new MemoryStorage();
    storage.setItem(LEGACY_RESULTS_KEY, JSON.stringify([legacyRecord("words", "2026-07-15T12:00:00.000Z")]));
    const first = readLocalProgress(storage);
    const canonical = storage.getItem(PROGRESS_STORAGE_KEY);
    const second = readLocalProgress(storage);
    expect(second.data).toEqual(first.data);
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe(canonical);
  });

  it("prevents duplicate completion events", () => {
    const storage = new MemoryStorage();
    const completion = { ...baseCompletion, eventId: "attempt-fixed" };
    expect(recordTypingTestCompletion(completion, storage).changed).toBe(true);
    expect(recordTypingTestCompletion(completion, storage).changed).toBe(false);
    expect(readLocalProgress(storage).data.typingTests.history).toHaveLength(1);
  });

  it("bounds typing-test history", () => {
    const storage = new MemoryStorage();
    for (let index = 0; index < MAX_TYPING_TEST_HISTORY + 7; index += 1) {
      recordTypingTestCompletion(
        {
          ...baseCompletion,
          completedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
          eventId: `attempt-${index}`,
        },
        storage,
      );
    }
    const history = readLocalProgress(storage).data.typingTests.history;
    expect(history).toHaveLength(MAX_TYPING_TEST_HISTORY);
    expect(history[0].id).toBe(`attempt-${MAX_TYPING_TEST_HISTORY + 6}`);
    expect(readLocalProgress(storage).data.typingTests.totalCompleted).toBe(MAX_TYPING_TEST_HISTORY + 7);
  });

  it("calculates personal bests only within comparable modes", () => {
    const storage = new MemoryStorage();
    recordTypingTestCompletion({ ...baseCompletion, accuracy: 99, eventId: "words-60", wpm: 40 }, storage);
    recordTypingTestCompletion(
      { ...baseCompletion, accuracy: 95, durationSeconds: 30, eventId: "words-30", wpm: 75 },
      storage,
    );
    recordTypingTestCompletion({ ...baseCompletion, accuracy: 100, eventId: "words-60-better", wpm: 38 }, storage);
    const summary = summarizeTypingTests(readLocalProgress(storage).data);
    expect(summary.bestByActivity).toHaveLength(2);
    expect(summary.bestByActivity.find((best) => best.activityId.includes(":60:"))?.record.id).toBe("words-60-better");
  });

  it("persists known lesson completion and deduplicates its event", () => {
    const storage = new MemoryStorage();
    const completion = {
      accuracy: 97,
      completedAt: baseCompletion.completedAt,
      eventId: "lesson-attempt",
      lessonId: buildLessonId("beginner", "home-row-left-hand", "as"),
      stars: 2,
      wpm: 24,
    };
    recordLessonCompletion(completion, storage);
    recordLessonCompletion(completion, storage);
    const lesson = readLocalProgress(storage).data.lessons[completion.lessonId];
    expect(lesson).toMatchObject({ attemptCount: 1, bestAccuracy: 97, bestStars: 2, bestWpm: 24 });
  });

  it("persists calculator completions and local best score", () => {
    const storage = new MemoryStorage();
    recordGameCompletion(
      { completedAt: "2026-07-15T12:00:00.000Z", eventId: "game-1", gameId: "calculator-sprint", score: 80 },
      storage,
    );
    recordGameCompletion(
      { completedAt: "2026-07-16T12:00:00.000Z", eventId: "game-2", gameId: "calculator-sprint", score: 60 },
      storage,
    );
    expect(readLocalProgress(storage).data.games["calculator-sprint"]).toMatchObject({
      bestScore: 80,
      completedSessions: 2,
      mostRecentCompletedAt: "2026-07-16T12:00:00.000Z",
    });
  });

  it("fails safely when storage is unavailable", () => {
    const storage = {
      getItem: () => {
        throw new Error("disabled");
      },
      setItem: () => undefined,
    };
    expect(readLocalProgress(storage).status).toBe("unavailable");
    expect(recordTypingTestCompletion(baseCompletion, storage).changed).toBe(false);
  });

  it("reports quota write failures without breaking the completed result", () => {
    const storage = new MemoryStorage();
    storage.setItem = () => {
      throw new DOMException("full", "QuotaExceededError");
    };
    const result = recordTypingTestCompletion(baseCompletion, storage);
    expect(result.status).toBe("quota");
    expect(result.changed).toBe(false);
    expect(result.data.typingTests.history).toHaveLength(1);
  });

  it("subscribes to same-tab and cross-tab canonical updates and cleans up", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToProgress(listener);
    recordTypingTestCompletion(baseCompletion);
    window.dispatchEvent(new StorageEvent("storage", { key: PROGRESS_STORAGE_KEY }));
    window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }));
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
    window.dispatchEvent(new StorageEvent("storage", { key: PROGRESS_STORAGE_KEY }));
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("resets canonical progress without deleting or remigrating the legacy source", () => {
    const storage = new MemoryStorage();
    const legacy = JSON.stringify([legacyRecord("words", "2026-07-15T12:00:00.000Z")]);
    storage.setItem(LEGACY_RESULTS_KEY, legacy);
    readLocalProgress(storage);
    const reset = resetLocalProgress(storage, "2026-07-16T14:00:00.000Z");
    expect(reset.data.typingTests.history).toHaveLength(0);
    expect(storage.getItem(LEGACY_RESULTS_KEY)).toBe(legacy);
    expect(readLocalProgress(storage).data.typingTests.history).toHaveLength(0);
  });

  it("is safe during server rendering", () => {
    vi.stubGlobal("window", undefined);
    const result = readLocalProgress();
    expect(result.status).toBe("unavailable");
    expect(result.data).toEqual(createEmptyProgress());
  });
});

function legacyRecord(testName: string, createdAt: string) {
  return { accuracy: 98, createdAt, duration: 60, score: 400, stars: 3, testName, wpm: 42 };
}
