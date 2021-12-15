const database = require("../../db");
const Post = require("./posts.model");

class PostsService {
  async getAll() {
    const postsData = await database.db.all("SELECT * FROM posts");
    return postsData.map((post) => new Post(post));
  }
}

module.exports = new PostsService();
