const express = require("express");

const { getUserPosts } = require("./users.controller");
const router = express.Router();

router.get("/:userId/posts", getUserPosts);

module.exports = router;
