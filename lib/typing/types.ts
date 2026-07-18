export type CharStatus = "idle" | "correct" | "error";

export type TestMode = "words" | "quote";

export type KeyboardPreference = "responsive" | "full" | "mobile" | "hide";

export type DifficultyId = "easy" | "medium" | "hard";

export type DifficultyOption = {
  id: DifficultyId;
  label: string;
  description: string;
  legacyLevel: number;
  legacySettings: string[];
  scoreBonus: number;
};

export type TypingStats = {
  correctedErrors: number;
  correctChars: number;
  correctKeystrokes: number;
  errorChars: number;
  incorrectKeypresses: number;
  totalChars: number;
  trackedKeystrokes: number;
  uncorrectedErrors: number;
  accuracy: number;
  rawWpm: number;
  wpm: number;
  cpm: number;
  score: number;
  elapsedSeconds: number;
};

export type KeyModel = {
  action?: "backspace" | "character" | "shift";
  label: string;
  shiftLabel?: string;
  shiftValue?: string;
  value: string;
  width?: "sm" | "md" | "lg" | "xl" | "space";
};

export type LessonLevel = {
  id: string;
  label: string;
  text: string;
  href: string;
};

export type LessonSection = {
  id: string;
  title: string;
  levels: LessonLevel[];
};

export type LessonCategory = {
  id: string;
  title: string;
  summary: string;
  sections: LessonSection[];
};
