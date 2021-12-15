const User = require("./users.model");

class UserService {
  signup(userData) {
    const user = new User(userData);
    return user.save();
  }
}

module.exports = new UserService();
