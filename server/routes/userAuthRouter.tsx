//userRouter.tsx
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const { pool } = require("../config/dbConfig");
const jwtGenerator = require("../utils/jwtGenerator");
const infoValidation = require("../middleware/infoValidation");
const authorization = require("../middleware/authorization"); // Authorization middleware checks if jwt token is valid.

router.post(
  "/register",
  infoValidation,
  async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password } = req.body.data;

    if (typeof firstName !== "string") {
      return res.status(401).json("First name is invalid!");
    }

    if (typeof lastName !== "string") {
      return res.status(401).json("Last name is invalid!");
    }

    if (!username || typeof username !== "string") {
      return res.status(401).json("Username is invalid!");
    }

    if (!email || typeof email !== "string") {
      return res.status(401).json("Email is invalid!");
    }

    if (!password || typeof password !== "string") {
      return res.status(401).json("Password is invalid!");
    }

    try {
      //Get user from DB
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [email]
      );

      // Check if user already exists on DB
      if (user.rows.length !== 0) {
        // Render register page with error on display.
        return res
          .status(401)
          .json("An account with this email already exists!");
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
      const jwt_token = await jwtGenerator(newUser.rows[0].user_id);

      res.json({ jwt_token });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

router.post("/account-update", async (req: Request, res: Response) => {
  const { userId, firstName, lastName, username, email, password } =
    req.body.data;

  if (!userId && !firstName && !lastName && !username && !email && !password) {
    return res.status(401).json("No valid data was provided!");
  }

  if (typeof firstName !== "string") {
    return res.status(401).json("First name is invalid!");
  }

  if (typeof lastName !== "string") {
    return res.status(401).json("Last name is invalid!");
  }

  if (typeof username !== "string") {
    return res.status(401).json("Username is invalid!");
  }

  if (typeof email !== "string") {
    return res.status(401).json("Email is invalid!");
  }

  if (typeof password !== "string") {
    return res.status(401).json("Password is invalid!");
  }

  try {
    // Hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (username) {
      const updateUsername = await pool.query(
        `UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *`,
        [username, userId]
      );

      if (!updateUsername)
        return res.status(500).json("Server Error: Failed to update username!");
    }

    if (username) {
      const updateUsername = await pool.query(
        `UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *`,
        [username, userId]
      );

      if (!updateUsername)
        return res.status(500).json("Server Error: Failed to update username!");
    }

    if (email) {
      const updateUserEmail = await pool.query(
        `UPDATE users SET user_email = $1 WHERE user_id = $2 RETURNING *`,
        [email, userId]
      );

      if (!updateUserEmail)
        return res.status(500).json("Server Error: Failed to update email!");
    }

    if (password) {
      const updateUserPassword = await pool.query(
        `UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *`,
        [hashedPassword, userId]
      );

      if (!updateUserPassword)
        return res.status(500).json("Server Error: Failed to update password!");
    }

    return res.status(200).json("Account information successfully updated!");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/login", infoValidation, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    //Check if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password not valid!");
    }

    //Check to make sure password matches that on DB
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or Password not valid!");
    }

    const jwt_token = await jwtGenerator(user.rows[0].user_id);

    res.json({ jwt_token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/is-verify", authorization, async (req: Request, res: Response) => {
  try {
    const verified = true;
    const userId = req.user;
    const result = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [userId]
    );
    const userName = result.rows[0].user_name;
    const email = result.rows[0].user_email;

    res.json({ verified, userId, userName, email });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err: any) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
