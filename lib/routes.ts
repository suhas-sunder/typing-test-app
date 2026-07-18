import { CURRICULUM_UNITS, ENABLED_CURRICULUM_LESSONS, getLessonHref } from "@/lib/curriculum/registry";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";

export const STATIC_INDEXABLE_PATHS = [
  "/",
  "/typing-test",
  "/lessons",
  "/typing-practice",
  "/games/calculator",
  "/learn",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
] as const;

export function getIndexablePaths() {
  return [
    ...STATIC_INDEXABLE_PATHS,
    ...CURRICULUM_UNITS.map((unit) => unit.route),
    ...PRACTICE_DEFINITIONS.map((practice) => `/typing-practice/${practice.id}` as const),
  ];
}

export function getNoindexPaths() {
  return [
    "/progress",
    "/sitemap",
    "/socials",
    ...ENABLED_CURRICULUM_LESSONS.map(getLessonHref),
  ];
}

export const REDIRECT_ROUTES = [
  { source: "/dashboard", destination: "/progress", status: 307 },
  { source: "/games", destination: "/games/calculator", status: 308 },
] as const;

export const INVALID_ROUTE_FAMILIES = [
  "/lessons/[unknown-unit]",
  "/lessons/lesson/[unknown-or-mismatched-parameters]",
  "/typing-practice/[unknown-practice]",
  "/login",
  "/register",
  "/removed-game-routes",
] as const;

