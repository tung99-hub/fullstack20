import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const userlist = useSelector(state => state.userlist)
  if (!userlist) {
    return null
  }
  const user = userlist.find(n => n.id === id)


  return (
    <div>
      <h2>{user.name}</h2>
      <Table striped>
        <thead>
          <tr>
            <td>Added blogs</td>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  )
}

export default User