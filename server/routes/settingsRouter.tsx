const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import validation from "../utils/validation";
const { pool } = require("../config/dbConfig");

const {
  sanitize,
  validateString,
  validateNumber,
  validateArray,
  validateBoolean,
} = validation();

router.get("/difficulty", async (req: Request, res: Response) => {
  try {
    let { userId }: { userId?: string } = req.query;

    // Sanitize
    userId = sanitize(userId);

    // Validation
    validateString(userId, "User id");

    const getSettings = await pool.query(
      "SELECT * FROM testSettings WHERE user_id=$1",
      [userId]
    );

    res.json(getSettings.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error: Could not get difficulty settings!");
  }
});

// Add new settings
router.post("/difficulty", async (req: Request, res: Response) => {
  try {
    const {
      name,
      settings,
      selected,
      isDefault,
      scoreBonus,
      userId,
      difficultyLevel,
    }: {
      name: string;
      settings: string[];
      selected: boolean;
      isDefault: boolean;
      scoreBonus: number;
      userId: string;
      difficultyLevel: string;
    } = req.body.data;
    // Sanitize
    const sanitizedName = sanitize(name);
    // Since settings is an object, no sanitization needed

    // Validation
    validateString(sanitizedName, "Name");
    validateArray(settings, "Settings");
    validateBoolean(selected, "Selected");
    validateBoolean(isDefault, "Default");
    validateNumber(scoreBonus, "Score bonus");
    validateString(userId, "User id");
    validateString(difficultyLevel, "Difficulty level");

    // There is no need to validate difficultyLevel again, it's already validated

    // There is no need to update settings since the option is not available in the front end
    const createSettings = await pool.query(
      "INSERT INTO testSettings(name, settings, difficulty_level, selected, is_default, user_id, scoreBonus) VALUES ($1, $2, $3, $4, $5, $6, $7) ",
      [
        sanitizedName,
        settings,
        difficultyLevel,
        selected,
        isDefault,
        userId,
        scoreBonus,
      ]
    );

    if (!createSettings) {
      return res.status(401).json("Failed to create test settings!");
    }

    res.status(200).json("Setting created/updated successfully");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error: Could not update difficulty settings!");
  }
});

// Delete settings
router.delete("/difficulty", async (req: Request, res: Response) => {
  try {
    const { name, userId }: { name: string; userId: string } = req.body;

    // Validation
    validateString(name, "Name");
    validateString(userId, "User ID");

    // Sanitization
    const sanitizedName = sanitize(name);
    const sanitizedUserId = sanitize(userId);

    // Retrieve user info based on valid jwt token
    const settings = await pool.query(
      "DELETE FROM testSettings WHERE name = $1 AND user_id = $2",
      [sanitizedName, sanitizedUserId]
    );

    if (!settings) {
      return res.status(401).json("Failed to delete test settings!");
    }

    res.status(200).json("Setting deleted successfully");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error: Could not delete difficulty settings!");
  }
});

module.exports = router;
