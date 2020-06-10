const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express');
const loginRouter = express();
const User = require("../models/user");

loginRouter.post('/api/login', async (request, response) => {
  const body = request.body
  console.log(body);
  
  const user = await User.findOne({ username: body.username })

  console.log(user);
  
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)
    
  console.log(passwordCorrect);
    
  if (!(user && passwordCorrect)) {
      return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter