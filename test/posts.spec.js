const supertest = require("supertest");
const app = require("../server");

describe("Posts", () => {
  test("/api/posts - gettings posts", async () => {
    const res = await supertest(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("/api/posts?search=amet - searching posts", async () => {
    const res = await supertest(app).get("/api/posts?search=amet");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("/api/posts?search=zzzaaazzz - searching non existant posts", async () => {
    const res = await supertest(app).get("/api/posts?search=zzzaaazzz");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("/api/posts/1 - getting a post", async () => {
    const res = await supertest(app).get("/api/posts/1");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test("/api/posts/0 - getting non existant post", async () => {
    const res = await supertest(app).get("/api/posts/0");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({})
  });
});
