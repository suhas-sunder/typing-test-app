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

  //Instead of checking for regexp pattern for an email, which can be very difficult to find the right one for validation, I will implement email confirmation later on to verify email instead
  // function validateEmail(userEmail: string) {
  //   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  // }

  function validatePassword(userPassword: string) {
    let lowerCase = false;
    let upperCase = false;
    let specialCase = false;
    let numbers = false;

    password.split("").forEach((char: string) => {
      if (password.length < 8) return false;
      if (/^\d+$/.test(char)) {
        numbers = true;
      } else if (/.*[a-z].*/.test(char)) {
        lowerCase = true;
      } else if (/.*[A-Z].*/.test(char)) {
        upperCase = true;
      } else {
        specialCase = true;
      }
    });

    return !lowerCase || !upperCase || !specialCase || !numbers ? false : true;
  }

  if (req.path === "/register") {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validateUsername(username)) {
      return res.status(401).json("Invalid Username!");
    }
    // else if (!validateEmail(email)) {
    //   return res.status(401).json("Invalid Email!");
    // }
    else if (!validatePassword(password)) {
      return res.status(401).json("Invalid Password!");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validatePassword(password)) {
      return res.status(401).json("Invalid Password!");
    }
    // else if (!validateEmail(email)) {
    //   return res.status(401).json("Invalid Email!");
    // }
  }

  next();
};
