import express from "express";
import { QueryResult } from "pg";
const morgan = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const routes = require("./routes");
const pgSession = require("connect-pg-simple")(expressSession);
const app = express();

const cors = require("cors");

const { pgPool } = require("./config/dbConfig");

const port = process.env.PORT || 3000;

app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool, // Connection pool
      createTableIfMissing: true, //This automatically creates a session in DB if one is not already set
      // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false, //Has to do with how session reacts when there are no changes in browser
    saveUninitialized: true, //Has to do with how session reacts when there are no changes in browser
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Cookie will expire in 30 days
    // Insert express-session options here
  })
);

// Passport Authentication Strategy
const initializePassport = require("./config/passportConfig");

initializePassport(passport);

//Init passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware for converting file types
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //Allows login details to be sent from front-end server.

// Routes go after other middleware, but before error handler.
// app.use(routes);

app.get("/users/register", checkUserAuth, (req, res) => {
  res.render("register");
});

app.get("/users/login", checkUserAuth, (req, res) => {
  res.render("register");
});

app.get("/users/dashboard", checkUserNotAuth, (req, res) => {
  res.status(200).send(`User: ${"1"}`);
});

app.get("/users/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});

app.post("/users/register", async (req, res) => {
  res.status(201).send("Hello World");

  const { username, email, password } = req.body; //Get username and pwd when user registers
  console.log(req.body);

  // Check for empty inputs
  if (!username || !email || !password) {
    // res.status(400).send("Please enter all fields!");
  }

  // Check password length
  if (password.length < 6) {
    // res.status(400).send("Password should be at least 6 characters!");
  } else {
    //Form validation has passed
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Query DB to check if user already exists before registering.
    pgPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err: Error, results: QueryResult) => {
        if (err) {
          throw err;
        }

        console.log(results.rows);

        if (results.rows.length > 0) {
          // error email already registered!
          // Render register page with error on display.
        } else {
          pgPool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`,
            [username, email, hashedPassword],
            (err: Error, results: QueryResult) => {
              if (err) {
                throw err;
              }
              console.log("You are now registered. Please log in!");
              // Redirect to the login page.
            }
          );
        }
      }
    );
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    // failureMessage: true
  })
);

// Middleware to redirect authenticated users
function checkUserAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
}

// Middleware to redirect un-authenticated users
function checkUserNotAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/users/login");
}

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// module.exports = app;
