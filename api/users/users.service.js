const User = require("./users.model");
const Post = require("../posts/posts.model");
const bcrypt = require("bcrypt");

class UserService {
  signup(userData) {
    const user = new User(userData);
    return user.save();
  }

  findByEmail(email) {
    const user = User.findOne({ email });
    return user;
  }

  getPosts(userId) {
    return Post.find({ userId });
  }

  async checkPasswordUser(email, password) {
    const user = User.findOne({ email });
    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return false;
    }
    return user.userId;
  }
}

module.exports = new UserService();
