import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "@/lib/server/api-guards";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(request: NextRequest, scope: string, limit: number, windowMs: number): NextResponse | null {
  const now = Date.now();
  const key = `${scope}:${clientKey(request)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    cleanupBuckets(now);
    return null;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return jsonError("Too many attempts. Please wait a moment and try again.", 429);
  }

  return null;
}

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function cleanupBuckets(now: number) {
  if (buckets.size < 500) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
