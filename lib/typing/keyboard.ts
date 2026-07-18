import type { KeyModel } from "@/lib/typing/types";

const NUMBER_KEYS: KeyModel[] = [
  shifted("`", "~"),
  shifted("1", "!"),
  shifted("2", "@"),
  shifted("3", "#"),
  shifted("4", "$"),
  shifted("5", "%"),
  shifted("6", "^"),
  shifted("7", "&"),
  shifted("8", "*"),
  shifted("9", "("),
  shifted("0", ")"),
  shifted("-", "_"),
  shifted("=", "+"),
];

export const FULL_KEYBOARD_MIN_WIDTH_PX = 1088;

export const FULL_KEYBOARD: KeyModel[][] = [
  [...NUMBER_KEYS, { action: "backspace", label: "Backspace", value: "Backspace", width: "lg" }],
  [
    { label: "Tab", value: "Tab", width: "md" },
    ...letters("qwertyuiop"),
    shifted("[", "{"),
    shifted("]", "}"),
    shifted("\\", "|"),
  ],
  [
    { label: "Caps", value: "CapsLock", width: "md" },
    ...letters("asdfghjkl"),
    shifted(";", ":"),
    shifted("'", '"'),
    { label: "Enter", value: "Enter", width: "lg" },
  ],
  [
    shiftKey("lg"),
    ...letters("zxcvbnm"),
    shifted(",", "<"),
    shifted(".", ">"),
    shifted("/", "?"),
    shiftKey("lg"),
  ],
  [
    { label: "Ctrl", value: "Control", width: "md" },
    { label: "Option", value: "Alt", width: "md" },
    { label: "Alt", value: "Alt", width: "md" },
    { action: "character", label: "Spacebar", value: " ", width: "space" },
    { label: "Alt", value: "Alt", width: "md" },
    { label: "Fn", value: "Fn", width: "md" },
    { label: "Menu", value: "ContextMenu", width: "md" },
    { label: "Ctrl", value: "Control", width: "md" },
  ],
];

export const MOBILE_KEYBOARD: KeyModel[][] = [
  letters("qwertyuiop"),
  letters("asdfghjkl"),
  [...letters("zxcvbnm"), shifted(",", "<"), shifted(".", ">")],
];

const COMPACT_SYMBOL_ORDER = [
  ..."1234567890",
  "'",
  '"',
  ";",
  ":",
  "/",
  "?",
  "!",
  "-",
  "=",
  "[",
  "]",
  "(",
  ")",
  "%",
  "$",
  "+",
  "_",
  "@",
  "#",
  "&",
  "*",
  "\\",
  "|",
  "{",
  "}",
  "<",
  ">",
  "`",
  "~",
  "^",
] as const;

const COMMON_COMPACT_SYMBOLS = new Set(["'", '"', "?", "!", "-"]);
export const SUPPORTED_COMPACT_SYMBOLS = new Set<string>(COMPACT_SYMBOL_ORDER);

export function buildCompactSymbolRows(content: string): KeyModel[][] {
  const required = new Set([...content].filter((character) => SUPPORTED_COMPACT_SYMBOLS.has(character)));
  const symbols = COMPACT_SYMBOL_ORDER.filter(
    (character) => required.has(character) || COMMON_COMPACT_SYMBOLS.has(character),
  );

  return chunk(
    symbols.map((character) => characterKey(character)),
    10,
  );
}

export function compactLayerForCharacter(character: string | null): "alphabet" | "symbols" | null {
  if (!character) return null;
  if (/^[a-z]$/i.test(character) || character === " " || character === "," || character === ".") {
    return "alphabet";
  }
  return SUPPORTED_COMPACT_SYMBOLS.has(character) ? "symbols" : null;
}

export function defaultCompactLayer(content: string): "alphabet" | "symbols" {
  const containsLetters = /[a-z]/i.test(content);
  const containsSecondaryCharacters = [...content].some(
    (character) => compactLayerForCharacter(character) === "symbols",
  );
  return !containsLetters && containsSecondaryCharacters ? "symbols" : "alphabet";
}

export function compactContentSupportsShift(content: string): boolean {
  return /[A-Z]/.test(content);
}

export function isFullKeyboardEligible(availableWidth: number): boolean {
  return availableWidth >= FULL_KEYBOARD_MIN_WIDTH_PX;
}

export function keyOutput(key: KeyModel, isShifted: boolean): string {
  if (isShifted && key.shiftValue) return key.shiftValue;
  if (isShifted && key.action === "character" && /^[a-z]$/.test(key.value)) return key.value.toUpperCase();
  return key.value;
}

export function keyLabel(key: KeyModel, isShifted: boolean): string {
  if (isShifted && key.shiftLabel) return key.shiftLabel;
  if (isShifted && key.action === "character" && /^[a-z]$/.test(key.value)) return key.value.toUpperCase();
  return key.label;
}

export function requiresShift(character: string | null, rows: KeyModel[][]): boolean {
  if (!character) return false;
  if (/^[A-Z]$/.test(character)) return true;
  return rows.flat().some((key) => key.shiftValue === character);
}

function letters(row: string): KeyModel[] {
  return row.split("").map((letter) => ({
    action: "character",
    label: letter.toUpperCase(),
    value: letter.toLowerCase(),
  }));
}

function shifted(value: string, shiftValue: string): KeyModel {
  return { action: "character", label: value, shiftLabel: shiftValue, shiftValue, value };
}

function characterKey(value: string): KeyModel {
  return { action: "character", label: value, value };
}

function shiftKey(width: KeyModel["width"]): KeyModel {
  return { action: "shift", label: "Shift", value: "Shift", width };
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}
