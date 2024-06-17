import { it, expect } from "vitest";
import LessonQuotesData from "../LessonQuotesData";
import { LessonDataType } from "../LessonBeginnerData";

const data: LessonDataType = LessonQuotesData();

describe("should render defaults", () => {
  it("should have unique ids for questions within each section", () => {
    const allIds = data.lessonData.reduce<string[]>((acc, section) => {
      section.sectionData.forEach((question) => acc.push(question.id));
      return acc;
    }, []);
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it("should have the correct structure", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");

    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
      expect(section).toHaveProperty("sectionData");

      section.sectionData.forEach((question) => {
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("levelTitle");
      });
    });
  });

  it("should have unique section ids", () => {
    const sectionIds = data.lessonData.map((section) => section.sectionId);
    const uniqueSectionIds = new Set(sectionIds);
    expect(uniqueSectionIds.size).toBe(sectionIds.length);
  });

  it("should have non-empty section titles", () => {
    data.lessonData.forEach((section) => {
      expect(section.sectionTitle).not.toBe("");
    });
  });

  it("should have non-empty question titles", () => {
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((question) => {
        expect(question.levelTitle).not.toBe("");
      });
    });
  });

  it("should have at least one section", () => {
    expect(data.lessonData.length).toBeGreaterThan(0);
  });

  it("should have at least one question in each section", () => {
    data.lessonData.forEach((section) => {
      expect(section.sectionData.length).toBeGreaterThan(0);
    });
  });

  it("should have valid data types for all properties", () => {
    expect(typeof data.id).toBe("string");
    expect(typeof data.title).toBe("string");
    expect(Array.isArray(data.lessonData)).toBe(true);

    data.lessonData.forEach((section) => {
      expect(typeof section.sectionTitle).toBe("string");
      expect(typeof section.sectionId).toBe("string");
      expect(Array.isArray(section.sectionData)).toBe(true);

      section.sectionData.forEach((question) => {
        expect(typeof question.id).toBe("string");
        expect(typeof question.levelTitle).toBe("string");
      });
    });
  });

  it("should include all expected sections in lessonData", () => {
    const expectedSections = [
      "Inspirational Quotes",
      "Funny Quotes",
      "Leadership Quotes",
      "Video Game Quotes",
      "Movie Quotes",
      "Tv Show Quotes",
      "Anime Quotes",
      "Animated Film Quotes",
      "Motivational Quotes",
    ];
    const sectionTitles = data.lessonData.map(
      (section) => section.sectionTitle,
    );
    expect(sectionTitles).toEqual(expectedSections);
  });

  it("should contain the correct sectionTitle and sectionId in each section", () => {
    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
    });
  });

  it("should contain the correct number of items in each sectionData array", () => {
    data.lessonData.forEach((section) => {
      expect(section.sectionData.length).toBeGreaterThan(0);
    });
  });

  it("should have the correct id and levelTitle for each item in sectionData", () => {
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("levelTitle");
      });
    });
  });

  it("should handle optional linkToNovelsWebsite field being undefined", () => {
    expect(data.linkToNovelsWebsite).toBeUndefined();
  });

  it("should validate that sectionIds and item ids are unique", () => {
    const allIds = new Set();

    data.lessonData.forEach((section) => {
      expect(allIds.has(section.sectionId)).toBe(false);
      allIds.add(section.sectionId);

      section.sectionData.forEach((item) => {
        expect(allIds.has(item.id)).toBe(false);
        allIds.add(item.id);
      });
    });
  });

  it("should ensure that the function is idempotent (returns the same output on multiple calls)", () => {
    const data1 = LessonQuotesData();
    const data2 = LessonQuotesData();
    expect(data1).toEqual(data2);
  });

  it("should verify type safety and adherence to LessonDataType", () => {
    // Type assertions (using TypeScript's type guards)
    const isLessonType = (obj): obj is LessonDataType =>
      typeof obj.id === "string" &&
      typeof obj.title === "string" &&
      Array.isArray(obj.lessonData);

    expect(isLessonType(data)).toBe(true);

    data.lessonData.forEach((section) => {
      expect(typeof section.sectionTitle).toBe("string");
      expect(typeof section.sectionId).toBe("string");
      expect(Array.isArray(section.sectionData)).toBe(true);

      section.sectionData.forEach((item) => {
        expect(typeof item.id).toBe("string");
        expect(typeof item.levelTitle).toBe("string");
      });
    });
  });
});
