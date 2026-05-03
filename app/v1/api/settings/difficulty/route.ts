import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromAuthHeader } from "@/lib/server/auth";
import { getPool } from "@/lib/server/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const userId = getUserIdFromAuthHeader(request.headers.get("Authorization")) ?? request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json("User id is required.", { status: 401 });
  }

  const result = await getPool().query("SELECT * FROM testSettings WHERE user_id = $1", [userId]);
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = body.data ?? {};
  const userId = getUserIdFromAuthHeader(request.headers.get("Authorization")) ?? data.userId;

  if (!userId) {
    return NextResponse.json("User id is required.", { status: 401 });
  }

  await getPool().query(
    "INSERT INTO testSettings(name, settings, difficulty_level, selected, is_default, user_id, scoreBonus) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      String(data.name),
      data.settings ?? [],
      String(data.difficultyLevel),
      Boolean(data.selected),
      Boolean(data.isDefault),
      userId,
      Number(data.scoreBonus ?? 0),
    ],
  );

  return NextResponse.json("Setting created/updated successfully");
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const userId = getUserIdFromAuthHeader(request.headers.get("Authorization")) ?? body.userId;

  if (!userId || !body.name) {
    return NextResponse.json("Name and user id are required.", { status: 401 });
  }

  await getPool().query("DELETE FROM testSettings WHERE name = $1 AND user_id = $2", [String(body.name), userId]);
  return NextResponse.json("Setting deleted successfully");
}
