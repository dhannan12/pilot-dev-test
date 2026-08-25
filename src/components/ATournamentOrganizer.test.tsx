import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ATournamentOrganizer from './ATournamentOrganizer'

describe('ATournamentOrganizer', () => {
  it('renders without crashing', () => {
    render(<ATournamentOrganizer />)
    expect(document.body).toBeTruthy()
  })

  it('displays tournament creation form', () => {
    render(<ATournamentOrganizer />)
    expect(screen.getByText(/Tournament Bracket Manager/i)).toBeTruthy()
    expect(screen.getByText(/Create New Tournament/i)).toBeTruthy()
  })

  it('displays mock players for selection', () => {
    render(<ATournamentOrganizer />)
    expect(screen.getByText(/Alice Chen/i)).toBeTruthy()
    expect(screen.getByText(/Bob Martinez/i)).toBeTruthy()
    expect(screen.getByText(/Charlie Johnson/i)).toBeTruthy()
    expect(screen.getByText(/Diana Wu/i)).toBeTruthy()
    expect(screen.getByText(/Erik Larsson/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ATournamentOrganizer />)
    
    // Main wrapper
    expect(screen.getByTestId('atournamentorganizer')).toBeTruthy()
    
    // Tournament name input
    expect(screen.getByTestId('atournamentorganizer-name')).toBeTruthy()
    
    // Create bracket button
    expect(screen.getByTestId('atournamentorganizer-create')).toBeTruthy()
    
    // Player list container
    expect(screen.getByTestId('atournamentorganizer-list')).toBeTruthy()
    
    // Player items (should have at least 5)
    const items = screen.getAllByTestId('atournamentorganizer-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays all required interactive elements with data-testid', () => {
    render(<ATournamentOrganizer />)
    
    // Verify all main interactive elements have testids
    expect(document.querySelector('[data-testid="atournamentorganizer"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="atournamentorganizer-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="atournamentorganizer-create"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="atournamentorganizer-list"]')).toBeTruthy()
    
    const items = document.querySelectorAll('[data-testid="atournamentorganizer-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
