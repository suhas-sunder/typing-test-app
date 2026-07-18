import { describe, expect, it } from "vitest";
import { CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { buildPracticeText, PRACTICE_DEFINITIONS } from "@/lib/practice/registry";
import { buildTypingContent } from "@/lib/typing/corpus";
import {
  buildCompactSymbolRows,
  defaultCompactLayer,
  keyOutput,
  MOBILE_KEYBOARD,
  SUPPORTED_COMPACT_SYMBOLS,
} from "@/lib/typing/keyboard";

describe("compact keyboard content coverage", () => {
  it("provides a virtual input path for every typed curriculum stage", () => {
    for (const lesson of CURRICULUM_LESSONS) {
      for (const stage of lesson.stages.filter((item) => item.type !== "instruction")) {
        expect(missingCompactCharacters(stage.text), `${lesson.id}/${stage.id}`).toEqual([]);
      }
    }
  });

  it("provides a virtual input path for every focused-practice variant", () => {
    for (const practice of PRACTICE_DEFINITIONS) {
      for (const variant of practice.variants) {
        const text = buildPracticeText(practice.id, "long", variant.id, 4);
        expect(missingCompactCharacters(text), `${practice.id}/${variant.id}`).toEqual([]);
      }
    }
  });

  it("provides a virtual input path for every approved typing-test configuration", () => {
    for (const mode of ["words", "quote"] as const) {
      for (const difficulty of ["easy", "medium", "hard"] as const) {
        for (const punctuation of [false, true]) {
          for (const numbers of [false, true]) {
            const text = buildTypingContent({ mode, difficulty, duration: 300, punctuation, numbers, seed: 17 }).text;
            expect(missingCompactCharacters(text), `${mode}/${difficulty}/${punctuation}/${numbers}`).toEqual([]);
          }
        }
      }
    }
  });

  it("builds a bounded content-specific symbol set", () => {
    const values = buildCompactSymbolRows("calm 1% 🙂").flat().map((key) => key.value);
    expect(values).toContain("1");
    expect(values).toContain("%");
    expect(values).not.toContain("2");
    expect(values).not.toContain("🙂");
    expect(values.every((value) => SUPPORTED_COMPACT_SYMBOLS.has(value))).toBe(true);
  });

  it("selects symbols only for explicitly symbol-focused content", () => {
    expect(defaultCompactLayer("123 45%")).toBe("symbols");
    expect(defaultCompactLayer("Room 12")).toBe("alphabet");
    expect(defaultCompactLayer("plain words")).toBe("alphabet");
  });
});

function missingCompactCharacters(text: string) {
  const available = new Set<string>([" "]);
  for (const key of [...MOBILE_KEYBOARD.flat(), ...buildCompactSymbolRows(text).flat()]) {
    available.add(keyOutput(key, false));
    available.add(keyOutput(key, true));
  }
  return [...new Set([...text].filter((character) => !available.has(character)))];
}
