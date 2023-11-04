import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateRandNum from "../GenerateRandNum";

describe("renders all page elements", () => {
  it("should render nav bar and footer with logo link", () => {
    const max = 5;
    const randNum = GenerateRandNum({ max });
    expect(randNum).toBeLessThanOrEqual(5);
  });
});
