const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

router.get("/difficulty", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

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
    } = req.body.data;

    console.log(
      name,
      settings,
      selected,
      isDefault,
      scoreBonus,
      userId,
      difficultyLevel
    );

    if (!name || typeof name !== "string") {
      return res.status(401).json("Invalid name field!");
    }

    if (settings === null || typeof settings !== "object") {
      return res.status(401).json("Invalid settings field!");
    }

    if (!difficultyLevel || typeof difficultyLevel !== "string") {
      return res.status(401).json("Invalid name field!");
    }

    if (selected === null || typeof selected !== "boolean") {
      return res.status(401).json("Invalid selected field!");
    }

    if (isDefault === null || typeof isDefault !== "boolean") {
      return res.status(401).json("Invalid default field!");
    }

    if (scoreBonus === null || typeof scoreBonus !== "number") {
      return res.status(401).json("Invalid score bonus!");
    }

    if (!userId || typeof userId !== "number") {
      console.log(userId, typeof userId);
      return res.status(401).json("Invalid user Id!");
    }

    if (!difficultyLevel || typeof difficultyLevel !== "string") {
      return res.status(401).json("Invalid difficulty level!");
    }

    // There is no need to update settings since the option is not available in the front end
    const createSettings = await pool.query(
      "INSERT INTO testSettings(name, settings, difficulty_level, selected, is_default, user_id, scoreBonus) VALUES ($1, $2, $3, $4, $5, $6, $7) ",
      [name, settings, difficultyLevel, selected, isDefault, userId, scoreBonus]
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
    const { name, userId }: { name: string; userId: number } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(401).json("Invalid name field!");
    }

    if (!userId || typeof userId !== "number") {
      return res.status(401).json("Invalid user Id!");
    }

    //Retrieve user info based on valid jwt token
    const settings = await pool.query(
      "DELETE FROM testSettings WHERE name = $1 AND user_id = $2",
      [name, userId]
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
