export function earlierDate(current: string | undefined, candidate: string) {
  return !current || candidate < current ? candidate : current;
}

export function laterDate(current: string | null | undefined, candidate: string) {
  return !current || candidate > current ? candidate : current;
}

export function validDate(value: unknown) {
  return typeof value === "string" && isValidDate(value) ? value : null;
}

export function isValidDate(value: string) {
  if (value.length > 40 || !Number.isFinite(Date.parse(value))) return false;
  try {
    return new Date(value).toISOString() === value;
  } catch {
    return false;
  }
}

export function isActivityDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && isValidDate(`${value}T00:00:00.000Z`);
}

export function validInteger(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= min && value <= max ? value : null;
}

export function validNumber(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : null;
}

export function optionalInteger(value: unknown, min: number, max: number) {
  return value === undefined ? undefined : validInteger(value, min, max);
}

export function optionalNumber(value: unknown, min: number, max: number) {
  return value === undefined ? undefined : validNumber(value, min, max);
}

export function safeEventId(value: unknown) {
  return isSafeId(value) ? value : null;
}

export function isSafeId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 160 && /^[A-Za-z0-9:._-]+$/.test(value);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function uniqueString(value: string, index: number, values: string[]) {
  return values.indexOf(value) === index;
}

export function uniqueBy<T>(getKey: (value: T) => string) {
  const seen = new Set<string>();
  return (value: T) => {
    const key = getKey(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };
}
