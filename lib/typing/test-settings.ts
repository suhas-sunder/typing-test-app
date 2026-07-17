import type { DifficultyId, TestMode } from "@/lib/typing/types";

export const TYPING_TEST_DURATIONS = [15, 30, 60, 120, 300] as const;
export type TypingTestDuration = (typeof TYPING_TEST_DURATIONS)[number];

export const TYPING_TEST_SETTINGS_KEY = "freeTypingCamp.typingTest.settings.v1";

export type TypingTestPreferences = {
  difficulty: DifficultyId;
  duration: TypingTestDuration;
  mode: TestMode;
  numbers: boolean;
  punctuation: boolean;
  showLiveStats: boolean;
};

export const DEFAULT_TYPING_TEST_PREFERENCES: TypingTestPreferences = {
  difficulty: "medium",
  duration: 60,
  mode: "words",
  numbers: false,
  punctuation: false,
  showLiveStats: true,
};

type SettingsStorage = Pick<Storage, "getItem" | "setItem">;

export function readTypingTestPreferences(storage: SettingsStorage | null = browserStorage()): TypingTestPreferences | null {
  if (!storage) return null;
  try {
    const value: unknown = JSON.parse(storage.getItem(TYPING_TEST_SETTINGS_KEY) ?? "null");
    if (!isRecord(value)) return null;
    const duration = Number(value.duration);
    if (
      !TYPING_TEST_DURATIONS.includes(duration as TypingTestDuration) ||
      (value.mode !== "words" && value.mode !== "quote") ||
      (value.difficulty !== "easy" && value.difficulty !== "medium" && value.difficulty !== "hard") ||
      typeof value.punctuation !== "boolean" ||
      typeof value.numbers !== "boolean" ||
      typeof value.showLiveStats !== "boolean"
    ) return null;
    return {
      difficulty: value.difficulty,
      duration: duration as TypingTestDuration,
      mode: value.mode,
      numbers: value.numbers,
      punctuation: value.punctuation,
      showLiveStats: value.showLiveStats,
    };
  } catch {
    return null;
  }
}

export function writeTypingTestPreferences(preferences: TypingTestPreferences, storage: SettingsStorage | null = browserStorage()) {
  if (!storage) return false;
  try {
    storage.setItem(TYPING_TEST_SETTINGS_KEY, JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}

export function formatTestDuration(duration: number) {
  if (duration === 120) return "2 min";
  if (duration === 300) return "5 min";
  return `${duration}s`;
}

function browserStorage(): SettingsStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
