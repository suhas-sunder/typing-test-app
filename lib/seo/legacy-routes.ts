import { LEGACY_CURRICULUM_LESSON_MAPPINGS } from "@/lib/curriculum/legacy-lesson-ids";

export type LegacyRedirect = {
  source: string;
  destination: string;
  evidence: string;
};

export type LegacyRouteResolution =
  | {
      action: "redirect";
      destination: string;
      evidence: string;
      status: 308;
    }
  | {
      action: "gone";
      kind: "api" | "page";
      reason: string;
      status: 410;
    };

const PRIOR_CURRICULUM_REDIRECTS: readonly LegacyRedirect[] =
  LEGACY_CURRICULUM_LESSON_MAPPINGS.map(
    ({ legacyId, legacyUnitId, currentId, currentUnitId }) => ({
      source: `/lessons/lesson/${legacyUnitId}/lesson/${legacyId}`,
      destination: `/lessons/lesson/${currentUnitId}/lesson/${currentId}`,
      evidence:
        "The existing v4-to-v5 progress migration identifies this exact lesson successor.",
    }),
  );

export const LEGACY_EXACT_REDIRECTS: readonly LegacyRedirect[] = [
  {
    source: "/cookiespolicy",
    destination: "/cookies",
    evidence: "The historical and current pages describe the cookie policy.",
  },
  {
    source: "/privacypolicy",
    destination: "/privacy",
    evidence: "The historical and current pages describe the privacy policy.",
  },
  {
    source: "/termsofservice",
    destination: "/terms",
    evidence: "The historical and current pages describe the terms of service.",
  },
  {
    source: "/Learn",
    destination: "/learn",
    evidence:
      "This is the historical case variant of the current learning guide.",
  },
  {
    source: "/lessons/quotes",
    destination: "/typing-practice/quotes",
    evidence: "Both routes provide quote-based typing practice.",
  },
  {
    source: "/lessons/common-english-words",
    destination: "/typing-practice/common-words",
    evidence: "Both routes provide common-English-word typing practice.",
  },
  ...PRIOR_CURRICULUM_REDIRECTS,
];

export const LEGACY_EXACT_GONE_ROUTES = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/profile",
  "/profile/summary",
  "/profile/img",
  "/profile/stats",
  "/profile/achievements",
  "/profile/themes",
  "/profile/account",
  "/lessons/graduation",
  "/lessons/animal-facts",
  "/lessons/bird-facts",
  "/lessons/insect-facts",
  "/lessons/prehistoric-facts",
  "/lessons/reptile-facts",
  "/lessons/fantasy-facts",
  "/lessons/sea-life-facts",
  "/lessons/dog-facts",
  "/lessons/flower-facts",
] as const;

export const LEGACY_RETIRED_API_PREFIXES = [
  "/v1/api/settings",
  "/v1/api/account",
  "/v1/api/images",
  "/v1/api/user",
] as const;

/**
 * Exact bounds recovered from the historical LessonNavData route inventory.
 * Each array index is section - 1 and each value is the highest valid level.
 */
export const LEGACY_NUMERIC_LESSON_BOUNDS: Readonly<
  Record<number, readonly number[]>
> = {
  1: [10, 9, 9, 9, 9, 10],
  2: [9, 9, 10, 12],
  3: [8, 5, 5, 9, 5],
  4: [1],
  5: Array.from({ length: 9 }, () => 8),
  6: [...Array.from({ length: 12 }, () => 8), 4],
  7: Array.from({ length: 49 }, () => 7),
  8: Array.from({ length: 55 }, () => 7),
  9: Array.from({ length: 21 }, () => 7),
  10: Array.from({ length: 9 }, () => 7),
  11: Array.from({ length: 13 }, () => 7),
  12: Array.from({ length: 39 }, () => 4),
  13: Array.from({ length: 16 }, () => 7),
  14: [29, 15, 16, 7, 14],
  15: [...Array.from({ length: 7 }, () => 10), 3],
};

export const UNRESOLVED_LEGACY_LANDING_ROUTES = [
  "/lessons/beginner",
  "/lessons/intermediate",
  "/lessons/advanced",
] as const;

