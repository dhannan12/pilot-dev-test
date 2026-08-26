import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlayersMustHave from './PlayersMustHave'

describe('PlayersMustHave', () => {
  it('renders without crashing', () => {
    render(<PlayersMustHave />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<PlayersMustHave />)
    // Check for player names in mock data
    expect(screen.getByText(/Magnus Carlsen/i)).toBeTruthy()
    expect(screen.getByText(/Hikaru Nakamura/i)).toBeTruthy()
    expect(screen.getByText(/Tournament Eligibility Requirements/i)).toBeTruthy()
  })

  it('displays minimum Elo rating requirement', () => {
    render(<PlayersMustHave />)
    expect(screen.getByText(/Minimum Elo Rating Requirement/i)).toBeTruthy()
    expect(screen.getByText(/Set Minimum Elo:/i)).toBeTruthy()
  })

  it('shows eligible and ineligible player counts', () => {
    render(<PlayersMustHave />)
    const eligibleText = screen.getAllByText(/Eligible Players:/i)
    expect(eligibleText.length).toBeGreaterThan(0)
    const ineligibleText = screen.getAllByText(/Ineligible Players:/i)
    expect(ineligibleText.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<PlayersMustHave />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="playersmusthave"]')
    expect(mainWrapper).toBeTruthy()
    
    // Input field
    const minimumEloInput = document.querySelector('[data-testid="playersmusthave-minimum-elo"]')
    expect(minimumEloInput).toBeTruthy()
    
    // Filter buttons
    const filterAllBtn = document.querySelector('[data-testid="playersmusthave-filter-all"]')
    expect(filterAllBtn).toBeTruthy()
    
    const filterEligibleBtn = document.querySelector('[data-testid="playersmusthave-filter-eligible"]')
    expect(filterEligibleBtn).toBeTruthy()
    
    const filterIneligibleBtn = document.querySelector('[data-testid="playersmusthave-filter-ineligible"]')
    expect(filterIneligibleBtn).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="playersmusthave-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="playersmusthave-item"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
