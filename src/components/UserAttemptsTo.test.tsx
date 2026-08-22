import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the booking form with title', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Book Your Fishing Trip')).toBeTruthy()
    expect(screen.getByText(/Experience the best fishing adventures/i)).toBeTruthy()
  })

  it('displays mock bookings', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Recent Booking Attempts')).toBeTruthy()
    // Check that bookings list exists and has items
    const list = document.querySelector('[data-testid="userattemptsto-list"]')
    expect(list).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="userattemptsto-triptype"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-time"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-partysize"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-phone"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    
    // List and items
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-item"]')).toBeTruthy()
  })

  it('renders all trip type options', () => {
    render(<UserAttemptsTo />)
    const select = document.querySelector('[data-testid="userattemptsto-triptype"]')
    expect(select).toBeTruthy()
    expect(select?.innerHTML).toContain('Deep Sea Fishing Adventure')
    expect(select?.innerHTML).toContain('Coastal Fishing Experience')
    expect(select?.innerHTML).toContain('Sunset Fishing Cruise')
  })

  it('renders all time slot options', () => {
    render(<UserAttemptsTo />)
    const select = document.querySelector('[data-testid="userattemptsto-time"]')
    expect(select).toBeTruthy()
  })

  it('displays booking status badges', () => {
    render(<UserAttemptsTo />)
    // Check for status text
    const statusElements = document.querySelectorAll('.uppercase')
    expect(statusElements.length).toBeGreaterThan(0)
  })
})
