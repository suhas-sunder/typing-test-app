"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { TypingTest } from "@/components/typing/typing-test";
import { buildPracticeText, type PracticeDefinition } from "@/lib/practice/registry";
import { createEmptyProgress, readLocalProgress, subscribeToProgress } from "@/lib/progress/repository";
import type { PracticeLength } from "@/lib/progress/types";

const LENGTHS: Array<{ id: PracticeLength; label: string }> = [{ id: "short", label: "Short" }, { id: "medium", label: "Medium" }, { id: "long", label: "Long" }];

export function PracticeExperience({ afterTypingSurface, practice }: { afterTypingSurface?: ReactNode; practice: PracticeDefinition }) {
  const [length, setLength] = useState<PracticeLength>("short");
  const [variant, setVariant] = useState(practice.variants[0].id);
  const [seed, setSeed] = useState(0);
  const [progress, setProgress] = useState(createEmptyProgress);
  const text = useMemo(() => buildPracticeText(practice.id, length, variant, seed), [length, practice.id, seed, variant]);

  useEffect(() => {
    const sync = () => setProgress(readLocalProgress().data);
    sync();
    return subscribeToProgress(sync);
  }, []);

  const best = progress.practice.history
    .filter((record) => record.practiceId === practice.id && record.length === length && record.variant === variant)
    .sort((a, b) => b.accuracy - a.accuracy || b.wpm - a.wpm || b.completedAt.localeCompare(a.completedAt))[0];

  return (
    <>
      <div className="page-shell mt-7">
        <div className="flex flex-wrap items-end gap-x-10 gap-y-5 bg-camp-tan/45 px-5 py-5 sm:px-7">
          <Control label="Length">
            {LENGTHS.filter((item) => practice.id !== "quotes" || item.id !== "long").map((item) => <Option key={item.id} active={length === item.id} onClick={() => { setLength(item.id); setSeed(0); }}>{item.label}</Option>)}
          </Control>
          <Control label="Exercise">
            {practice.variants.map((item) => <Option key={item.id} active={variant === item.id} onClick={() => { setVariant(item.id); setSeed(0); }}>{item.label}</Option>)}
          </Control>
          <button type="button" className="min-h-11 rounded-pill bg-camp-paper px-4 text-sm font-black text-camp-ink transition hover:bg-camp-orange hover:text-white focus-visible:bg-camp-orange focus-visible:text-white" onClick={() => setSeed((current) => current + 1)}>{practice.id === "quotes" ? "Another quote" : "New passage"}</button>
          <div className="sm:ml-auto"><div className="text-xs font-black uppercase tracking-[0.12em] text-camp-muted">Comparable local best</div><div className="mt-1 font-black text-camp-ink">{best ? `${best.wpm} WPM · ${Math.round(best.accuracy)}% accuracy` : "Complete this setup once"}</div></div>
        </div>
      </div>
      <TypingTest
        allowedCharacters={[...new Set(text)]}
        key={`${practice.id}-${length}-${variant}-${seed}`}
        title="Focused practice attempt"
        subtitle={`${practice.variants.find((item) => item.id === variant)?.description}. Results stay only in this browser and do not award lesson stars.`}
        initialText={text}
        testName={`practice-${practice.id}`}
        defaultDuration={120}
        defaultDifficulty="easy"
        lockText
        practice={{ id: practice.id, length, variant }}
        titleHeading="h2"
        afterTypingSurface={afterTypingSurface}
      />
    </>
  );
}

function Control({ children, label }: { children: React.ReactNode; label: string }) {
  return <div><div className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-camp-muted">{label}</div><div className="flex flex-wrap gap-2">{children}</div></div>;
}

function Option({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button type="button" aria-pressed={active} className={`min-h-11 rounded-pill px-4 text-sm font-black transition hover:bg-camp-orange hover:text-white focus-visible:bg-camp-orange focus-visible:text-white ${active ? "bg-camp-orange text-white" : "bg-camp-paper text-camp-ink"}`} onClick={onClick}>{children}</button>;
}
