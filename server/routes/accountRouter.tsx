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
      correct_chars,
      misspelled_chars,
      wpm,
      cpm,
      performance_score,
      test_score,
      test_accuracy,
      test_time_sec,
      difficulty,
      screen_size_info,
    } = req.query;

    if (!user_id || typeof user_id !== "string") {
      return res.status(401).json("User id is invalid!");
    }

    if (!test_name || typeof test_name !== "string") {
      return res.status(401).json("Test name is invalid!");
    }

    if (!total_chars || typeof total_chars !== "number") {
      return res.status(401).json("Total score char count is invalid!");
    }

    if (!correct_chars || typeof correct_chars !== "number") {
      return res.status(401).json("Total correct char count is invalid!");
    }

    if (!misspelled_chars || typeof misspelled_chars !== "number") {
      return res.status(401).json("Total misspelled char count is invalid!");
    }

    if (!performance_score || typeof performance_score !== "number") {
      return res.status(401).json("Performance score is invalid!");
    }

    if (!wpm || typeof wpm !== "number") {
      return res.status(401).json("Performance score is invalid!");
    }

    if (!cpm || typeof cpm !== "number") {
      return res.status(401).json("Performance score is invalid!");
    }

    if (!test_score || typeof test_score !== "number") {
      return res.status(401).json("Test score is invalid!");
    }

    if (!test_accuracy || typeof test_accuracy !== "number") {
      return res.status(401).json("Test accuracy is invalid!");
    }

    // Test time is in seconds
    if (!test_time_sec || test_time_sec !== null) {
      return res.status(401).json("Test time is invalid!");
    }

    if (!difficulty || typeof difficulty !== "string") {
      return res.status(401).json("User id is invalid!");
    }

    if (!screen_size_info || typeof screen_size_info !== "string") {
      return res.status(401).json("Invalid screen size info!");
    }

    //Retrieve user info based on valid jwt token
    const updateScore = await pool.query(
      "INSERT INTO score () VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [
        user_id,
        test_name,
        total_chars,
        correct_chars,
        misspelled_chars,
        wpm,
        cpm,
        performance_score,
        test_score,
        test_accuracy,
        test_time_sec,
        difficulty,
        screen_size_info,
      ]
    );

    res.status(200).json("Score updated");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
