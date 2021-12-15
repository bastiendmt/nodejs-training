const database = require("../../db");
const Post = require("./posts.model");

class PostsService {
  getAll(search) {
    if (search) {
      return Post.find({ title: { $regex: search } });
      // return Post.find({ title: { $regex: search }, age: { $gt: 18, $lt: 30} });
    }
    return Post.find();
  }

  getPost(postId) {
    return Post.findById(postId);
  }

  async create(postData) {
    const post = new Post(postData);
    return post.save();
  }
}

module.exports = new PostsService();
