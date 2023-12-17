const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

router.get("/score", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    //Retrieve user info based on valid jwt token
    const getScore = await pool.query("SELECT * FROM score WHERE user_id=$1", [
      userId,
    ]);

    res.json(getScore.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/score", async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      test_name,
      total_chars,
      difficultyLevel,
      correct_chars,
      misspelled_chars,
      wpm,
      cpm,
      test_score,
      test_accuracy,
      test_time_sec,
      screen_size_info,
      difficulty_name,
      difficulty_settings,
    } = req.body.data;

    if (!user_id || typeof user_id !== "string") {
      return res.status(401).json("User id is invalid!");
    }

    if (!difficultyLevel || typeof difficultyLevel !== "string") {
      return res.status(401).json("Difficulty level id is invalid!");
    }

    if (!test_name || typeof test_name !== "string") {
      return res.status(401).json("Test name is invalid!");
    }

    if (
      (!total_chars && total_chars !== 0) ||
      typeof total_chars !== "number"
    ) {
      return res.status(401).json("Total score char count is invalid!");
    }

    if (
      (!correct_chars && correct_chars !== 0) ||
      typeof correct_chars !== "number"
    ) {
      return res.status(401).json("Total correct char count is invalid!");
    }

    if (
      (!misspelled_chars && misspelled_chars !== 0) ||
      typeof misspelled_chars !== "number"
    ) {
      return res.status(401).json("Total misspelled char count is invalid!");
    }

    if ((!wpm && wpm !== 0) || typeof wpm !== "number") {
      return res.status(401).json("Wpm is invalid!");
    }

    if ((!cpm && cpm !== 0) || typeof cpm !== "number") {
      return res.status(401).json("Cpm is invalid!");
    }

    if ((!test_score && test_score !== 0) || typeof test_score !== "number") {
      return res.status(401).json("Test score is invalid!");
    }

    if (
      (!test_accuracy && test_accuracy !== 0) ||
      typeof test_accuracy !== "number"
    ) {
      return res.status(401).json("Test accuracy is invalid!");
    }

    // Test time is in seconds
    if (
      (!test_time_sec && test_time_sec !== 0) ||
      typeof test_time_sec !== "number"
    ) {
      return res.status(401).json("Test time is invalid!");
    }

    if (!screen_size_info || typeof screen_size_info !== "string") {
      return res.status(401).json("Invalid screen size info!");
    }

    if (!difficulty_name || typeof difficulty_name !== "string") {
      return res.status(401).json("Invalid difficulty name!");
    }

    if (difficulty_settings === null || difficulty_settings === undefined) {
      return res.status(401).json("Invalid difficulty settings!");
    }

    //Retrieve user info based on valid jwt token
    const updateScore = await pool.query(
      "INSERT INTO score (user_id, difficulty_level, test_name, total_chars, correct_chars, misspelled_chars, wpm, cpm, test_score, test_accuracy, test_time_sec, screen_size_info, difficulty_name, difficulty_settings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [
        user_id,
        difficultyLevel,
        test_name,
        total_chars,
        correct_chars,
        misspelled_chars,
        wpm,
        cpm,
        test_score,
        test_accuracy,
        test_time_sec,
        screen_size_info,
        difficulty_name,
        difficulty_settings,
      ]
    );

    res.status(200).json("Score updated");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/stats", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const totalScore = await pool.query(
      "SELECT SUM(test_score) AS totalScore FROM score WHERE user_id=$1",
      [userId]
    );

    const averageWPM = await pool.query(
      "SELECT ROUND(AVG(wpm)) AS avgWPM FROM score WHERE user_id=$1",
      [userId]
    );

    const averageAccuracy = await pool.query(
      "SELECT ROUND(AVG(test_accuracy)) AS avgAccuracy FROM score WHERE user_id=$1",
      [userId]
    );

    const stats = {
      totalScore: totalScore.rows[0].totalscore
        ? totalScore.rows[0].totalscore
        : 0,
      avgWpm: averageWPM.rows[0].avgwpm ? averageWPM.rows[0].avgwpm : 0,
      avgAccuracy: averageAccuracy.rows[0].avgaccuracy
        ? averageAccuracy.rows[0].avgaccuracy
        : 0,
    };

    res.json(stats);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/bestteststats", async (req: Request, res: Response) => {
  try {
    const { userId, difficulty_level, test_time_sec } = req.query;

    const bestScore = await pool.query(
      "SELECT MAX(test_score) AS bestScore FROM score WHERE user_id=$1 AND difficulty_level=$2 AND test_time_sec=$3",
      [userId, difficulty_level, test_time_sec]
    );

    const bestWPM = await pool.query(
      "SELECT MAX(wpm) AS bestWPM FROM score WHERE user_id=$1 AND difficulty_level=$2 AND test_time_sec=$3",
      [userId, difficulty_level, test_time_sec]
    );

    const bestStats = {
      ...(bestScore.rows[0] || { bestscore: 0 }),
      ...(bestWPM.rows[0] || { bestwpm: 0 }),
    };

    res.json({ ...bestStats });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
