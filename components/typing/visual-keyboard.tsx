"use client";

import type { KeyModel } from "@/lib/typing/types";
import { FULL_KEYBOARD, MOBILE_KEYBOARD } from "@/lib/typing/keyboard";

type VisualKeyboardProps = {
  expectedKey: string | null;
  keyFeedback?: {
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null;
  onKeyPress: (key: string) => void;
};

const HOME_KEYS = new Set(["a", "s", "d", "f", "j", "k", "l"]);

export function VisualKeyboard({ expectedKey, keyFeedback = null, onKeyPress }: VisualKeyboardProps) {
  return (
    <div className="mt-7">
      <div className="hidden xl:block">
        <KeyboardRows rows={FULL_KEYBOARD} expectedKey={expectedKey} keyFeedback={keyFeedback} onKeyPress={onKeyPress} variant="desktop" />
      </div>
      <div className="block xl:hidden">
        <KeyboardRows rows={MOBILE_KEYBOARD} expectedKey={expectedKey} keyFeedback={keyFeedback} onKeyPress={onKeyPress} variant="mobile" />
      </div>
    </div>
  );
}

function KeyboardRows({
  rows,
  expectedKey,
  keyFeedback,
  onKeyPress,
  variant,
}: {
  rows: KeyModel[][];
  expectedKey: string | null;
  keyFeedback: VisualKeyboardProps["keyFeedback"];
  onKeyPress: (key: string) => void;
  variant: "desktop" | "mobile";
}) {
  return (
    <div
      className={
        variant === "desktop"
          ? "mx-auto max-w-6xl rounded-[28px] bg-camp-tan/75 p-4 shadow-soft"
          : "mx-auto w-full max-w-md rounded-[24px] bg-camp-tan/75 p-2.5 shadow-soft"
      }
    >
      <div className={variant === "desktop" ? "grid gap-3" : "grid gap-2"}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={variant === "desktop" ? "flex justify-center gap-2 sm:gap-3" : "flex justify-center gap-1.5"}>
            {row.map((key, keyIndex) => {
              const isExpected = isExpectedKey(key.value, expectedKey);
              const isPressed = keyFeedback ? isExpectedKey(key.value, keyFeedback.key) : false;
              const isHome = HOME_KEYS.has(key.value.toLowerCase());

              return (
                <button
                  key={`${key.label}-${keyIndex}`}
                  type="button"
                  data-highlight={isExpected ? "next" : isPressed ? keyFeedback?.state : isHome ? "home" : undefined}
                  className={[
                    variant === "desktop"
                      ? "flex h-12 items-center justify-center rounded-xl bg-camp-paper text-sm font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.36)] transition"
                      : "flex h-11 min-w-0 flex-1 items-center justify-center rounded-xl bg-camp-paper px-1 text-sm font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.32)] transition",
                    "hover:-translate-y-0.5 hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20",
                    variant === "desktop" ? widthClass(key.width) : mobileWidthClass(key.width),
                    isHome ? "bg-[rgba(132,162,146,0.14)] text-camp-sage shadow-[0_3px_0_rgba(132,162,146,0.26)]" : "",
                    isExpected ? "scale-[1.03] bg-camp-peach text-camp-coral shadow-[0_3px_0_rgba(219,83,56,0.35),0_0_0_5px_rgba(241,111,70,0.14)]" : "",
                    isPressed && keyFeedback?.state === "correct" ? "scale-[0.97] !bg-camp-sage !text-white shadow-[0_1px_0_rgba(72,104,88,0.45),0_0_0_5px_rgba(132,162,146,0.18)]" : "",
                    isPressed && keyFeedback?.state === "error" ? "scale-[0.97] !bg-camp-ink !text-white shadow-[0_1px_0_rgba(15,29,50,0.45),0_0_0_5px_rgba(15,29,50,0.14)]" : "",
                    isPressed && keyFeedback?.state === "neutral" ? "scale-[0.97] bg-camp-peach text-camp-coral shadow-[0_1px_0_rgba(241,111,70,0.35)]" : "",
                  ].join(" ")}
                  onClick={() => onKeyPress(key.value)}
                >
                  {key.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function mobileWidthClass(width: KeyModel["width"]) {
  if (width === "space") return "grow-[4]";
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

function isExpectedKey(value: string, expectedKey: string | null) {
  if (expectedKey === " ") return value === " ";
  if (expectedKey === "Backspace") return value === "Backspace";
  return expectedKey ? value.toLowerCase() === expectedKey.toLowerCase() : false;
}
