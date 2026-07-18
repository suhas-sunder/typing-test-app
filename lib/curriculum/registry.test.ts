import { describe, expect, it } from "vitest";
import { FINGER_MAP } from "@/lib/curriculum/finger-map";
import { CURRICULUM_LESSONS, CURRICULUM_LEVELS, CURRICULUM_UNITS, getCurriculumLesson, getLessonHref } from "@/lib/curriculum/registry";
import { calculateLessonStars } from "@/lib/curriculum/stars";
import { validateCurriculum } from "@/lib/curriculum/validator";

describe("controlled curriculum", () => {
  it("contains three progression levels, six skill hubs, and forty-five valid lessons", () => {
    expect(CURRICULUM_LEVELS.map((level) => level.id)).toEqual(["beginner", "intermediate", "advanced"]);
    expect(CURRICULUM_UNITS).toHaveLength(6);
    expect(CURRICULUM_LESSONS).toHaveLength(45);
    expect(validateCurriculum()).toEqual([]);
  });

  it("uses stable unique ids and sequences", () => {
    expect(new Set(CURRICULUM_LESSONS.map((lesson) => lesson.id)).size).toBe(45);
    expect(CURRICULUM_LESSONS.map((lesson) => lesson.sequence)).toEqual(Array.from({ length: 45 }, (_, index) => index + 1));
    expect(getCurriculumLesson("beginner-f-j-space")?.title).toBe("F, J, and Space");
    expect(getCurriculumLesson("unknown")).toBeNull();
    expect(getLessonHref(CURRICULUM_LESSONS[0])).toBe("/lessons/lesson/home-row/lesson/beginner-posture-home-position");
  });

  it("uses the approved finger map", () => {
    expect(FINGER_MAP.q).toBe("left pinky");
    expect(FINGER_MAP.t).toBe("left index");
    expect(FINGER_MAP.y).toBe("right index");
    expect(FINGER_MAP[","]).toBe("right middle");
    expect(FINGER_MAP["0"]).toBe("right pinky");
    expect(FINGER_MAP[" "]).toBe("thumb");
  });
});

describe("lesson stars", () => {
  const targets = { standardWpm: 20, masteryWpm: 30 };

  it.each([
    [84.99, 50, 0], [85, 1, 1], [90, 1, 2], [95, 1, 3], [97, 19, 3], [97, 20, 4], [99, 29, 4], [99, 30, 5],
  ])("scores %s accuracy and %s WPM as %s stars", (accuracy, wpm, stars) => {
    expect(calculateLessonStars({ accuracy, wpm, ...targets })).toBe(stars);
  });
});
