import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`logged in as ${user.username}`, 5))
      history.push('/blogs')

    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  return (
    <div>
      {user === null ?
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
            />
            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form.Group>
        </Form> :
        <p>Already logged in as {user.name}</p>
      }

    </div>
  )
}

export default LoginForm