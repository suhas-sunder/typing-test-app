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

    if (!updateScore) {
      console.log("Failed to update score");
    }

    res.status(200).json("Score updated");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/weekly-stats", async (req: Request, res: Response) => {
  try {
    const { userId, startDate, endDate } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("User id is invalid!");
    }

    if (
      !startDate ||
      typeof startDate !== "string" ||
      new Date(startDate).getTime() <= 0
    ) {
      return res.status(401).json("Weekly start date is invalid!");
    }

    if (
      !endDate ||
      typeof endDate !== "string" ||
      new Date(endDate).getTime() <= 0
    ) {
      return res.status(401).json("Weekly end date is invalid!");
    }

    const totalScore = await pool.query(
      "SELECT SUM(test_score) AS totalscore FROM score WHERE user_id=$1 AND cast(created_at as date) BETWEEN $2::timestamp AND $3::timestamp",
      [userId, startDate, endDate]
    );

    const totalWpm = await pool.query(
      "SELECT SUM(wpm) AS totalwpm FROM score WHERE user_id=$1 AND cast(created_at as date) BETWEEN $2::timestamp AND $3::timestamp",
      [userId, startDate, endDate]
    );

    const totalTypingTimeSec = await pool.query(
      "SELECT SUM(test_time_sec) AS totaltypingtimesec FROM score WHERE user_id=$1 AND cast(created_at as date) BETWEEN $2::timestamp AND $3::timestamp",
      [userId, startDate, endDate]
    );

    const averageWPM = await pool.query(
      "SELECT ROUND(AVG(wpm)) AS avgwpm FROM score WHERE user_id=$1 AND cast(created_at as date) BETWEEN $2::timestamp AND $3::timestamp",
      [userId, startDate, endDate]
    );

    const averageAccuracy = await pool.query(
      "SELECT ROUND(AVG(test_accuracy)) AS avgaccuracy FROM score WHERE user_id=$1 AND cast(created_at as date) BETWEEN $2::timestamp AND $3::timestamp",
      [userId, startDate, endDate]
    );

    const stats = {
      totalScore: totalScore.rows[0].totalscore
        ? totalScore.rows[0].totalscore
        : 0,
      avgWpm: averageWPM.rows[0].avgwpm ? averageWPM.rows[0].avgwpm : 0,
      totalWpm: totalWpm.rows[0].totalwpm ? totalWpm.rows[0].totalwpm : 0,
      totalTypingTimeSec: totalTypingTimeSec.rows[0].totaltypingtimesec
        ? totalTypingTimeSec.rows[0].totaltypingtimesec
        : 0,
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

router.get("/totalscore", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    //Retrieve user info based on valid jwt token
    const getScore = await pool.query(
      "SELECT SUM(test_score) AS totalScore FROM score WHERE user_id=$1",
      [userId]
    );

    res.json(getScore.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

//Fetch best stats data for specific tests based on difficulty level and test type (name) or just based on test name for a more general result
router.get("/best-stats", async (req: Request, res: Response) => {
  try {
    const { userId, test_name, difficulty_name } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("User id is invalid!");
    }

    if (!test_name || typeof test_name !== "string") {
      return res.status(401).json("Test name is invalid!");
    }

    if (difficulty_name && typeof difficulty_name !== "string") {
      return res.status(401).json("Difficulty name is invalid!");
    }

    const bestWPMStats = difficulty_name
      ? await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 AND difficulty_name=$3 ORDER BY wpm DESC LIMIT 1",
          [userId, test_name, difficulty_name]
        )
      : await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 ORDER BY wpm DESC LIMIT 1",
          [userId, test_name]
        );

    const bestWPM = {
      title: "Best WPM",
      id: "best-wpm",
      testName: bestWPMStats?.rows[0]?.test_name || "",
      finalWPM: bestWPMStats?.rows[0]?.wpm || 0,
      finalCPM: bestWPMStats?.rows[0]?.cpm || 0,
      createdAt: bestWPMStats?.rows[0]?.created_at || null,
      seconds: bestWPMStats?.rows[0]?.test_time_sec || 0,
      accuracy: bestWPMStats?.rows[0]?.test_accuracy || 0,
      score: bestWPMStats?.rows[0]?.test_score || 0,
      chars: bestWPMStats?.rows[0]?.total_chars || 0,
      words: Math.floor(bestWPMStats?.rows[0]?.total_chars / 5) || 0,
      difficultyName: bestWPMStats?.rows[0]?.difficulty_name || "",
      difficultyLevel: bestWPMStats?.rows[0]?.difficulty_level || "",
      difficultyFilters: bestWPMStats?.rows[0]?.difficulty_settings || "",
    };

    const bestScoreStats = difficulty_name
      ? await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 AND difficulty_name=$3 ORDER BY test_score DESC LIMIT 1",
          [userId, test_name, difficulty_name]
        )
      : await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 ORDER BY test_score DESC LIMIT 1",
          [userId, test_name]
        );

    const bestScore = {
      title: "Best Score",
      id: "best-score",
      testName: bestScoreStats?.rows[0]?.test_name || "",
      finalWPM: bestScoreStats?.rows[0]?.wpm || 0,
      finalCPM: bestScoreStats?.rows[0]?.cpm || 0,
      createdAt: bestScoreStats?.rows[0]?.created_at || null,
      seconds: bestScoreStats?.rows[0]?.test_time_sec || 0,
      accuracy: bestScoreStats?.rows[0]?.test_accuracy || 0,
      score: bestScoreStats?.rows[0]?.test_score || 0,
      chars: bestScoreStats?.rows[0]?.total_chars || 0,
      words: Math.floor(bestScoreStats?.rows[0]?.total_chars / 5) || 0,
      difficultyName: bestScoreStats?.rows[0]?.difficulty_name || "",
      difficultyLevel: bestScoreStats?.rows[0]?.difficulty_level || "",
      difficultyFilters: bestScoreStats?.rows[0]?.difficulty_settings || "",
    };

    const bestTimeStats = difficulty_name
      ? await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 AND difficulty_name=$3 ORDER BY test_time_sec DESC LIMIT 1",
          [userId, test_name, difficulty_name]
        )
      : await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 ORDER BY test_time_sec DESC LIMIT 1",
          [userId, test_name]
        );

    const bestTime = {
      title: "Longest Time",
      id: "best-time",
      testName: bestTimeStats?.rows[0]?.test_name || "",
      finalWPM: bestTimeStats?.rows[0]?.wpm || 0,
      finalCPM: bestTimeStats?.rows[0]?.cpm || 0,
      createdAt: bestTimeStats?.rows[0]?.created_at || null,
      seconds: bestTimeStats?.rows[0]?.test_time_sec || 0,
      accuracy: bestTimeStats?.rows[0]?.test_accuracy || 0,
      score: bestTimeStats?.rows[0]?.test_score || 0,
      chars: bestTimeStats?.rows[0]?.total_chars || 0,
      words: Math.floor(bestTimeStats?.rows[0]?.total_chars / 5) || 0,
      difficultyName: bestTimeStats?.rows[0]?.difficulty_name || "",
      difficultyLevel: bestTimeStats?.rows[0]?.difficulty_level || "",
      difficultyFilters: bestTimeStats?.rows[0]?.difficulty_settings || "",
    };

    const bestWordsStats = difficulty_name
      ? await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 AND difficulty_name=$3 ORDER BY total_chars DESC LIMIT 1",
          [userId, test_name, difficulty_name]
        )
      : await pool.query(
          "SELECT * FROM score WHERE user_id=$1 AND test_name=$2 ORDER BY total_chars DESC LIMIT 1",
          [userId, test_name]
        );

    const bestWords = {
      title: "Most Words",
      id: "best-words",
      testName: bestWordsStats?.rows[0]?.test_name || "",
      finalWPM: bestWordsStats?.rows[0]?.wpm || 0,
      finalCPM: bestWordsStats?.rows[0]?.cpm || 0,
      createdAt: bestWordsStats?.rows[0]?.created_at || null,
      seconds: bestWordsStats?.rows[0]?.test_time_sec || 0,
      accuracy: bestWordsStats?.rows[0]?.test_accuracy || 0,
      score: bestWordsStats?.rows[0]?.test_score || 0,
      chars: bestWordsStats?.rows[0]?.total_chars || 0,
      words: Math.floor(bestWordsStats?.rows[0]?.total_chars / 5) || 0,
      difficultyName: bestWordsStats?.rows[0]?.difficulty_name || "",
      difficultyLevel: bestWordsStats?.rows[0]?.difficulty_level || "",
      difficultyFilters: bestWordsStats?.rows[0]?.difficulty_settings || "",
    };

    res.json({ bestWPM, bestScore, bestTime, bestWords });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});
