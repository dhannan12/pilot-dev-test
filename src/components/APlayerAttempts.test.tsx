import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import APlayerAttempts from './APlayerAttempts'

describe('APlayerAttempts', () => {
  it('renders without crashing', () => {
    render(<APlayerAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<APlayerAttempts />)
    
    // Check for player names in the list (they appear multiple times)
    expect(screen.getAllByText('Alex Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mike Rodriguez').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emily Watson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('David Kim').length).toBeGreaterThan(0)
    
    // Check for seeding requirement text
    expect(screen.getByText(/Players must complete at least 5 matches/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<APlayerAttempts />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="aplayerattempts"]')
    expect(mainWrapper).toBeTruthy()
    
    const playerSelect = document.querySelector('[data-testid="aplayerattempts-player-select"]')
    expect(playerSelect).toBeTruthy()
    
    const submitButton = document.querySelector('[data-testid="aplayerattempts-submit"]')
    expect(submitButton).toBeTruthy()
    
    const list = document.querySelector('[data-testid="aplayerattempts-list"]')
    expect(list).toBeTruthy()
    
    const items = document.querySelectorAll('[data-testid="aplayerattempts-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows error message when player has insufficient matches', () => {
    render(<APlayerAttempts />)
    
    // Default player (Alex Chen) has 3 matches, needs 5
    const submitButton = screen.getByTestId('aplayerattempts-submit')
    fireEvent.click(submitButton)
    
    // Check for error message
    const message = screen.getByTestId('aplayerattempts-message')
    expect(message).toBeTruthy()
    expect(message.textContent).toContain('Cannot seed')
    expect(message.textContent).toContain('Insufficient matches played')
  })

  it('displays player statistics correctly', () => {
    render(<APlayerAttempts />)
    
    // Check for statistics labels
    expect(screen.getByText('Player Statistics')).toBeTruthy()
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText('Matches Played')).toBeTruthy()
    expect(screen.getByText('Wins')).toBeTruthy()
    expect(screen.getByText('Losses')).toBeTruthy()
  })

  it('shows eligibility status badge', () => {
    render(<APlayerAttempts />)
    
    // Default player has insufficient matches, should show "Ineligible"
    expect(screen.getByText('Ineligible')).toBeTruthy()
  })

  it('displays all players in the list', () => {
    render(<APlayerAttempts />)
    
    const items = document.querySelectorAll('[data-testid="aplayerattempts-item"]')
    expect(items.length).toBe(5) // 5 mock players
  })

  it('shows reset button after attempting seeding', () => {
    render(<APlayerAttempts />)
    
    const submitButton = screen.getByTestId('aplayerattempts-submit')
    fireEvent.click(submitButton)
    
    const resetButton = screen.getByTestId('aplayerattempts-reset')
    expect(resetButton).toBeTruthy()
  })
})
