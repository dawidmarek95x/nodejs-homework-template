const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/passport");

const indexRouter = require("./routes/api/index");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", indexRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: `Use api on routes:
      /api/users/signup - registration user, POST { name, email, password }
      /api/users/login - login user, POST: { email, password }
      /api/users/logout - logout user, GET
      /api/users/current - current user, GET
      /api/users - change user's subscription, PATCH: { subscription }
      /api/contacts - all users, GET or create contact or POST: { name, email, phone }
      /api/contacts/:contactId - contact data, GET or delete contact, DELETE or change contact's data, PUT { name, email, phone }
      /api/contacts/:contactId/favorite - change contact's favorite, PATCH { favorite }`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
