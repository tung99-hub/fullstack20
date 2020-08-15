import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

const UserStatus = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  return (
    <div>
      {user === null ?
        'User status' :
        <div>
          {user.name} logged in
          <div>
            <button onClick={() => logOut()}>logout</button>
          </div>
        </div>
      }
    </div>
  )
}

export default UserStatus