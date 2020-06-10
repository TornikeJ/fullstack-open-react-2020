const express = require("express");
const app = express();
app.use(express.json());
const Blog = require("../models/blog");
const User = require("../models/user");

app.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

app.post("/api/blogs", async (request, response) => {
  const body = request.body;
  console.log(body);
  const user = await User.findById(body.userId);
  console.log(user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes,
  });

  try {
    const savedNote = await blog.save();
    user.blogs = user.blogs.concat(savedNote._id);
    await user.save();

    response.send(200).json(savedNote.toJSON());
  } catch (exception) {
    response.status(400).send(exception.message);
  }
});

app.delete("/api/blogs/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

app.put("/api/blogs/:id", async (request, response, next) => {
  try {
    console.log(request.body);
    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = app;
