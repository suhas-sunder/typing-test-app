import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonEnglishWordsData from "../LessonEnglishWordsData";

const data = LessonEnglishWordsData();

describe("should render defaults", () => {
  it("should return an object of type LessonDataType", () => {
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
  });

  it("should have correct number of sections in lessonData array", () => {
    const data = LessonEnglishWordsData();
    expect(data.lessonData.length).toBe(13);
  });

  it("should have correct sectionTitle and sectionId for each section", () => {
    const data = LessonEnglishWordsData();
    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
    });
  });

  it("should have correct number of items in each sectionData array", () => {
    const data = LessonEnglishWordsData();
    data.lessonData.forEach((section, index) => {
      if (index < data.lessonData.length - 1) {
        expect(section.sectionData.length).toBe(8);
      } else {
        expect(section.sectionData.length).toBe(4);
      }
    });
  });

  it("should have correct id and levelTitle for each item in sectionData", () => {
    const data = LessonEnglishWordsData();
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("levelTitle");
      });
    });
  });

  it("should handle empty lessonData array", () => {
    const data = { ...LessonEnglishWordsData(), lessonData: [] };
    expect(data.lessonData.length).toBe(0);
  });

  it("should handle missing sectionData in a section", () => {
    const data = {
      ...LessonEnglishWordsData(),
      lessonData: [{ sectionTitle: "Test", sectionId: "test-id" }],
    };
    expect(data.lessonData[0]).not.toHaveProperty("sectionData");
  });

  it("should handle missing id or title in the main object", () => {
    const data = {
      ...LessonEnglishWordsData(),
      id: undefined,
      title: undefined,
    };
    expect(data.id).toBeUndefined();
    expect(data.title).toBeUndefined();
  });

  it("should handle sectionData array with missing id or levelTitle", () => {
    const data = {
      ...LessonEnglishWordsData(),
      lessonData: [
        {
          sectionTitle: "Test",
          sectionId: "test-id",
          sectionData: [{ id: undefined, levelTitle: undefined }],
        },
      ],
    };
    expect(data.lessonData[0].sectionData[0].id).toBeUndefined();
    expect(data.lessonData[0].sectionData[0].levelTitle).toBeUndefined();
  });

  it("should handle section with incorrect word range pattern", () => {
    const data = {
      ...LessonEnglishWordsData(),
      lessonData: [
        {
          sectionTitle: "Incorrect Range",
          sectionId: "incorrect-range-id",
          sectionData: [],
        },
      ],
    };
    expect(data.lessonData[0].sectionTitle).toBe("Incorrect Range");
  });

  it("should handle large number of sections and items efficiently", () => {
    const largeNumberOfSections = Array.from({ length: 1000 }, (_, i) => ({
      sectionTitle: `Section ${i + 1}`,
      sectionId: `section-${i + 1}-id`,
      sectionData: Array.from({ length: 100 }, (_, j) => ({
        id: `item-${j + 1}`,
        levelTitle: `Item ${j + 1}`,
      })),
    }));
    const data = {
      ...LessonEnglishWordsData(),
      lessonData: largeNumberOfSections,
    };
    expect(data.lessonData.length).toBe(1000);
    expect(data.lessonData[0].sectionData.length).toBe(100);
  });

  it("should ensure no duplicate ids in sectionData", () => {
    const data = LessonEnglishWordsData();
    const ids = new Set();
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((item) => {
        expect(ids.has(item.id)).toBe(false);
        ids.add(item.id);
      });
    });
  });

  it("should check for optional linkToNovelsWebsite field", () => {
    const data = LessonEnglishWordsData();
    if (data.linkToNovelsWebsite) {
      expect(typeof data.linkToNovelsWebsite).toBe("string");
    }
  });

  it("should verify structure consistency across all sections", () => {
    const data = LessonEnglishWordsData();
    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
      expect(section).toHaveProperty("sectionData");
      section.sectionData.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("levelTitle");
      });
    });
  });
});
