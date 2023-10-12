const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

function jwtGenerator(user_id: string) {
  const payload = {
    user: user_id,
  };

  console.log("runs");

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXP,
  });
}

module.exports = jwtGenerator;
