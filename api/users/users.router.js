const express = require("express");

const { getUserPosts, signupUser } = require("./users.controller");
const router = express.Router();

router.get("/:userId/posts", getUserPosts);
router.post("/signup", signupUser);

module.exports = router;
