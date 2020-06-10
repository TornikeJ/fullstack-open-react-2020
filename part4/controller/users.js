const bcrypt = require('bcryptjs')
const express=require('express');
const usersRouter = express();
const User = require('../models/user')

usersRouter.get('/api/users', async(reques,response) =>{
    const users= await User.find({});
    console.log(users);
    response.json(users);
})

usersRouter.post('/api/users', async (request, response) => {
  const body = request.body

  console.log(body);

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter