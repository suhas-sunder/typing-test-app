import type { DifficultyId, DifficultyOption, TestMode } from "@/lib/typing/types";

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

const COMMON_WORDS = [
  "camp",
  "trail",
  "forest",
  "quiet",
  "river",
  "morning",
  "steady",
  "practice",
  "focus",
  "better",
  "typing",
  "speed",
  "accuracy",
  "lesson",
  "keyboard",
  "simple",
  "clear",
  "warm",
  "light",
  "learn",
  "habit",
  "daily",
  "clean",
  "path",
  "ember",
  "pine",
  "lake",
  "stone",
  "branch",
  "meadow",
  "cloud",
  "spring",
  "bright",
  "patient",
  "careful",
  "rhythm",
  "result",
  "progress",
  "repeat",
  "finish",
  "screen",
  "letter",
  "word",
  "home",
  "row",
  "left",
  "right",
  "shift",
  "space",
];

const QUOTES = [
  "Small steps build steady hands.",
  "Focus on the next letter and let the rest follow.",
  "Good typing feels calm before it feels fast.",
  "Practice turns effort into rhythm.",
  "Accuracy is the trail that speed learns to follow.",
];

type BuildTextOptions = {
  mode: TestMode;
  difficulty: DifficultyId;
  duration: number;
  seed?: number;
};

export function getDifficulty(id: DifficultyId): DifficultyOption {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) ?? DIFFICULTIES[1];
}

export function buildTypingText(options: BuildTextOptions): string {
  const difficulty = getDifficulty(options.difficulty);
  const targetWords = Math.max(30, Math.min(160, Math.ceil(options.duration * 1.9)));

  if (options.mode === "quote") {
    return applyDifficulty(QUOTES.join(" "), difficulty);
  }

  const words: string[] = [];
  const seedOffset = options.seed ?? 0;

  for (let index = 0; index < targetWords; index += 1) {
    const word = COMMON_WORDS[(index * 7 + seedOffset) % COMMON_WORDS.length];
    words.push(word);
  }

  return applyDifficulty(words.join(" "), difficulty);
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
