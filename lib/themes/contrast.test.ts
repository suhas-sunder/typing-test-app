import { describe, expect, it } from "vitest";
import { THEMES } from "@/lib/themes/registry";

describe("theme contrast contracts", () => {
  it.each(THEMES)("keeps $name text and control colors above their accessibility floors", ({ tokens }) => {
    const accentContrast = rgb(tokens.accentContrast);
    const chrome = rgb(tokens.chrome);
    const textSurfaces = [tokens.page, tokens.section, tokens.secondarySurface, tokens.keyboardSurface, tokens.keySurface].map(rgb);

    expect(contrast(rgb(tokens.accent), accentContrast)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(tokens.strongAccent), accentContrast)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(tokens.chromeAccent), chrome)).toBeGreaterThanOrEqual(4.5);
    expect(contrast([255, 255, 255], chrome)).toBeGreaterThanOrEqual(4.5);

    for (const surface of textSurfaces) {
      expect(contrast(rgb(tokens.strongAccent), surface)).toBeGreaterThanOrEqual(4.5);
    }

    for (const surface of [rgb(tokens.page), rgb(tokens.section), rgb(tokens.secondarySurface)]) {
      expect(contrast(rgb(tokens.success), surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(rgb(tokens.error), surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(THEMES)("keeps $name typing feedback distinct with non-text contrast", ({ tokens }) => {
    const page = rgb(tokens.page);
    const secondarySurface = rgb(tokens.secondarySurface);

    expect(contrast(rgb(tokens.typingCurrent), page)).toBeGreaterThanOrEqual(3);
    expect(contrast(rgb(tokens.typingCorrect), page)).toBeGreaterThanOrEqual(3);
    expect(contrast(rgb(tokens.typingIncorrect), secondarySurface)).toBeGreaterThanOrEqual(3);
    expect(new Set([tokens.typingCurrent, tokens.typingCorrect, tokens.typingIncorrect]).size).toBe(3);
  });
});

type Rgb = [number, number, number];

function rgb(value: string): Rgb {
  const channels = value.split(" ").map(Number);
  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel))) {
    throw new Error(`Invalid RGB token: ${value}`);
  }
  return channels as Rgb;
}

function contrast(first: Rgb, second: Rgb) {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05);
}

function luminance(color: Rgb) {
  const [red, green, blue] = color.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
