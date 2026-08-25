import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CoachAttempts from './CoachAttempts'

describe('CoachAttempts', () => {
  it('renders without crashing', () => {
    render(<CoachAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CoachAttempts />)
    expect(screen.getByText('Player Statistics Access Control')).toBeTruthy()
  })

  it('displays role selection options', () => {
    render(<CoachAttempts />)
    expect(screen.getByTestId('coachattempts-role-coach')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-role-player')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-role-viewer')).toBeTruthy()
  })

  it('displays player selection dropdown', () => {
    render(<CoachAttempts />)
    const select = screen.getByTestId('coachattempts-player-select')
    expect(select).toBeTruthy()
  })

  it('displays access attempt log with mock data', () => {
    render(<CoachAttempts />)
    expect(screen.getByText('Access Attempt Log')).toBeTruthy()
    const items = screen.getAllByTestId('coachattempts-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0)
    expect(screen.getByText('Jane Doe')).toBeTruthy()
  })

  it('request access button is disabled when no player is selected', () => {
    render(<CoachAttempts />)
    const button = screen.getByTestId('coachattempts-request-access')
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('request access button is enabled when player is selected', () => {
    render(<CoachAttempts />)
    const select = screen.getByTestId('coachattempts-player-select')
    fireEvent.change(select, { target: { value: 'p1' } })
    
    const button = screen.getByTestId('coachattempts-request-access')
    expect(button.hasAttribute('disabled')).toBe(false)
  })

  it('shows statistics when coach role requests access', () => {
    render(<CoachAttempts />)
    
    // Select coach role
    const coachRadio = screen.getByTestId('coachattempts-role-coach')
    fireEvent.click(coachRadio)
    
    // Select a player
    const select = screen.getByTestId('coachattempts-player-select')
    fireEvent.change(select, { target: { value: 'p1' } })
    
    // Request access
    const button = screen.getByTestId('coachattempts-request-access')
    fireEvent.click(button)
    
    // Check if statistics are displayed
    expect(screen.getByText('Access Granted')).toBeTruthy()
    expect(screen.getByText(/Player Statistics:/)).toBeTruthy()
  })

  it('displays match analysis reports when access is granted', () => {
    render(<CoachAttempts />)
    
    // Select coach role
    const coachRadio = screen.getByTestId('coachattempts-role-coach')
    fireEvent.click(coachRadio)
    
    // Select a player
    const select = screen.getByTestId('coachattempts-player-select')
    fireEvent.change(select, { target: { value: 'p1' } })
    
    // Request access
    const button = screen.getByTestId('coachattempts-request-access')
    fireEvent.click(button)
    
    // Check for match analysis
    expect(screen.getByText('Match Analysis Reports')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CoachAttempts />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('coachattempts')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-role-coach')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-role-player')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-role-viewer')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-player-select')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-request-access')).toBeTruthy()
    expect(screen.getByTestId('coachattempts-list')).toBeTruthy()
    
    const items = screen.getAllByTestId('coachattempts-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays at least 5 access attempt records', () => {
    render(<CoachAttempts />)
    const items = screen.getAllByTestId('coachattempts-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('shows granted and denied statuses in the log', () => {
    render(<CoachAttempts />)
    const grantedElements = screen.getAllByText('granted')
    const deniedElements = screen.getAllByText('denied')
    expect(grantedElements.length).toBeGreaterThan(0)
    expect(deniedElements.length).toBeGreaterThan(0)
  })
})
