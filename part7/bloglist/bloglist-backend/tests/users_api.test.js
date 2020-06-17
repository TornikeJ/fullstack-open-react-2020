const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../controller/users");


const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("check id property existence", async () => {
  const response = await api.get("/api/users");

  expect(response.body[0].id).toBeDefined();
});

test("invalid password length", async () => {

  await api.post("/api/users").type('form').send({
    "username": "test6",
    "name": "test",
    "password": "te"
    }).expect(401).end(function (err, res) { done(); });

  
  expect(beforePost.body).toHaveLength(afterpost.body.length-1);
});


test("check unique username", async () => {
 
  await api.post("/api/users").send({
    "username": "test6",
    "name": "test",
    "password": "te"
    }).expect(401).end(function (err, res) { done(); });
});


afterAll(() => {
  mongoose.connection.close();
});
