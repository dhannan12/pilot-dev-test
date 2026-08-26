import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EloRatingsAre from './EloRatingsAre'

describe('EloRatingsAre', () => {
  it('renders without crashing', () => {
    render(<EloRatingsAre />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<EloRatingsAre />)
    // Players may appear multiple times (in rankings and matches)
    expect(screen.getAllByText('Magnus Carlsen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hikaru Nakamura').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fabiano Caruana').length).toBeGreaterThan(0)
  })

  it('displays current rankings header', () => {
    render(<EloRatingsAre />)
    expect(screen.getByText('Current Rankings')).toBeTruthy()
    expect(screen.getByText('Recent Matches')).toBeTruthy()
  })

  it('displays elo rating system explanation', () => {
    render(<EloRatingsAre />)
    expect(screen.getByText('How Elo Ratings Work')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<EloRatingsAre />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="eloratingsare"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="eloratingsare-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="eloratingsare-matches-list"]')).toBeTruthy()
    
    // Items
    const items = document.querySelectorAll('[data-testid="eloratingsare-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    const matchItems = document.querySelectorAll('[data-testid="eloratingsare-match-item"]')
    expect(matchItems.length).toBeGreaterThan(0)
  })

  it('opens match details modal when clicking a match', () => {
    render(<EloRatingsAre />)
    
    const matchButtons = document.querySelectorAll('[data-testid="eloratingsare-match-item"]')
    expect(matchButtons.length).toBeGreaterThan(0)
    
    fireEvent.click(matchButtons[0])
    
    const modal = document.querySelector('[data-testid="eloratingsare-modal"]')
    expect(modal).toBeTruthy()
    expect(screen.getByText('Match Details')).toBeTruthy()
  })

  it('closes modal when clicking close button', () => {
    render(<EloRatingsAre />)
    
    // Open modal
    const matchButtons = document.querySelectorAll('[data-testid="eloratingsare-match-item"]')
    fireEvent.click(matchButtons[0])
    
    // Verify modal is open
    expect(document.querySelector('[data-testid="eloratingsare-modal"]')).toBeTruthy()
    
    // Close modal
    const closeButton = document.querySelector('[data-testid="eloratingsare-close"]')
    expect(closeButton).toBeTruthy()
    fireEvent.click(closeButton!)
    
    // Verify modal is closed
    expect(document.querySelector('[data-testid="eloratingsare-modal"]')).toBeFalsy()
  })

  it('displays rating changes in matches', () => {
    render(<EloRatingsAre />)
    
    // Check for rating change indicators (+ or -)
    const matchItems = document.querySelectorAll('[data-testid="eloratingsare-match-item"]')
    expect(matchItems.length).toBeGreaterThan(0)
    
    // Should show rating changes with + or - signs
    expect(document.body.textContent).toContain('+')
  })

  it('has understand button in modal', () => {
    render(<EloRatingsAre />)
    
    // Open modal
    const matchButtons = document.querySelectorAll('[data-testid="eloratingsare-match-item"]')
    fireEvent.click(matchButtons[0])
    
    const understandButton = document.querySelector('[data-testid="eloratingsare-understand"]')
    expect(understandButton).toBeTruthy()
  })
})
