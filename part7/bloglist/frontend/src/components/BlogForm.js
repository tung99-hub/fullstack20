import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    const blog = {
      title,
      author,
      url
    }
    dispatch(createBlog(blog))
  }

  return (
    <div>
      <Togglable buttonLabel='create blog' reverseLabel='cancel' ref={blogFormRef}>
        <h3>Create a new blog</h3>
        <form onSubmit={addBlog}>
          <div>title:
            <input
              id='title'
              name='title'
            />
          </div>

          <div>author:
            <input
              id='author'
              name='author'
            />
          </div>

          <div>url:
            <input
              id='url'
              name='url'
            />
          </div>
          <button id='submit-blog' type="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm