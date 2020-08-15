import userService from '../services/users'

const userlistReducer = (state = null, action) => {
  switch(action.type) {
    case 'INITIALIZE_USERLIST':
      return action.users
    default:
      return state
  }
}

export const initializeUserlist = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITIALIZE_USERLIST',
      users: users,
    })
  }
}

export default userlistReducer