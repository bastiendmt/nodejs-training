const database = require("../db");

database
  .connect()
  .then(() => {
    return database.db.exec(`
  DROP TABLE posts;
  `);
  })
  .then(() => {
    console.log("RESET DONE");
  })
  .catch((err) => {
    console.log(err);
  });
