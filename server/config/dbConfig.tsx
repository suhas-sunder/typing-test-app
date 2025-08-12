const dotenv = require("dotenv").config({ path: "./config.env" });
const { Pool } = require("pg");

const enc = encodeURIComponent;

// Build a URI but encode sensitive parts (handles #, @, :, %, etc.)
const connectionString =
  `postgresql://${enc(process.env.DB_USER || "")}:${enc(process.env.DB_PASSWORD || "")}` +
  `@${process.env.DB_HOST || ""}:${process.env.DB_PORT || ""}/${enc(process.env.DB_DATABASE || "")}`;

// Optional: quick presence check without leaking secrets
console.log("DB env check", {
  NODE_ENV: process.env.NODE_ENV,
  hasURL: !!process.env.DATABASE_URL,
  DB_USER: !!process.env.DB_USER,
  DB_PASSWORD: typeof process.env.DB_PASSWORD === "string" && process.env.DB_PASSWORD.length > 0,
  DB_HOST: !!process.env.DB_HOST,
  DB_PORT: !!process.env.DB_PORT,
  DB_DATABASE: !!process.env.DB_DATABASE,
});

const pool = new Pool({
  connectionString,
  // If your host requires SSL in prod, uncomment:
  // ssl: { rejectUnauthorized: false },
});

module.exports = { pool };
