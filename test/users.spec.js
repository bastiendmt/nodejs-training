const supertest = require("supertest");
const app = require("../server");

test("Getting a user's posts", async () => {
  const res = await supertest(app).get("/api/users/1/posts");
  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});
