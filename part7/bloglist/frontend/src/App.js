import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUserlist } from './reducers/userlistReducer'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import {
  Switch, Route
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

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
    <div className='container'>
      <h2>Blog Application</h2>
      <Navigation />
      <Notification />

      <Switch>
        <Route path='/users' exact>
          <UserList />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/blogs' exact>
          <BlogList />
          <BlogForm />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  )
}

export default App