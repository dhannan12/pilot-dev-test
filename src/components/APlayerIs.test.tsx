import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import APlayerIs from './APlayerIs'

describe('APlayerIs', () => {
  it('renders without crashing', () => {
    render(<APlayerIs />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<APlayerIs />)
    
    // Check for player names
    expect(screen.getByText('Chen Wei')).toBeTruthy()
    expect(screen.getByText('Maria Santos')).toBeTruthy()
    expect(screen.getByText('James Cooper')).toBeTruthy()
    
    // Check for seeding information
    expect(screen.getByText('Player Seeding')).toBeTruthy()
    expect(screen.getByText(/Players are seeded based on their tournament performance/i)).toBeTruthy()
  })

  it('displays performance metrics', () => {
    render(<APlayerIs />)
    
    // Check for performance stats labels
    expect(screen.getAllByText('Record').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Win Rate').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Points').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<APlayerIs />)
    
    // Main wrapper
    const wrapper = document.querySelector('[data-testid="aplayeris"]')
    expect(wrapper).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="aplayeris-list"]')
    expect(list).toBeTruthy()
    
    // List items (should have at least 5 players)
    const items = document.querySelectorAll('[data-testid="aplayeris-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // Sort buttons
    expect(document.querySelector('[data-testid="aplayeris-sort-seed"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="aplayeris-sort-wins"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="aplayeris-sort-points"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="aplayeris-sort-winrate"]')).toBeTruthy()
  })

  it('shows at least 5 players', () => {
    render(<APlayerIs />)
    const items = document.querySelectorAll('[data-testid="aplayeris-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
