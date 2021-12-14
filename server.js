require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { port } = require("./config");
const app = express();

const postsRouter = require("./api/posts/posts.router");
const usersRouter = require("./api/users/users.router");

app.use(cors());
app.use("/api/posts", postsRouter);
app.use("/api/suers", usersRouter);

// Serving html
app.use("/", express.static(`${__dirname}/public`));

//Example to redirect to error
app.use("/error", (req, res, next) => {
  next(new Error("something went wrong"));
});


// Error handler. Used to log errors or easily add
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
