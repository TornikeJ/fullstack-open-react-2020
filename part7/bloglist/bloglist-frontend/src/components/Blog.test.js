import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog =  {
      "title": "test6",
      "author": "test",
      "likes": 5,
      "url":"urltest",
      "userId":"5ee1087a275d031fa0469948"
    }
    

  const component = render(
    <Blog  blog={blog}/>
  )

  expect(component.container).not.toHaveTextContent(
    'urltest'
  )
  expect(component.container).not.toHaveTextContent(
    5
  )
  expect(component.container).toHaveTextContent(
    'test6 test'
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  
  expect(component.container).toHaveTextContent(
    'urltest'
    )
    expect(component.container).toHaveTextContent(
      5
    )
    
    fireEvent.click(button)

    expect(component.container).not.toHaveTextContent(
      'urltest'
    )
      expect(component.container).not.toHaveTextContent(
        5
    )
  })