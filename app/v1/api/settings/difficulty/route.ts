import { NextRequest, NextResponse } from "next/server";
import {
  dataObject,
  jsonError,
  readBoolean,
  readBoundedString,
  readJsonBody,
  readNumber,
  readStringArray,
  requireAuthenticatedUserId,
} from "@/lib/server/api-guards";
import { getPool } from "@/lib/server/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    return await handleGet(request);
  } catch {
    return jsonError("Unable to load settings.", 500);
  }
}

async function handleGet(request: NextRequest) {
  const user = requireAuthenticatedUserId(request);
  if (!user.ok) return user.response;

  const result = await getPool().query("SELECT * FROM testSettings WHERE user_id = $1", [user.value]);
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  try {
    return await handlePost(request);
  } catch {
    return jsonError("Unable to save settings.", 500);
  }
}

async function handlePost(request: NextRequest) {
  const user = requireAuthenticatedUserId(request);
  if (!user.ok) return user.response;

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const data = dataObject(body.value);
  const name = readBoundedString(data.name, "", 80);

  if (!name) {
    return jsonError("Name is required.", 400);
  }

  await getPool().query(
    "INSERT INTO testSettings(name, settings, difficulty_level, selected, is_default, user_id, scoreBonus) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      name,
      readStringArray(data.settings, 24, 80),
      readBoundedString(data.difficultyLevel, "", 40),
      readBoolean(data.selected),
      readBoolean(data.isDefault),
      user.value,
      readNumber(data.scoreBonus, 0, { integer: true, min: 0, max: 10_000 }),
    ],
  );

  return NextResponse.json("Setting created/updated successfully");
}

export async function DELETE(request: NextRequest) {
  try {
    return await handleDelete(request);
  } catch {
    return jsonError("Unable to delete setting.", 500);
  }
}

async function handleDelete(request: NextRequest) {
  const user = requireAuthenticatedUserId(request);
  if (!user.ok) return user.response;

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const data = dataObject(body.value);
  const name = readBoundedString(data.name, "", 80);

  if (!name) {
    return jsonError("Name is required.", 400);
  }

  await getPool().query("DELETE FROM testSettings WHERE name = $1 AND user_id = $2", [name, user.value]);
  return NextResponse.json("Setting deleted successfully");
}
