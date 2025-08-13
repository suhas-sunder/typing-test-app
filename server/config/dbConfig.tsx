const dotenv = require("dotenv").config({ path: "./config.env" });
const { Pool } = require("pg");

const enc = encodeURIComponent;

// Build a URI but encode sensitive parts (handles #, @, :, %, etc.)
const connectionString =
  `postgresql://${enc(process.env.DB_USER || "")}:${enc(process.env.DB_PASSWORD || "")}` +
  `@${process.env.DB_HOST || ""}:${process.env.DB_PORT || ""}/${enc(process.env.DB_DATABASE || "")}`;


const pool = new Pool({
  connectionString,
});

module.exports = { pool };
