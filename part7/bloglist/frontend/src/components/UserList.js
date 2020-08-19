import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          <tr>
            <td>User&apos;s name</td>
            <td>Blogs created</td>
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
      </Table>

    </div>
  )
}

export default UserList