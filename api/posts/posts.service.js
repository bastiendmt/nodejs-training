const database = require("../../db");

class PostsService {
  async getAll() {
    const postsData = await database.db.all("SELECT * FROM posts");
    return postsData;
  }
}

module.exports = new PostsService();
