import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Success from './components/Success'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`logged in as ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${blogObject.title}, by ${blogObject.author}, added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage('both title and author are required to create a blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const increaseLikes = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, updatedBlog)
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }

  const removeBlog = (blog) => {
    blogService
      .remove(blog.id)
      .then(() => {
        setSuccessMessage(`Deleted ${blog.title} by ${blog.author}`)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(`Only user who created this blog can delete it, in this case ${blog.user.username}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='log in' reverseLabel='cancel'>
          <LoginForm login={handleLogin} />
        </Togglable>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel='create blog' reverseLabel='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => logOut()}>logout</button>
          </p>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} removeBlog={removeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App