const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const database = require("./config/db");
const routes = require("./routes/index");
const Link = require("./models/link");

const app = express();
database.sync();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use("/", routes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
