import { Pool } from "pg";

let pool: Pool | undefined;

export function hasDatabaseConfig(): boolean {
  return Boolean(
    process.env.DB_USER &&
      process.env.DB_PASSWORD &&
      process.env.DB_HOST &&
      process.env.DB_PORT &&
      process.env.DB_DATABASE,
  );
}

export function getPool(): Pool {
  if (!hasDatabaseConfig()) {
    throw new Error("Database environment variables are not configured.");
  }

  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }

  return pool;
}
