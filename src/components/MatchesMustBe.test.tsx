import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MatchesMustBe from './MatchesMustBe'

describe('MatchesMustBe', () => {
  it('renders without crashing', () => {
    render(<MatchesMustBe />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<MatchesMustBe />)
    // Check for player names from mock data
    expect(screen.getByText(/Magnus Carlsen/)).toBeTruthy()
    expect(screen.getByText(/Hikaru Nakamura/)).toBeTruthy()
    expect(screen.getByText(/Fabiano Caruana/)).toBeTruthy()
  })

  it('displays 24-hour policy information', () => {
    render(<MatchesMustBe />)
    expect(screen.getByText(/All matches must be scheduled at least 24 hours in advance/)).toBeTruthy()
    expect(screen.getByText(/Minimum 24 hours advance notice required/)).toBeTruthy()
  })

  it('renders scheduling form with all inputs', () => {
    render(<MatchesMustBe />)
    expect(screen.getByText('Schedule New Match')).toBeTruthy()
    const playerInputs = screen.getAllByPlaceholderText('Enter player name')
    expect(playerInputs.length).toBe(2)
  })

  it('has required data-testid attributes', () => {
    render(<MatchesMustBe />)
    // Main wrapper
    expect(document.querySelector('[data-testid="matchesmustbe"]')).toBeTruthy()
    // Form inputs
    expect(document.querySelector('[data-testid="matchesmustbe-player1"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchesmustbe-player2"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchesmustbe-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchesmustbe-time"]')).toBeTruthy()
    // Submit button
    expect(document.querySelector('[data-testid="matchesmustbe-submit"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="matchesmustbe-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="matchesmustbe-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays upcoming matches list', () => {
    render(<MatchesMustBe />)
    expect(screen.getByText('Upcoming Matches')).toBeTruthy()
    // Should display at least 5 mock matches
    const matchItems = document.querySelectorAll('[data-testid="matchesmustbe-item"]')
    expect(matchItems.length).toBeGreaterThanOrEqual(5)
  })

  it('shows match status indicators', () => {
    render(<MatchesMustBe />)
    // Check for status badges
    expect(screen.getAllByText('Valid').length).toBeGreaterThan(0)
  })
})
