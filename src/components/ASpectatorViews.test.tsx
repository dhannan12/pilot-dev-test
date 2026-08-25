import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ASpectatorViews from './ASpectatorViews'

describe('ASpectatorViews', () => {
  it('renders without crashing', () => {
    render(<ASpectatorViews />)
    expect(document.body).toBeTruthy()
  })

  it('displays the tournament title', () => {
    render(<ASpectatorViews />)
    expect(screen.getByText(/Match Schedule & Scores/i)).toBeTruthy()
    expect(screen.getByText(/Table Tennis Tournament 2026/i)).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<ASpectatorViews />)
    // Check for player names
    expect(screen.getByText('Chen Wei')).toBeTruthy()
    expect(screen.getByText('Li Na')).toBeTruthy()
    expect(screen.getByText('Zhang Ming')).toBeTruthy()
    expect(screen.getByText('Wang Hao')).toBeTruthy()
    expect(screen.getByText('Liu Yang')).toBeTruthy()
  })

  it('displays match scores for completed and in-progress matches', () => {
    render(<ASpectatorViews />)
    const { container } = render(<ASpectatorViews />)
    // Check that scores are displayed
    const scoreElements = container.querySelectorAll('.text-2xl')
    expect(scoreElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<ASpectatorViews />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="aspectatorviews"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="aspectatorviews-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items (should have multiple)
    const listItems = document.querySelectorAll('[data-testid="aspectatorviews-item"]')
    expect(listItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays match status badges', () => {
    render(<ASpectatorViews />)
    expect(screen.getAllByText('Final').length).toBeGreaterThan(0)
    expect(screen.getByText('Live')).toBeTruthy()
    expect(screen.getAllByText('Upcoming').length).toBeGreaterThan(0)
  })

  it('displays round information', () => {
    render(<ASpectatorViews />)
    expect(screen.getAllByText('Round 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Round 2').length).toBeGreaterThan(0)
    expect(screen.getByText('Quarterfinals')).toBeTruthy()
  })
})
