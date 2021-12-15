const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("./posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
