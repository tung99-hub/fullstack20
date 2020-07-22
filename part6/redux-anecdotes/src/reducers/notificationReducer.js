const notificationReducer = (state = 'Notifications', action) => {
  switch(action.type) {
    case 'SET_NOTI':
      return action.noti
    case 'DELETE_NOTI':
      return ''
    default:
      return state
  }
}

export const notificationChange = noti => {
  return {
    type: 'SET_NOTI',
    noti
  }
}

export const notificationRemove = () => {
  return {
    type: 'DELETE_NOTI'
  }
}

export default notificationReducer