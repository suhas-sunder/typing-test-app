import { Request, Response } from "express";
module.exports = function (
  req: Request,
  res: Response,
  next: CallableFunction
) {
  const { username, email, password } = req.body.data;

  console.log(req.body.data, "infoValidation");

  function validateUsername(userName: string) {
    return /^.{6,16}$/.test(userName);
  }

  function validateEmail(userEmail: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validatePassword(userPassword: string) {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
      userPassword
    );
  }

  if (req.path === "/register") {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validateUsername(username)) {
      return res.status(401).json("Invalid Username!");
    } else if (!validateEmail(email)) {
      return res.status(401).json("Invalid Email!");
    } else if (!validatePassword(password)) {
      return res.status(401).json("Invalid Password!");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validatePassword(password)) {
      return res.status(401).json("Invalid Password!");
    } else if (!validateEmail(email)) {
      return res.status(401).json("Invalid Email!");
    }
  }

  next();
};
