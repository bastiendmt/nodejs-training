const database = require("../../db");
const Post = require("./posts.model");

class PostsService {
  getAll() {
    return Post.find();
  }

  getPost(postId) {
    return Post.findById(postId);
  }

  async create(post) {
    const result = await database.db.run(
      `INSERT INTO posts(userId, title, body) VALUES(?, ?, ?)`,
      [post.userId, post.title, post.body]
    );
    // this method can return the result or also fetch the post create and return it
    return result;
  }
}

module.exports = new PostsService();
