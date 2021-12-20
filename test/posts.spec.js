const app = require("../server");
const supertest = require("supertest");
const mockingoose = require("mockingoose");
const Post = require("../api/posts/posts.model");

beforeEach(() => {
  // mockingoose(Post).toReturn((query) => {
  //   [{ _id: "123456azerty", title: "hello world", body: "some boy" }],
  //     "findById";
  // });
  mockingoose(Post).toReturn(
    [
      { title: "hello world", body: "some boy" },
      { title: "hello world 2", body: "some girl" },
    ],
    "find"
  );
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
    const res = await supertest(app).get("/api/posts?search=hello");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("searching non existant posts", async () => {
    const res = await supertest(app).get("/api/posts?search=zzzaaazzz");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("getting a post", async () => {
    const _post = {
      _id: "123456azerty",
      title: "hello world",
      body: "some boy",
    };
    mockingoose(Post).toReturn(_post, "findOne");

    const res = await supertest(app).get("/api/posts/123456azerty");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("body");
  });

  test("getting non existant post", async () => {
    mockingoose(Post).reset('findOne');

    const res = await supertest(app).get("/api/posts/99ba36ddb8c0affc8a190799");
    console.log(res.status);
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({});
  });

  // test("create a post", async () => {
  //   const res = await supertest(app).post("/api/posts").send({
  //     title: "ana",
  //     body: "body",
  //     userId: "1",
  //   });
  //   expect(res.status).toBe(201);
  //   expect(res.body._id).toBeDefined();
  // });
});
