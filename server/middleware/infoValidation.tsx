import { Request, Response } from "express";
module.exports = function (
  req: Request,
  res: Response,
  next: CallableFunction
) {
  const { username, email, password, emailOrUsername } = req.body;

  console.log(req.body);

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

  function validateUserOrEmail(userEmailOrUsername: string) {
    return (
      validateEmail(userEmailOrUsername) ||
      validateUsername(userEmailOrUsername)
    );
  }

  if (req.path === "/register") {
    console.log("verify register");
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
    if (![emailOrUsername, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validatePassword(password)) {
      return res.status(401).json("Invalid Password!");
    } else if (!validateUserOrEmail(emailOrUsername)) {
      return res.status(401).json("Invalid Username or Email!");
    }
  }

  next();
};
