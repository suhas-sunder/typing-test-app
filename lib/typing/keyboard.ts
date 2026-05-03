import type { KeyModel } from "@/lib/typing/types";

export const FULL_KEYBOARD: KeyModel[][] = [
  [
    { label: "~", value: "`" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "0", value: "0" },
    { label: "-", value: "-" },
    { label: "=", value: "=" },
    { label: "Backspace", value: "Backspace", width: "lg" },
  ],
  [
    { label: "Tab", value: "Tab", width: "md" },
    ...letters("qwertyuiop"),
    { label: "[", value: "[" },
    { label: "]", value: "]" },
    { label: "\\", value: "\\" },
  ],
  [
    { label: "Caps", value: "CapsLock", width: "md" },
    ...letters("asdfghjkl"),
    { label: ";", value: ";" },
    { label: "'", value: "'" },
    { label: "Enter", value: "Enter", width: "lg" },
  ],
  [
    { label: "Shift", value: "Shift", width: "lg" },
    ...letters("zxcvbnm"),
    { label: ",", value: "," },
    { label: ".", value: "." },
    { label: "/", value: "/" },
    { label: "Shift", value: "Shift", width: "lg" },
  ],
  [
    { label: "Ctrl", value: "Control", width: "md" },
    { label: "Option", value: "Alt", width: "md" },
    { label: "Alt", value: "Alt", width: "md" },
    { label: "Spacebar", value: " ", width: "space" },
    { label: "Alt", value: "Alt", width: "md" },
    { label: "Fn", value: "Fn", width: "md" },
    { label: "Menu", value: "ContextMenu", width: "md" },
    { label: "Ctrl", value: "Control", width: "md" },
  ],
];

export const MOBILE_KEYBOARD: KeyModel[][] = [
  letters("qwertyuiop"),
  letters("asdfjkl"),
  letters("zxcvbnm"),
  [
    { label: "delete", value: "Backspace", width: "md" },
    { label: "space", value: " ", width: "space" },
    { label: "enter", value: "Enter", width: "md" },
  ],
];

function letters(row: string): KeyModel[] {
  return row.split("").map((letter) => ({
    label: letter.length === 1 && row === row.toUpperCase() ? letter : letter.toUpperCase(),
    value: letter.toLowerCase(),
  }));
}
