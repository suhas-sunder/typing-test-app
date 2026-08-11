import { expect, test } from "./fixtures";

test("important active redirects resolve to their current destinations", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/progress$/);
  await expect(page.getByRole("heading", { name: /practice on this device/i })).toBeVisible();

  await page.goto("/games");
  await expect(page).toHaveURL(/\/games\/calculator$/);
  await expect(page.getByRole("heading", { name: /calculator/i })).toBeVisible();
});

test("local browser server keeps ads in placeholder state without advertising requests", async ({ page }) => {
  const adRequests: string[] = [];
  page.on("request", (request) => {
    if (/googlesyndication|doubleclick|googleadservices/i.test(request.url())) {
      adRequests.push(request.url());
    }
  });

  await page.goto("/");

  const placements = page.locator("[data-ad-placement]");
  await expect(placements.first()).toBeVisible();
  await expect(page.locator('.home-hero-ad [data-ad-placement="above_header"]')).toBeVisible();
  await expect(page.locator('.home-section-ad [data-ad-placement="below_header_or_tool"]')).toBeVisible();
  await expect(page.locator('.home-footer-ad [data-ad-placement="bottom_page"]')).toBeVisible();
  await expect(placements.locator('ins[data-placeholder-state="placeholder"]').first()).toBeAttached();
  await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0);
  expect(adRequests).toEqual([]);
});

test("homepage advertising stays in-flow across the responsive targets", async ({ page }) => {
  for (const width of [390, 768, 1366, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);

    const heroAd = page.locator('.home-hero-ad [data-ad-placement="above_header"]');
    if (width >= 800) await expect(heroAd).toBeVisible();
    else await expect(heroAd).toBeHidden();

    const sidebars = page.locator("[data-ad-sidebar-pair]");
    if (width >= 1712) await expect(sidebars).toBeVisible();
    else await expect(sidebars).toBeHidden();
  }
});
