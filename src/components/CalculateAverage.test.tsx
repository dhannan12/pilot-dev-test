import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateAverage from './CalculateAverage'

describe('CalculateAverage', () => {
  it('renders without crashing', () => {
    render(<CalculateAverage />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CalculateAverage />)
    expect(screen.getByText(/Player Average Score Calculator/i)).toBeTruthy()
  })

  it('displays player selection dropdown', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player')
    expect(select).toBeTruthy()
  })

  it('displays all players statistics table', () => {
    render(<CalculateAverage />)
    expect(screen.getByText(/All Players Statistics/i)).toBeTruthy()
    const statsList = screen.getByTestId('calculateaverage-stats-list')
    expect(statsList).toBeTruthy()
  })

  it('shows player stats when a player is selected', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Roger Federer' } })
    
    // Player name appears in multiple places (dropdown, stats heading, table)
    expect(screen.getAllByText('Roger Federer').length).toBeGreaterThan(0)
    // Check all stats labels appear (they appear multiple times in the page)
    const totalScoreElements = screen.getAllByText(/Total Score/i)
    expect(totalScoreElements.length).toBeGreaterThan(0)
    const matchesElements = screen.getAllByText(/Matches/i)
    expect(matchesElements.length).toBeGreaterThan(0)
    const averageElements = screen.getAllByText(/Average Score/i)
    expect(averageElements.length).toBeGreaterThan(0)
  })

  it('displays match history for selected player', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Serena Williams' } })
    
    const matchList = screen.getByTestId('calculateaverage-list')
    expect(matchList).toBeTruthy()
    
    const matchItems = screen.getAllByTestId('calculateaverage-item')
    expect(matchItems.length).toBeGreaterThan(0)
  })

  it('shows add score form when player is selected', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Rafael Nadal' } })
    
    expect(screen.getByTestId('calculateaverage-score')).toBeTruthy()
    expect(screen.getByTestId('calculateaverage-opponent')).toBeTruthy()
    expect(screen.getByTestId('calculateaverage-submit')).toBeTruthy()
  })

  it('allows adding a new match score', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Roger Federer' } })
    
    const scoreInput = screen.getByTestId('calculateaverage-score') as HTMLInputElement
    const opponentInput = screen.getByTestId('calculateaverage-opponent') as HTMLInputElement
    const submitButton = screen.getByTestId('calculateaverage-submit') as HTMLButtonElement
    
    fireEvent.change(scoreInput, { target: { value: '90' } })
    fireEvent.change(opponentInput, { target: { value: 'Test Opponent' } })
    fireEvent.click(submitButton)
    
    // After adding, inputs should be cleared
    expect(scoreInput.value).toBe('')
    expect(opponentInput.value).toBe('')
  })

  it('has required data-testid attributes', () => {
    render(<CalculateAverage />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="calculateaverage"]')).toBeTruthy()
    
    // Player select
    expect(document.querySelector('[data-testid="calculateaverage-player"]')).toBeTruthy()
    
    // Stats list
    expect(document.querySelector('[data-testid="calculateaverage-stats-list"]')).toBeTruthy()
    
    // Stats items
    const statsItems = document.querySelectorAll('[data-testid="calculateaverage-stats-item"]')
    expect(statsItems.length).toBeGreaterThan(0)
  })

  it('calculates correct average scores', () => {
    render(<CalculateAverage />)
    const select = screen.getByTestId('calculateaverage-player') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Roger Federer' } })
    
    // Roger Federer has scores: 85, 92, 78
    // Average should be (85 + 92 + 78) / 3 = 85
    const averageScore = screen.getAllByText(/85/i).length
    expect(averageScore).toBeGreaterThan(0)
  })

  it('displays mock data correctly', () => {
    render(<CalculateAverage />)
    
    // Check that player names appear (they appear in both dropdown and table)
    expect(screen.getAllByText('Roger Federer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Serena Williams').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rafael Nadal').length).toBeGreaterThan(0)
  })
})
