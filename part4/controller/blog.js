const express = require('express')
const app=express();
app.use(express.json())
const Blog = require('../models/block')

app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err=>{
          console.log(err)
          response.status(400).send(err.message)})
  })

module.exports = app;
  