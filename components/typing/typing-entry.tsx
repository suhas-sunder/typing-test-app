"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DIFFICULTIES } from "@/lib/typing/content";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

const durations = [15, 30, 60, 120];

export function TypingEntry() {
  const router = useRouter();
  const [duration, setDuration] = useState(60);
  const [mode, setMode] = useState<TestMode>("words");
  const [difficulty, setDifficulty] = useState<DifficultyId>("medium");

  function startTest() {
    const params = new URLSearchParams({
      duration: String(duration),
      mode,
      difficulty,
    });
    router.push(`/typing-test?${params.toString()}`);
  }

  return (
    <div className="card p-5 sm:p-7">
      <p className="eyebrow">Start here</p>
      <h2 className="heading-md mt-2">Choose a quick test</h2>
      <div className="mt-6 grid gap-5">
        <OptionGroup label="Time">
          {durations.map((item) => (
            <button key={item} type="button" className={`pill ${duration === item ? "pill-active" : ""}`} onClick={() => setDuration(item)}>
              {item}s
            </button>
          ))}
        </OptionGroup>
        <OptionGroup label="Mode">
          {(["words", "quote"] as TestMode[]).map((item) => (
            <button key={item} type="button" className={`pill ${mode === item ? "pill-active" : ""}`} onClick={() => setMode(item)}>
              {item}
            </button>
          ))}
        </OptionGroup>
        <OptionGroup label="Difficulty">
          {DIFFICULTIES.map((item) => (
            <button key={item.id} type="button" className={`pill ${difficulty === item.id ? "pill-active" : ""}`} onClick={() => setDifficulty(item.id)}>
              {item.label}
            </button>
          ))}
        </OptionGroup>
      </div>
      <button type="button" className="button-primary mt-7 w-full" onClick={startTest}>
        Start typing
      </button>
    </div>
  );
}

function OptionGroup({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-camp-muted">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
