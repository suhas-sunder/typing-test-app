const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const { pool } = require("../config/dbConfig");

// Get all image defaults
router.get("/defaults", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [userId]
    );

    res.json(getSavedImages.rows[0]);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json("Server Error: Could not get image defaults!");
  }
});

// Create or update profile image url
router.post("/default-profile", async (req: Request, res: Response) => {
  try {
    const {
      profilePathname,
      userId,
    }: { profilePathname: string; userId: number } = req.body.data;

    if (!profilePathname || typeof profilePathname !== "string") {
      return res.status(401).json("Invalid profile image pathname!");
    }

    if (!userId || typeof userId !== "number") {
      return res.status(401).json("Invalid user Id!");
    }

    // Check if data exists in db to decide if we should create or update data
    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [userId]
    );

    if (!getSavedImages.rows[0]) {
      const createProfilePathname = await pool.query(
        "INSERT INTO images(profile_pathname) VALUES ($1)",
        [profilePathname]
      );

      if (!createProfilePathname) {
        return res.status(401).json("Failed to update profile image pathname!");
      }
    } else {
      const updateProfilePathname = await pool.query(
        "UPDATE images SET profile_pathname=$1 WHERE user_id=$2",
        [profilePathname, userId]
      );

      if (!updateProfilePathname) {
        return res.status(401).json("Failed to update profile image pathname!");
      }
    }

    res.status(200).json("Profile image pathname updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update profile image pathname!");
  }
});

// Create or update profile image hex code
router.post("/default-profile-hex", async (req: Request, res: Response) => {
  try {
    const { profileHex, userId } = req.body.data;

    if (!profileHex || typeof profileHex !== "string") {
      return res.status(401).json("Invalid profile image colour code!");
    }

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("Invalid user Id!");
    }

    // Check if data exists in db to decide if we should create or update data
    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [parseInt(userId)]
    );

    if (getSavedImages.rows[0].length === 0) {
      const createProfileHex = await pool.query(
        "INSERT INTO images(profile_hex_code) VALUES ($1)",
        [profileHex]
      );

      if (!createProfileHex) {
        return res
          .status(401)
          .json("Failed to create profile image colour code!");
      }
    } else {
      const updateProfileHex = await pool.query(
        "UDPATE images SET (profile_hex_code=$1) WHERE user_id=$2",
        [profileHex, parseInt(userId)]
      );

      if (!updateProfileHex) {
        return res
          .status(401)
          .json("Failed to update profile image colour code!");
      }
    }

    res.status(200).json("Profile image colour code updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update profile image colour code!");
  }
});

// Create or update profile image url
router.post("/default-start-menu-1", async (req: Request, res: Response) => {
  try {
    const { startMenu1Pathname, userId } = req.body.data;

    if (!startMenu1Pathname || typeof startMenu1Pathname !== "string") {
      return res.status(401).json("Invalid 1st start menu image pathname!");
    }

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("Invalid user Id!");
    }

    const updateStartMenu1Pathname = await pool.query(
      "INSERT INTO images(start_menu_1_pathname) VALUES ($1)",
      [startMenu1Pathname]
    );

    if (!updateStartMenu1Pathname) {
      return res
        .status(401)
        .json("Failed to update 1st start menu image pathname!");
    }

    res.status(200).json("1st start menu image pathname updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update 1st start menu image pathname!");
  }
});

// Create or update profile image hex code
router.post(
  "/default-start-menu-1-hex",
  async (req: Request, res: Response) => {
    try {
      const { startMenu1Hex, userId } = req.body.data;

      if (!startMenu1Hex || typeof startMenu1Hex !== "string") {
        return res
          .status(401)
          .json("Invalid 1st start menu image colour code!");
      }

      if (!userId || typeof userId !== "string") {
        return res.status(401).json("Invalid user Id!");
      }

      const updatestartMenu1Hex = await pool.query(
        "INSERT INTO images(start_menu_1_hex_code) VALUES ($1)",
        [startMenu1Hex]
      );

      if (!updatestartMenu1Hex) {
        return res
          .status(401)
          .json("Failed to update 1st start menu image colour code!");
      }

      res
        .status(200)
        .json("1st start menu image colour code updated successfully!");
    } catch (err: any) {
      console.log(err.message);
      res
        .status(500)
        .json(
          "Server Error: Could not update 1st start menu image colour code!"
        );
    }
  }
);

// Create or update profile image url
router.post("/default-start-menu-2", async (req: Request, res: Response) => {
  try {
    const { startMenu2Pathname, userId } = req.body.data;

    if (!startMenu2Pathname || typeof startMenu2Pathname !== "string") {
      return res.status(401).json("Invalid 2nd start menu image pathname!");
    }

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("Invalid user Id!");
    }

    const updateStartMenu2Pathname = await pool.query(
      "INSERT INTO images(start_menu_2_pathname) VALUES ($1)",
      [startMenu2Pathname]
    );

    if (!updateStartMenu2Pathname) {
      return res
        .status(401)
        .json("Failed to update 2nd start menu image pathname!");
    }

    res.status(200).json("2nd start menu image pathname updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update 2nd start menu image pathname!");
  }
});

// Create or update profile image hex code
router.post(
  "/default-start-menu-2-hex",
  async (req: Request, res: Response) => {
    try {
      const { startMenu2Hex, userId } = req.body.data;

      if (!startMenu2Hex || typeof startMenu2Hex !== "string") {
        return res
          .status(401)
          .json("Invalid 2nd start menu image colour code!");
      }

      if (!userId || typeof userId !== "string") {
        return res.status(401).json("Invalid user Id!");
      }

      const updatestartMenu2Hex = await pool.query(
        "INSERT INTO images(start_menu_2_hex_code) VALUES ($1)",
        [startMenu2Hex]
      );

      if (!updatestartMenu2Hex) {
        return res
          .status(401)
          .json("Failed to update 2nd start menu image colour code!");
      }

      res
        .status(200)
        .json("2nd start menu image colour code updated successfully!");
    } catch (err: any) {
      console.log(err.message);
      res
        .status(500)
        .json(
          "Server Error: Could not update 2nd start menu image colour code!"
        );
    }
  }
);

// Create or update profile image url
router.post("/default-game-over", async (req: Request, res: Response) => {
  try {
    const { gameOverPathname, userId } = req.body.data;

    if (!gameOverPathname || typeof gameOverPathname !== "string") {
      return res.status(401).json("Invalid game over image pathname!");
    }

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("Invalid user Id!");
    }

    const updateGameOverPathname = await pool.query(
      "INSERT INTO images(game_over_pathname) VALUES ($1)",
      [gameOverPathname]
    );

    if (!updateGameOverPathname) {
      return res.status(401).json("Failed to update game over image pathname!");
    }

    res.status(200).json("Game over image pathname updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update game over image pathname!");
  }
});

// Create or update profile image hex code
router.post("/default-game-over-hex", async (req: Request, res: Response) => {
  try {
    const { gameOverHex, userId } = req.body.data;

    if (!gameOverHex || typeof gameOverHex !== "string") {
      return res.status(401).json("Invalid game over image colour code!");
    }

    if (!userId || typeof userId !== "string") {
      return res.status(401).json("Invalid user Id!");
    }

    const updategameOverHex = await pool.query(
      "INSERT INTO images(game_over_hex_code) VALUES ($1)",
      [gameOverHex]
    );

    if (!updategameOverHex) {
      return res
        .status(401)
        .json("Failed to update game over image colour code!");
    }

    res.status(200).json("Game over image colour code updated successfully!");
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json("Server Error: Could not update game over image colour code!");
  }
});

module.exports = router;
