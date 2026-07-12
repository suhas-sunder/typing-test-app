import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromAuthHeader } from "@/lib/server/auth";

export type GuardResult<T> = { ok: true; value: T } | { ok: false; response: NextResponse };

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function dataObject(body: unknown): Record<string, unknown> {
  if (!isPlainObject(body)) return {};
  return isPlainObject(body.data) ? body.data : body;
}

export async function readJsonBody(request: NextRequest, maxChars = 20_000): Promise<GuardResult<unknown>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, response: jsonError("Expected application/json request body.", 415) };
  }

  const text = await request.text();
  if (!text.trim()) {
    return { ok: false, response: jsonError("Request body is required.", 400) };
  }

  if (text.length > maxChars) {
    return { ok: false, response: jsonError("Request body is too large.", 413) };
  }

  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, response: jsonError("Request body contains invalid JSON.", 400) };
  }
}

export function requireAuthenticatedUserId(request: NextRequest): GuardResult<string> {
  const userId = getUserIdFromAuthHeader(request.headers.get("Authorization"));
  return userId ? { ok: true, value: userId } : { ok: false, response: jsonError("Authentication is required.", 401) };
}

export function readBoundedString(value: unknown, fallback = "", maxLength = 120): string {
  if (typeof value !== "string" && typeof value !== "number") return fallback;
  return String(value).replaceAll("\0", "").trim().slice(0, maxLength);
}

export function readBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export function readNumber(
  value: unknown,
  fallback: number,
  options: { integer?: boolean; max?: number; min?: number } = {},
): number {
  const parsed = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : fallback;
  let next = Number.isFinite(parsed) ? parsed : fallback;

  if (typeof options.min === "number") next = Math.max(options.min, next);
  if (typeof options.max === "number") next = Math.min(options.max, next);
  return options.integer ? Math.round(next) : next;
}

export function readStringArray(value: unknown, maxItems = 20, maxLength = 80): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string | number => typeof item === "string" || typeof item === "number")
    .map((item) => readBoundedString(item, "", maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function readDateIso(value: unknown, fallback: Date): GuardResult<string> {
  const source = typeof value === "string" && value.trim() ? value : fallback.toISOString();
  const date = new Date(source);

  if (Number.isNaN(date.getTime())) {
    return { ok: false, response: jsonError("Date parameter is invalid.", 400) };
  }

  return { ok: true, value: date.toISOString() };
}
