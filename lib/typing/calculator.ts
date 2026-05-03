const OPERATORS = ["+", "-", "*", "/"];

export function generateExpression(seed = Date.now(), difficulty = "medium"): string {
  const base = Math.abs(seed);
  const left = 12 + (base % 38);
  const right = 2 + ((base >> 3) % 27);
  const operator = OPERATORS[base % OPERATORS.length];
  const third = difficulty === "hard" ? ` ${OPERATORS[(base >> 5) % OPERATORS.length]} ${3 + ((base >> 7) % 16)}` : "";

  return `${left} ${operator} ${right}${third}`;
}

export function normalizeCalculatorKey(key: string): string {
  if (key === "Enter") return "↵";
  if (key === "Backspace") return "Backspace";
  return key;
}

export function expressionToTarget(expression: string): string {
  return `${expression}↵`;
}
