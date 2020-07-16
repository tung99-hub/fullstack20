import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addOne = (event) => {
    event.preventDefault()
    increaseLikes(blog)
  }

  const deleteBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      removeBlog(blog)
    }
  }

  const simplifiedView = `${blog.title} ${blog.author}`
  const detailedView = (
    <div>
      <ul>
        <li>{blog.title}</li>
        <li>{blog.url}</li>
        <li>
          {blog.likes}
          <button onClick={addOne}>like</button>
        </li>
        <li>{blog.author}</li>
      </ul>
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      <Togglable buttonLabel='view' reverseLabel='hide' alt={simplifiedView}>
        {detailedView}
      </Togglable>
      <button onClick={deleteBlog}>remove</button>
    </div>
  )}

export default Blog
