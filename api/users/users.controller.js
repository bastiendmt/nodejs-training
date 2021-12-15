const { default: isEmail } = require("validator/lib/isEmail");
const postsData = require("../../data/posts.json");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../../errors");
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

      const userAlreadySignedUp = await UserService.findByEmail(data.email);

      if (userAlreadySignedUp) {
        throw new ConflictError("Conflict - Email already exists");
      }

      const newUser = await UserService.signup(data);
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
