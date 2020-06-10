const express = require("express");
const app = express();
app.use(express.json());
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')



app.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

app.post("/api/blogs", async (request, response) => {
  const body = request.body;

  let decodedToken;

  try{
     decodedToken = jwt.verify(request.token, process.env.SECRET);
  }
  catch(exception){
    
  }

  if (!decodedToken || !decodedToken.id || decodedToken.id !== request.body.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)


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

    response.status(200).json(savedNote.toJSON());
  } catch (exception) {
    response.status(400).send(exception.message);
  }
});

app.delete("/api/blogs/:id", async (request, response) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const blog=await Blog.findById(request.params.id);

    if (!decodedToken || !decodedToken.id || decodedToken.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    response.status(400).send(exception.message);
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
