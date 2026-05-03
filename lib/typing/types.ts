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
  correctChars: number;
  errorChars: number;
  totalChars: number;
  accuracy: number;
  rawWpm: number;
  wpm: number;
  cpm: number;
  score: number;
  elapsedSeconds: number;
};

export type TestResultPayload = {
  user_id: string;
  difficultyLevel: number;
  test_name: string;
  total_chars: number;
  correct_chars: number;
  misspelled_chars: number;
  cpm: number;
  wpm: number;
  test_score: number;
  test_accuracy: number;
  test_time_sec: number;
  screen_size_info: string;
  difficulty_name: string;
  difficulty_settings: string[];
  difficultyScore: number;
};

export type KeyModel = {
  label: string;
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
