const express = require("express");
const isAuth = require("../../middleware/is-auth");
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
router.post("/", isAuth, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
