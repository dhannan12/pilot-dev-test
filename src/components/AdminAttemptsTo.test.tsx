import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminAttemptsTo from './AdminAttemptsTo'

describe('AdminAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<AdminAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays heading and description', () => {
    render(<AdminAttemptsTo />)
    expect(screen.getByText('Venue Booking System')).toBeTruthy()
    expect(screen.getByText('Book a venue for upcoming fixtures')).toBeTruthy()
  })

  it('displays mock fixtures in dropdown', () => {
    render(<AdminAttemptsTo />)
    expect(screen.getByText(/Manchester United vs Liverpool FC/i)).toBeTruthy()
    expect(screen.getByText(/Chelsea FC vs Arsenal FC/i)).toBeTruthy()
  })

  it('displays available venues', () => {
    render(<AdminAttemptsTo />)
    expect(screen.getByText('Old Trafford')).toBeTruthy()
    expect(screen.getByText('Stamford Bridge')).toBeTruthy()
    expect(screen.getByText('Anfield')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="adminattemptsto"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="adminattemptsto-fixture"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminattemptsto-venue"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminattemptsto-notes"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="adminattemptsto-submit"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="adminattemptsto-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminattemptsto-item"]')).toBeTruthy()
  })

  it('shows booking form with all required fields', () => {
    render(<AdminAttemptsTo />)
    expect(screen.getByText('Create Booking')).toBeTruthy()
    expect(screen.getByText('Select Fixture')).toBeTruthy()
    expect(screen.getByText('Select Venue')).toBeTruthy()
    expect(screen.getByText('Book Venue')).toBeTruthy()
  })

  it('displays venue availability status', () => {
    render(<AdminAttemptsTo />)
    const availableTags = screen.getAllByText('Available')
    expect(availableTags.length).toBeGreaterThan(0)
  })
})
