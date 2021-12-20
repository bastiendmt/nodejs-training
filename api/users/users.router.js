const express = require("express");

const { getUserPosts, signupUser, loginUser } = require("./users.controller");
const router = express.Router();

router.get("/:userId/posts", getUserPosts);
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
