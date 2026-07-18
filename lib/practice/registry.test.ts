import { describe, expect, it } from "vitest";
import { buildPracticeText, getCommonWordPoolSize, PRACTICE_DEFINITIONS, PRACTICE_LENGTH_WORDS } from "@/lib/practice/registry";

describe("focused practice registry", () => {
  it("defines exactly eight unique practices and a 500-word common pool", () => {
    expect(PRACTICE_DEFINITIONS).toHaveLength(8);
    expect(new Set(PRACTICE_DEFINITIONS.map((practice) => practice.id)).size).toBe(8);
    expect(getCommonWordPoolSize()).toBe(500);
  });

  it.each(["short", "medium", "long"] as const)("builds the requested %s practice length", (length) => {
    expect(buildPracticeText("common-words", length, "500").split(" ")).toHaveLength(PRACTICE_LENGTH_WORDS[length]);
  });

  it("keeps strict row modes inside their intended key sets", () => {
    expect(buildPracticeText("asdf-jkl", "long", "strict")).toMatch(/^[asdfghjkl ]+$/);
    expect(buildPracticeText("qwertyuiop", "long", "strict")).toMatch(/^[qwertyuiop ]+$/);
    expect(buildPracticeText("zxcvbnm", "long", "strict")).toMatch(/^[zxcvbnm ]+$/);
  });

  it("keeps single-hand modes inside their canonical hand zones", () => {
    expect(buildPracticeText("left-hand", "long", "strict")).toMatch(/^[qwertasdfgzxcvb ]+$/);
    expect(buildPracticeText("right-hand", "long", "strict")).toMatch(/^[yuiophjklnm ]+$/);
  });

  it("keeps number and symbol modes inside their declared character families", () => {
    expect(buildPracticeText("numbers-symbols", "long", "numbers")).toMatch(/^[0-9 .:\-=]+$/);
    expect(buildPracticeText("numbers-symbols", "long", "symbols")).toMatch(/^[0-9 $%+().:\-=]+$/);
  });

  it("records original quote provenance and produces distinct passage lengths", () => {
    const quotes = PRACTICE_DEFINITIONS.find((practice) => practice.id === "quotes");
    expect(quotes?.faq?.[0].answer).toMatch(/original practice passages written for this site/i);
    expect(buildPracticeText("quotes", "short", "site-written", 0)).not.toBe(buildPracticeText("quotes", "medium", "site-written", 0));
  });
});
