const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are defined by id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('new blog is properly added to database', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Tung',
    url: 'http://localhost:3003',
    likes: 10
  }
  const user = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send(user)

  const res = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${res.body.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(blogsAtEnd.map(blog => blog.title)).toContain('Test blog')
})

test('adding a blog without authorization token gives 401 error', async () => {
  const newBlog = {
    title: 'Unauthorized blog',
    url: 'unauthorized'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('default likes of blogs is 0', async () => {
  const newBlog = {
    title: 'Unliked blog',
    author: 'Tung_99',
    url: 'http://localhost:30003'
  }
  const user = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send(user)

  const res = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${res.body.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(blog => blog.author === user.name)
  expect(addedBlog.likes).toBe(0)
})

test('blogs must contain title and url', async () => {
  const newBlog = { author: 'Titleless' }
  const user = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send(user)

  const res = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${res.body.token}`)
    .expect(400)
})

test('deletion of a valid blog returns 204', async () => {
  const newBlog = {
    title: 'to be deleted',
    author: 'Tung',
    url: 'tobedelted'
  }
  const user = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send(user)

  const res = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })

  const blogToDelete = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${res.body.token}`)

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', `bearer ${res.body.token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(blogsAtEnd.map(r => r.url)).not.toContain(blogToDelete.url)
})

test('updating a blog\'s number of likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)

  const updatedBlog = await Blog.findById(blogToUpdate.id)
  expect(updatedBlog.likes).toEqual(blogToUpdate.likes+1)
})

afterAll(() => {
  mongoose.connection.close()
})