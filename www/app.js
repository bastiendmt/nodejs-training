const app = require("../server");
const { port } = require("../config");

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
