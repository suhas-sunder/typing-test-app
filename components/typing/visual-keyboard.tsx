"use client";

import { useState } from "react";
import type { KeyModel } from "@/lib/typing/types";
import { FULL_KEYBOARD, keyLabel, keyOutput, MOBILE_KEYBOARD, requiresShift } from "@/lib/typing/keyboard";

type VisualKeyboardProps = {
  expectedKey: string | null;
  className?: string;
  keyFeedback?: {
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null;
  onKeyPress: (key: string) => void;
};

const HOME_KEYS = new Set(["a", "s", "d", "f", "j", "k", "l"]);

export function VisualKeyboard({ className = "mt-7", expectedKey, keyFeedback = null, onKeyPress }: VisualKeyboardProps) {
  const [shifted, setShifted] = useState(false);

  function handleKey(key: KeyModel) {
    if (key.action === "shift") {
      setShifted((current) => !current);
      return;
    }

    onKeyPress(keyOutput(key, shifted));
    if (shifted) setShifted(false);
  }

  return (
    <div className={className}>
      <div className="hidden xl:block">
        <KeyboardRows
          rows={FULL_KEYBOARD}
          expectedKey={expectedKey}
          keyFeedback={keyFeedback}
          onKeyPress={handleKey}
          shifted={shifted}
          variant="desktop"
        />
      </div>
      <div className="block xl:hidden">
        <KeyboardRows
          rows={MOBILE_KEYBOARD}
          expectedKey={expectedKey}
          keyFeedback={keyFeedback}
          onKeyPress={handleKey}
          shifted={shifted}
          variant="mobile"
        />
      </div>
    </div>
  );
}

function KeyboardRows({
  rows,
  expectedKey,
  keyFeedback,
  onKeyPress,
  shifted,
  variant,
}: {
  rows: KeyModel[][];
  expectedKey: string | null;
  keyFeedback: VisualKeyboardProps["keyFeedback"];
  onKeyPress: (key: KeyModel) => void;
  shifted: boolean;
  variant: "desktop" | "mobile";
}) {
  const shiftRequired = requiresShift(expectedKey, rows);

  return (
    <div className={variant === "desktop" ? "relative mx-auto max-w-6xl" : "mx-auto w-full max-w-md"}>
      <div className={variant === "desktop" ? "relative rounded-[28px] bg-camp-tan/75 p-4 shadow-soft" : "rounded-[24px] bg-camp-tan/75 p-2.5 shadow-soft"}>
        <div className={variant === "desktop" ? "grid gap-3" : "grid gap-1.5 sm:gap-2"}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className={variant === "desktop" ? "flex justify-center gap-2 sm:gap-3" : "flex justify-center gap-1 sm:gap-1.5"}>
              {row.map((key, keyIndex) => {
                const output = keyOutput(key, shifted);
                const isShift = key.action === "shift";
                const isExpected = isShift ? shiftRequired : isExpectedKey(key, expectedKey);
                const isPressed = keyFeedback ? isFeedbackKey(key, keyFeedback.key) : false;
                const isHome = HOME_KEYS.has(key.value.toLowerCase());
                const className = [
                  variant === "desktop"
                    ? "flex h-12 items-center justify-center rounded-xl bg-camp-paper text-sm font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.36)] transition"
                    : "flex h-10 min-w-0 flex-1 items-center justify-center rounded-xl bg-camp-paper px-0.5 text-xs font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.32)] transition sm:h-11 sm:px-1 sm:text-sm",
                  key.action ? "hover:-translate-y-0.5 hover:text-camp-coral focus-visible:bg-camp-orange focus-visible:text-white focus-visible:outline-none" : "cursor-default opacity-55",
                  variant === "desktop" ? widthClass(key.width) : mobileWidthClass(key.width),
                  isHome ? "bg-[rgba(132,162,146,0.14)] text-camp-sage shadow-[0_3px_0_rgba(132,162,146,0.26)]" : "",
                  isShift && shifted ? "bg-camp-orange text-white" : "",
                  isExpected ? "scale-[1.03] bg-camp-peach text-camp-coral shadow-[0_3px_0_rgba(219,83,56,0.35),0_0_0_5px_rgba(241,111,70,0.14)]" : "",
                  isPressed && keyFeedback?.state === "correct" ? "scale-[0.97] !bg-camp-sage !text-white shadow-[0_1px_0_rgba(72,104,88,0.45),0_0_0_5px_rgba(132,162,146,0.18)]" : "",
                  isPressed && keyFeedback?.state === "error" ? "scale-[0.97] !bg-camp-ink !text-white shadow-[0_1px_0_rgba(15,29,50,0.45),0_0_0_5px_rgba(15,29,50,0.14)]" : "",
                  isPressed && keyFeedback?.state === "neutral" ? "scale-[0.97] bg-camp-peach text-camp-coral shadow-[0_1px_0_rgba(241,111,70,0.35)]" : "",
                ].join(" ");

                if (!key.action) {
                  return (
                    <span key={`${key.label}-${keyIndex}`} aria-hidden className={className}>
                      {keyLabel(key, shifted)}
                    </span>
                  );
                }

                return (
                  <button
                    key={`${key.label}-${keyIndex}`}
                    type="button"
                    aria-label={isShift ? "Shift" : output === " " ? "Space" : keyLabel(key, shifted)}
                    aria-pressed={isShift ? shifted : undefined}
                    data-highlight={isExpected ? "next" : isPressed ? keyFeedback?.state : isHome ? "home" : undefined}
                    className={className}
                    onClick={() => onKeyPress(key)}
                  >
                    {keyLabel(key, shifted)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function mobileWidthClass(width: KeyModel["width"]) {
  if (width === "space") return "grow-[5]";
  if (width === "md") return "grow-[1.5]";
  return "";
}

function widthClass(width: KeyModel["width"]) {
  switch (width) {
    case "md":
      return "min-w-16 px-4";
    case "lg":
      return "min-w-24 px-5";
    case "xl":
      return "min-w-32 px-6";
    case "space":
      return "min-w-44 flex-1 max-w-[28rem] px-8";
    default:
      return "min-w-12 px-3";
  }
}

function isExpectedKey(key: KeyModel, expectedKey: string | null) {
  if (!expectedKey) return false;
  if (expectedKey === " ") return key.value === " ";
  return key.value.toLowerCase() === expectedKey.toLowerCase() || key.shiftValue === expectedKey;
}

function isFeedbackKey(key: KeyModel, feedbackKey: string) {
  if (feedbackKey === " ") return key.value === " ";
  return key.value.toLowerCase() === feedbackKey.toLowerCase() || key.shiftValue === feedbackKey;
}
