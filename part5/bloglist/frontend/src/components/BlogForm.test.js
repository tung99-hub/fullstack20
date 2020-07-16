import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm receives the right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { 
    target: { value: 'tung' } 
  })
  fireEvent.change(title, { 
    target: { value: 'new blog' } 
  })
  fireEvent.change(url, { 
    target: { value: 'localhost:3001' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].author).toBe('tung')
  expect(createBlog.mock.calls[0][0].title).toBe('new blog')
  expect(createBlog.mock.calls[0][0].url).toBe('localhost:3001')
})