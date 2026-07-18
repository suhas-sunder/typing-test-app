import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { AdPlacement } from "@/components/ads/ad-placement";
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
    <PageFrame routeFamily="typing_test">
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
      <AdPlacement placement="below_header_or_tool" />
      <TypingTestGuide />
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
  title: { absolute: "Free Typing Speed Test | FreeTypingCamp" },
  description: "Take a free typing speed test with timed word or quote modes, accuracy-first results, and private progress saved only in your browser.",
  alternates: { canonical: "/typing-test" },
  openGraph: {
    title: "Free Typing Speed Test | FreeTypingCamp",
    description: "Timed word and quote typing tests with accuracy-first results saved privately in your browser.",
    type: "website",
    url: "/typing-test",
  },
};

function TypingTestGuide() {
  return (
    <>
      <section className="section-pad bg-camp-tan/45" aria-labelledby="typing-test-method">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">How the test works</p>
          <h2 id="typing-test-method" className="heading-md mt-2">A consistent typing test, with accuracy before speed</h2>
          <div className="mt-6 grid gap-6 leading-7 text-camp-muted sm:grid-cols-2">
            <p>The timer starts with your first valid character, not when the page receives focus. WPM uses correctly typed characters, with five characters counted as one standard word. Accuracy uses correct tracked character keypresses divided by all tracked character keypresses.</p>
            <p>Backspace can resolve a visible mistake, but the original wrong keypress remains in the historical error count. Results therefore separate corrected errors from incorrect characters that remain when the test ends.</p>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="typing-test-options">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">Choose useful conditions</p>
          <h2 id="typing-test-options" className="heading-md mt-2">Words, quotes, and five practical durations</h2>
          <div className="mt-6 grid gap-7 sm:grid-cols-2">
            <div><h3 className="text-lg font-black text-camp-ink">Words mode</h3><p className="mt-2 leading-7 text-camp-muted">Easy, Medium, and Hard draw from reviewed pools with increasing vocabulary variety. Add punctuation for natural sentence-like material, add occasional numeric values, or keep both off for lowercase word sequences.</p></div>
            <div><h3 className="text-lg font-black text-camp-ink">Quotes mode</h3><p className="mt-2 leading-7 text-camp-muted">Original Free Typing Camp passages preserve their authored capitals, punctuation, and wording. Attribution appears after completion and is never part of the expected typing text.</p></div>
            <div><h3 className="text-lg font-black text-camp-ink">15 to 60 seconds</h3><p className="mt-2 leading-7 text-camp-muted">Short tests are useful for a quick technique check. A 60-second result gives more time for your pace to settle while remaining easy to repeat.</p></div>
            <div><h3 className="text-lg font-black text-camp-ink">2 and 5 minutes</h3><p className="mt-2 leading-7 text-camp-muted">Longer tests add concentration and consistency. Use a comfortable pace, and stop if your posture or hands begin to feel strained.</p></div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-camp-surface" aria-labelledby="typing-test-results-guide">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">Understand your result</p>
          <h2 id="typing-test-results-guide" className="heading-md mt-2">Compare like with like</h2>
          <div className="mt-5 space-y-4 leading-7 text-camp-muted">
            <p>Free Typing Camp compares a result only with the same duration, mode, difficulty, punctuation setting, and number setting. A faster result counts as a controlled-speed personal best only at 95% accuracy or better. Accuracy personal bests are tracked separately.</p>
            <p>Accuracy stars are performance feedback, not public ratings: one star begins at 85% accuracy, three stars at 95%, and five stars at 99%. WPM does not change the star count.</p>
            <p>Preferences and recent results stay in local browser storage. There is no account, upload, public profile, or global leaderboard. Clearing browser data can remove this history. Review it on your <Link className="font-black text-camp-coral underline underline-offset-4" href="/progress">local progress page</Link>.</p>
          </div>
        </div>
      </section>

      <AdPlacement placement="main_content_rectangle" />

      <section className="section-pad" aria-labelledby="typing-test-next">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">What to practise next</p>
          <h2 id="typing-test-next" className="heading-md mt-2">Use the result to choose a focused next step</h2>
          <p className="mt-4 max-w-3xl leading-7 text-camp-muted">If accuracy is below 95%, slow down and repeat the same setup before increasing difficulty. For structured instruction, continue with the <Link className="font-black text-camp-coral underline underline-offset-4" href="/lessons">free typing lessons</Link>. For targeted repetition, use <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-practice/common-words">common-word practice</Link>, <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-practice/quotes">quote practice</Link>, or <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-practice/numbers-symbols">numbers and symbols practice</Link>.</p>

          <div className="mt-10 space-y-7">
            <div><h3 className="text-lg font-black text-camp-ink">What is a good typing-test accuracy?</h3><p className="mt-2 leading-7 text-camp-muted">Aim for at least 95% before treating speed as improvement. Beginners benefit from an even higher accuracy target because clean repetitions build reliable finger patterns.</p></div>
            <div><h3 className="text-lg font-black text-camp-ink">Why can two tests produce different WPM?</h3><p className="mt-2 leading-7 text-camp-muted">Duration, vocabulary, punctuation, numeric content, corrections, and ordinary variation can all affect pace. Compare exact settings and look for a trend across several attempts.</p></div>
            <div><h3 className="text-lg font-black text-camp-ink">Does hiding live statistics change the result?</h3><p className="mt-2 leading-7 text-camp-muted">No. It hides remaining time, WPM, and accuracy during the attempt without changing timer or metric calculations. Final results still show the complete figures.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
