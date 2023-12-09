const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

router.get("/score", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    //Retrieve user info based on valid jwt token
    const getScore = await pool.query(
      "SELECT * FROM score WHERE user_id=$1",
      [userId]
    );

    res.json(getScore.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
