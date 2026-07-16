import { describe, expect, it } from "vitest";
import { CALCULATOR_ENTER_KEY, expressionToTarget, generateExpression, normalizeCalculatorKey } from "@/lib/typing/calculator";

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
    expect(expressionToTarget("12 + 3")).toBe(`12 + 3${CALCULATOR_ENTER_KEY}`);
  });

  it.todo("only generates targets that the supported controls can enter");
  it.todo("has an attainable, single game completion state");
});
