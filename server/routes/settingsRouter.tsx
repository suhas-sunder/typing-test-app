const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

router.get("/difficulty", async (req: Request, res: Response) => {
  try {
    //Retrieve user info based on valid jwt token
    const getSettings = await pool.query("SELECT * FROM testSettings");

    res.json(getSettings.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Add new settings
router.post("/difficulty", async (req: Request, res: Response) => {
  try {
    const { name, settings, selected, isDefault } = req.body.data;

    if (!name || typeof name !== "string") {
      return res.status(401).json("Invalid name field!");
    }

    if (settings === null || typeof settings !== "object") {
      return res.status(401).json("Invalid settings field!");
    }

    if (selected === null || typeof selected !== "boolean") {
      return res.status(401).json("Invalid selected field!");
    }

    if (isDefault === null || typeof isDefault !== "boolean") {
      return res.status(401).json("Invalid default field!");
    }

    //Add settings to database
    const udpateSettings = await pool.query(
      "INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ($1, $2, $3, $4)",
      [name, settings, selected, isDefault]
    );

    if (!udpateSettings) {
      return res
        .status(401)
        .json("Test settings were not updated on database!");
    }

    res.json("");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Update settings
router.patch("/difficulty", async (req: Request, res: Response) => {
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

// Delete settings
router.delete("/difficulty", async (req: Request, res: Response) => {
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
