const express = require("express");
const morgan = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const pg = require("pg");
const cookieParser = require("cookie-parser");
// const routes = require("./routes");
const pgSession = require("connect-pg-simple")(expressSession);
const app = express();

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;

const pgPool = new pg.Pool({
  // Insert pool options here
});

// app.use(
//   expressSession({
//     store: new pgSession({
//       pool: pgPool, // Connection pool
//       tableName: "user_sessions", // Use another table-name than the default "session" one
//       // Insert connect-pg-simple options here
//     }),
//     secret: process.env.FOO_COOKIE_SECRET,
//     resave: false, //Has to do with how session reacts when there are no changes in browser
//     saveUninitialized: true, //Has to do with how session reacts when there are no changes in browser
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Cookie will expire in 30 days
//     // Insert express-session options here
//   })
// );

// Middleware for converting file types
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes go after other middleware, but before error handler.
// app.use(routes);

app.get("/api/v1/progress", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Hello World");
});

app.post("/register", (req, res) => {
  res.json("register");

  const { username, password } = req.body; //Get username and pwd when user registers
  // Hash password
  bcrypt.hash(password, 10).then((hash) => {
    // console.log(hash)
    //   USERS.CREATE({
    //     username: username,
    //     password: hash,
    //   })
    //     .then(() => {
    //       res.json("USER REGISTERED");
    //     })
    //     .catch((err) => {
    //       if (err) {
    //         res.status(400).json({ error: err });
    //       }
    //     });
  });
});

app.post("/login", async (req, res) => {
  // res.json("login");
  // const { username, password } = req.body; //Get input from login form
  // const user = await USERS.findOne({ where: { username: username } });
  // if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  // const dbPassword = user.password;
  // bcrypt.compare(password, dbPassword).then((match) => {
  //   if(!match) {
  //     res.status(400).json({error: "Incorrect Username or Password!"})
  //   } else {
  //     res.json("LOGGED IN");
  //   }
  // })
});

app.post("/profile", (req, res) => {
  res.json("profile");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// module.exports = app;
