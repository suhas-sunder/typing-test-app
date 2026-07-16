import { describe, expect, it } from "vitest";
import {
  generateMetadata as generateUnitMetadata,
  generateStaticParams as generateUnitParams,
} from "@/app/lessons/[unitId]/page";
import {
  generateMetadata as generateLessonMetadata,
  generateStaticParams as generateLessonParams,
} from "@/app/lessons/lesson/[category]/[section]/[level]/page";
import {
  generateMetadata as generatePracticeMetadata,
  generateStaticParams as generatePracticeParams,
} from "@/app/typing-practice/[practiceId]/page";
import { CURRICULUM_UNITS, ENABLED_CURRICULUM_LESSONS, getLessonHref, resolveCurriculumLessonRoute } from "@/lib/curriculum/registry";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";

describe("curriculum route contracts", () => {
  it("pre-renders every unit with unique indexable metadata", async () => {
    expect(generateUnitParams()).toEqual(CURRICULUM_UNITS.map((unit) => ({ unitId: unit.id })));
    const metadata = await Promise.all(CURRICULUM_UNITS.map((unit) => generateUnitMetadata({ params: Promise.resolve({ unitId: unit.id }) })));
    expect(new Set(metadata.map((item) => typeof item.title === "object" && item.title && "absolute" in item.title ? item.title.absolute : item.title)).size).toBe(6);
    expect(metadata.map((item) => item.alternates?.canonical)).toEqual(CURRICULUM_UNITS.map((unit) => unit.route));
  });

  it("resolves all thirty exact lesson routes and rejects mismatches", async () => {
    expect(generateLessonParams()).toHaveLength(30);
    for (const lesson of ENABLED_CURRICULUM_LESSONS) {
      expect(resolveCurriculumLessonRoute(lesson.unitId, "lesson", lesson.id)).toBe(lesson);
      const metadata = await generateLessonMetadata({ params: Promise.resolve({ category: lesson.unitId, section: "lesson", level: lesson.id }) });
      expect(metadata.alternates?.canonical).toBe(getLessonHref(lesson));
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
    expect(resolveCurriculumLessonRoute("home-row", "lesson", "not-a-lesson")).toBeNull();
    expect(resolveCurriculumLessonRoute("top-row", "lesson", "home-row-f-j")).toBeNull();
    expect(resolveCurriculumLessonRoute("home-row", "unknown", "home-row-f-j")).toBeNull();
  });

  it("pre-renders every complete practice with unique canonical metadata", async () => {
    expect(generatePracticeParams()).toEqual(PRACTICE_DEFINITIONS.map((practice) => ({ practiceId: practice.id })));
    const metadata = await Promise.all(PRACTICE_DEFINITIONS.map((practice) => generatePracticeMetadata({ params: Promise.resolve({ practiceId: practice.id }) })));
    expect(new Set(metadata.map((item) => typeof item.title === "object" && item.title && "absolute" in item.title ? item.title.absolute : item.title)).size).toBe(8);
    expect(metadata.map((item) => item.alternates?.canonical)).toEqual(PRACTICE_DEFINITIONS.map((practice) => `/typing-practice/${practice.id}`));
  });
});
