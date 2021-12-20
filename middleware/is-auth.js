const jwt = require("jsonwebtoken");

const isAuth = (req, _, next) => {
  try {
    const userId = jwt.verify(
      req.headers["x-access-token"],
      process.env.SECRET_KEY
    );
    req.user = userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
