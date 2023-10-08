import express from "express";
const morgan = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });
const userRouter = require("./routes/userAuthRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const pgSession = require("connect-pg-simple")(expressSession);
const app = express();

const cors = require("cors");

// const { pool } = require("./config/dbConfig.js");

const port = process.env.PORT || 3000;

let router: any = {};

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"], //Array of acceptable URLs
    methods: ["GET", "POST", "PUT"], //Requests configured on server
    credentials: true, //Allows cookies to be enabled
  })
);
app.use(express.json()); //req.body
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //Allows login details to be sent from front-end server.

// Session cookie db config using pg-simple
// app.use(
//   expressSession({
//     store: new pgSession({
//       pool: pool, // Connection pool
//       createTableIfMissing: true, //This automatically creates a session in DB if one is not already set
//       // Insert connect-pg-simple options here
//     }),
//     secret: process.env.FOO_COOKIE_SECRET,
//     resave: false, //Has to do with how session reacts when there are no changes in browser
//     saveUninitialized: true, //Has to do with how session reacts when there are no changes in browser
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Cookie will expire in 30 days
//     // Insert express-session options here
//   })
// );

// Passport Authentication Strategy
// const initializePassport = require("./config/passportConfig.js");

// initializePassport(passport);

// //Init passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Routes go after other middleware, but before error handler.

// //Default api route
// app.get("/", async (req, res) => {
//   res.status(200).send(`Success`);
// });

// app.get("/users/register", checkUserAuth, (req, res) => {
//   res.render("register");
// });

// app.get("/users/login", checkUserAuth, (req, res) => {
//   res.render("register");
// });

// app.get("/users/logout", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/users/login");
//   });
// });

// app.post("/users/register", async (req, res) => {
//   res.status(201).send("Hello World");

//   const { username, email, password } = req.body; //Get username and pwd when user registers
//   console.log(req.body);

//   // Check for empty inputs
//   if (!username || !email || !password) {
//     // res.status(400).send("Please enter all fields!");
//   }

//   // Check password length
//   if (password.length < 6) {
//     // res.status(400).send("Password should be at least 6 characters!");
//   } else {
//     //Form validation has passed
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //Query DB to check if user already exists before registering.
//     pool.query(
//       `SELECT * FROM users WHERE email = $1`,
//       [email],
//       (err: Error, results: QueryResult) => {
//         if (err) {
//           throw err;
//         }

//         console.log(results.rows);

//         if (results.rows.length > 0) {
//           // error email already registered!
//           // Render register page with error on display.
//         } else {
//           pool.query(
//             `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`,
//             [username, email, hashedPassword],
//             (err: Error, results: QueryResult) => {
//               if (err) {
//                 throw err;
//               }
//               console.log("You are now registered. Please log in!");
//               // Redirect to the login page.
//             }
//           );
//         }
//       }
//     );
//   }
// });

// app.post(
//   "/users/login",
//   passport.authenticate("local", {
//     successRedirect: "/users/dashboard",
//     failureRedirect: "/users/login",
//     // failureMessage: true
//   })
// );

router.start = () => {
  try {
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

app.use("/v1/api/user", userRouter);

app.use("/v1/api/account", dashboardRouter);

router.start();

// module.exports = app;
