import { describe, expect, it } from "vitest";
import { buildTypingText } from "@/lib/typing/content";

describe("typing content characterization", () => {
  it("is deterministic for the same seed and options", () => {
    const options = { mode: "words" as const, difficulty: "hard" as const, duration: 60, seed: 17 };
    expect(buildTypingText(options)).toBe(buildTypingText(options));
  });

  it("keeps locked quote punctuation in medium mode", () => {
    const text = buildTypingText({ mode: "quote", difficulty: "medium", duration: 60, seed: 0 });
    expect(text).toContain(".");
    expect(text).not.toContain("Free Typing Camp");
  });

  it("generates enough word-mode text for each existing duration", () => {
    for (const duration of [15, 30, 60, 120]) {
      expect(buildTypingText({ mode: "words", difficulty: "medium", duration, seed: 0 }).split(" ").length).toBeGreaterThanOrEqual(30);
    }
  });

  it("changes the generated sequence without changing the configured source behavior", () => {
    const base = { mode: "words" as const, difficulty: "medium" as const, duration: 60 };
    const first = buildTypingText({ ...base, seed: 1 });
    const second = buildTypingText({ ...base, seed: 2 });

    expect(first).not.toBe(second);
    expect(first.split(" ").length).toBe(second.split(" ").length);
  });

  it("keeps punctuation and numbers independent from difficulty", () => {
    const easy = buildTypingText({ mode: "words", difficulty: "easy", duration: 15, seed: 4 });
    const hard = buildTypingText({ mode: "words", difficulty: "hard", duration: 15, seed: 4 });

    expect(easy).toBe(easy.toLowerCase());
    expect(hard).toMatch(/^[a-z ]+$/);
    expect(easy).not.toBe(hard);
  });
});
