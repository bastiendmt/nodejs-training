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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

PostSchema.pre("save", function (next) {
  this.title = this.title.toUpperCase();
  next();
});

module.exports = model("Post", PostSchema);
