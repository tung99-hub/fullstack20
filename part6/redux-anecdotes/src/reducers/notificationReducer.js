const notificationReducer = (state = 'Notifications', action) => {
  switch(action.type) {
    case 'SET_NOTI':
      return action.noti
    case 'DELETE_NOTI':
      return 'Notifications'
    default:
      return state
  }
}

export const setNotification = (statement, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      noti: statement
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTI'
      })
    }, time*1000)
  }
}

export default notificationReducer