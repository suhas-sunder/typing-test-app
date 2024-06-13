//userRouter.tsx
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import validation from "../utils/validation";
const bcrypt = require("bcrypt");
const { pool } = require("../config/dbConfig");
const jwtGenerator = require("../utils/jwtGenerator");
const infoValidation = require("../middleware/infoValidation");
const authorization = require("../middleware/authorization"); // Authorization middleware checks if jwt token is valid.

const { sanitize, validateString } = validation();
router.post(
  "/register",
  infoValidation, // Assuming this middleware validates other aspects of the request
  async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, username, email, password } = req.body.data;

      // Validation and sanitization
      firstName && validateString(firstName, "First name");
      lastName && validateString(lastName, "Last name");
      validateString(username, "Username");
      validateString(email, "Email");
      validateString(password, "Password");

      // Sanitize inputs
      const sanitizedFirstName = sanitize(firstName);
      const sanitizedLastName = sanitize(lastName);
      const sanitizedUsername = sanitize(username);
      const sanitizedEmail = sanitize(email);
      const sanitizedPassword = sanitize(password);

      // Get user from DB
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [sanitizedEmail]
      );

      // Check if user already exists in the DB
      if (user.rows.length !== 0) {
        return res
          .status(401)
          .json("An account with this email already exists!");
      }

      // Hash password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
      const datetime = new Date();

      // Create and add new user to DB
      const newUser = await pool.query(
        `INSERT INTO users (first_name, last_name, user_name, user_email, user_password, user_date_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          sanitizedFirstName,
          sanitizedLastName,
          sanitizedUsername,
          sanitizedEmail,
          hashedPassword,
          datetime,
        ]
      );

      // Generate JWT token
      const jwt_token = await jwtGenerator(newUser.rows[0].user_id);

      res.json({ jwt_token });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json("Internal Server Error: Unable to register user");
    }
  }
);

router.post("/account-update", async (req: Request, res: Response) => {
  try {
    const { userId, firstName, lastName, username, email, password } =
      req.body.data;

    // Validate input data
    if (
      !userId &&
      !firstName &&
      !lastName &&
      !username &&
      !email &&
      !password
    ) {
      return res.status(401).json("Invalid data provided!");
    }

    // Validate and sanitize input data but only if value exists since not all are mandatory
    userId && validateString(userId, "User id");
    firstName && validateString(firstName, "First name");
    lastName && validateString(lastName, "Last name");
    username && validateString(username, "Username");
    email && validateString(email, "Email");
    password && validateString(password, "Password");

    // Sanitize inputs
    const sanitizedFirstName = firstName && sanitize(firstName);
    const sanitizedLastName = lastName && sanitize(lastName);
    const sanitizedUsername = username && sanitize(username);
    const sanitizedEmail = email && sanitize(email);
    const sanitizedPassword = password && sanitize(password);

    // Hash password if it exists
    const hashedPassword = password && (await bcrypt.hash(password, 10));

    // Update user's information in the database
    const updatePromises = [];

    if (username) {
      updatePromises.push(
        pool.query(
          `UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *`,
          [sanitizedUsername, userId]
        )
      );
    }

    // Get user from DB if email exists
    if (email) {
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [sanitizedEmail]
      );
      if (user.rows.length !== 0) {
        return res
          .status(401)
          .json("An account with this email already exists!");
      }

      updatePromises.push(
        pool.query(
          `UPDATE users SET user_email = $1 WHERE user_id = $2 RETURNING *`,
          [sanitizedEmail, userId]
        )
      );
    }

    if (password) {
      updatePromises.push(
        pool.query(
          `UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *`,
          [hashedPassword, userId]
        )
      );
    }

    const updatedResults = await Promise.all(updatePromises);

    // Check if any updates failed
    const failedUpdates = updatedResults.filter(
      (result) => !result || !result.rows.length
    );

    if (failedUpdates.length > 0) {
      return res.status(500).json("Failed to update user information!");
    }

    res.json({ username: sanitizedUsername, email: sanitizedEmail });
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json("Internal Server Error: Failed to update user information");
  }
});

router.post("/login", infoValidation, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;

    // Validate input data
    if (!email || !password) {
      return res.status(401).json("Email and password are required!");
    }

    // Validate and sanitize input data
    validateString(email, "Email");
    validateString(password, "Password");

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // Check if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect!");
    }

    // Compare hashed password with input password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or password is incorrect!");
    }

    // Generate JWT token
    const jwt_token = await jwtGenerator(user.rows[0].user_id);

    res.json({ jwt_token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to login");
  }
});

router.get("/is-verify", authorization, async (req: Request, res: Response) => {
  try {
    // Extract user ID from the authorization token
    const userId = req.user;

    // Query the database to get user details
    const result = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [userId]
    );

    // Check if user details were found
    if (result.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // Extract user details from the query result
    const userName = result.rows[0].user_name;
    const email = result.rows[0].user_email;

    // Respond with user details and verification status
    res.json({ verified: true, userId, userName, email });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to verify user");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    //Eventually perform any cleanup operations here based on forget me settings (e.g., clearing session data)
    // Respond with a JSON indicating successful logout
    res.json({ success: true });
  } catch (err: any) {
    // Handle any errors that might occur during the logout process
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to logout. Internal Server Error",
    });
  }
});

router.all("*", async (req: Request, res: Response) => {
  res.status(404).json({
    timestamp: Date.now(),
    msg: "No route matches your request",
    code: 404,
  });
});

module.exports = router;
