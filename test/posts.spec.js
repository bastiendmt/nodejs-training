const supertest = require("supertest");
const app = require("../server");
const postsData = require("../data/posts.json");
const mockingoose = require("mockingoose");
const Post = require("../api/posts/posts.model");

beforeEach(() => {
  mockingoose(Post).toReturn((query) => {
    [{ _id: "123456azerty", title: "hello world", body: "some boy" }], "find";
  });
  mockingoose(Post).toReturn(
    [{ title: "hello world", body: "some boy" }],
    "save"
  );
});

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
      title: "ana",
      body: "body",
      userId: "1",
    });
    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
  });
});
