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

  expect(response.body).toHaveLength(4);
});

test("check id property existence", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("check post method", async () => {
  const beforePost = await api.get("/api/blogs");
  

  await api.post("/api/blogs").type('form').send({
      title: "x",
      author: "anon",
      url: "lala",
      likes: 1
    }).expect(201).end(function (err, res) { done(); });;

  const afterpost=await api.get("/api/blogs");
  
  expect(beforePost.body).toHaveLength(afterpost.body.length-1);
});


test("check without likes property", async () => {
 
  await api.post("/api/blogs").send({
    title: "x",
    author: "anon",
    url: "lala"
  });

  const afterpost=await api.get("/api/blogs");
  
  expect(afterpost.body[afterpost.body.length-1].likes).toBe(0);
});

test("missing url or title", async () => {
 
  await api.post("/api/blogs").send({
    author: "anon",
  }).expect(400);

});

afterAll(() => {
  mongoose.connection.close();
});
