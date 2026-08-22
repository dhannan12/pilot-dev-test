import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the review form heading', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Write a Review')).toBeTruthy()
  })

  it('displays account not verified warning', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Account Not Verified/i)).toBeTruthy()
  })

  it('displays mock businesses in the select dropdown', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Connemara Coastal Tours/i)).toBeTruthy()
    expect(screen.getByText(/Wild Atlantic Cafe/i)).toBeTruthy()
    expect(screen.getByText(/Kylemore Abbey Gift Shop/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="userattemptsto-business"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-title"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-review"]')).toBeTruthy()
    
    // Star rating buttons
    expect(document.querySelector('[data-testid="userattemptsto-star-1"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-star-5"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-cancel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-verify-bottom"]')).toBeTruthy()
  })

  it('displays verification info section', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Why verify your account?/i)).toBeTruthy()
    expect(screen.getByText(/Leave reviews for local businesses/i)).toBeTruthy()
  })

  it('shows account status as not verified', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Account Status/i)).toBeTruthy()
    const notVerifiedElements = screen.getAllByText(/Not Verified/i)
    expect(notVerifiedElements.length).toBeGreaterThan(0)
  })
})
