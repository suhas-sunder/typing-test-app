import { describe, expect, it } from "vitest";
import {
  CALCULATOR_ENTER_KEY,
  calculatorKeyFromKeydown,
  expressionToTarget,
  generateExpression,
  isCalculatorCharacter,
  normalizeCalculatorKey,
} from "@/lib/typing/calculator";

describe("calculator characterization", () => {
  it("generates deterministic medium and hard expressions", () => {
    expect(generateExpression(24, "medium")).toBe(generateExpression(24, "medium"));
    expect(generateExpression(24, "hard").split(" ").length).toBe(5);
  });

  it("normalizes physical Enter to the calculator submission token", () => {
    expect(normalizeCalculatorKey("Enter")).toBe(CALCULATOR_ENTER_KEY);
    expect(normalizeCalculatorKey("Backspace")).toBe("Backspace");
  });

  it("appends submission to the displayed expression", () => {
    expect(expressionToTarget("12 + 3")).toBe(`12+3${CALCULATOR_ENTER_KEY}`);
  });

  it("normalizes negative and decimal expression formatting without impossible spaces", () => {
    expect(expressionToTarget(" -1.50 + 2.25 ")).toBe(`-1.50+2.25${CALCULATOR_ENTER_KEY}`);
  });

  it("only generates targets that the supported controls can enter across a large sample", () => {
    for (const difficulty of ["medium", "hard"] as const) {
      for (let seed = 0; seed < 10_000; seed += 1) {
        const target = expressionToTarget(generateExpression(seed, difficulty));
        expect(target.endsWith(CALCULATOR_ENTER_KEY)).toBe(true);
        expect([...target].every(isCalculatorCharacter)).toBe(true);
      }
    }
  });

  it("rejects repeat, composition, and shortcut keydown input", () => {
    expect(calculatorKeyFromKeydown({ key: "Enter" })).toBe(CALCULATOR_ENTER_KEY);
    expect(calculatorKeyFromKeydown({ key: "1", repeat: true })).toBeNull();
    expect(calculatorKeyFromKeydown({ key: "1", ctrlKey: true })).toBeNull();
    expect(calculatorKeyFromKeydown({ key: "1", isComposing: true })).toBeNull();
  });
});
