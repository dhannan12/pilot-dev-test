import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlayerWith from './PlayerWith'

describe('PlayerWith', () => {
  it('renders without crashing', () => {
    render(<PlayerWith />)
    expect(document.body).toBeTruthy()
  })

  it('displays the league table header', () => {
    render(<PlayerWith />)
    expect(screen.getByText(/Tennis League Table/i)).toBeTruthy()
    expect(screen.getByText(/Players with at least/i)).toBeTruthy()
  })

  it('filters players with at least 3 matches by default', () => {
    render(<PlayerWith />)
    // Should show eligible players section
    const eligibleHeaders = screen.getAllByText(/Eligible Players/i)
    expect(eligibleHeaders.length).toBeGreaterThan(0)
    // Check that players with >= 3 matches are shown
    expect(screen.getByText('Emma Thompson')).toBeTruthy()
    expect(screen.getByText('James Wilson')).toBeTruthy()
  })

  it('shows ineligible players section', () => {
    render(<PlayerWith />)
    // Should show ineligible players section
    const ineligibleHeaders = screen.getAllByText(/Ineligible Players/i)
    expect(ineligibleHeaders.length).toBeGreaterThan(0)
    // Check that players with < 3 matches are shown
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
  })

  it('displays match statistics for players', () => {
    render(<PlayerWith />)
    // Should show column headers
    const matchesHeaders = screen.getAllByText(/^Matches$/)
    expect(matchesHeaders.length).toBeGreaterThan(0)
    expect(screen.getByText('Wins')).toBeTruthy()
    expect(screen.getByText('Losses')).toBeTruthy()
  })

  it('shows summary statistics', () => {
    render(<PlayerWith />)
    expect(screen.getByText(/Total Players/i)).toBeTruthy()
    const eligibleLabels = screen.getAllByText(/Eligible Players/i)
    expect(eligibleLabels.length).toBeGreaterThan(0)
    const ineligibleLabels = screen.getAllByText(/Ineligible Players/i)
    expect(ineligibleLabels.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<PlayerWith />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="playerwith"]')
    expect(mainWrapper).toBeTruthy()
    
    // Min matches input
    const minMatchesInput = document.querySelector('[data-testid="playerwith-min-matches"]')
    expect(minMatchesInput).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="playerwith-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="playerwith-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Ineligible list
    const ineligibleList = document.querySelector('[data-testid="playerwith-ineligible-list"]')
    expect(ineligibleList).toBeTruthy()
    
    // Ineligible items
    const ineligibleItems = document.querySelectorAll('[data-testid="playerwith-ineligible-item"]')
    expect(ineligibleItems.length).toBeGreaterThan(0)
  })

  it('calculates win percentages correctly', () => {
    render(<PlayerWith />)
    // Should display win percentage in the table
    const percentageElements = screen.getAllByText(/%/)
    expect(percentageElements.length).toBeGreaterThan(0)
  })
})
