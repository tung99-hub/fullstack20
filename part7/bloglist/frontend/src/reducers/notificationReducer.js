const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTI':
      console.log('Noti set')
      return action.noti
    case 'DELETE_NOTI':
      console.log('Noti removed')
      return null
    default:
      return state
  }
}

let timeoutID
export const setNotification = (statement, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      noti: statement
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTI'
      })
    }, time*1000)
  }
}

export default notificationReducer