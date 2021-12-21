const app = require("../server");
const supertest = require("supertest");
const mockingoose = require("mockingoose");
const Post = require("../api/posts/posts.model");

const _posts = [
  {
    _id: "123456azerty",
    title: "hello world",
    body: "some boy",
    userId: "61ba037e2b28be3b75c68236",
  },
  {
    _id: "1234567azertyu",
    title: "hello world 2",
    body: "content",
    userId: "61ba037e2b28be3b75c68236",
  },
  {
    _id: "1234567azertyui",
    title: "hello world 3",
    body: "content",
    userId: "61ba037e2b28be3b75c68237",
  },
  {
    _id: "1234567azertyuio",
    title: "hello world 4",
    body: "content",
    userId: "61ba037e2b28be3b75c68238",
  },
];

describe("Users", () => {
  test("Getting a user's posts", async () => {
    mockingoose(Post).toReturn(_posts, "find");

    const res = await supertest(app).get(
      "/api/users/61ba037e2b28be3b75c68236/posts"
    );
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("Getting posts from a non existant user=", async () => {
    mockingoose(Post).toReturn(_posts, "find");
    const res = await supertest(app).get(
      "/api/users/61ba037e2b28be3b75c68230/posts"
    );
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({});
  });
});
