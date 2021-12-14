class Post {
  constructor(postData) {
    this.title = postData.title;
    this.id = postData.id;
    this.body = postData.body;
    this.userId = postData.userId;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      userId: this.userId,
      status: "published",
    };
  }
}

module.exports = Post;
