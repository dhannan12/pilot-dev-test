import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksThe from './UserChecksThe'

describe('UserChecksThe', () => {
  it('renders without crashing', () => {
    render(<UserChecksThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the Schedule of Events title', () => {
    render(<UserChecksThe />)
    expect(screen.getByText('Schedule of Events')).toBeTruthy()
  })

  it('displays mock event data', () => {
    render(<UserChecksThe />)
    // Check that at least some event titles are present
    expect(screen.getByText('Ancient Ireland: A Journey Through Time')).toBeTruthy()
    expect(screen.getByText('Textile Arts of County Louth')).toBeTruthy()
    expect(screen.getByText('Maritime Heritage Talk')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksThe />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userchecksthe"]')).toBeTruthy()
    // Category filter
    expect(document.querySelector('[data-testid="userchecksthe-category"]')).toBeTruthy()
    // Event list container
    expect(document.querySelector('[data-testid="userchecksthe-list"]')).toBeTruthy()
    // Event items
    expect(document.querySelectorAll('[data-testid="userchecksthe-item"]').length).toBeGreaterThan(0)
    // Book buttons
    expect(document.querySelectorAll('[data-testid="userchecksthe-book"]').length).toBeGreaterThan(0)
  })

  it('displays category filter', () => {
    render(<UserChecksThe />)
    const categorySelect = screen.getByLabelText('Filter by Category')
    expect(categorySelect).toBeTruthy()
  })

  it('displays multiple events', () => {
    render(<UserChecksThe />)
    const eventItems = document.querySelectorAll('[data-testid="userchecksthe-item"]')
    // Should have at least 5 mock events
    expect(eventItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays event details including location and time', () => {
    render(<UserChecksThe />)
    expect(screen.getByText('Main Gallery')).toBeTruthy()
    expect(screen.getByText('10:00 AM - 11:30 AM')).toBeTruthy()
  })

  it('displays Book Now buttons', () => {
    render(<UserChecksThe />)
    const bookButtons = screen.getAllByText(/Book Now|Sold Out/)
    expect(bookButtons.length).toBeGreaterThan(0)
  })
})
