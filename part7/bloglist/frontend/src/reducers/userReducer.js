const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user: user,
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default userReducer