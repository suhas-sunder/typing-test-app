import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonAnimalFactsData from "../LessonAnimalFactsData";

const data = LessonAnimalFactsData();

describe("should render defaults", () => {
  it("should return an object of type LessonDataType when invoked", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
  });

  it("should have non-empty lessonData array when invoked", () => {
    expect(data.lessonData.length).toBeGreaterThan(0);
  });

  it('should set id field to "animals-id" when function is called', () => {
    expect(data.id).toBe("animals-id");
  });

  it('should set title field to "Animal Facts" when function LessonAnimalFactsData is called', () => {
    expect(data.title).toBe("Animal Facts");
  });

  it("should have one section in lessonData array when lessonData array contains one section", () => {
    expect(data.lessonData.length).toBe(1);
  });

  it('should have sectionTitle of "Animal 1" for the first section', () => {
    expect(data.lessonData[0].sectionTitle).toBe("Animal 1");
  });

  it('should have sectionId "Animal-1-id" for the first section', () => {
    expect(data.lessonData[0].sectionId).toBe("Animal-1-id");
  });

  it("should have one item in the sectionData array of the first section", () => {
    expect(data.lessonData[0].sectionData.length).toBe(1);
  });

  it('should have the id "first-animal" for the first item in sectionData', () => {
    expect(data.lessonData[0].sectionData[0].id).toBe("first-animal");
  });

  it('should have levelTitle of "🦑 First Animal" for the first item in sectionData', () => {
    expect(data.lessonData[0].sectionData[0].levelTitle).toBe(
      "🦑 First Animal",
    );
  });

  it("should ensure no additional unexpected fields are present", () => {
    expect(data).toEqual({
      id: "animals-id",
      title: "Animal Facts",
      lessonData: [
        {
          sectionTitle: "Animal 1",
          sectionId: "Animal-1-id",
          sectionData: [
            {
              id: "first-animal",
              levelTitle: "🦑 First Animal",
            },
          ],
        },
      ],
    });
  });

  it("should handle missing optional linkToNovelsWebsite field", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
    expect(data).not.toHaveProperty("linkToNovelsWebsite");
  });
});
