const { default: isEmail } = require("validator/lib/isEmail");
const postsData = require("../../data/posts.json");
const { NotFoundError, BadRequestError } = require("../../errors");
const Post = require("../posts/posts.model");
const UserService = require("./users.service");

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

  async signupUser(req, res, next) {
    try {
      const data = req.body;
      if (!isEmail(data.email)) {
        throw new BadRequestError("Bad request - email is invalid");
      }
      const user = await UserService.signup(data);
      console.log(user);
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
