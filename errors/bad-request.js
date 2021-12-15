class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;
