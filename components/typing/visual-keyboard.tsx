"use client";

import { useEffect, useId, useState } from "react";
import type { KeyModel } from "@/lib/typing/types";
import {
  buildCompactSymbolRows,
  compactContentSupportsShift,
  compactLayerForCharacter,
  defaultCompactLayer,
  FULL_KEYBOARD,
  keyLabel,
  keyOutput,
  MOBILE_KEYBOARD,
  requiresShift,
} from "@/lib/typing/keyboard";

type VisualKeyboardProps = {
  expectedKey: string | null;
  className?: string;
  content?: string;
  allowedCharacters?: readonly string[];
  keyFeedback?: {
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null;
  onKeyPress: (key: string) => void;
  resetToken?: number;
  showEnter?: boolean;
};

type CompactLayer = "alphabet" | "symbols";

const HOME_KEYS = new Set(["a", "s", "d", "f", "j", "k", "l"]);

export function VisualKeyboard({
  allowedCharacters,
  className = "mt-7",
  content = "",
  expectedKey,
  keyFeedback = null,
  onKeyPress,
  resetToken = 0,
  showEnter = false,
}: VisualKeyboardProps) {
  return (
    <div className={`typing-keyboard-container ${className}`}>
      <KeyboardController
        key={resetToken}
        allowedCharacters={allowedCharacters}
        content={content || expectedKey || ""}
        expectedKey={expectedKey}
        keyFeedback={keyFeedback}
        onKeyPress={onKeyPress}
        showEnter={showEnter}
      />
    </div>
  );
}

function KeyboardController({
  allowedCharacters,
  content,
  expectedKey,
  keyFeedback,
  onKeyPress,
  showEnter,
}: Required<Pick<VisualKeyboardProps, "content" | "onKeyPress" | "showEnter">> &
  Pick<VisualKeyboardProps, "allowedCharacters" | "expectedKey" | "keyFeedback">) {
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    if (keyFeedback) setShifted(false);
  }, [keyFeedback]);

  function handleKey(key: KeyModel) {
    if (key.action === "shift") {
      setShifted((current) => !current);
      return;
    }

    onKeyPress(keyOutput(key, shifted));
    if (shifted) setShifted(false);
  }

  return (
    <>
      <div className="typing-keyboard-full" data-keyboard-layout="full">
        <DesktopKeyboardRows
          rows={FULL_KEYBOARD}
          expectedKey={expectedKey}
          keyFeedback={keyFeedback}
          onKeyPress={handleKey}
          shifted={shifted}
        />
      </div>
      <div className="typing-keyboard-compact" data-keyboard-layout="compact">
        <CompactKeyboard
          allowedCharacters={allowedCharacters}
          content={content}
          expectedKey={expectedKey}
          keyFeedback={keyFeedback}
          onKeyPress={onKeyPress}
          shifted={shifted}
          setShifted={setShifted}
          showEnter={showEnter}
        />
      </div>
    </>
  );
}

