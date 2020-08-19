import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Currently available blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>Blog Creator</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
              <td>
                {blog.user.name}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList