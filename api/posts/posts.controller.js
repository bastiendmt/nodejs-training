const postsData = require("../../data/posts.json");
const { NotFoundError } = require("../../errors");

class PostController {
  getAllPosts(req, res) {
    const { search } = req.query;

    if (search) {
      const results = postsData.filter(
        (post) => post.title.includes(search) || post.body.includes(search)
      );
      res.json(results);
      return;
    }

    res.json(postsData);
  }

  getPost(req, res, next) {
    try {
      // + => converts to a number;
      const postId = +req.params.postId;
      //err

      const post = postsData.find((post) => post.id == postId);
      if (!post) {
        throw new NotFoundError("Post not found");
      }

      res.json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PostController();
