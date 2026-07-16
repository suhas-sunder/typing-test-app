import type { TypingInputAction } from "@/lib/typing/attempt";

type KeydownInput = {
  altKey?: boolean;
  ctrlKey?: boolean;
  isComposing?: boolean;
  key: string;
  metaKey?: boolean;
  repeat?: boolean;
};

type BeforeInput = {
  data: string | null;
  inputType: string;
  isComposing?: boolean;
  isTrusted: boolean;
};

export function actionFromKeydown(input: KeydownInput): TypingInputAction | null {
  if (input.altKey || input.ctrlKey || input.metaKey || input.isComposing || input.repeat) return null;
  if (input.key === "Backspace") return { type: "backspace" };
  if (input.key.length !== 1) return null;
  return { type: "character", key: input.key };
}

export function actionFromBeforeInput(input: BeforeInput): TypingInputAction | null {
  if (!input.isTrusted || input.isComposing) return null;
  if (input.inputType === "deleteContentBackward") return { type: "backspace" };
  if (input.inputType !== "insertText" || input.data?.length !== 1) return null;
  return { type: "character", key: input.data };
}

export function actionFromVirtualKey(key: string): TypingInputAction | null {
  if (key === "Backspace") return { type: "backspace" };
  if (key.length !== 1) return null;
  return { type: "character", key };
}
