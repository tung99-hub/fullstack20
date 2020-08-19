import React from 'react'
import { Link } from 'react-router-dom'
import UserStatus from './UserStatus'
import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/blogs'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <UserStatus />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation