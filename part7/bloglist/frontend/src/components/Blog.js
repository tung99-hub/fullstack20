import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }

  const deleteBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => dispatch(increaseLikes(blog))}>like</button>
      </p>
      <p>
        Added by {blog.user.name}
        <button onClick={() => deleteBlog()}>remove</button>
      </p>
    </div>
  )}

export default Blog
