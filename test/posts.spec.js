const supertest = require("supertest");
const app = require("../server");

describe("Posts", () => {
  test("gettings all posts", async () => {
    const res = await supertest(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("searching posts", async () => {
    const res = await supertest(app).get("/api/posts?search=amet");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("searching non existant posts", async () => {
    const res = await supertest(app).get("/api/posts?search=zzzaaazzz");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("getting a post", async () => {
    const res = await supertest(app).get("/api/posts/1");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("body");
    expect(res.body).toHaveProperty("userId");
  });

  test("getting non existant post", async () => {
    const res = await supertest(app).get("/api/posts/0");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({});
  });

  test("create a post", async () => {
    const res = await supertest(app).post("/api/posts").send({
      id: 1,
      name: "ana",
    });
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
  });
});
