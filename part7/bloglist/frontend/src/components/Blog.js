import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, removeBlog, addComment } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { ListGroup, Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(id, comment))
    dispatch(setNotification('Comment succesfully added', 5))
  }

  const likeBlog = async () => {
    dispatch(increaseLikes(blog))
    history.push('/blogs')
    dispatch(setNotification(`You liked ${blog.title}`, 5))
  }

  const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  if (!blog) {
    return null
  }

  const deleteBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Removed blog ${blog.title} by ${blog.author}`, 5))
      history.push('/blogs')
    }
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p>Accessible at <a href={blog.url}>{blog.url}</a> </p>
      <p>
        {blog.likes} likes
        <Button variant='primary' onClick={() => likeBlog()}>Like</Button>
      </p>
      <p>
        Added by {blog.user.name}
        <Button variant='danger' onClick={() => deleteBlog()}>Remove</Button>
      </p>

      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder='Write comment here...' autoComplete='off' name='comment'/>
        <Button variant='primary' type='submit'>Add comment</Button>
      </form>
      {blog.comments.length === 0 ?
        <div>No comments yet</div> :
        <ListGroup>
          {blog.comments.map(comment => (
            <ListGroup.Item key={generateID()}>
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      }


    </div>
  )}

export default Blog
