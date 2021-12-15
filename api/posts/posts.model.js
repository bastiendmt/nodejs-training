const { Schema, model } = require("mongoose");

const PostSchema = Schema({
  title: String,
  body: String,
  userId: Number,
});

module.exports = model("Post", PostSchema);
