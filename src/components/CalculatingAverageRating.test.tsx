import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculatingAverageRating from './CalculatingAverageRating'

describe('CalculatingAverageRating', () => {
  it('renders without crashing', () => {
    render(<CalculatingAverageRating />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component heading', () => {
    render(<CalculatingAverageRating />)
    expect(screen.getByText(/Yacht Rating Calculator/i)).toBeTruthy()
  })

  it('displays mock yacht data', () => {
    render(<CalculatingAverageRating />)
    // Check for yacht names
    expect(screen.getByText(/Ocean Dream/i)).toBeTruthy()
    expect(screen.getByText(/Wave Rider/i)).toBeTruthy()
    expect(screen.getByText(/Sea Breeze/i)).toBeTruthy()
  })

  it('calculates and displays average rating', () => {
    render(<CalculatingAverageRating />)
    expect(screen.getByText(/Fleet Average Rating/i)).toBeTruthy()
    // Average should be displayed
    const avgElements = screen.getAllByText(/4\.\d{2}/)
    expect(avgElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CalculatingAverageRating />)
    // Main wrapper
    expect(document.querySelector('[data-testid="calculatingaveragerating"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="calculatingaveragerating-list"]')).toBeTruthy()
    // List items (should have multiple)
    const items = document.querySelectorAll('[data-testid="calculatingaveragerating-item"]')
    expect(items.length).toBeGreaterThan(4) // At least 5 items
    // View button
    expect(document.querySelector('[data-testid="calculatingaveragerating-view"]')).toBeTruthy()
  })

  it('displays rating distribution section', () => {
    render(<CalculatingAverageRating />)
    expect(screen.getByText(/Rating Distribution/i)).toBeTruthy()
  })

  it('shows total reviews count', () => {
    render(<CalculatingAverageRating />)
    expect(screen.getByText(/Total Reviews/i)).toBeTruthy()
  })
})
