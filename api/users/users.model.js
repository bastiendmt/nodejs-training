const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const brcypt = require("bcrypt");

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at leath 8 or more characters"],
  },
});

UserSchema.pre("save", async function () {
  this.password = await brcypt.hash(this.password, 10);
});

module.exports = model("User", UserSchema);