export const UNRESOLVED_PRIOR_CURRICULUM_ROUTES = [
  "/lessons/lesson/home-row/lesson/home-row-d-k",
  "/lessons/lesson/home-row/lesson/home-row-s-l",
  "/lessons/lesson/home-row/lesson/home-row-a-semicolon",
  "/lessons/lesson/home-row/lesson/home-row-g-h",
  "/lessons/lesson/home-row/lesson/home-row-combinations",
  "/lessons/lesson/top-row/lesson/top-row-e-i",
  "/lessons/lesson/top-row/lesson/top-row-r-u",
  "/lessons/lesson/top-row/lesson/top-row-w-o",
  "/lessons/lesson/top-row/lesson/top-row-q-p",
  "/lessons/lesson/top-row/lesson/top-row-t-y",
  "/lessons/lesson/bottom-row/lesson/bottom-row-c-comma",
  "/lessons/lesson/bottom-row/lesson/bottom-row-v-m",
  "/lessons/lesson/bottom-row/lesson/bottom-row-x-period",
  "/lessons/lesson/bottom-row/lesson/bottom-row-z-slash",
  "/lessons/lesson/bottom-row/lesson/bottom-row-b-n",
  "/lessons/lesson/full-keyboard/lesson/full-keyboard-difficult-reaches",
  "/lessons/lesson/full-keyboard/lesson/full-keyboard-sentences",
  "/lessons/lesson/capitals-punctuation/lesson/punctuation-sentences",
] as const;

const exactRedirects = new Map(
  LEGACY_EXACT_REDIRECTS.map((redirect) => [redirect.source, redirect]),
);
const exactGoneRoutes = new Set<string>(LEGACY_EXACT_GONE_ROUTES);

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function resolveNumericLesson(pathname: string): LegacyRouteResolution | null {
  const match = pathname.match(
    /^\/lessons\/lesson\/(\d+)\/sec-(\d+)\/lvl-(\d+)$/,
  );
  if (!match) return null;

  const category = Number(match[1]);
  const section = Number(match[2]);
  const level = Number(match[3]);
  const sectionBounds = LEGACY_NUMERIC_LESSON_BOUNDS[category];
  const maximumLevel = sectionBounds?.[section - 1];
  if (!maximumLevel || level < 1 || level > maximumLevel) return null;

  if (category === 1) {
    return numericRedirect(
      section <= 3 ? "/lessons/home-row" : "/lessons/top-row",
      "The historical section title identifies the same keyboard-row skill as the current unit.",
    );
  }
  if (category === 2) {
    return numericRedirect(
      section <= 3 ? "/lessons/bottom-row" : "/lessons/full-keyboard",
      "The historical section title identifies the same bottom-row or full-keyboard skill as the current unit.",
    );
  }
  if (category === 3 && section <= 4) {
    return numericRedirect(
      "/lessons/numbers-symbols",
      "The historical number, bracket, symbol, and mixed-character sections belong to the current numbers-and-symbols unit.",
    );
  }
  if (category === 3) return null;
  if (category === 5) {
    return numericRedirect(
      "/typing-practice/quotes",
      "The historical route is a quote-typing exercise and the current destination preserves that practice intent.",
    );
  }
  if (category === 6) {
    return numericRedirect(
      "/typing-practice/common-words",
      "The historical route is a common-English-word exercise and the current destination preserves that practice intent.",
    );
  }

  return {
    action: "gone",
    kind: "page",
    reason:
      category === 4
        ? "The historical graduation page has no equivalent in the current curriculum."
        : "This historical fact or themed-content lesson has no equivalent in the current product.",
    status: 410,
  };
}

function numericRedirect(
  destination: string,
  evidence: string,
): LegacyRouteResolution {
  return { action: "redirect", destination, evidence, status: 308 };
}

export function resolveLegacyRoute(
  requestedPathname: string,
): LegacyRouteResolution | null {
  const pathname = normalizePathname(requestedPathname);
  const redirect = exactRedirects.get(pathname);
  if (redirect) {
    return {
      action: "redirect",
      destination: redirect.destination,
      evidence: redirect.evidence,
      status: 308,
    };
  }

  if (exactGoneRoutes.has(pathname)) {
    return {
      action: "gone",
      kind: "page",
      reason:
        pathname.startsWith("/profile") ||
        ["/login", "/register", "/verify-email", "/forgot-password"].includes(
          pathname,
        )
          ? "The historical account system has been retired; the current product is local-first and requires no account."
          : "This historical lesson content has been retired without a current equivalent.",
      status: 410,
    };
  }

  if (
    LEGACY_RETIRED_API_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    return {
      action: "gone",
      kind: "api",
      reason:
        "This historical Express API surface is retired and is not served by the current application.",
      status: 410,
    };
  }

  return resolveNumericLesson(pathname);
}
