import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const UserStatus = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
    dispatch(setNotification(`${user.name} logged out`))
    history.push('/')
  }

  return (
    <div>
      {user === null ?
        <p>
          Not logged in
          <Button variant='primary' onClick={() => history.push('/login')}>Log in</Button>
        </p> :
        <p>
          {user.name} logged in
          <Button variant='danger' onClick={() => logOut()}>Logout</Button>
        </p>
      }

    </div>
  )
}

export default UserStatus