import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsA from './UserSubmitsA'

describe('UserSubmitsA', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the form title', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Submit a Restaurant Review')).toBeTruthy()
  })

  it('displays mock review data', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText(/Sarah O'Connor/i)).toBeTruthy()
    expect(screen.getAllByText(/The Wild Atlantic Bistro/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Absolutely fantastic seafood/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsA />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usersubmitsa"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="usersubmitsa-restaurant"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-rating"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-reviewtext"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-email"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="usersubmitsa-submit"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="usersubmitsa-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-item"]')).toBeTruthy()
  })

  it('renders all form fields', () => {
    render(<UserSubmitsA />)
    
    expect(screen.getByLabelText(/Select Restaurant/i)).toBeTruthy()
    expect(screen.getByLabelText(/Rating/i)).toBeTruthy()
    expect(screen.getByLabelText(/Your Review/i)).toBeTruthy()
    expect(screen.getByLabelText(/Your Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Your Email/i)).toBeTruthy()
    expect(screen.getByText('Submit Review')).toBeTruthy()
  })

  it('displays recent reviews section', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Recent Reviews')).toBeTruthy()
  })

  it('renders at least 5 mock reviews', () => {
    render(<UserSubmitsA />)
    const items = document.querySelectorAll('[data-testid="usersubmitsa-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
