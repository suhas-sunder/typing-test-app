import { NextRequest, NextResponse } from "next/server";
import {
  dataObject,
  jsonError,
  readBoundedString,
  readDateIso,
  readJsonBody,
  readNumber,
  readStringArray,
  requireAuthenticatedUserId,
} from "@/lib/server/api-guards";
import { getPool } from "@/lib/server/db";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ resource: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    return await handleGet(request, context);
  } catch {
    return jsonError("Unable to load account data.", 500);
  }
}

async function handleGet(request: NextRequest, context: RouteContext) {
  const { resource } = await context.params;
  const user = requireAuthenticatedUserId(request);
  if (!user.ok) return user.response;

  const pool = getPool();
  const userId = user.value;

  if (resource === "score") {
    const result = await pool.query("SELECT * FROM score WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1000", [userId]);
    return NextResponse.json(result.rows);
  }

  if (resource === "totalscore") {
    const result = await pool.query("SELECT COALESCE(SUM(test_score), 0) AS \"totalScore\" FROM score WHERE user_id = $1", [userId]);
    return NextResponse.json(result.rows[0]);
  }

  if (resource === "lifetime-stats") {
    const result = await pool.query(
      `SELECT
        COALESCE(AVG(test_accuracy), 0) AS avg_accuracy,
        COALESCE(AVG(wpm), 0) AS avg_wpm,
        COALESCE(SUM(test_score), 0) AS total_score,
        COALESCE(SUM(total_chars), 0) AS total_chars,
        COALESCE(SUM(test_time_sec), 0) AS total_typing_time_sec,
        COALESCE(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))/86400, 0) AS total_days_active
      FROM score
      WHERE user_id = $1`,
      [userId],
    );
    const row = result.rows[0];
    return NextResponse.json({
      avgAccuracy: Number(row.avg_accuracy ?? 0),
      avgWPM: Number(row.avg_wpm ?? 0),
      totalScore: Number(row.total_score ?? 0),
      totalChars: Number(row.total_chars ?? 0),
      totalTypingTimeSec: Number(row.total_typing_time_sec ?? 0),
      totalDaysActive: Number(row.total_days_active ?? 0),
    });
  }

  if (resource === "weekly-stats") {
    const params = request.nextUrl.searchParams;
    const startDate = readDateIso(params.get("startDate"), new Date(Date.now() - 7 * 86400000));
    const endDate = readDateIso(params.get("endDate"), new Date());
    if (!startDate.ok) return startDate.response;
    if (!endDate.ok) return endDate.response;

    const result = await pool.query(
      `SELECT
        COALESCE(AVG(test_accuracy), 0) AS avg_accuracy,
        COALESCE(AVG(wpm), 0) AS avg_wpm,
        COALESCE(SUM(test_score), 0) AS total_score,
        COALESCE(SUM(total_chars), 0) AS total_chars,
        COALESCE(SUM(test_time_sec), 0) AS total_typing_time_sec,
        COALESCE(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))/86400, 0) AS total_days_active
      FROM score
      WHERE user_id = $1 AND cast(created_at as date) BETWEEN $2 AND $3::timestamp`,
      [userId, startDate.value, endDate.value],
    );
    const row = result.rows[0];
    return NextResponse.json({
      avgAccuracy: Number(row.avg_accuracy ?? 0),
      avgWPM: Number(row.avg_wpm ?? 0),
      totalScore: Number(row.total_score ?? 0),
      totalChars: Number(row.total_chars ?? 0),
      totalTypingTimeSec: Number(row.total_typing_time_sec ?? 0),
      totalDaysActive: Number(row.total_days_active ?? 0),
    });
  }

  if (resource === "performance-stats") {
    const testName = readBoundedString(request.nextUrl.searchParams.get("testName"), "", 120);
    if (!testName) return jsonError("Test name is required.", 400);
    const result = await pool.query(
      "SELECT wpm, test_time_sec FROM score WHERE user_id = $1 AND test_name = $2 ORDER BY wpm DESC LIMIT 1",
      [userId, testName],
    );
    return NextResponse.json({
      [testName]: {
        bestWPM: result.rows[0]?.wpm || 0,
        testTime: result.rows[0]?.test_time_sec || 0,
      },
    });
  }

  if (resource === "best-stats") {
    const testName = readBoundedString(request.nextUrl.searchParams.get("test_name"), "", 120);
    if (testName) {
      const [bestWPM, bestScore, bestTime, bestWords] = await Promise.all([
        fetchBestStats(userId, testName, "wpm"),
        fetchBestStats(userId, testName, "test_score"),
        fetchBestStats(userId, testName, "test_time_sec"),
        fetchBestStats(userId, testName, "total_chars"),
      ]);
      return NextResponse.json({ bestWPM, bestScore, bestTime, bestWords });
    }

    const result = await pool.query(
      "SELECT COALESCE(MAX(wpm), 0) AS best_wpm, COALESCE(MAX(test_accuracy), 0) AS best_accuracy, COUNT(*) AS tests_taken FROM score WHERE user_id = $1",
      [userId],
    );
    return NextResponse.json({
      bestWpm: Number(result.rows[0].best_wpm ?? 0),
      bestAccuracy: Number(result.rows[0].best_accuracy ?? 0),
      testsTaken: Number(result.rows[0].tests_taken ?? 0),
    });
  }

  return jsonError("No route matches your request", 404);
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    return await handlePost(request, context);
  } catch {
    return jsonError("Unable to save score.", 500);
  }
}

