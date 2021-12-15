const database = require("../db");
const postsData = require("../data/posts.json");

// either use async / await or return database.db...
database
  .connect()
  .then(async () => {
    await database.db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      title VARCHAR(255),
      body TEXT
      );
      `);
    console.log("TABLE posts CREATED");
  })
  .then(async () => {
    for (const post of postsData) {
      const result = await database.db.run(
        `INSERT INTO posts(userId, title, body) VALUES(?, ?, ?)`,
        [post.userId, post.title, post.body]
      );
      console.log(`- inserted posts with id ${result.lastID}`);
    }
  })
  .then(() => {
    console.log("Configuration done");
  })
  .catch((err) => {
    console.log(err);
  });
