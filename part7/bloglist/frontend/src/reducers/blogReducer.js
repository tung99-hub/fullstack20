import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'INCREASE_LIKES': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== id
        ? blog
        : changedBlog)
    }
    case 'ADD_COMMENT': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, action.data.comment]
      }
      return state.map(blog => blog.id !== id
        ? blog
        : changedBlog)
    }
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG': {
      const id = action.data.id
      return state.filter(n => n.id !== id)
    }
    default:
      return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}

export const increaseLikes = blog => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'INCREASE_LIKES',
      data: updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    await blogService.postComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, comment }
    })
  }
}

export default blogReducer