const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../controller/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returned blogs length', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(1);

})

afterAll(() => {
  mongoose.connection.close()
})