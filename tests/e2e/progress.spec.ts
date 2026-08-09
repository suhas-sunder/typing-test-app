import { expect, test } from "./fixtures";
import { PROGRESS_STORAGE_KEY } from "./helpers";

test("the local-first progress page works without an account", async ({ page }) => {
  await page.goto("/progress");

  await expect(page.getByText("No completed practice is stored here yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Take a typing test" })).toBeVisible();
  await expect(page.getByText(/sign in|create account|cloud sync/i)).toHaveCount(0);
});

test("corrupted local progress does not make the application unusable", async ({ page }) => {
  await page.addInitScript(
    ({ key }) => localStorage.setItem(key, "{broken-json"),
    { key: PROGRESS_STORAGE_KEY },
  );

  await page.goto("/progress");
  await expect(page.getByText(/Some local progress could not be read/)).toBeVisible();

  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");
  await expect(page.getByRole("textbox", { name: "Typing input" })).toBeFocused();
  await expect(page.getByTestId("typing-text-stream")).not.toBeEmpty();
});
