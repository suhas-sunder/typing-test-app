"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { recordGameCompletion } from "@/lib/progress/repository";
import { applyTypingInput, createTypingAttempt, summarizeTypingAttempt } from "@/lib/typing/attempt";
import {
  CALCULATOR_ENTER_KEY,
  calculatorKeyFromKeydown,
  expressionToTarget,
  generateExpression,
  isCalculatorCharacter,
  normalizeCalculatorKey,
} from "@/lib/typing/calculator";
import { actionFromVirtualKey } from "@/lib/typing/input";

const HEART_SYMBOL = String.fromCharCode(9829);
const ENTER_SYMBOL = String.fromCharCode(8629);
const STARTING_LIVES = 4;
const ROUND_GOAL = 5;
const CLEAN_ROUND_SCORE = 20;
const CORRECTED_ROUND_SCORE = 10;
const INITIAL_EXPRESSION = generateExpression(24, "medium");

const keys = [
  ["C", "/", "*", "-"],
  ["7", "8", "9", "+"],
  ["4", "5", "6", "Backspace"],
  ["1", "2", "3", CALCULATOR_ENTER_KEY],
  ["0", "0", ".", CALCULATOR_ENTER_KEY],
];

export function CalculatorSprint() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [difficulty, setDifficulty] = useState<"medium" | "hard">("medium");
  const [expression, setExpression] = useState(INITIAL_EXPRESSION);
  const target = useMemo(() => expressionToTarget(expression), [expression]);
  const [attempt, setAttempt] = useState(() => createTypingAttempt(expressionToTarget(INITIAL_EXPRESSION)));
  const attemptRef = useRef(attempt);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const livesRef = useRef(STARTING_LIVES);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const roundsCompletedRef = useRef(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const completedRef = useRef(false);
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(false);
  const [announcement, setAnnouncement] = useState("Calculator Sprint ready.");

  const resetRound = useCallback((nextDifficulty: "medium" | "hard", seedOffset = 0) => {
    const nextExpression = generateExpression(Date.now() + scoreRef.current + seedOffset, nextDifficulty);
    const nextAttempt = createTypingAttempt(expressionToTarget(nextExpression));
    setExpression(nextExpression);
    attemptRef.current = nextAttempt;
    setAttempt(nextAttempt);
    setStarted(false);
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  const restart = useCallback(
    (nextDifficulty: "medium" | "hard" = difficulty) => {
      scoreRef.current = 0;
      setScore(0);
      livesRef.current = STARTING_LIVES;
      setLives(STARTING_LIVES);
      roundsCompletedRef.current = 0;
      setRoundsCompleted(0);
      completedRef.current = false;
      setCompleted(false);
      gameOverRef.current = false;
      setGameOver(false);
      setAnnouncement("Calculator Sprint ready.");
      resetRound(nextDifficulty);
    },
    [difficulty, resetRound],
  );

  const processKey = useCallback(
    (rawKey: string) => {
      const key = normalizeCalculatorKey(rawKey);

      if (key === "C") {
        restart();
        return;
      }

      if (completedRef.current || gameOverRef.current) return;
      if (key !== "Backspace" && !isCalculatorCharacter(key)) return;

      const action = actionFromVirtualKey(key);
      if (!action) return;
      const transition = applyTypingInput(attemptRef.current, action);
      if (!transition.accepted) return;

      attemptRef.current = transition.state;
      setAttempt(transition.state);

      if (!transition.characterInput) {
        setAnnouncement("Last calculator entry removed.");
        return;
      }

      if (!started) setStarted(true);

      if (!transition.correct) {
        const nextLives = Math.max(0, livesRef.current - 1);
        livesRef.current = nextLives;
        setLives(nextLives);
        setAnnouncement("That key did not match the expression.");

        if (nextLives === 0) {
          gameOverRef.current = true;
          setGameOver(true);
          setAnnouncement("Game over. Restart when you are ready.");
          return;
        }
      }

      if (!transition.becameComplete) return;

      const summary = summarizeTypingAttempt(transition.state);
      if (summary.uncorrectedErrors > 0) {
        setAnnouncement("Round incomplete. A new expression is ready.");
        resetRound(difficulty, summary.incorrectKeypresses);
        return;
      }

      const scoreBump = summary.incorrectKeypresses > 0 ? CORRECTED_ROUND_SCORE : CLEAN_ROUND_SCORE;
      const nextScore = scoreRef.current + scoreBump;
      scoreRef.current = nextScore;
      setScore(nextScore);

      const nextRounds = roundsCompletedRef.current + 1;
      roundsCompletedRef.current = nextRounds;
      setRoundsCompleted(nextRounds);

      if (nextRounds >= ROUND_GOAL) {
        completedRef.current = true;
        setCompleted(true);
        const saved = recordGameCompletion({
          completedAt: new Date().toISOString(),
          gameId: "calculator-sprint",
          score: nextScore,
        });
        setAnnouncement(
          saved.status === "available"
            ? `Sprint complete with ${nextScore} points. Progress saved in this browser.`
            : `Sprint complete with ${nextScore} points. This browser could not save the result.`,
        );
        return;
      }

      setAnnouncement(summary.incorrectKeypresses > 0 ? "Corrected round complete." : "Clean round complete.");
      resetRound(difficulty, nextScore + nextRounds);
    },
    [difficulty, resetRound, restart, started],
  );

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    const key = calculatorKeyFromKeydown({
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      isComposing: event.nativeEvent.isComposing,
      key: event.key,
      metaKey: event.metaKey,
      repeat: event.repeat,
    });
    if (!key) return;

    event.preventDefault();
    processKey(key);
  }

  function changeDifficulty() {
    const nextDifficulty = difficulty === "medium" ? "hard" : "medium";
    setDifficulty(nextDifficulty);
    restart(nextDifficulty);
  }

  const terminal = completed || gameOver;

  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Typing game</p>
              <h1 className="heading-lg mt-2">Calculator Sprint</h1>
              <p className="body-lg mt-3 max-w-2xl">Type the expression exactly. Keep the streak alive.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-pill bg-camp-paper px-4 py-2 text-sm font-black text-camp-muted">Score: {score}</span>
              <span className="rounded-pill bg-camp-paper px-4 py-2 text-sm font-black text-camp-muted">Rounds: {roundsCompleted}/{ROUND_GOAL}</span>
              <span
                aria-label={`${lives} ${lives === 1 ? "life" : "lives"} remaining`}
                className="rounded-pill bg-camp-paper px-4 py-2 text-sm font-black text-camp-coral"
              >
                {lives > 0 ? HEART_SYMBOL.repeat(lives) : "No lives"}
              </span>
              <button type="button" className="pill" onClick={changeDifficulty}>
                {difficulty}
              </button>
            </div>
          </div>

          <div
            className="mx-auto max-w-[34rem] rounded-[32px] bg-camp-tan/75 p-3 shadow-soft sm:p-6"
            onKeyDown={handleKeyDown}
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <textarea
              ref={inputRef}
              aria-label="Calculator typing input"
              className="sr-only"
              inputMode="decimal"
              value=""
              onChange={() => undefined}
              onCompositionStart={() => setAnnouncement("Composition input is not counted in Calculator Sprint.")}
              onPaste={(event) => event.preventDefault()}
            />
            <p className="sr-only" role="status" aria-live="polite">
              {announcement}
            </p>

            <div className="rounded-[24px] bg-camp-paper p-4 sm:p-5">
              {!started && !terminal ? (
                <div className="mb-3 inline-flex items-center gap-2 rounded-pill bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral">
                  <span className="h-2 w-2 rounded-full bg-camp-orange" />
                  Start typing
                </div>
              ) : null}

              {completed ? (
                <div className="py-2 text-center">
                  <p className="eyebrow">Sprint complete</p>
                  <p className="mt-2 text-2xl font-black text-camp-ink">Five expressions finished. Score {score}.</p>
                </div>
              ) : gameOver ? (
                <div className="py-2 text-center">
                  <p className="eyebrow">Game over</p>
                  <p className="mt-2 text-2xl font-black text-camp-ink">Restart and aim for clean entries.</p>
                </div>
              ) : (
                <div
                  className="overflow-x-auto whitespace-nowrap text-3xl font-black tracking-[0.08em] text-camp-ink sm:text-4xl sm:tracking-[0.12em]"
                  data-testid="calculator-target"
                  data-target={target}
                >
                  {target.split("").map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className={[
                        "relative rounded-lg px-1",
                        attempt.statuses[index] === "correct" ? "text-camp-sage" : "",
                        attempt.statuses[index] === "error" ? "bg-camp-peach text-camp-coral" : "",
                        attempt.cursor === index ? "after:absolute after:-bottom-2 after:left-1 after:h-[3px] after:w-6 after:rounded-pill after:bg-camp-orange" : "",
                      ].join(" ")}
                    >
                      {formatCalculatorKey(char)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
              {keys.flatMap((row, rowIndex) =>
                row.map((key, keyIndex) => {
                  const wideZero = rowIndex === 4 && keyIndex === 0;
                  const skipSecondZero = rowIndex === 4 && keyIndex === 1;
                  if (skipSecondZero) return null;
                  const disabled = terminal && key !== "C";
                  return (
                    <button
                      key={`${key}-${rowIndex}-${keyIndex}`}
                      type="button"
                      aria-label={calculatorKeyLabel(key)}
                      className={[
                        "flex h-14 items-center justify-center rounded-2xl bg-camp-paper text-lg font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.36)] transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none active:translate-y-[2px] active:shadow-[0_1px_0_rgba(166,143,112,0.42)] disabled:cursor-default disabled:opacity-45 disabled:hover:translate-y-0 sm:h-16 sm:text-xl",
                        key === "Backspace" || `+-*/${CALCULATOR_ENTER_KEY}C`.includes(key) ? "bg-camp-peach text-camp-coral" : "",
                        wideZero ? "col-span-2 bg-[rgba(132,162,146,0.14)] text-camp-sage" : "",
                      ].join(" ")}
                      disabled={disabled}
                      onClick={() => processKey(key)}
                    >
                      {formatCalculatorKey(key)}
                    </button>
                  );
                }),
              )}
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <button type="button" className="button-secondary" onClick={() => restart()}>
              <RotateCcw aria-hidden size={17} />
              Restart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatCalculatorKey(key: string) {
  if (key === "Backspace") return "⌫";
  return key === CALCULATOR_ENTER_KEY ? ENTER_SYMBOL : key;
}

function calculatorKeyLabel(key: string) {
  if (key === "Backspace") return "Delete";
  if (key === CALCULATOR_ENTER_KEY) return "Submit";
  if (key === "C") return "Clear and restart";
  return key;
}
