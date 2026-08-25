import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DoublesTeamLogs from './DoublesTeamLogs'

describe('DoublesTeamLogs', () => {
  it('renders without crashing', () => {
    render(<DoublesTeamLogs />)
    expect(document.body).toBeTruthy()
  })

  it('displays component title and description', () => {
    render(<DoublesTeamLogs />)
    expect(screen.getByText('Doubles Team Match Logs')).toBeTruthy()
    expect(screen.getByText(/Track and log match results separately/i)).toBeTruthy()
  })

  it('displays mock team data', () => {
    render(<DoublesTeamLogs />)
    // Check for team names
    expect(screen.getByText('Team Thunder')).toBeTruthy()
    expect(screen.getByText('Team Lightning')).toBeTruthy()
    expect(screen.getByText('Team Phoenix')).toBeTruthy()
  })

  it('displays match results for teams', () => {
    render(<DoublesTeamLogs />)
    // Check for opponents in match results
    expect(screen.getByText(/Team Ace/i)).toBeTruthy()
    expect(screen.getByText(/Team Swift/i)).toBeTruthy()
  })

  it('shows match logging form', () => {
    render(<DoublesTeamLogs />)
    expect(screen.getByText('Select Team')).toBeTruthy()
    expect(screen.getByText('Opponent Team')).toBeTruthy()
    expect(screen.getByTestId('doublesteamlogs-submit')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DoublesTeamLogs />)
    
    // Main wrapper
    expect(screen.getByTestId('doublesteamlogs')).toBeTruthy()
    
    // Form fields
    expect(screen.getByTestId('doublesteamlogs-team')).toBeTruthy()
    expect(screen.getByTestId('doublesteamlogs-opponent')).toBeTruthy()
    expect(screen.getByTestId('doublesteamlogs-score')).toBeTruthy()
    expect(screen.getByTestId('doublesteamlogs-result')).toBeTruthy()
    expect(screen.getByTestId('doublesteamlogs-notes')).toBeTruthy()
    
    // Submit button
    expect(screen.getByTestId('doublesteamlogs-submit')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('doublesteamlogs-list')).toBeTruthy()
    const items = screen.getAllByTestId('doublesteamlogs-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays team statistics', () => {
    render(<DoublesTeamLogs />)
    // Check for win-loss records
    const winLossPatterns = screen.getAllByText(/\dW - \dL/)
    expect(winLossPatterns.length).toBeGreaterThan(0)
  })
})
