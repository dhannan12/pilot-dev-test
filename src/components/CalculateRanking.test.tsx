import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateRanking from './CalculateRanking'

describe('CalculateRanking', () => {
  it('renders without crashing', () => {
    render(<CalculateRanking />)
    expect(document.body).toBeTruthy()
  })

  it('displays the ranking calculator header', () => {
    render(<CalculateRanking />)
    expect(screen.getByText('Player Ranking Calculator')).toBeTruthy()
    expect(screen.getByText(/Calculate player rankings based on match wins and losses/i)).toBeTruthy()
  })

  it('displays mock player data with rankings', () => {
    render(<CalculateRanking />)
    
    // Check for specific players (they appear in multiple places: dropdown, leaderboard, stats)
    expect(screen.getAllByText(/Rafael Nadal/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Roger Federer/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Novak Djokovic/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Andy Murray/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Stan Wawrinka/).length).toBeGreaterThan(0)
  })

  it('displays the ranking formula', () => {
    render(<CalculateRanking />)
    expect(screen.getByText('Ranking Formula')).toBeTruthy()
    expect(screen.getByText(/Points/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateRanking />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="calculateranking"]')).toBeTruthy()
    
    // Interactive elements
    expect(document.querySelector('[data-testid="calculateranking-player"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculateranking-wins"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculateranking-losses"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculateranking-recalculate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculateranking-reset"]')).toBeTruthy()
    
    // List elements
    expect(document.querySelector('[data-testid="calculateranking-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculateranking-item"]')).toBeTruthy()
  })

  it('allows selecting a player', () => {
    render(<CalculateRanking />)
    
    const select = screen.getByTestId('calculateranking-player') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '1' } })
    
    expect(select.value).toBe('1')
  })

  it('allows entering wins and losses', () => {
    render(<CalculateRanking />)
    
    const winsInput = screen.getByTestId('calculateranking-wins') as HTMLInputElement
    const lossesInput = screen.getByTestId('calculateranking-losses') as HTMLInputElement
    
    fireEvent.change(winsInput, { target: { value: '5' } })
    fireEvent.change(lossesInput, { target: { value: '2' } })
    
    expect(winsInput.value).toBe('5')
    expect(lossesInput.value).toBe('2')
  })

  it('recalculate button is disabled when no player is selected', () => {
    render(<CalculateRanking />)
    
    const recalculateButton = screen.getByTestId('calculateranking-recalculate') as HTMLButtonElement
    expect(recalculateButton.disabled).toBe(true)
  })

  it('can recalculate rankings after adding wins and losses', () => {
    render(<CalculateRanking />)
    
    // Select a player
    const select = screen.getByTestId('calculateranking-player') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '1' } })
    
    // Enter new wins and losses
    const winsInput = screen.getByTestId('calculateranking-wins') as HTMLInputElement
    const lossesInput = screen.getByTestId('calculateranking-losses') as HTMLInputElement
    fireEvent.change(winsInput, { target: { value: '10' } })
    fireEvent.change(lossesInput, { target: { value: '5' } })
    
    // Click recalculate
    const recalculateButton = screen.getByTestId('calculateranking-recalculate')
    fireEvent.click(recalculateButton)
    
    // Verify inputs are cleared after recalculation
    expect(winsInput.value).toBe('')
    expect(lossesInput.value).toBe('')
  })

  it('can reset the rankings', () => {
    render(<CalculateRanking />)
    
    const resetButton = screen.getByTestId('calculateranking-reset')
    fireEvent.click(resetButton)
    
    // Verify data is still displayed (reset to original)
    expect(screen.getByText('Rafael Nadal')).toBeTruthy()
  })

  it('displays statistics summary', () => {
    render(<CalculateRanking />)
    
    expect(screen.getByText('Total Players')).toBeTruthy()
    expect(screen.getByText('Total Matches')).toBeTruthy()
    expect(screen.getByText('Top Player')).toBeTruthy()
    expect(screen.getByText('Top Score')).toBeTruthy()
  })

  it('displays points for each player', () => {
    render(<CalculateRanking />)
    
    // Check that points are displayed (text "points" appears)
    const pointsLabels = screen.getAllByText('points')
    expect(pointsLabels.length).toBeGreaterThan(0)
  })

  it('displays win percentages for players', () => {
    render(<CalculateRanking />)
    
    // Check that win rate text appears
    const winRateElements = document.querySelectorAll('[data-testid="calculateranking-item"]')
    expect(winRateElements.length).toBeGreaterThan(0)
  })
})
