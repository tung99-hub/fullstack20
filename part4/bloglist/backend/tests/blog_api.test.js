const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
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

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(blogsAtEnd.map(blog => blog.title)).toContain('Test blog')
})

test('default likes of blogs is 0', async () => {
  const newBlog = {
    title: 'Unliked blog',
    author: 'Tung_99',
    url: 'http://localhost:30003'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(blog => blog.author === 'Tung_99')
  expect(addedBlog.likes).toBe(0)
})

test('blogs must contain title and url', async () => {
  const newBlog = { author: 'Titleless' }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deletion of a valid blog returns 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

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
  console.log(updatedBlog)
  console.log(newBlog)
  expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})