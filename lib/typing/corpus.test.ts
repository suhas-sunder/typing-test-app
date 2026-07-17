import { describe, expect, it } from "vitest";
import { buildTypingContent, QUOTE_CORPUS, validateCorpusRegistry, WORD_CORPORA } from "@/lib/typing/corpus";

describe("typing-test corpus registry", () => {
  it("meets the reviewed minimum pool sizes with normalized unique words", () => {
    expect(WORD_CORPORA.easy.words.length).toBeGreaterThanOrEqual(250);
    expect(WORD_CORPORA.medium.words.length).toBeGreaterThanOrEqual(500);
    expect(WORD_CORPORA.hard.words.length).toBeGreaterThanOrEqual(500);
    expect(validateCorpusRegistry()).toEqual([]);
  });

  it("keeps difficulty pools measurably distinct", () => {
    const overlap = WORD_CORPORA.easy.words.filter((word) => WORD_CORPORA.hard.words.includes(word));
    expect(overlap.length / WORD_CORPORA.easy.words.length).toBeLessThan(0.55);
    expect(averageLength(WORD_CORPORA.hard.words)).toBeGreaterThan(averageLength(WORD_CORPORA.easy.words));
  });

  it("produces deterministic varied sequences without immediate duplicates or tiny cycles", () => {
    const options = { difficulty: "medium" as const, duration: 300, mode: "words" as const, seed: 731 };
    const first = buildTypingContent(options).text;
    const second = buildTypingContent(options).text;
    const tokens = first.split(" ");
    expect(first).toBe(second);
    expect(first).not.toBe(buildTypingContent({ ...options, seed: 732 }).text);
    expect(tokens.length).toBeGreaterThanOrEqual(780);
    expect(tokens.every((token, index) => index === 0 || token !== tokens[index - 1])).toBe(true);
    expect(new Set(tokens.slice(0, 100)).size).toBeGreaterThan(85);
  });

  it("keeps punctuation and numbers independently controlled in words mode", () => {
    const base = { difficulty: "hard" as const, duration: 60, mode: "words" as const, seed: 24 };
    const plain = buildTypingContent(base).text;
    const punctuated = buildTypingContent({ ...base, punctuation: true }).text;
    const numbered = buildTypingContent({ ...base, numbers: true }).text;
    const combined = buildTypingContent({ ...base, punctuation: true, numbers: true }).text;
    expect(plain).toMatch(/^[a-z ]+$/);
    expect(numbered).toMatch(/\d/);
    expect(punctuated).toMatch(/[.,]/);
    expect(punctuated).not.toMatch(/\d/);
    expect(combined).toMatch(/\d/);
    expect(combined).toMatch(/[.,$%:-]/);
  });

  it("records complete original provenance and excludes attribution from expected text", () => {
    expect(QUOTE_CORPUS.length).toBeGreaterThanOrEqual(36);
    for (const quote of QUOTE_CORPUS) {
      expect(quote).toMatchObject({ author: "Free Typing Camp", provenance: "original", source: expect.any(String), contentVersion: 1 });
      expect(quote.characterCount).toBe(quote.text.length);
    }
    const generated = buildTypingContent({ difficulty: "medium", duration: 120, mode: "quote", seed: 5 });
    expect(generated.quoteIds.length).toBeGreaterThan(1);
    expect(generated.text).not.toContain("Free Typing Camp");
  });

  it("covers every supported duration with a bounded generated document", () => {
    for (const duration of [15, 30, 60, 120, 300]) {
      const words = buildTypingContent({ difficulty: "medium", duration, mode: "words", seed: duration }).text;
      expect(words.length).toBeGreaterThan(duration * 5);
      expect(words.length).toBeLessThan(8_000);
      const quotes = buildTypingContent({ difficulty: "medium", duration, mode: "quote", seed: duration }).text;
      expect(quotes.length).toBeGreaterThan(Math.min(400, duration * 12));
      expect(quotes.length).toBeLessThan(8_000);
    }
  });
});

function averageLength(words: string[]) {
  return words.reduce((sum, word) => sum + word.length, 0) / words.length;
}
