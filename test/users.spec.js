const supertest = require("supertest");
const app = require("../server");

describe("Users", () => {
  test("Getting a user's posts", async () => {
    const res = await supertest(app).get("/api/users/1/posts");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Getting posts from a non existant user=", async () => {
    const res = await supertest(app).get("/api/users/0/posts");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({});
  });
});
