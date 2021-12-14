const postsData = require("../../data/posts.json");
const { NotFoundError } = require("../../errors");
const Post = require("./posts.model");

class PostController {
  getAllPosts(req, res) {
    const { search } = req.query;
    const posts = postsData.map((post) => new Post(post));
    if (search) {
      const results = posts.filter(
        (post) => post.title.includes(search) || post.body.includes(search)
      );
      res.json(results);
      return;
    }

    res.json(posts);
  }

  getPost(req, res, next) {
    try {
      // + => converts to a number;
      const postId = +req.params.postId;

      const posts = postsData.map((post) => new Post(post));
      const post = posts.find((post) => post.id == postId);
      if (!post) {
        throw new NotFoundError("Post not found");
      }

      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  createPost(req, res, next) {
    const data = req.body;
    console.log(data)
    res.json({
      id: 1,
      name: "ana",
    });
  }
}

module.exports = new PostController();
