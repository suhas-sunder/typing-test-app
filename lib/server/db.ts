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
    const port = Number(process.env.DB_PORT);

    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
      throw new Error("DB_PORT must be a valid TCP port.");
    }

    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      query_timeout: 10_000,
      statement_timeout: 10_000,
    });
  }

  return pool;
}
