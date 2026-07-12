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

  return (
    <PageFrame>
      <TypingTest defaultDifficulty={difficulty} defaultDuration={duration} defaultMode={mode} />
    </PageFrame>
  );
}

function parseNumber(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && [15, 30, 60, 120].includes(parsed) ? parsed : fallback;
}

function parseMode(value: string | string[] | undefined): TestMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "quote" ? "quote" : "words";
}

function parseDifficulty(value: string | string[] | undefined): DifficultyId {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "easy" || raw === "hard" ? raw : "medium";
}
