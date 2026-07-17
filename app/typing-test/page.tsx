import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { TypingTest } from "@/components/typing/typing-test";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

export default async function TypingTestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const duration = parseNumber(params.duration, 60);
  const mode = parseMode(params.mode);
  const difficulty = parseDifficulty(params.difficulty);
  const punctuation = parseBoolean(params.punctuation, false);
  const numbers = parseBoolean(params.numbers, false);
  const showLiveStats = parseBoolean(params.stats, true);
  const hasExplicitSettings = ["duration", "mode", "difficulty", "punctuation", "numbers", "stats"].some((key) => params[key] !== undefined);

  return (
    <PageFrame>
      <TypingTest
        defaultDifficulty={difficulty}
        defaultDuration={duration}
        defaultMode={mode}
        defaultNumbers={numbers}
        defaultPunctuation={punctuation}
        defaultShowLiveStats={showLiveStats}
        loadSavedPreferences={!hasExplicitSettings}
        title="Free Typing Speed Test"
      />
    </PageFrame>
  );
}

function parseNumber(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && [15, 30, 60, 120, 300].includes(parsed) ? parsed : fallback;
}

function parseBoolean(value: string | string[] | undefined, fallback: boolean) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "1" || raw === "true") return true;
  if (raw === "0" || raw === "false") return false;
  return fallback;
}

function parseMode(value: string | string[] | undefined): TestMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "quote" ? "quote" : "words";
}

function parseDifficulty(value: string | string[] | undefined): DifficultyId {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "easy" || raw === "hard" ? raw : "medium";
}
export const metadata: Metadata = {
  title: "Free Typing Speed Test",
  description: "Take a free typing speed test with timed word or quote modes, accuracy-first results, and private progress saved only in your browser.",
  alternates: { canonical: "/typing-test" },
};
