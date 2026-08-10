"use client";

import { VisualKeyboard } from "@/components/typing/visual-keyboard";
import type {
  KeyboardStatsPlacement,
  TypingDisplayStat,
  TypingKeyFeedback,
} from "@/components/typing/typing-test-types";

export function TypingKeyboardArea({
  allowedCharacters,
  content,
  displayStats,
  expectedKey,
  keyFeedback,
  keyboardStatsPlacement,
  onKeyPress,
  resetToken,
}: {
  allowedCharacters?: readonly string[];
  content: string;
  displayStats: TypingDisplayStat[];
  expectedKey: string | null;
  keyFeedback: TypingKeyFeedback | null;
  keyboardStatsPlacement: KeyboardStatsPlacement;
  onKeyPress: (key: string) => void;
  resetToken: number;
}) {
  const desktopStatAlign = keyboardStatsPlacement === "left" ? "left" : "right";

  return (
    <div className="mt-7">
      <div className="relative mx-auto max-w-6xl">
        {keyboardStatsPlacement !== "hidden" && displayStats.length > 0 ? (
          <div
            className={[
              "pointer-events-none absolute inset-y-0 z-10 hidden flex-col justify-center gap-3 xl:flex",
              keyboardStatsPlacement === "left"
                ? "left-5 items-start"
                : "right-5 items-end",
            ].join(" ")}
          >
            {displayStats.map((item) => (
              <KeyboardSideStat
                key={item.label}
                align={desktopStatAlign}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        ) : null}
        {displayStats.length > 0 ? (
          <div className="mb-3 grid grid-cols-3 items-end px-2 xl:hidden">
            {displayStats.map((item, index) => (
              <KeyboardSideStat
                key={item.label}
                align={index === 0 ? "left" : index === 1 ? "center" : "right"}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        ) : null}
        <VisualKeyboard
          allowedCharacters={allowedCharacters}
          className="mt-0"
          content={content}
          expectedKey={expectedKey}
          keyFeedback={keyFeedback}
          onKeyPress={onKeyPress}
          resetToken={resetToken}
        />
      </div>
    </div>
  );
}

function KeyboardSideStat({
  align = "left",
  label,
  value,
}: {
  align?: "left" | "center" | "right";
  label: string;
  value: string | number;
}) {
  const alignClass =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";

  return (
    <div
      className={`flex min-w-[3.5rem] flex-col py-0.5 text-camp-ink ${alignClass}`}
    >
      <div className="text-base font-black leading-none">{value}</div>
      <div className="mt-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-camp-muted">
        {label}
      </div>
    </div>
  );
}
