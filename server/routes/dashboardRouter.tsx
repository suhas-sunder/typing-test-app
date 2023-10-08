const router = require("express").Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");
const authorization = require("../middleware/authorization");

console.log("runs - d");

router.get("/dashboard", authorization, async (req: Request, res: Response) => {
  try {
    //Retrieve user info based on valid jwt token
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [
        req.user, //req.users already has the user id as payload from authorization
      ]
    );

    res.json(user.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
