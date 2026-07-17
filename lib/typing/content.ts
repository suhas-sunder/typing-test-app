import type { DifficultyId, DifficultyOption, TestMode } from "@/lib/typing/types";
import { buildTypingContent } from "@/lib/typing/corpus";

export const DIFFICULTIES: DifficultyOption[] = [
  {
    id: "easy",
    label: "Easy",
    description: "Lowercase words with minimal punctuation.",
    legacyLevel: 0,
    legacySettings: ["All lower", "No punctuation"],
    scoreBonus: 700,
  },
  {
    id: "medium",
    label: "Medium",
    description: "Natural words and short phrases.",
    legacyLevel: 2,
    legacySettings: [],
    scoreBonus: 1500,
  },
  {
    id: "hard",
    label: "Hard",
    description: "Mixed capitalization and numbers.",
    legacyLevel: 3,
    legacySettings: ["PascalCase", "MiXeDcAsE", "Digits 0-9"],
    scoreBonus: 2500,
  },
];

type BuildTextOptions = {
  mode: TestMode;
  difficulty: DifficultyId;
  duration: number;
  seed?: number;
  punctuation?: boolean;
  numbers?: boolean;
};

export function getDifficulty(id: DifficultyId): DifficultyOption {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) ?? DIFFICULTIES[1];
}

export function buildTypingText(options: BuildTextOptions): string {
  return buildTypingContent(options).text;
}

export function applyDifficulty(text: string, difficulty: DifficultyOption): string {
  let nextText = text.replace(/\s+/g, " ").trim();

  if (difficulty.legacySettings.includes("No punctuation")) {
    nextText = nextText.replace(/[^\w\s]/g, "");
  }

  if (difficulty.legacySettings.includes("All lower")) {
    nextText = nextText.toLowerCase();
  }

  if (difficulty.legacySettings.includes("Digits 0-9")) {
    const words = nextText.split(" ");
    nextText = words.map((word, index) => (index % 9 === 4 ? `${word}${index % 10}` : word)).join(" ");
  }

  if (difficulty.legacySettings.includes("PascalCase")) {
    nextText = nextText
      .split(" ")
      .map((word, index) => (index % 7 === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(" ");
  }

  if (difficulty.legacySettings.includes("MiXeDcAsE")) {
    nextText = nextText
      .split("")
      .map((char, index) => (/[a-z]/i.test(char) && index % 11 === 0 ? char.toUpperCase() : char))
      .join("");
  }

  return nextText;
}
