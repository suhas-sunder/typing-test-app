import { describe, it, expect } from "vitest";
import FormatFetchedStats from "../FormatFetchedStats";

describe("return correct value", () => {
  it("should correctly format avgWpm from input data", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.avgWpm).toBe("75");
  });

  it("should correctly calculate and format wordsTyped", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.wordsTyped).toBe("4,500");
  });

  it("should correctly format avgAccuracy from input data", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.avgAccuracy).toBe("95");
  });

  it("should correctly calculate and format totalTypingMins", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3660,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("01");
  });

  it("should correctly calculate and format totalTypingDays", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 86400,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingDays).toBe("01");
  });

  it("should correctly calculate and format totalTypingHours", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 90000,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingHours).toBe("01");
  });

  it("should correctly format totalScore from input data", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalScore).toBe("1,000");
  });

  it("should handle zero totalTypingTimeSec gracefully", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 0,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("00");
  });

  it("should handle non-numeric totalScore gracefully", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "abc",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(parseInt(result.totalScore)).toBeNaN();
  });

  it("should handle extremely large totalTypingTimeSec values", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: Number.MAX_SAFE_INTEGER,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(parseInt(result.totalTypingDays)).toBeGreaterThan(0);
    expect(parseInt(result.totalTypingHours)).toBeGreaterThan(0);
    expect(parseInt(result.totalTypingMins)).toBeGreaterThan(0);
  });

  it("should handle negative totalTypingTimeSec values", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: -3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("01");
    expect(result.totalTypingHours).toBe("01");
  });

  it("should ensure all formatted numbers use correct locale", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.wordsTyped).toMatch(/,/);
    expect(result.totalScore).toMatch(/,/);
    expect(result.totalTypingMins).not.toMatch(/,/);
    expect(result.totalTypingDays).not.toMatch(/,/);
    expect(result.totalTypingHours).not.toMatch(/,/);
  });

  it("should ensure minimumIntegerDigits formatting is applied correctly", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3661,
      totalScore: "1000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("01");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("01");
  });

  it("should ensure useGrouping is applied correctly", () => {
    const data = {
      avgWpm: 75,
      totalTypingTimeSec: 3600,
      totalScore: "1000000",
      avgAccuracy: 95,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalScore).toBe("1,000,000");
    expect(result.wordsTyped).toBe("4,500");
  });
});
