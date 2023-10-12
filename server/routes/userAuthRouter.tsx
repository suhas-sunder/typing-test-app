const router = require("express").Router();
// import { QueryResult } from "pg";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const { pool } = require("../config/dbConfig");
const jwtGenerator = require("../utils/jwtGenerator");
const infoValidation = require("../middleware/infoValidation");
const authorization = require("../middleware/authorization");

//POST /register
router.post(
  "/register",
  infoValidation,
  async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password } = req.body; //Get username, email, and pwd when user registers
    console.log(req.body);

    try {
      //Get user from DB
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [email]
      );

      // Check if user already exists on DB
      if (user.rows.length !== 0) {
        // Render register page with error on display.
        return res.status(401).json("Username or Email already exists!");
      }

      // Hash password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(password, salt);
      const datetime = new Date();

      // Create and add new user to DB
      const newUser = await pool.query(
        `INSERT INTO users (first_name, last_name, user_name, user_email, user_password, user_date_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, lastName, username, email, hashedPassword, datetime]
      );

      // res.json(newUser.rows[0]);
      //Generate JWT token
      const token = await jwtGenerator(newUser.rows[0].user_id);

      res.json({ token });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

router.post("/login", infoValidation, async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 OR user_name = $1",
      [emailOrUsername]
    );

    //Check if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password is incorrect!");
    }

    //Check to make sure password matches that on DB
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Username, Email, or Password is incorrect!");
    }

    const token = await jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Authorization middleware checks if jwt token is valid.
router.get("/is-verify", authorization, async (req: Request, res: Response) => {
  res.json(true);
  try {
  } catch (err) {}
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err: any) {
    throw new Error(err);
  }
});

router.all("*", async (req: Request, res: Response) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "no route matches your request",
      code: 404,
    });
  } catch (err: any) {
    throw new Error(err);
  }
});

module.exports = router;
