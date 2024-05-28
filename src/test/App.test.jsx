// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

describe('<App />', () => {
  it('should render', () => {
    render(<App />)
    expect(screen.getByTestId('app')).toBeDefined()
  })
})
