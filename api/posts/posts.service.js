const database = require("../../db");
const Post = require("./posts.model");

class PostsService {
  async getAll() {
    const postsData = await database.db.all("SELECT * FROM posts");
    return postsData.map((post) => new Post(post));
  }

  async getPost(postId) {
    const post = await database.db.all(
      `SELECT * FROM posts WHERE id = ${postId}`
    );
    return post[0];
  }

  async create(post) {
    const result = await database.db.run(
      `INSERT INTO posts(userId, title, body) VALUES(?, ?, ?)`,
      [post.userId, post.title, post.body]
    );
    return result;
  }
}

module.exports = new PostsService();
