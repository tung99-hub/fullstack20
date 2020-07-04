const _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : blogs.length === 1
      ? blogs[0].likes
      : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blog = _.maxBy(blogs, 'likes')
  const result = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
  return result
}

const mostBlogs = (blogs) => {
  const freq = _.countBy(blogs, blog => blog.author)
  let keys = Object.keys(freq)
  keys.sort((a,b) => freq[b] - freq[a])

  return {
    author: _.first(keys),
    blogs: freq[_.first(keys)]
  }
}

const mostLikes = (blogs) => {
  const count = {}
  blogs.forEach(entry => {
    if (!count[entry.author]) {
      count[entry.author] = 0
    }
    count[entry.author] += entry.likes
  })
  let keys = Object.keys(count)
  keys.sort((a,b) => count[b] - count[a])

  return {
    author: _.first(keys),
    likes: count[_.first(keys)]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}