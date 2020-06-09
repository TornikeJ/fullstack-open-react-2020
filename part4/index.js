const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blog');
const config = require('./utils/config')


app.use(cors())
app.use(express.json())
app.use(blogsRouter);


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})