const { isEmail } = require("validator");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../../errors");
const UserService = require("./users.service");
const PostService = require("../posts/posts.service");
const jwt = require("jsonwebtoken");

class UsersController {
  async getUserPosts(req, res, next) {
    try {
      const { userId } = req.params;

      const posts = await PostService.getAll();
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
      const { username, email, password } = req.body;
      if (!isEmail(email)) {
        throw new BadRequestError("Bad request - email is invalid");
      }

      if (password.length < 8) {
        throw new BadRequestError(
          "Bad request - Password must contains at least 8 characters"
        );
      }

      const userAlreadySignedUp = await UserService.findByEmail(email);
      if (userAlreadySignedUp) {
        throw new ConflictError("Conflict - Email already exists");
      }

      const newUser = await UserService.signup({ username, email, password });
      newUser.password = undefined;
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const userId = await UserService.checkPasswordUser(email, password);
      if (!userId) {
        throw new BadRequestError("Incorrect credentials");
      }

      const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      res.setHeader("x-access-token", token);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
