import { describe, expect, it } from "vitest";
import { DEFAULT_TYPING_TEST_PREFERENCES, readTypingTestPreferences, TYPING_TEST_SETTINGS_KEY, writeTypingTestPreferences } from "@/lib/typing/test-settings";

describe("typing test preferences", () => {
  it("round-trips independently from progress storage", () => {
    const storage = memoryStorage();
    expect(writeTypingTestPreferences({ ...DEFAULT_TYPING_TEST_PREFERENCES, duration: 300, numbers: true }, storage)).toBe(true);
    expect(readTypingTestPreferences(storage)).toEqual({ ...DEFAULT_TYPING_TEST_PREFERENCES, duration: 300, numbers: true });
    expect(storage.values.has(TYPING_TEST_SETTINGS_KEY)).toBe(true);
    expect(storage.values.has("freeTypingCamp.progress.v3")).toBe(false);
  });

  it.each(["not json", "null", "{}", '{"duration":999}', '{"duration":60,"mode":"words","difficulty":"medium","numbers":"yes","punctuation":false,"showLiveStats":true}'])(
    "fails safely for malformed saved settings: %s",
    (value) => {
      const storage = memoryStorage();
      storage.setItem(TYPING_TEST_SETTINGS_KEY, value);
      expect(readTypingTestPreferences(storage)).toBeNull();
    },
  );
});

function memoryStorage() {
  const values = new Map<string, string>();
  return { values, getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => void values.set(key, value) };
}
