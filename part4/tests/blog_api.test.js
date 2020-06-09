const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../controller/blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returned blogs length", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(3);
});

test("check id property existence", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("check post method", async () => {
  const beforePost = await api.get("/api/blogs");
  
  await api.post("/api/blogs").send({
    title: "x",
    author: "anon",
    url: "lala",
    likes: 1,
  });

  const afterpost=await api.get("/api/blogs");
  
  expect(beforePost.body).toHaveLength(afterpost.body.length-1);
});

afterAll(() => {
  mongoose.connection.close();
});