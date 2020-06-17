const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blog');
const userRouter = require('./controller/users');
const loginRouter = require('./controller/login')
const config = require('./utils/config')

const tokenExtractor = (request, response, next) => {
  
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token= authorization.substring(7)
  }

  next()
}
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(loginRouter);
app.use(blogsRouter);
app.use(userRouter);



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})