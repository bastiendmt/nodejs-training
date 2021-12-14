require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postsRouter = require("./api/posts/posts.router");
const usersRouter = require("./api/users/users.router");

const app = express();

app.use(cors());
app.use(express.json()); // This middleware can also be placed in a specific route

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

// Serving html
app.use("/", express.static(`${__dirname}/public`));

// Example to redirect to error
app.use("/error", (req, res, next) => {
  next(new Error("something went wrong"));
});

// Error handler. Used to log errors or easily add
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
