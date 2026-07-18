import { describe, expect, it } from "vitest";
import { CURRICULUM_LESSONS } from "@/lib/curriculum/registry";

const expectedLessonIds = [
  "beginner-posture-home-position",
  "beginner-f-j-space",
  "beginner-u-r-k",
  "beginner-d-e-i",
  "beginner-c-g-n",
  "beginner-review-one",
  "beginner-t-s-l",
  "beginner-o-b-a",
  "beginner-v-h-m",
  "beginner-period-comma",
  "beginner-review-two",
  "beginner-w-x-semicolon",
  "beginner-q-y-p",
  "beginner-z-slash-enter",
  "beginner-alphabet-integration",
  "beginner-personalized-review",
  "beginner-assessment",
  "intermediate-common-words-one",
  "intermediate-common-words-two",
  "intermediate-home-row-words",
  "intermediate-top-row-words",
  "intermediate-bottom-row-words",
  "intermediate-alternating-hands",
  "intermediate-common-pairs-one",
  "intermediate-common-pairs-two",
  "intermediate-word-patterns",
  "intermediate-shift-capitals",
  "intermediate-apostrophes-quotes",
  "intermediate-sentence-punctuation",
  "intermediate-extended-punctuation",
  "intermediate-sentence-rhythm",
  "intermediate-short-paragraphs",
  "intermediate-accuracy-control",
  "intermediate-assessment",
  "advanced-numbers-one-five",
  "advanced-numbers-six-zero",
  "advanced-numbers-and-letters",
  "advanced-shifted-symbols",
  "advanced-practical-values",
  "advanced-brackets-slashes-hyphens",
  "advanced-accuracy-focus",
  "advanced-speed-intervals",
  "advanced-long-paragraphs",
  "advanced-practical-typing",
  "advanced-final-assessment",
] as const;

describe("Phase 6 curriculum contract", () => {
  it("uses the approved 45 stable lesson ids in sequence", () => {
    expect(CURRICULUM_LESSONS.map((lesson) => lesson.id)).toEqual(expectedLessonIds);
    expect(CURRICULUM_LESSONS.map((lesson) => lesson.sequence)).toEqual(
      Array.from({ length: 45 }, (_, index) => index + 1),
    );
  });

  it("keeps authored stages distinct within every lesson", () => {
    for (const lesson of CURRICULUM_LESSONS) {
      expect(lesson.stages.length, lesson.id).toBeGreaterThanOrEqual(4);
      expect(new Set(lesson.stages.map((stage) => stage.text)).size, lesson.id).toBe(
        lesson.stages.length,
      );
    }
  });

  it("does not silently time every lesson stage", () => {
    for (const lesson of CURRICULUM_LESSONS) {
      const stages = lesson.stages as Array<{ timedSeconds?: number }>;
      expect(stages.some((stage) => stage.timedSeconds === undefined), lesson.id).toBe(true);
    }
  });
});
