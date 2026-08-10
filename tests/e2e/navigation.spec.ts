import { expect, test } from "./fixtures";

test("important active redirects resolve to their current destinations", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/progress$/);
  await expect(page.getByRole("heading", { name: /practice on this device/i })).toBeVisible();

  await page.goto("/games");
  await expect(page).toHaveURL(/\/games\/calculator$/);
  await expect(page.getByRole("heading", { name: /calculator/i })).toBeVisible();
});

test("test mode keeps ads in placeholder state without advertising requests", async ({ page }) => {
  const adRequests: string[] = [];
  page.on("request", (request) => {
    if (/googlesyndication|doubleclick|googleadservices/i.test(request.url())) {
      adRequests.push(request.url());
    }
  });

  await page.goto("/");

  const placements = page.locator("[data-ad-placement]");
  await expect(placements.first()).toBeVisible();
  await expect(placements.locator('ins[data-placeholder-state="placeholder"]').first()).toBeAttached();
  await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0);
  expect(adRequests).toEqual([]);
});
