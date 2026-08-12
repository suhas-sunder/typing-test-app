import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { currentCharacter } from "./helpers";

const RESPONSIVE_WIDTHS = [390, 768, 1366, 1920] as const;

async function expectNoPageOverflow(page: Page, context: string) {
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      { message: `${context}: page-level horizontal overflow` },
    )
    .toBe(true);
}

test("ad-bearing pages stay within every supported viewport", async ({ page }) => {
  for (const width of RESPONSIVE_WIDTHS) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of ["/", "/typing-test", "/typing-practice"] as const) {
      await page.goto(route);
      await expectNoPageOverflow(page, `${route} at ${width}px`);
    }

    const horizontalReservation = page
      .locator('[data-ad-reservation="below_header_or_tool"]')
      .first();
    const expectedWidth = width >= 900 ? 728 : width >= 540 ? 468 : 320;
    await expect(horizontalReservation).toBeVisible();
    await expect
      .poll(() => horizontalReservation.evaluate((element) => element.getBoundingClientRect().width))
      .toBe(expectedWidth);

    const sidebars = page.locator("[data-ad-sidebar-pair]");
    if (width >= 1712) await expect(sidebars).toBeVisible();
    else await expect(sidebars).toBeHidden();
  }
});

test("a completed typing result remains overflow-free at every supported viewport", async ({ page }) => {
  await page.clock.install();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/typing-test?duration=15&mode=quote&difficulty=easy&stats=1");

  const input = page.getByRole("textbox", { name: "Typing input" });
  await input.pressSequentially(await currentCharacter(page));
  await page.clock.fastForward(15_250);
  await expect(page.locator('section[aria-labelledby="typing-results-heading"]')).toBeVisible();

  for (const width of RESPONSIVE_WIDTHS) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await expectNoPageOverflow(page, `completed typing result at ${width}px`);
  }
});

test("a filled 728px reservation is suppressed below its safe breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");

  const placement = page.locator('[data-ad-placement="below_header_or_tool"]');
  const reservation = placement.locator('[data-ad-reservation="below_header_or_tool"]');
  await reservation.evaluate((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.width = "728px";
    htmlElement.style.height = "90px";
    htmlElement.dataset.adFixedMinViewport = "900";
  });
  await expect(placement).toBeVisible();

  for (const width of [768, 390] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(placement).toBeHidden();
    await expectNoPageOverflow(page, `fixed 728px reservation at ${width}px`);
  }

  await page.setViewportSize({ width: 900, height: 900 });
  await expect(placement).toBeVisible();
  await expect(reservation).toHaveCSS("width", "728px");
  await expectNoPageOverflow(page, "fixed 728px reservation at 900px");
  await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0);
});

test("fixed responsive reservations never shrink or clip after a viewport change", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/");

  const horizontalPlacement = page.locator('[data-ad-placement="below_header_or_tool"]');
  const horizontalReservation = horizontalPlacement.locator("[data-ad-reservation]");
  await horizontalReservation.evaluate((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.width = "468px";
    htmlElement.style.height = "60px";
    htmlElement.dataset.adFixedMinViewport = "540";
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(horizontalPlacement).toBeHidden();
  await expectNoPageOverflow(page, "fixed 468px reservation at 390px");

  await page.setViewportSize({ width: 2048, height: 900 });
  const sidebars = page.locator(".ad-sidebar");
  await sidebars.locator("[data-ad-reservation]").evaluateAll((elements) => {
    for (const element of elements) {
      const htmlElement = element as HTMLElement;
      htmlElement.style.width = "300px";
      htmlElement.style.height = "600px";
      htmlElement.dataset.adFixedMinViewport = "2048";
    }
  });
  await expect(sidebars.first()).toBeVisible();

  await page.setViewportSize({ width: 1920, height: 900 });
  await expect(sidebars.first()).toBeHidden();
  await expect(sidebars.last()).toBeHidden();
  await expectNoPageOverflow(page, "fixed 300px side rails at 1920px");
});
