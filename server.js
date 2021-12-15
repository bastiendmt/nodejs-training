require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const postsRouter = require("./api/posts/posts.router");
const usersRouter = require("./api/users/users.router");
const { NotFoundError } = require("./errors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://163.172.165.5:27017/bastien");
// Mongoose.connect("mongodb+srv://<username>:<password>@cluster0.atzkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("Database connected");
});

app.set("view engine", "pug");
app.set("views", "./templates");

app.use(cors());
app.use(express.json()); // This middleware can also be placed in a specific route
app.use(helmet()); // This midleware handles XSS breaks and many others

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

// Serving html
app.use("/", express.static(`${__dirname}/public`));

// Example to redirect to error
app.use("/error", (req, res, next) => {
  next(new Error("something went wrong"));
});

// Catches unknown routes
app.use((req, res, next) => {
  next(new NotFoundError("Unknown route"));
});

// Error handler. Used to log errors or easily add
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  res.status(status).render("error", {
    status,
    message: err.message,
  });
});

module.exports = app;
