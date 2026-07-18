import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("route advertisement placement integration", () => {
  it("places the secondary banner after the complete typing tool", () => {
    const page = source("app/typing-test/page.tsx");
    expect(page.indexOf("<TypingTest")).toBeLessThan(page.indexOf('placement="below_header_or_tool"'));
    expect(source("components/typing/typing-test.tsx")).not.toContain("AdPlacement");
    expect(source("components/typing/visual-keyboard.tsx")).not.toContain("AdPlacement");
  });

  it("places lesson ads after the staged lesson experience and never inside its controls", () => {
    const page = source("app/lessons/lesson/[category]/[section]/[level]/page.tsx");
    expect(page.indexOf("<LessonExperience")).toBeLessThan(page.indexOf('placement="below_header_or_tool"'));
    expect(source("components/lessons/lesson-experience.tsx")).not.toContain("AdPlacement");
  });

  it("places focused-practice ads after the complete practice tool", () => {
    const page = source("components/practice/focused-practice-page.tsx");
    expect(page.indexOf("<PracticeExperience")).toBeLessThan(page.indexOf('placement="below_header_or_tool"'));
    expect(source("components/practice/practice-experience.tsx")).not.toContain("AdPlacement");
  });

  it("keeps Calculator Sprint controls ad-free and gives the post-game placement 150 pixels of separation", () => {
    const page = source("app/games/calculator/page.tsx");
    expect(page.indexOf("<CalculatorSprint")).toBeLessThan(page.indexOf('className="pt-[150px]"'));
    expect(page).toContain('placement="below_header_or_tool"');
    expect(source("components/games/calculator-sprint.tsx")).not.toContain("AdPlacement");
  });

  it("keeps progress explicitly ad-free", () => {
    const page = source("app/progress/page.tsx");
    expect(page).toContain('routeFamily="progress"');
    expect(page).not.toContain("AdPlacement");
  });

  it("does not make the approved keyboard or lesson hierarchy part of advertisement integration", () => {
    expect(source("components/typing/visual-keyboard.tsx")).not.toContain("@/lib/ads");
    expect(source("lib/typing/keyboard.ts")).not.toContain("ads");
    expect(source("components/lessons/lesson-experience.tsx")).not.toContain("@/lib/ads");
  });
});
