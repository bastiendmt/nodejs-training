const postsData = require("../../data/posts.json");
const { NotFoundError } = require("../../errors");

class UsersController {
  getUserPosts(req, res, next) {
    try {
      const { userId } = req.params;

      const results = postsData.filter((post) => post.userId == userId);

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
