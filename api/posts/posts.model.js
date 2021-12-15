const { Schema, model } = require("mongoose");

const PostSchema = Schema({
  title: {
    type: String,
    required() {
      return this.title != "" && this.title.length < 25;
    },
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = model("Post", PostSchema);
