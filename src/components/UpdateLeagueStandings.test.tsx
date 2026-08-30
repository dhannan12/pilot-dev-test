import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UpdateLeagueStandings from './UpdateLeagueStandings'

describe('UpdateLeagueStandings', () => {
  it('renders without crashing', () => {
    render(<UpdateLeagueStandings />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UpdateLeagueStandings />)
    // Check for team names (they appear multiple times due to selects and table)
    expect(screen.getAllByText('Thunder FC').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lightning United').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Storm City').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rapids Athletic').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Blaze SC').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Tornado FC').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cyclone Rangers').length).toBeGreaterThan(0)
    
    // Check for table headers
    expect(screen.getByText('League Standings')).toBeTruthy()
    expect(screen.getByText('Submit Match Result')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UpdateLeagueStandings />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="updateleaguestandings"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-hometeam"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-awayteam"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-homescore"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-awayscore"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="updateleaguestandings-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="updateleaguestandings-item"]').length).toBeGreaterThan(0)
  })

  it('displays standings table with correct columns', () => {
    render(<UpdateLeagueStandings />)
    
    // Check table headers
    expect(screen.getByText('Pos')).toBeTruthy()
    expect(screen.getByText('Team')).toBeTruthy()
    expect(screen.getByText('P')).toBeTruthy()
    expect(screen.getByText('W')).toBeTruthy()
    expect(screen.getByText('D')).toBeTruthy()
    expect(screen.getByText('L')).toBeTruthy()
    expect(screen.getByText('GF')).toBeTruthy()
    expect(screen.getByText('GA')).toBeTruthy()
    expect(screen.getByText('GD')).toBeTruthy()
    expect(screen.getByText('Pts')).toBeTruthy()
  })

  it('shows validation message when form is incomplete', () => {
    render(<UpdateLeagueStandings />)
    
    const submitButton = screen.getByTestId('updateleaguestandings-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please fill in all fields')).toBeTruthy()
  })

  it('resets standings when reset button is clicked', () => {
    render(<UpdateLeagueStandings />)
    
    const resetButton = screen.getByTestId('updateleaguestandings-reset')
    fireEvent.click(resetButton)
    
    expect(screen.getByText('Standings reset to initial values')).toBeTruthy()
  })
})
