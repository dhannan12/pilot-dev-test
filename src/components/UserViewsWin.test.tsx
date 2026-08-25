import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViewsWin from './UserViewsWin'

describe('UserViewsWin', () => {
  it('renders without crashing', () => {
    render(<UserViewsWin />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<UserViewsWin />)
    // Check for opponent names from mock data
    expect(screen.getByText('Team Alpha')).toBeTruthy()
    expect(screen.getByText('Team Beta')).toBeTruthy()
    expect(screen.getByText('Team Gamma')).toBeTruthy()
    expect(screen.getByText('Team Delta')).toBeTruthy()
    expect(screen.getByText('Team Epsilon')).toBeTruthy()
  })

  it('displays win percentage statistics', () => {
    render(<UserViewsWin />)
    // Check that win percentage is calculated and displayed
    expect(screen.getByText('Win %')).toBeTruthy()
    // With 4 wins out of 7 matches, should be 57.1%
    expect(screen.getByText('57.1%')).toBeTruthy()
  })

  it('displays match results breakdown', () => {
    render(<UserViewsWin />)
    // Check for stats cards
    expect(screen.getByText('Total Matches')).toBeTruthy()
    expect(screen.getByText('Wins')).toBeTruthy()
    expect(screen.getByText('Losses')).toBeTruthy()
    expect(screen.getByText('Draws')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsWin />)
    // Verify key testids exist — Playwright QA depends on these
    
    // Main wrapper
    const wrapper = document.querySelector('[data-testid="userviewswin"]')
    expect(wrapper).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="userviewswin-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="userviewswin-item"]')
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBe(7) // Should have 7 match items
  })
})
