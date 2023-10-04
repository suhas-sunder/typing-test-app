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

// Middleware for converting file types
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //Allows login details to be sent from front-end server.

// Routes go after other middleware, but before error handler.
// app.use(routes);

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});

app.get("/users/dashboard", (req, res) => {
  res.status(200).send(`User: ${"1"}`);
});

app.get("/users/login", (req, res) => {
  // res.status(200).send("login");
});

app.post("/users/register", (req, res) => {
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
  }

  // Hash password
  bcrypt.hash(password, 10).then((hash: string) => {
    console.log(hash);

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
          // res.status(400).send("Email already registered!");
        }
      }
    );

    // USERS.CREATE({
    //   username: username,
    //   password: hash,
    // })
    // .then(() => {
    //   res.json("USER REGISTERED");
    // })
    // .catch((err: Error) => {
    //   if (err) {
    //     res.status(400).json({ error: err });
    //   }
    // });
  });
});

// app.post("/login", async (req, res) => {
//   res.json("login");
//   const { username, password } = req.body; //Get input from login form
//   const user = await USERS.findOne({ where: { username: username } });
//   if (!user) res.status(400).json({ error: "User Doesn't Exist" });
//   const dbPassword = user.password;
//   bcrypt.compare(password, dbPassword).then((match) => {
//     if(!match) {
//       res.status(400).json({error: "Incorrect Username or Password!"})
//     } else {
//       res.json("LOGGED IN");
//     }
//   })
// });

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// module.exports = app;
