const database = require("../../db");
const Post = require("./posts.model");

class PostService {
  getAll(search) {
    if (search) {
      return Post.find({ title: { $regex: search } });
      // return Post.find({ title: { $regex: search }, age: { $gt: 18, $lt: 30} });
    }
    return Post.find();
  }

  get(postId) {
    return Post.findById(postId);
  }

  create(postData) {
    const post = new Post(postData);
    return post.save();
  }

  update(id, data) {
    return Post.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return Post.deleteOne({ _id: id });
  }
}

module.exports = new PostService();
