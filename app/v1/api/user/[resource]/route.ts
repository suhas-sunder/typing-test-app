import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createToken, getUserIdFromAuthHeader } from "@/lib/server/auth";
import { getPool } from "@/lib/server/db";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ resource: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
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
  const body = await request.json();
  const { email, password } = body.data ?? {};

  if (!email || !password) {
    return jsonError("Email and password are required!", 401);
  }

  const pool = getPool();
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [String(email)]);

  if (user.rows.length === 0) {
    return jsonError("Invalid email or password!", 401);
  }

  const userRow = user.rows[0];
  const validPassword = await bcrypt.compare(String(password), userRow.user_password);

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
  const body = await request.json();
  const { username, email, password } = body.data ?? {};

  if (!username || !email || !password) {
    return jsonError("Username, email, and password are required!", 401);
  }

  const pool = getPool();
  const existingUser = await pool.query("SELECT user_id FROM users WHERE user_email = $1", [String(email)]);

  if (existingUser.rows.length !== 0) {
    return jsonError("An account with this email already exists!", 401);
  }

  const hashedPassword = await bcrypt.hash(String(password), 12);
  const emailVerificationToken = randomUUID();

  await pool.query(
    "INSERT INTO users (user_name, user_email, user_password, user_date_time, email_token) VALUES ($1, $2, $3, $4, $5)",
    [String(username), String(email), hashedPassword, new Date(), emailVerificationToken],
  );

  return NextResponse.json("User was successfully registered!");
}

function jsonError(message: string, status: number) {
  return NextResponse.json(message, { status });
}
