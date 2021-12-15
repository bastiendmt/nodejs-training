const database = require("../../db");
const Post = require("./posts.model");

class PostsService {
  async getAll() {
    const postsData = await database.db.all("SELECT * FROM posts");
    return postsData.map((post) => new Post(post));
  }

  async getPost(postId) {
    const post = await database.db.get(
      `SELECT * FROM posts WHERE id = ${postId}`
    );
    if (!post) return null;
    return new Post(post);
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
