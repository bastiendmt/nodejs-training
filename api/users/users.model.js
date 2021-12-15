const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: [8, "Password must be at leath 8 or more characters"],
  },
});

module.exports = model("User", UserSchema);
