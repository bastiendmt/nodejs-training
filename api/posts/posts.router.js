const express = require("express");
const { getAllPosts, getPost } = require("./posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPost);

module.exports = router;
