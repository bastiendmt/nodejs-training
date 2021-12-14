const postsData = require("../../data/posts.json");
const { NotFoundError } = require("../../errors");
const Post = require("../posts/posts.model");

class UsersController {
  getUserPosts(req, res, next) {
    try {
      const { userId } = req.params;

      const posts = postsData.map((post) => new Post(post));
      const results = posts.filter((post) => post.userId == userId);

      if (results.length == 0) {
        throw new NotFoundError("No posts found");
      }

      res.json(results);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
