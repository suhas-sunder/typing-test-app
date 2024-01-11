const express = require("express");
const app = express();
const morgan = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userAuthRouter");
const accountRouter = require("./routes/accountRouter");
const settingsRouter = require("./routes/settingsRouter");
const imageRouter = require("./routes/imageRouter");
const pgSession = require("connect-pg-simple")(expressSession);
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const apiVersion = "v1";
const router: any = {};
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://freetypingcamp.com",
      "https://freetypingcamp.com/",
      "https://www.freetypingcamp.com",
      "https://freetypingcamp.com/",
      "freetypingcamp.com",
      "freetypingcamp.com/",
      "www.freetypingcamp.com",
      "www.freetypingcamp.com/",
    ], //Array of acceptable URLs
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], //Requests configured on server
    credentials: true, //Allows cookies to be enabled
  })
);

// app.use(cors());

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //Allows login details to be sent from front-end server.

router.start = () => {
  try {
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

app.use(`/${apiVersion}/api/settings`, settingsRouter); //Test and account settings

app.use(`/${apiVersion}/api/account`, accountRouter); //User account stats, achievements, themes, etc.

app.use(`/${apiVersion}/api/images`, imageRouter); //User account stats, achievements, themes, etc.

app.use(`/${apiVersion}/api/user`, userRouter); //Login & verification

router.start();
