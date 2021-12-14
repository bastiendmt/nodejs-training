class Post {
  constructor(postData) {
    this.title = postData.title;
    this.id = postData.id;
    this.body = postData.body;
    this.userId = postData.userId;
  }
}

module.exports = Post;
