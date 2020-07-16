import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog' 

test('blog rendering only includes title and author', () => {
  const blog = {
    title: 'default blog',
    author: 'tung',
    url: 'invisible_url',
    likes: 100
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).not.toHaveTextContent(
    'invisible_url'
  )
  expect(component.container).not.toHaveTextContent(
    '100'
  )
})

test('clicking button shows full blog details', () => {
  const blog = {
    title: 'default blog',
    author: 'tung',
    url: 'visible_url',
    likes: 100
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'visible_url'
  )
  expect(component.container).toHaveTextContent(
    '100'
  )
})

test('each like added is issued a call', () => {
  const blog = {
    title: 'default blog',
    author: 'tung',
    url: 'visible_url',
    likes: 100
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} increaseLikes={mockHandler} />
  )

  const expand = component.getByText('view')
  fireEvent.click(expand)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})