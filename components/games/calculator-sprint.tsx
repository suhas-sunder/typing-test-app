"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { expressionToTarget, generateExpression, normalizeCalculatorKey } from "@/lib/typing/calculator";
import type { CharStatus } from "@/lib/typing/types";

const keys = [
  ["C", "/", "*", "-"],
  ["7", "8", "9", "+"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "↵"],
  ["0", "0", ".", "↵"],
];

export function CalculatorSprint() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [difficulty, setDifficulty] = useState<"medium" | "hard">("medium");
  const [expression, setExpression] = useState(() => generateExpression(24, difficulty));
  const target = useMemo(() => expressionToTarget(expression), [expression]);
  const [statuses, setStatuses] = useState<CharStatus[]>(() => Array(target.length).fill("idle") as CharStatus[]);
  const [cursor, setCursor] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [started, setStarted] = useState(false);

  const resetExpression = useCallback(
    (scoreBump = 0) => {
      const nextExpression = generateExpression(Date.now() + score + scoreBump, difficulty);
      const nextTarget = expressionToTarget(nextExpression);
      setExpression(nextExpression);
      setStatuses(Array(nextTarget.length).fill("idle") as CharStatus[]);
      setCursor(0);
      setStarted(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [difficulty, score],
  );

  const restart = useCallback(() => {
    setScore(0);
    setLives(4);
    resetExpression();
  }, [resetExpression]);

  const processKey = useCallback(
    (rawKey: string) => {
      const key = normalizeCalculatorKey(rawKey);

      if (key === "Backspace") {
        setCursor((current) => {
          const nextCursor = Math.max(0, current - 1);
          setStatuses((currentStatuses) => {
            const nextStatuses = [...currentStatuses];
            nextStatuses[nextCursor] = "idle";
            return nextStatuses;
          });
          return nextCursor;
        });
        return;
      }

      if (key === "C") {
        restart();
        return;
      }

      if (!"0123456789+-*/.↵".includes(key)) return;
      if (!started) setStarted(true);

      const expected = target[cursor];
      const isCorrect = key === expected;
      setStatuses((currentStatuses) => {
        const nextStatuses = [...currentStatuses];
        nextStatuses[cursor] = isCorrect ? "correct" : "error";
        return nextStatuses;
      });

      if (!isCorrect) {
        setLives((current) => Math.max(0, current - 1));
      }

      const nextCursor = cursor + 1;
      if (nextCursor >= target.length) {
        if (isCorrect) {
          setScore((current) => current + 20);
        }
        resetExpression(20);
      } else {
        setCursor(nextCursor);
      }
    },
    [cursor, resetExpression, restart, started, target],
  );

  useEffect(() => {
    setStatuses(Array(target.length).fill("idle") as CharStatus[]);
    setCursor(0);
  }, [target.length]);

  function handleKeyDown(event: React.KeyboardEvent) {
    const valid = event.key === "Backspace" || event.key === "Enter" || "0123456789+-*/.cC".includes(event.key);
    if (!valid) return;

    event.preventDefault();
    processKey(event.key.toUpperCase() === "C" ? "C" : event.key);
  }

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
              <span className="rounded-pill bg-camp-paper px-4 py-2 text-sm font-black text-camp-coral">{"♥".repeat(lives)}</span>
              <button type="button" className="pill" onClick={() => setDifficulty((value) => (value === "medium" ? "hard" : "medium"))}>
                {difficulty}
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-[34rem] rounded-[32px] bg-camp-tan/75 p-4 shadow-soft sm:p-6" onKeyDown={handleKeyDown} onClick={() => inputRef.current?.focus()} tabIndex={0}>
            <textarea ref={inputRef} className="sr-only" value="" readOnly onKeyDown={handleKeyDown} />
            <div className="rounded-[24px] bg-camp-paper p-5 shadow-[0_2px_0_rgba(166,143,112,0.35)]">
              {!started ? (
                <div className="mb-3 inline-flex items-center gap-2 rounded-pill bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral shadow-[0_12px_30px_rgba(241,111,70,0.12)]">
                  <span className="h-2 w-2 rounded-full bg-camp-orange" />
                  Start typing
                </div>
              ) : null}
              <div className="text-4xl font-black tracking-[0.12em] text-camp-ink">
                {target.split("").map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className={[
                      "relative rounded-lg px-1",
                      statuses[index] === "correct" ? "text-camp-sage" : "",
                      statuses[index] === "error" ? "bg-camp-peach text-camp-coral" : "",
                      cursor === index ? "after:absolute after:-bottom-2 after:left-1 after:h-[3px] after:w-6 after:rounded-pill after:bg-camp-orange" : "",
                    ].join(" ")}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-3">
              {keys.flatMap((row, rowIndex) =>
                row.map((key, keyIndex) => {
                  const wideZero = rowIndex === 4 && keyIndex === 0;
                  const skipSecondZero = rowIndex === 4 && keyIndex === 1;
                  if (skipSecondZero) return null;
                  return (
                    <button
                      key={`${key}-${rowIndex}-${keyIndex}`}
                      type="button"
                      className={[
                        "flex h-16 items-center justify-center rounded-2xl bg-camp-paper text-xl font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.36)] transition hover:-translate-y-0.5 hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20",
                        "+-*/↵C".includes(key) ? "bg-camp-peach text-camp-coral" : "",
                        wideZero ? "col-span-2 bg-[rgba(132,162,146,0.14)] text-camp-sage" : "",
                      ].join(" ")}
                      onClick={() => processKey(key)}
                    >
                      {key}
                    </button>
                  );
                }),
              )}
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <button type="button" className="button-secondary" onClick={restart}>
              <RotateCcw aria-hidden size={17} />
              Restart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
