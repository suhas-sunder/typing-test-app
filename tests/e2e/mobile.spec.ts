import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";
import { currentCharacter } from "./helpers";

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test("typing and results remain usable at the 390px mobile target", async ({ page }) => {
  await page.clock.install();
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");

  await expectNoHorizontalOverflow(page);
  await expect(page.locator('[data-keyboard-layout="compact"]')).toBeVisible();

  const input = page.getByRole("textbox", { name: "Typing input" });
  await expect(input).toBeFocused();
  const firstTestCharacter = await currentCharacter(page);
  await input.pressSequentially(firstTestCharacter);

  await page.getByRole("button", { name: "Open typing settings" }).click();
  const settings = page.getByRole("dialog", { name: "Tune the test" });
  await expect(settings).toBeVisible();
  const bounds = await settings.boundingBox();
  expect(bounds).not.toBeNull();
  expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(390);
  expect((bounds?.y ?? 0) + (bounds?.height ?? 0)).toBeLessThanOrEqual(844);
  await page.keyboard.press("Escape");
  await expect(settings).toBeHidden();

  await page.goto("/typing-practice/quotes");
  const firstPracticeCharacter = await currentCharacter(page);
  await page
    .getByRole("textbox", { name: "Typing input" })
    .pressSequentially(firstPracticeCharacter);
  await page.clock.fastForward(120_250);

  await expect(page.locator('section[aria-labelledby="typing-results-heading"]')).toBeVisible();
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
