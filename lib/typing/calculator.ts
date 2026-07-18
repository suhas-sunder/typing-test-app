const OPERATORS = ["+", "-", "*", "/"] as const;
const CALCULATOR_CHARACTER_KEYS = `0123456789+-*/.`;

export const CALCULATOR_ENTER_KEY = "\n";

export function generateExpression(seed = Date.now(), difficulty: "medium" | "hard" = "medium"): string {
  const base = Math.floor(Math.abs(Number.isFinite(seed) ? seed : 0)) % 2_147_483_647;
  const left = 12 + (base % 38);
  const right = 2 + (Math.floor(base / 8) % 27);
  const operator = OPERATORS[base % OPERATORS.length];
  const third = difficulty === "hard" ? ` ${OPERATORS[Math.floor(base / 32) % OPERATORS.length]} ${3 + (Math.floor(base / 128) % 16)}` : "";

  return `${left} ${operator} ${right}${third}`;
}

export function normalizeCalculatorKey(key: string): string {
  if (key === "Enter") return CALCULATOR_ENTER_KEY;
  if (key === "Backspace") return "Backspace";
  return key;
}

export function expressionToTarget(expression: string): string {
  return `${expression.replace(/\s+/g, "")}${CALCULATOR_ENTER_KEY}`;
}

export function isCalculatorCharacter(key: string): boolean {
  return key === CALCULATOR_ENTER_KEY || (key.length === 1 && CALCULATOR_CHARACTER_KEYS.includes(key));
}

export function calculatorKeyFromKeydown(input: {
  altKey?: boolean;
  ctrlKey?: boolean;
  isComposing?: boolean;
  key: string;
  metaKey?: boolean;
  repeat?: boolean;
}): string | null {
  if (input.altKey || input.ctrlKey || input.isComposing || input.metaKey || input.repeat) return null;
  const key = normalizeCalculatorKey(input.key.toUpperCase() === "C" ? "C" : input.key);
  if (key === "Backspace" || key === "C" || isCalculatorCharacter(key)) return key;
  return null;
}
