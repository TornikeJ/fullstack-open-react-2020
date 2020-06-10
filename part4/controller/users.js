const bcrypt = require('bcryptjs')
const express=require('express');
const usersRouter = express();
const User = require('../models/user')

usersRouter.get('/api/users', async(reques,response) =>{
    const users= await User.find({});
    console.log(users);
    response.send(200).json(users);
})

usersRouter.post('/api/users', async (request, response) => {
  const body = request.body

  console.log(body.password);

  if(body.password.length < 3){
      return response.status(401).json({
          error:'Password length must be at least 3 characters'
        });
  }

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  try{
      const savedUser = await user.save()
      response.json(savedUser)
  } catch(exception){
      console.log(exception.message);
      return response.status(401).json({error:exception.message})
  }
})

module.exports = usersRouter