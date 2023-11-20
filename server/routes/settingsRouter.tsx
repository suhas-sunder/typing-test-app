const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

router.get("/difficulty", async (req: Request, res: Response) => {
  try {
    //Retrieve user info based on valid jwt token
    const settings = await pool.query(
      "SELECT name, settings, selected, isDefault FROM testSettings WHERE user_id = $1",
      [
        req.user, //req.users already has the user id as payload from authorization
      ]
    );

    res.json(settings.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
