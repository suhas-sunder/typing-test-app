import { THEME_IDS } from "@/lib/themes/registry";
import { expect, test } from "./fixtures";
import { PROGRESS_STORAGE_KEY } from "./helpers";

const protectedHeaders = {
  "cross-origin-opener-policy": "same-origin",
  "cross-origin-resource-policy": "same-origin",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
} as const;

test("security headers cover normal, redirect, and gone responses", async ({
  request,
}) => {
  const responses = [
    [await request.get("/", { maxRedirects: 0 }), 200],
    [await request.get("/cookiespolicy", { maxRedirects: 0 }), 308],
    [await request.get("/login", { maxRedirects: 0 }), 410],
    [await request.get("/v1/api/user/login", { maxRedirects: 0 }), 410],
  ] as const;

  for (const [response, status] of responses) {
    expect(response.status()).toBe(status);
    const headers = response.headers();
    Object.entries(protectedHeaders).forEach(([name, value]) =>
      expect(headers[name]).toBe(value),
    );
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["content-security-policy"]).not.toMatch(
      /posthog|googlesyndication|doubleclick|\*/i,
    );
  }
});

test("CSP preserves local resources, JSON-LD, and the early theme bootstrap", async ({
  page,
}) => {
  const themeId = THEME_IDS[1];
  await page.addInitScript(
    ({ key, progress }) => localStorage.setItem(key, JSON.stringify(progress)),
    {
      key: PROGRESS_STORAGE_KEY,
      progress: emptyProgressForTheme(themeId),
    },
  );

  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") {
      externalRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", themeId);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    2,
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(jsonLd.map((value) => JSON.parse(value))).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ "@type": "WebSite" }),
      expect.objectContaining({ "@type": "WebApplication" }),
    ]),
  );
  await expect
    .poll(() => page.evaluate(async () => (await document.fonts.ready).status))
    .toBe("loaded");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", themeId);
  expect(externalRequests).toEqual([]);
});

function emptyProgressForTheme(themeId: (typeof THEME_IDS)[number]) {
  return {
    achievements: { unlocked: [] },
    activityDates: [],
    customization: {
      grandfatheredThemeIds: [themeId],
      selectedEmblemId: null,
      selectedThemeId: themeId,
    },
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
