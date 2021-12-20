const postsData = require("../../data/posts.json");
const { NotFoundError, BadRequestError } = require("../../errors");
const Post = require("./posts.model");
const PostService = require("./posts.service");

class PostController {
  async getAllPosts(req, res, next) {
    try {
      const { search } = req.query;
      const posts = await PostService.getAll(search);
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

      const post = await PostService.get(postId);
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

      const post = await PostService.create({ title, body, userId });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      res.json(await PostService.update(id, data));
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      await PostService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PostController();
