const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
import { Request, Response } from "express";

module.exports = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  const authHeader = req.header("Authorization") || "";

  let token;

  // Check if token exists
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  } else {
    return res.status(403).json({ msg: "User not authorized. Access denied!" });
  }

  try {
    // Check if token is valid
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.user; //Payload can be used within routes. This payload is configured in jwtGenerator.tsx
    next();
  } catch (err: any) {
    console.error(err.message);
    return res.status(403).json({ msg: "Token is not valid" });
  }
};
