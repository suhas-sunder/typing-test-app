"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { TypingTest } from "@/components/typing/typing-test";
import {
  buildPracticeText,
  type PracticeDefinition,
} from "@/lib/practice/registry";
import {
  createEmptyProgress,
  readLocalProgress,
  subscribeToProgress,
} from "@/lib/progress/repository";
import type { PracticeLength } from "@/lib/progress/types";

const LENGTHS: Array<{ id: PracticeLength; label: string }> = [
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Long" },
];

export function PracticeExperience({
  afterTypingSurface,
  practice,
}: {
  afterTypingSurface?: ReactNode;
  practice: PracticeDefinition;
}) {
  const [length, setLength] = useState<PracticeLength>("short");
  const [variant, setVariant] = useState(practice.variants[0].id);
  const [seed, setSeed] = useState(0);
  const [progress, setProgress] = useState(createEmptyProgress);
  const text = useMemo(
    () => buildPracticeText(practice.id, length, variant, seed),
    [length, practice.id, seed, variant],
  );

  useEffect(() => {
    const sync = () => setProgress(readLocalProgress().data);
    sync();
    return subscribeToProgress(sync);
  }, []);

  const best = progress.practice.history
    .filter(
      (record) =>
        record.practiceId === practice.id &&
        record.length === length &&
        record.variant === variant,
    )
    .sort(
      (a, b) =>
        b.accuracy - a.accuracy ||
        b.wpm - a.wpm ||
        b.completedAt.localeCompare(a.completedAt),
    )[0];

  return (
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
      showAttemptContext={false}
      setupControls={
        <PracticeSetupControls
          bestLabel={
            best
              ? `${best.wpm} WPM / ${Math.round(best.accuracy)}%`
              : "No local best yet"
          }
          length={length}
          onLengthChange={(value) => {
            setLength(value);
            setSeed(0);
          }}
          onNewPassage={() => setSeed((current) => current + 1)}
          onVariantChange={(value) => {
            setVariant(value);
            setSeed(0);
          }}
          practice={practice}
          variant={variant}
        />
      }
    />
  );
}

function PracticeSetupControls({
  bestLabel,
  length,
  onLengthChange,
  onNewPassage,
  onVariantChange,
  practice,
  variant,
}: {
  bestLabel: string;
  length: PracticeLength;
  onLengthChange: (value: PracticeLength) => void;
  onNewPassage: () => void;
  onVariantChange: (value: string) => void;
  practice: PracticeDefinition;
  variant: string;
}) {
  return (
    <div className="flex max-w-full items-center justify-end gap-x-3 gap-y-2">
      <Control label="Length">
        {LENGTHS.filter(
          (item) => practice.id !== "quotes" || item.id !== "long",
        ).map((item) => (
          <Option
            key={item.id}
            active={length === item.id}
            label={`${item.label} practice`}
            onClick={() => onLengthChange(item.id)}
          >
            {item.label}
          </Option>
        ))}
      </Control>
      <Control label="Exercise">
        {practice.variants.map((item) => (
          <Option
            key={item.id}
            active={variant === item.id}
            label={item.label}
            onClick={() => onVariantChange(item.id)}
          >
            {item.label}
          </Option>
        ))}
      </Control>
      <button
        type="button"
        className="inline-flex h-7 items-center justify-center rounded-pill px-2.5 text-xs font-black leading-none text-camp-muted transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast"
        onClick={onNewPassage}
      >
        {practice.id === "quotes" ? "Another quote" : "New passage"}
      </button>
      <div className="hidden text-right 2xl:block">
        <div className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-camp-muted">
          Best
        </div>
        <div className="text-xs font-black text-camp-ink">{bestLabel}</div>
      </div>
    </div>
  );
}

function Control({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-label={label}>
      <span className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-camp-muted">
        {label}
      </span>
      <div className="flex items-center gap-0.5">{children}</div>
    </div>
  );
}

function Option({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={[
        "inline-flex h-7 items-center justify-center rounded-pill px-2.5 text-xs font-black leading-none text-camp-muted transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast",
        active
          ? "bg-camp-orange !text-camp-accent-contrast hover:bg-camp-coral focus-visible:bg-camp-coral"
          : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