async function handlePost(request: NextRequest, context: RouteContext) {
  const { resource } = await context.params;

  if (resource !== "score") {
    return jsonError("No route matches your request", 404);
  }

  const user = requireAuthenticatedUserId(request);
  if (!user.ok) return user.response;

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const data = dataObject(body.value);
  const userId = user.value;

  const pool = getPool();
  await pool.query(
    `INSERT INTO score
      (user_id, difficulty_level, test_name, total_chars, correct_chars, misspelled_chars, wpm, cpm, test_score, test_accuracy, test_time_sec, screen_size_info, difficulty_name, difficulty_settings)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
    [
      userId,
      readBoundedString(data.difficultyLevel ?? data.difficulty_level, "", 40),
      readBoundedString(data.test_name, "words", 120),
      readNumber(data.total_chars, 0, { integer: true, min: 0, max: 100_000 }),
      readNumber(data.correct_chars, 0, { integer: true, min: 0, max: 100_000 }),
      readNumber(data.misspelled_chars, 0, { integer: true, min: 0, max: 100_000 }),
      readNumber(data.wpm, 0, { integer: true, min: 0, max: 5_000 }),
      readNumber(data.cpm, 0, { integer: true, min: 0, max: 25_000 }),
      readNumber(data.test_score, 0, { integer: true, min: 0, max: 10_000_000 }),
      readNumber(data.test_accuracy, 0, { integer: true, min: 0, max: 100 }),
      readNumber(data.test_time_sec, 0, { integer: true, min: 0, max: 86_400 }),
      readBoundedString(data.screen_size_info, "unknown", 60),
      readBoundedString(data.difficulty_name, "", 80),
      readStringArray(data.difficulty_settings, 16, 80),
    ],
  );

  return NextResponse.json("Score updated");
}

async function fetchBestStats(userId: string, testName: string, orderBy: "wpm" | "test_score" | "test_time_sec" | "total_chars") {
  const pool = getPool();
  const result = await pool.query(
    `SELECT * FROM score WHERE user_id = $1 AND test_name = $2 ORDER BY ${orderBy} DESC LIMIT 1`,
    [userId, testName],
  );
  const row = result.rows[0];
  const orderByLabel = orderBy === "wpm" ? "WPM" : orderBy === "test_score" ? "Score" : orderBy === "test_time_sec" ? "Time" : "Words";

  return {
    title: `Best ${orderByLabel}`,
    id: `best-${orderByLabel.toLowerCase()}`,
    testName: row?.test_name || "",
    finalWPM: row?.wpm || 0,
    finalCPM: row?.cpm || 0,
    createdAt: row?.created_at || null,
    seconds: row?.test_time_sec || 0,
    accuracy: row?.test_accuracy || 0,
    score: row?.test_score || 0,
    chars: row?.total_chars || 0,
    words: Math.floor((row?.total_chars || 0) / 5),
    difficultyLevel: row?.difficulty_level || "",
    difficultyFilters: row?.difficulty_settings || "",
  };
}
