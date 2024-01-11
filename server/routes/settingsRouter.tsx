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

    //Add settings to database
    const udpateSettings = await pool.query(
      "INSERT INTO testSettings(name, settings, difficulty_level, selected, is_default, user_id, scoreBonus) VALUES ($1, $2, $3, $4, $5, $6, $7) ",
      [
        name,
        settings,
        difficultyLevel,
        selected,
        isDefault,
        parseInt(userId),
        scoreBonus,
      ]
    );

    if (!udpateSettings) {
      return res
        .status(401)
        .json("Failed to update test settings!");
    }

    res.status(200).json("Setting updated successfully");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error: Could not update difficulty settings!");
  }
});

// Delete settings
router.delete("/difficulty", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(401).json("Invalid name field!");
    }

    //Retrieve user info based on valid jwt token
    const settings = await pool.query(
      "DELETE FROM testSettings WHERE name = $1",
      [name]
    );

    res.status(200).json("Setting deleted successfully");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error: Could not delete difficulty settings!");
  }
});

module.exports = router;
