import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
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
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`Sucessfully added blog ${blog.title} by ${blog.author}`), 5)
      history.push('/blogs')
    }
    catch (exception) {
      if (exception.response.status === 400) {
        dispatch(setNotification('Please fill out all the fields', 5))
      }
      else {
        dispatch(setNotification(exception.response.data.error, 5))
      }
    }
  }

  return (
    <div>
      <Togglable buttonLabel='Create blog' reverseLabel='Cancel' ref={blogFormRef}>
        <h3>Create a new blog</h3>
        <Form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control name='title' />

            <Form.Label>Author:</Form.Label>
            <Form.Control name='author' />

            <Form.Label>URL:</Form.Label>
            <Form.Control name='url' />
          </Form.Group>
          <Button variant='primary' id='submit-blog' type="submit">Create</Button>
        </Form>
      </Togglable>
    </div>
  )
}

export default BlogForm