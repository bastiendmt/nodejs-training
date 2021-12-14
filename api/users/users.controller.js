const postsData = require("../../data/posts.json");

class UsersController {
  getUserPosts(req, res, next) {
    try {
      const { userId } = req.params;

      const results = posts.filter((post) => post.userId == userId);

      if (results.length == 0) {
        const error = new Error("No user found with this id");
        error.status = 404;
        throw error;
      }

      res.json(results);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
