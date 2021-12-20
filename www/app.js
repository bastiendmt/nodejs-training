const app = require("../server");
const { port } = require("../config");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://163.172.165.5:27017/bastien");
// mongoose.connect("mongodb+srv://<username>:<password>@cluster0.atzkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost:27017/sparks")

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("Database connected");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
