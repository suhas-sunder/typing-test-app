const dotenv = require("dotenv").config({ path: "./config.env" });

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production"; //Checks to see if app is hosted in production or dev

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

console.log(connectionString)

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
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

module.exports = { pool };
