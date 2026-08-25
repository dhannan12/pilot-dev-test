import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlayerWithLess from './PlayerWithLess'

describe('PlayerWithLess', () => {
  it('renders without crashing', () => {
    render(<PlayerWithLess />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<PlayerWithLess />)
    expect(screen.getByText('League Table Eligibility Status')).toBeTruthy()
    expect(screen.getByText(/Players must complete at least 3 matches/i)).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<PlayerWithLess />)
    // Check for at least one mock player name
    expect(screen.getByText('Alex Thompson')).toBeTruthy()
    expect(screen.getByText('Sarah Martinez')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<PlayerWithLess />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="playerwithless"]')).toBeTruthy()
    
    // Search input
    expect(document.querySelector('[data-testid="playerwithless-search"]')).toBeTruthy()
    
    // Filter checkbox
    expect(document.querySelector('[data-testid="playerwithless-filter-ineligible"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="playerwithless-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="playerwithless-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="playerwithless-attempt-inclusion"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="playerwithless-view-profile"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="playerwithless-view-matches"]')).toBeTruthy()
  })

  it('displays eligibility information', () => {
    render(<PlayerWithLess />)
    // Check for eligibility messages
    expect(screen.getByText(/Eligibility Requirements/i)).toBeTruthy()
    expect(screen.getByText(/ensure fair rankings/i)).toBeTruthy()
  })

  it('shows player statistics', () => {
    render(<PlayerWithLess />)
    // Check that player stats are displayed
    const matchesPlayedElements = screen.getAllByText('Matches Played')
    expect(matchesPlayedElements.length).toBeGreaterThan(0)
    const recordElements = screen.getAllByText('Record')
    expect(recordElements.length).toBeGreaterThan(0)
    const pointsElements = screen.getAllByText('Points')
    expect(pointsElements.length).toBeGreaterThan(0)
  })

  it('displays warning messages for ineligible players', () => {
    render(<PlayerWithLess />)
    // Check for warning about eligibility
    const warningElements = screen.getAllByText(/Not eligible for league table/i)
    expect(warningElements.length).toBeGreaterThan(0)
  })
})
