import { ENABLED_CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import type { LocalProgress } from "@/lib/progress/types";

export const THEME_IDS = ["base-camp", "high-contrast", "campfire-glow", "pine-trail", "stargazer", "summit"] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export type ThemeTokens = {
  page: string;
  section: string;
  text: string;
  secondaryText: string;
  mutedText: string;
  accent: string;
  strongAccent: string;
  accentContrast: string;
  interactiveHover: string;
  interactiveSelected: string;
  focus: string;
  success: string;
  warning: string;
  error: string;
  typingCurrent: string;
  typingCorrect: string;
  typingIncorrect: string;
  keyboardSurface: string;
  keySurface: string;
  secondarySurface: string;
};

export type ThemeDefinition = {
  availability: "always" | "five-lessons" | "fifteen-stars" | "week-at-camp" | "three-stars-all-lessons";
  contentVersion: 1;
  description: string;
  displayOrder: number;
  id: ThemeId;
  name: string;
  requirement: string;
  tokens: ThemeTokens;
};

const base: ThemeTokens = {
  page: "246 240 229", section: "255 252 247", text: "15 29 50", secondaryText: "29 43 60", mutedText: "74 89 111",
  accent: "241 111 70", strongAccent: "219 83 56", accentContrast: "255 255 255", interactiveHover: "255 232 221",
  interactiveSelected: "241 111 70", focus: "219 83 56", success: "132 162 146", warning: "196 135 56", error: "189 89 72",
  typingCurrent: "241 111 70", typingCorrect: "102 139 114", typingIncorrect: "189 89 72", keyboardSurface: "239 229 214",
  keySurface: "255 252 247", secondarySurface: "255 232 221",
};

export const THEMES: ThemeDefinition[] = [
  { id: "base-camp", name: "Base Camp", description: "The original warm cream, navy, coral, and sage appearance.", availability: "always", requirement: "Always available.", tokens: base, displayOrder: 1, contentVersion: 1 },
  { id: "high-contrast", name: "High Contrast", description: "Stronger light-surface contrast with clear coral interactions.", availability: "always", requirement: "Always available.", tokens: { ...base, page: "255 253 248", section: "255 255 255", text: "5 12 24", secondaryText: "12 24 40", mutedText: "43 55 72", accent: "205 70 35", strongAccent: "156 43 19", interactiveHover: "255 222 204", interactiveSelected: "205 70 35", focus: "156 43 19", typingCorrect: "43 105 66", typingIncorrect: "154 42 31" }, displayOrder: 2, contentVersion: 1 },
  { id: "campfire-glow", name: "Campfire Glow", description: "A warmer cream and campfire-coral variation.", availability: "five-lessons", requirement: "Complete five distinct lessons with at least one star each.", tokens: { ...base, page: "250 239 224", section: "255 248 238", accent: "230 96 52", strongAccent: "190 69 39", interactiveHover: "255 222 204", interactiveSelected: "230 96 52", focus: "190 69 39", secondarySurface: "255 225 207" }, displayOrder: 3, contentVersion: 1 },
  { id: "pine-trail", name: "Pine Trail", description: "Warm neutral surfaces with restrained evergreen accents.", availability: "fifteen-stars", requirement: "Earn at least fifteen total lesson stars.", tokens: { ...base, accent: "68 117 89", strongAccent: "48 91 67", interactiveHover: "220 237 226", interactiveSelected: "68 117 89", focus: "48 91 67", success: "68 117 89", typingCurrent: "68 117 89", secondarySurface: "229 240 232" }, displayOrder: 4, contentVersion: 1 },
  { id: "stargazer", name: "Stargazer", description: "A restrained deep-navy theme with warm readable text and coral accents.", availability: "week-at-camp", requirement: "Unlock the Week at Camp achievement.", tokens: { ...base, page: "17 27 43", section: "28 41 59", text: "255 248 236", secondaryText: "245 232 211", mutedText: "205 213 220", accent: "244 125 82", strongAccent: "255 157 113", accentContrast: "17 27 43", interactiveHover: "52 68 87", interactiveSelected: "244 125 82", focus: "255 157 113", success: "151 190 166", warning: "235 179 91", error: "246 139 122", typingCurrent: "255 157 113", typingCorrect: "151 190 166", typingIncorrect: "246 139 122", keyboardSurface: "38 53 72", keySurface: "47 63 82", secondarySurface: "52 68 87" }, displayOrder: 5, contentVersion: 1 },
  { id: "summit", name: "Summit", description: "A refined navy, cream, coral, and cool-neutral completion theme.", availability: "three-stars-all-lessons", requirement: "Earn at least three stars on all forty-five lessons.", tokens: { ...base, page: "242 239 230", section: "253 251 244", secondaryText: "24 42 58", mutedText: "61 80 93", accent: "225 103 62", strongAccent: "184 72 43", interactiveSelected: "225 103 62", focus: "184 72 43", keyboardSurface: "225 226 216", secondarySurface: "238 226 212" }, displayOrder: 6, contentVersion: 1 },
];

export function getTheme(id: string | null | undefined) {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
}

export function isThemeAvailable(theme: ThemeDefinition, progress: LocalProgress) {
  const lessons = ENABLED_CURRICULUM_LESSONS.map((lesson) => progress.lessons[lesson.id]);
  switch (theme.availability) {
    case "always": return true;
    case "five-lessons": return lessons.filter((lesson) => (lesson?.bestStars ?? 0) >= 1).length >= 5;
    case "fifteen-stars": return lessons.reduce((total, lesson) => total + (lesson?.bestStars ?? 0), 0) >= 15;
    case "week-at-camp": return progress.achievements.unlocked.some((record) => record.id === "seven-day-streak");
    case "three-stars-all-lessons": return lessons.every((lesson) => (lesson?.bestStars ?? 0) >= 3);
  }
}

export function selectedTheme(progress: LocalProgress) {
  const theme = getTheme(progress.customization.selectedThemeId);
  return isThemeAvailable(theme, progress) || progress.customization.grandfatheredThemeIds.includes(theme.id) ? theme : THEMES[0];
}

export const THEME_CSS_VARIABLES: Record<keyof ThemeTokens, string> = {
  page: "--theme-page", section: "--theme-section", text: "--theme-text", secondaryText: "--theme-secondary-text",
  mutedText: "--theme-muted-text", accent: "--theme-accent", strongAccent: "--theme-strong-accent",
  accentContrast: "--theme-accent-contrast", interactiveHover: "--theme-interactive-hover",
  interactiveSelected: "--theme-interactive-selected", focus: "--theme-focus", success: "--theme-success",
  warning: "--theme-warning", error: "--theme-error", typingCurrent: "--theme-typing-current",
  typingCorrect: "--theme-typing-correct", typingIncorrect: "--theme-typing-incorrect",
  keyboardSurface: "--theme-keyboard-surface", keySurface: "--theme-key-surface", secondarySurface: "--theme-secondary-surface",
};
