import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateRandNum from "../GenerateRandNum";

describe("return correct value", () => {
  it("should return a random number less than or equal to 5", () => {
    const max = 5;
    const randNum = GenerateRandNum({ max });
    expect(randNum).toBeLessThanOrEqual(5);
  });
});
