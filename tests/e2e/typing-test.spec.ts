import { expect, test } from "./fixtures";
import {
  PROGRESS_STORAGE_KEY,
  currentCharacter,
} from "./helpers";

const typingTestUrl = "/typing-test?duration=15&mode=quote&difficulty=easy&stats=1";

test("starts with stable metrics and characterizes correction behavior", async ({ page }) => {
  await page.goto(typingTestUrl);

  const input = page.getByRole("textbox", { name: "Typing input" });
  await expect(page.getByRole("heading", { name: "Free Typing Speed Test" })).toBeVisible();
  await expect(page.getByTestId("typing-text-stream")).not.toBeEmpty();
  await expect(input).toBeFocused();
  await expect(page.getByText("0:15", { exact: true }).filter({ visible: true })).toBeVisible();
  await expect(page.getByText("WPM", { exact: true }).filter({ visible: true }).locator("..")).toContainText("0");
  await expect(page.getByText("accuracy", { exact: true }).filter({ visible: true }).locator("..")).toContainText("0%");

  const expected = await currentCharacter(page);
  const wrong = expected.toLowerCase() === "x" ? "y" : "x";
  const firstCharacter = page.getByTestId("typing-text-stream").locator('[data-word-index="0"] > span').first();

  await input.pressSequentially(wrong);
  await expect(page.locator('p[role="status"]')).toContainText("Typing started.");
  await expect(firstCharacter).toHaveClass(/bg-camp-peach/);

  await input.press("Backspace");
  await expect.poll(() => currentCharacter(page)).toBe(expected);
  await expect(firstCharacter).not.toHaveClass(/bg-camp-peach/);

  await input.pressSequentially(expected);
  await expect(firstCharacter).toHaveClass(/text-camp-correct/);
});

test("completes deterministically and persists the result locally", async ({ page }) => {
  await page.clock.install();
  await page.goto(typingTestUrl);

  const input = page.getByRole("textbox", { name: "Typing input" });
  const first = await currentCharacter(page);
  await input.pressSequentially(first);
  await page.clock.fastForward(15_250);

  const results = page.locator('section[aria-labelledby="typing-results-heading"]');
  await expect(results).toBeVisible();
  await expect(results.getByText("Test complete")).toBeVisible();
  await expect(results).toContainText("WPM");
  await expect(results).toContainText("Accuracy");
  await expect(results).toContainText("Characters");
  await expect(results).toContainText("Errors");
  await expect(results).toContainText("Excellent control");
  await expect(results.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(results.getByRole("link", { name: "View local progress" })).toBeVisible();

  const storedBeforeReload = await page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY);
  expect(storedBeforeReload).not.toBeNull();
  const progress = JSON.parse(storedBeforeReload ?? "{}") as {
    typingTests?: { totalCompleted?: number; history?: Array<{ durationSeconds?: number; mode?: string }> };
  };
  expect(progress.typingTests?.totalCompleted).toBe(1);
  expect(progress.typingTests?.history?.[0]).toMatchObject({ durationSeconds: 15, mode: "quote" });

  await page.reload();
  await expect(page.getByRole("textbox", { name: "Typing input" })).toBeVisible();
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY))
    .toBe(storedBeforeReload);

  await page.goto("/progress");
  await expect(page.getByText("Completed tests").locator("..")).toContainText("1");
  await expect(page.getByRole("heading", { name: "Recent completed practice" })).toBeVisible();
});
