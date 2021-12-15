const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

class Database {
  db = null;
  connect() {
    return open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    })
      .then((db) => {
        this.db = db;
      })
      .catch((err) => {
        console.log(err);
        process.exit(); // Stops app
      });
  }
}

module.exports = new Database();
