import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WillBe from './WillBe'

describe('WillBe', () => {
  it('renders without crashing', () => {
    render(<WillBe />)
    expect(document.body).toBeTruthy()
  })

  it('displays tournament standings heading', () => {
    render(<WillBe />)
    expect(screen.getByText(/Tournament Standings/i)).toBeTruthy()
  })

  it('displays tie-breaker rules', () => {
    render(<WillBe />)
    expect(screen.getByText(/Tie-Breaker Rules/i)).toBeTruthy()
    expect(screen.getByText(/Buchholz Score/i)).toBeTruthy()
    expect(screen.getAllByText(/Sonneborn-Berger/i).length).toBeGreaterThan(0)
  })

  it('displays mock player data', () => {
    render(<WillBe />)
    expect(screen.getByText(/Alexandra Chen/i)).toBeTruthy()
    expect(screen.getByText(/Boris Ivanov/i)).toBeTruthy()
    expect(screen.getByText(/Carlos Martinez/i)).toBeTruthy()
  })

  it('shows tie-breaker applied indicators for players with same score', () => {
    render(<WillBe />)
    const tieIndicators = screen.getAllByText(/Tie-breaker applied/i)
    expect(tieIndicators.length).toBeGreaterThan(0)
  })

  it('displays player scores and rankings', () => {
    render(<WillBe />)
    const scores = screen.getAllByText('7.5')
    expect(scores.length).toBe(2) // Two players with 7.5
    expect(screen.getByText('Final Rankings')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<WillBe />)
    // Main wrapper
    expect(document.querySelector('[data-testid="willbe"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="willbe-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="willbe-item"]')
    expect(items.length).toBeGreaterThan(0)
    // Rankings list
    expect(document.querySelector('[data-testid="willbe-rankings-list"]')).toBeTruthy()
    // Ranking items
    const rankingItems = document.querySelectorAll('[data-testid="willbe-ranking-item"]')
    expect(rankingItems.length).toBeGreaterThan(0)
  })
})
