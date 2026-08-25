import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateRankingFor from './CalculateRankingFor'

describe('CalculateRankingFor', () => {
  it('renders without crashing', () => {
    render(<CalculateRankingFor />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Player Rankings')).toBeTruthy()
    expect(screen.getByText('Calculate rankings based on wins and losses')).toBeTruthy()
  })

  it('displays mock player data with rankings', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Alex Martinez')).toBeTruthy()
    expect(screen.getByText('Jordan Lee')).toBeTruthy()
    expect(screen.getByText('Taylor Smith')).toBeTruthy()
  })

  it('displays leaderboard section', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Leaderboard')).toBeTruthy()
  })

  it('displays player details section', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Player Details')).toBeTruthy()
  })

  it('displays statistics section', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Statistics')).toBeTruthy()
  })

  it('shows placeholder message when no player is selected', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Select a player to view details')).toBeTruthy()
  })

  it('displays player details when a player item is clicked', () => {
    render(<CalculateRankingFor />)
    const playerItems = screen.getAllByTestId('calculaterankingfor-item')
    fireEvent.click(playerItems[0])
    expect(screen.getByText('Current Ranking')).toBeTruthy()
    expect(screen.getByText('Total Matches')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateRankingFor />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="calculaterankingfor"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="calculaterankingfor-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="calculaterankingfor-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify all required testids exist
    expect(document.querySelectorAll('[data-testid]').length).toBeGreaterThan(3)
  })

  it('displays clear button when player is selected', () => {
    render(<CalculateRankingFor />)
    const playerItems = screen.getAllByTestId('calculaterankingfor-item')
    fireEvent.click(playerItems[0])
    
    const clearButton = screen.getByTestId('calculaterankingfor-clear')
    expect(clearButton).toBeTruthy()
    expect(clearButton.textContent).toBe('Clear Selection')
  })

  it('clears selection when clear button is clicked', () => {
    render(<CalculateRankingFor />)
    const playerItems = screen.getAllByTestId('calculaterankingfor-item')
    fireEvent.click(playerItems[0])
    
    const clearButton = screen.getByTestId('calculaterankingfor-clear')
    fireEvent.click(clearButton)
    
    expect(screen.getByText('Select a player to view details')).toBeTruthy()
  })

  it('displays win and loss statistics for players', () => {
    render(<CalculateRankingFor />)
    // Check that wins and losses are displayed in the format "XXW" and "XXL"
    const winsElements = screen.getAllByText(/\d+W/)
    const lossesElements = screen.getAllByText(/\d+L/)
    expect(winsElements.length).toBeGreaterThan(0)
    expect(lossesElements.length).toBeGreaterThan(0)
  })

  it('calculates and displays win rates', () => {
    render(<CalculateRankingFor />)
    // Win rates should be displayed as percentages
    const winRates = screen.getAllByText(/%/)
    expect(winRates.length).toBeGreaterThan(0)
  })

  it('displays total statistics correctly', () => {
    render(<CalculateRankingFor />)
    expect(screen.getByText('Total Players')).toBeTruthy()
    expect(screen.getByText('Total Wins')).toBeTruthy()
    expect(screen.getByText('Total Losses')).toBeTruthy()
    expect(screen.getByText('Avg Win Rate')).toBeTruthy()
  })
})