function DesktopKeyboardRows({
  rows,
  expectedKey,
  keyFeedback,
  onKeyPress,
  shifted,
}: {
  rows: KeyModel[][];
  expectedKey: string | null;
  keyFeedback: VisualKeyboardProps["keyFeedback"];
  onKeyPress: (key: KeyModel) => void;
  shifted: boolean;
}) {
  const shiftRequired = requiresShift(expectedKey, rows);

  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="relative rounded-[28px] bg-camp-tan/75 p-4 shadow-soft">
        <div className="grid gap-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 sm:gap-3">
              {row.map((key, keyIndex) => {
                const output = keyOutput(key, shifted);
                const isShift = key.action === "shift";
                const isExpected = isShift ? shiftRequired : isExpectedKey(key, expectedKey);
                const isPressed = keyFeedback ? isFeedbackKey(key, keyFeedback.key) : false;
                const isHome = HOME_KEYS.has(key.value.toLowerCase());
                const className = [
                  "flex h-12 items-center justify-center rounded-xl bg-camp-paper text-sm font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.36)] transition",
                  key.action ? "hover:-translate-y-0.5 hover:text-camp-coral focus-visible:bg-camp-orange focus-visible:text-white focus-visible:outline-none" : "cursor-default opacity-55",
                  widthClass(key.width),
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

function CompactKeyboard({
  allowedCharacters,
  content,
  expectedKey,
  keyFeedback,
  onKeyPress,
  setShifted,
  shifted,
  showEnter,
}: {
  allowedCharacters: VisualKeyboardProps["allowedCharacters"];
  content: string;
  expectedKey: string | null;
  keyFeedback: VisualKeyboardProps["keyFeedback"];
  onKeyPress: (key: string) => void;
  setShifted: (value: boolean | ((current: boolean) => boolean)) => void;
  shifted: boolean;
  showEnter: boolean;
}) {
  const [layer, setLayer] = useState<CompactLayer>(() => defaultCompactLayer(content));
  const hintId = useId();
  const supportsShift = compactContentSupportsShift(content);
  const expectedLayer = compactLayerForCharacter(expectedKey);
  const switchNeeded = expectedLayer !== null && expectedLayer !== layer;
  const rows = layer === "alphabet" ? MOBILE_KEYBOARD : buildCompactSymbolRows(content);

  function switchLayer(nextLayer: CompactLayer) {
    setLayer(nextLayer);
    setShifted(false);
  }

  function pressCharacter(key: KeyModel) {
    onKeyPress(keyOutput(key, layer === "alphabet" && shifted));
    if (shifted) setShifted(false);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        aria-label={`Compact virtual keyboard, ${layer} layer`}
        className="rounded-[24px] bg-camp-tan/75 p-2.5 shadow-soft"
        data-active-layer={layer}
        role="group"
      >
        <div className="grid gap-1.5 sm:gap-2">
          {rows.map((row, rowIndex) => (
            <div key={`${layer}-${rowIndex}`} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((key, keyIndex) => (
                <CompactCharacterKey
                  key={`${key.value}-${keyIndex}`}
                  allowedCharacters={allowedCharacters}
                  expectedKey={expectedKey}
                  keyModel={key}
                  keyFeedback={keyFeedback}
                  onPress={pressCharacter}
                  shifted={layer === "alphabet" && shifted}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-1 sm:gap-1.5">
            <button
              type="button"
              aria-describedby={switchNeeded ? hintId : undefined}
              aria-label={layer === "alphabet" ? "Numbers and symbols" : "Letters"}
              aria-pressed={layer === "symbols"}
              className={compactUtilityClass(switchNeeded)}
              data-highlight={switchNeeded ? "next-layer" : undefined}
              onClick={() => switchLayer(layer === "alphabet" ? "symbols" : "alphabet")}
            >
              {layer === "alphabet" ? ".?123" : "ABC"}
            </button>
            {layer === "alphabet" && supportsShift ? (
              <button
                type="button"
                aria-label="Shift"
                aria-pressed={shifted}
                className={`${compactUtilityClass(expectedKey ? /^[A-Z]$/.test(expectedKey) : false)} ${shifted ? "bg-camp-orange text-white" : ""}`}
                data-highlight={expectedKey && /^[A-Z]$/.test(expectedKey) ? "next" : undefined}
                onClick={() => setShifted((current) => !current)}
              >
                Shift
              </button>
            ) : null}
            <button type="button" aria-label="Space" className={`${compactUtilityClass(expectedKey === " ")} grow-[3.5]`} data-highlight={expectedKey === " " ? "next" : undefined} onClick={() => onKeyPress(" ")}>
              Space
            </button>
            <button type="button" aria-label="Delete" className={compactUtilityClass(false)} onClick={() => onKeyPress("Backspace")}>
              Delete
            </button>
            {showEnter ? (
              <button type="button" aria-label="Enter" className={compactUtilityClass(false)} onClick={() => onKeyPress("Enter")}>
                Enter
              </button>
            ) : null}
          </div>
        </div>
        {switchNeeded ? (
          <span id={hintId} className="sr-only">
            Expected character {describeCharacter(expectedKey)} is on the {expectedLayer === "symbols" ? "numbers and symbols" : "alphabet"} layer.
          </span>
        ) : null}
      </div>
    </div>
  );
}

function CompactCharacterKey({
  allowedCharacters,
  expectedKey,
  keyFeedback,
  keyModel,
  onPress,
  shifted,
}: {
  allowedCharacters: VisualKeyboardProps["allowedCharacters"];
  expectedKey: string | null;
  keyFeedback: VisualKeyboardProps["keyFeedback"];
  keyModel: KeyModel;
  onPress: (key: KeyModel) => void;
  shifted: boolean;
}) {
  const output = keyOutput(keyModel, shifted);
  const allowed = isAllowedKey(keyModel, allowedCharacters);
  const isExpected = allowed && isExpectedKey(keyModel, expectedKey);
  const isPressed = allowed && keyFeedback ? isFeedbackKey(keyModel, keyFeedback.key) : false;
  const isHome = HOME_KEYS.has(keyModel.value.toLowerCase());
  const className = [
    "flex h-10 min-w-0 flex-1 items-center justify-center rounded-xl bg-camp-paper px-0.5 text-xs font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.32)] transition sm:h-11 sm:px-1 sm:text-sm",
    allowed
      ? "hover:-translate-y-0.5 hover:text-camp-coral focus-visible:bg-camp-orange focus-visible:text-white focus-visible:outline-none"
      : "cursor-default opacity-35",
    isHome ? "bg-[rgba(132,162,146,0.14)] text-camp-sage shadow-[0_3px_0_rgba(132,162,146,0.26)]" : "",
    isExpected ? "scale-[1.03] bg-camp-peach text-camp-coral shadow-[0_3px_0_rgba(219,83,56,0.35),0_0_0_5px_rgba(241,111,70,0.14)]" : "",
    isPressed && keyFeedback?.state === "correct" ? "scale-[0.97] !bg-camp-sage !text-white shadow-[0_1px_0_rgba(72,104,88,0.45),0_0_0_5px_rgba(132,162,146,0.18)]" : "",
    isPressed && keyFeedback?.state === "error" ? "scale-[0.97] !bg-camp-ink !text-white shadow-[0_1px_0_rgba(15,29,50,0.45),0_0_0_5px_rgba(15,29,50,0.14)]" : "",
    isPressed && keyFeedback?.state === "neutral" ? "scale-[0.97] bg-camp-peach text-camp-coral shadow-[0_1px_0_rgba(241,111,70,0.35)]" : "",
  ].join(" ");

  return (
    <button
      type="button"
      aria-label={keyLabel(keyModel, shifted)}
      className={className}
      data-highlight={isExpected ? "next" : isPressed ? keyFeedback?.state : isHome ? "home" : undefined}
      disabled={!allowed}
      onClick={() => onPress(keyModel)}
    >
      {keyLabel(keyModel, shifted)}
    </button>
  );
}

function compactUtilityClass(highlighted: boolean) {
  return [
    "flex h-10 min-w-[3.6rem] flex-1 items-center justify-center rounded-xl bg-camp-paper px-2 text-[0.68rem] font-black text-camp-ink shadow-[0_3px_0_rgba(166,143,112,0.32)] transition hover:-translate-y-0.5 hover:text-camp-coral focus-visible:bg-camp-orange focus-visible:text-white focus-visible:outline-none sm:h-11 sm:text-xs",
    highlighted ? "bg-camp-peach text-camp-coral" : "",
  ].join(" ");
}

function isAllowedKey(key: KeyModel, allowedCharacters: readonly string[] | undefined) {
  if (!allowedCharacters) return true;
  return allowedCharacters.some(
    (character) =>
      character === key.value ||
      character === key.shiftValue ||
      character.toLowerCase() === key.value.toLowerCase(),
  );
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

function describeCharacter(character: string | null) {
  if (character === " ") return "Space";
  return character ?? "";
}
