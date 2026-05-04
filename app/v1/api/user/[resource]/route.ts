import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createToken, getUserIdFromAuthHeader } from "@/lib/server/auth";
import { dataObject, jsonError, readBoundedString, readJsonBody } from "@/lib/server/api-guards";
import { getPool } from "@/lib/server/db";
import { checkRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ resource: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    return await handleGet(request, context);
  } catch {
    return jsonError("Unable to verify account.", 500);
  }
}

async function handleGet(request: NextRequest, context: RouteContext) {
  const { resource } = await context.params;

  if (resource !== "is-verify") {
    return jsonError("No route matches your request", 404);
  }

  const userId = getUserIdFromAuthHeader(request.headers.get("Authorization"));
  if (!userId) {
    return jsonError("Unauthorized. Access denied!", 403);
  }

  const pool = getPool();
  const result = await pool.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [userId]);

  if (result.rows.length === 0) {
    return jsonError("User not found", 404);
  }

  return NextResponse.json({
    verified: true,
    userId,
    userName: result.rows[0].user_name,
    email: result.rows[0].user_email,
  });
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    return await handlePost(request, context);
  } catch {
    return jsonError("Unable to complete account request.", 500);
  }
}

async function handlePost(request: NextRequest, context: RouteContext) {
  const { resource } = await context.params;

  if (resource === "logout") {
    return NextResponse.json({ success: true });
  }

  if (resource === "login") {
    return login(request);
  }

  if (resource === "register") {
    return register(request);
  }

  return jsonError("No route matches your request", 404);
}

async function login(request: NextRequest) {
  const limited = checkRateLimit(request, "login", 12, 60_000);
  if (limited) return limited;

  const body = await readJsonBody(request, 10_000);
  if (!body.ok) return body.response;

  const data = dataObject(body.value);
  const email = readEmail(data.email);
  const password = readBoundedString(data.password, "", 128);

  if (!email || !password) {
    return jsonError("Email and password are required!", 401);
  }

  const pool = getPool();
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

  if (user.rows.length === 0) {
    return jsonError("Invalid email or password!", 401);
  }

  const userRow = user.rows[0];
  const validPassword = await bcrypt.compare(password, userRow.user_password);

  if (!validPassword) {
    return jsonError("Invalid email or password!", 401);
  }

  if (userRow.email_token && !userRow.user_verified) {
    return NextResponse.json({ user_name: userRow.user_name });
  }

  const jwtToken = createToken({
    userId: userRow.user_id,
    userName: userRow.user_name,
    email: userRow.user_email,
  });

  return NextResponse.json({ jwt_token: jwtToken });
}

async function register(request: NextRequest) {
  const limited = checkRateLimit(request, "register", 6, 60_000);
  if (limited) return limited;

  const body = await readJsonBody(request, 10_000);
  if (!body.ok) return body.response;

  const data = dataObject(body.value);
  const username = readBoundedString(data.username, "", 80);
  const email = readEmail(data.email);
  const password = readBoundedString(data.password, "", 128);

  if (!username || !email || !password) {
    return jsonError("Username, email, and password are required!", 401);
  }

  if (password.length < 8) {
    return jsonError("Password must be at least 8 characters.", 400);
  }

  const pool = getPool();
  const existingUser = await pool.query("SELECT user_id FROM users WHERE user_email = $1", [email]);

  if (existingUser.rows.length !== 0) {
    return jsonError("An account with this email already exists!", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const emailVerificationToken = randomUUID();

  await pool.query(
    "INSERT INTO users (user_name, user_email, user_password, user_date_time, email_token) VALUES ($1, $2, $3, $4, $5)",
    [username, email, hashedPassword, new Date(), emailVerificationToken],
  );

  return NextResponse.json("User was successfully registered!");
}

function readEmail(value: unknown) {
  const email = readBoundedString(value, "", 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}
