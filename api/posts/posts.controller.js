const postsData = require("../../data/posts.json");
const { NotFoundError, BadRequestError } = require("../../errors");
const Post = require("./posts.model");
const postsService = require("./posts.service");

class PostController {
  async getAllPosts(req, res) {
    try {
      const { search } = req.query;
      const posts = await postsService.getAll(search);
      if (search) {
        const results = posts.filter(
          (post) => post.title.includes(search) || post.body.includes(search)
        );
        res.json(results);
        return;
      }
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async getPost(req, res, next) {
    try {
      // + => converts to a number;
      const postId = req.params.postId;

      const post = await postsService.getPost(postId);
      if (!post) {
        throw new NotFoundError("Post not found");
      }

      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async createPost(req, res, next) {
    try {
      const { title, body, userId } = req.body;
      if (!title || !body || !userId) {
        throw new BadRequestError("Bad request - parameter missing");
      }

      const post = await postsService.create({ title, body, userId });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PostController();
