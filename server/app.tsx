const express = require("express");
const morgan = require("morgan");
const app = express();

app.get("/api/v1/progress", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Hello World");
});

module.exports = app;
