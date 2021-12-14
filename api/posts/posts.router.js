const express = require("express");
const { getAllPosts, getPost, createPost } = require("./posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPost);
router.post("/", createPost);

module.exports = router;
