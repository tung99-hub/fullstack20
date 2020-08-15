import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUserlist } from './reducers/userlistReducer'
import UserStatus from './components/UserStatus'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import {
  Switch, Route, Link
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.noti)
  const user = useSelector(state => state.user)
  const padding = { padding: 5 }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUserlist())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <Notification message={notification} />
      <h2>blogs</h2>
      <UserStatus />

      <Switch>
        <Route path='/' exact>
          {user === null ?
            <LoginForm /> :
            <div>
              <BlogForm />
              <BlogList />
            </div>
          }
        </Route>
        <Route path='/users' exact>
          <UserList />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
      </Switch>
    </div>
  )
}

export default App