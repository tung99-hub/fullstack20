import React from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()

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
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='log in' reverseLabel='cancel'>
        <h2>log in to application</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username <input name='username'/>
          </div>
          <div>
            password <input type="password" name="password"/>
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </Togglable>

    </div>
  )
}

export default LoginForm