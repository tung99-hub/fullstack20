import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {
  const userlist = useSelector(state => state.userlist)
  if (!userlist) {
    return null
  }
  const users = userlist.filter(user => user.name !== undefined)

  return (
    <div>
      <h2>
        Users
      </h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default UserList