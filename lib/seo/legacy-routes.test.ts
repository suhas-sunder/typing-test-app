import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { resolveCurriculumLessonRoute } from "@/lib/curriculum/registry";
import {
  LEGACY_EXACT_GONE_ROUTES,
  LEGACY_EXACT_REDIRECTS,
  LEGACY_NUMERIC_LESSON_BOUNDS,
  LEGACY_RETIRED_API_PREFIXES,
  UNRESOLVED_LEGACY_LANDING_ROUTES,
  UNRESOLVED_PRIOR_CURRICULUM_ROUTES,
  resolveLegacyRoute,
} from "@/lib/seo/legacy-routes";
import {
  getIndexablePaths,
  getNoindexPaths,
  REDIRECT_ROUTES,
} from "@/lib/routes";

function numericLegacyPaths() {
  return Object.entries(LEGACY_NUMERIC_LESSON_BOUNDS).flatMap(
    ([category, sections]) =>
      sections.flatMap((maximumLevel, sectionIndex) =>
        Array.from(
          { length: maximumLevel },
          (_, levelIndex) =>
            `/lessons/lesson/${category}/sec-${sectionIndex + 1}/lvl-${levelIndex + 1}`,
        ),
      ),
  );
}

describe("legacy route migration registry", () => {
  it("keeps exact permanent redirects unique, direct, and canonical", () => {
    expect(LEGACY_EXACT_REDIRECTS).toHaveLength(18);
    expect(
      new Set(LEGACY_EXACT_REDIRECTS.map(({ source }) => source)).size,
    ).toBe(LEGACY_EXACT_REDIRECTS.length);

    for (const { source, destination } of LEGACY_EXACT_REDIRECTS) {
      expect(source).not.toBe(destination);
      expect(resolveLegacyRoute(source)).toMatchObject({
        action: "redirect",
        destination,
        status: 308,
      });
      expect(resolveLegacyRoute(destination)).toBeNull();

      if (destination.startsWith("/lessons/lesson/")) {
        const [, , , category, section, level] = destination.split("/");
        expect(
          resolveCurriculumLessonRoute(category, section, level),
        ).not.toBeNull();
      } else {
        expect(getIndexablePaths()).toContain(destination);
      }
    }
  });

  it("classifies all 1,752 inventoried numeric lessons without guessing the ambiguous group", () => {
    const routes = numericLegacyPaths();
    expect(routes).toHaveLength(1_752);

    const resolutions = routes.map(resolveLegacyRoute);
    expect(
      resolutions.filter((resolution) => resolution?.action === "redirect"),
    ).toHaveLength(295);
    expect(
      resolutions.filter((resolution) => resolution?.action === "gone"),
    ).toHaveLength(1_452);
    expect(
      resolutions.filter((resolution) => resolution === null),
    ).toHaveLength(5);
    resolutions.forEach((resolution) => {
      if (resolution?.action === "redirect") {
        expect(resolveLegacyRoute(resolution.destination)).toBeNull();
      }
    });

    expect(resolveLegacyRoute("/lessons/lesson/1/sec-1/lvl-1")).toMatchObject({
      action: "redirect",
      destination: "/lessons/home-row",
      status: 308,
    });
    expect(resolveLegacyRoute("/lessons/lesson/5/sec-9/lvl-8")).toMatchObject({
      action: "redirect",
      destination: "/typing-practice/quotes",
    });
    expect(resolveLegacyRoute("/lessons/lesson/7/sec-1/lvl-1")).toMatchObject({
      action: "gone",
      status: 410,
    });
    expect(resolveLegacyRoute("/lessons/lesson/3/sec-5/lvl-1")).toBeNull();
  });

  it("does not turn undocumented numeric parameters into redirects or gone responses", () => {
    expect(resolveLegacyRoute("/lessons/lesson/1/sec-1/lvl-11")).toBeNull();
    expect(resolveLegacyRoute("/lessons/lesson/16/sec-1/lvl-1")).toBeNull();
    expect(resolveLegacyRoute("/lessons/lesson/1/sec-7/lvl-1")).toBeNull();
  });

  it("retires only the known account, profile, content, and API surfaces", () => {
    expect(LEGACY_EXACT_GONE_ROUTES).toHaveLength(21);
    for (const pathname of LEGACY_EXACT_GONE_ROUTES) {
      expect(resolveLegacyRoute(pathname)).toMatchObject({
        action: "gone",
        kind: "page",
        status: 410,
      });
    }

    for (const prefix of LEGACY_RETIRED_API_PREFIXES) {
      expect(resolveLegacyRoute(prefix)).toMatchObject({
        action: "gone",
        kind: "api",
        status: 410,
      });
      expect(
        resolveLegacyRoute(`${prefix}/representative-endpoint`),
      ).toMatchObject({ action: "gone", kind: "api", status: 410 });
    }
    expect(resolveLegacyRoute("/v1/api/unknown")).toBeNull();
  });

  it("leaves documented ambiguous routes unresolved", () => {
    for (const pathname of [
      ...UNRESOLVED_LEGACY_LANDING_ROUTES,
      ...UNRESOLVED_PRIOR_CURRICULUM_ROUTES,
    ]) {
      expect(resolveLegacyRoute(pathname)).toBeNull();
    }
  });

  it("does not affect active routes or include legacy sources in the sitemap", () => {
    const activePaths = [
      ...getIndexablePaths(),
      ...getNoindexPaths(),
      ...REDIRECT_ROUTES.flatMap(({ source, destination }) => [
        source,
        destination,
      ]),
    ];
    activePaths.forEach((pathname) =>
      expect(resolveLegacyRoute(pathname)).toBeNull(),
    );

    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
    const legacySources = [
      ...LEGACY_EXACT_REDIRECTS.map(({ source }) => source),
      ...LEGACY_EXACT_GONE_ROUTES,
      ...numericLegacyPaths(),
    ];
    legacySources.forEach((pathname) =>
      expect(sitemapPaths).not.toContain(pathname),
    );
  });
});
