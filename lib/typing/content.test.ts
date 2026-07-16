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
    expect(text).toContain("Small steps");
  });

  it("generates enough word-mode text for each existing duration", () => {
    for (const duration of [15, 30, 60, 120]) {
      expect(buildTypingText({ mode: "words", difficulty: "medium", duration, seed: 0 }).split(" ").length).toBeGreaterThanOrEqual(30);
    }
  });
});
