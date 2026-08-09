import { THEME_IDS } from "@/lib/themes/registry";
import { expect, test } from "./fixtures";
import { currentCharacter, expectNoSeriousAxeViolations, PROGRESS_STORAGE_KEY } from "./helpers";

test("homepage has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  await expectNoSeriousAxeViolations(page);
});

test("typing test initial state has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");
  await expectNoSeriousAxeViolations(page);
});

test("typing test interactive state has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");
  const first = await currentCharacter(page);
  await page.getByRole("textbox", { name: "Typing input" }).pressSequentially(first);
  await expectNoSeriousAxeViolations(page);
});

test("typing settings dialog has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");
  await page.getByRole("button", { name: "Open typing settings" }).click();
  await expect(page.getByRole("dialog", { name: "Tune the test" })).toBeVisible();
  await expectNoSeriousAxeViolations(page);
});

test("typing result has no serious or critical axe violations", async ({ page }) => {
  await page.clock.install();
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");
  const first = await currentCharacter(page);
  await page.getByRole("textbox", { name: "Typing input" }).pressSequentially(first);
  await page.clock.fastForward(15_250);
  await expect(page.locator('section[aria-labelledby="typing-results-heading"]')).toBeVisible();
  await expectNoSeriousAxeViolations(page);
});

test("lessons landing has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/lessons");
  await expectNoSeriousAxeViolations(page);
});

test("progress page has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/progress");
  await expectNoSeriousAxeViolations(page);
});

test("supported themes preserve the shared accessibility floor", async ({ page }) => {
  await page.goto("/progress");

  for (const themeId of THEME_IDS) {
    await page.evaluate(
      ({ key, progress }) => localStorage.setItem(key, JSON.stringify(progress)),
      { key: PROGRESS_STORAGE_KEY, progress: emptyProgressForTheme(themeId) },
    );
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", themeId);
    await expectNoSeriousAxeViolations(page);
  }
});

function emptyProgressForTheme(themeId: (typeof THEME_IDS)[number]) {
  return {
    achievements: { unlocked: [] },
    activityDates: [],
    customization: { grandfatheredThemeIds: [themeId], selectedEmblemId: null, selectedThemeId: themeId },
    games: {},
    lessons: {},
    legacyCurriculum: { lessons: {} },
    practice: { completedPracticeIds: [], history: [], totalCompleted: 0 },
    processedEventIds: [],
    schemaVersion: 5,
    typingTests: { history: [], totalCompleted: 0 },
    updatedAt: null,
    weakKeys: [],
  };
}
