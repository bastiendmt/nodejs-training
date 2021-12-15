const User = require("./users.model");

class UserService {
  signup(userData) {
    const user = new User(userData);
    return user.save();
  }

  findByEmail(email) {
    const user = User.findOne({ email });
    return user;
  }
}

module.exports = new UserService();
