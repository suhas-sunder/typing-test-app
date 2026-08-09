import { expect, test } from "./fixtures";
import {
  PROGRESS_STORAGE_KEY,
  currentCharacter,
  passageText,
  typePassage,
} from "./helpers";

test("focused practice completes and feeds the local progress loop", async ({ page }) => {
  await page.clock.install();
  await page.goto("/typing-practice/quotes");

  const input = page.getByRole("textbox", { name: "Typing input" });
  const first = await currentCharacter(page);
  await input.pressSequentially(first);
  await page.clock.fastForward(120_250);

  const results = page.locator('section[aria-labelledby="typing-results-heading"]');
  await expect(results).toBeVisible();
  await expect(results.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Another quote" })).toBeVisible();

  const progress = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "{}"), PROGRESS_STORAGE_KEY);
  expect(progress.practice?.totalCompleted).toBe(1);

  await page.goto("/progress");
  await expect(page.getByText("Focused practice", { exact: true })).toBeVisible();
  await expect(page.getByText("Completed attempts").locator("..")).toContainText("1");
});

test("a lesson typing stage completes and offers the next stage", async ({ page }) => {
  await page.goto("/lessons/lesson/home-row/lesson/beginner-posture-home-position");

  await expect(page.getByText(/Stage 1 of/)).toBeVisible();
  const firstStageText = await passageText(page);
  expect(firstStageText.length).toBeGreaterThan(0);
  await typePassage(page, firstStageText);

  await expect(page.getByText("Stage complete", { exact: true })).toBeVisible();
  const continueButton = page.getByRole("button", { name: "Continue to next stage" });
  await expect(continueButton).toBeVisible();
  await continueButton.click();
  await expect(page.getByText(/Stage 2 of/)).toBeVisible();
});
