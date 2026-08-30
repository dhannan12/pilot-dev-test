import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeamManagerSubmits from './TeamManagerSubmits'

describe('TeamManagerSubmits', () => {
  it('renders without crashing', () => {
    render(<TeamManagerSubmits />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<TeamManagerSubmits />)
    expect(screen.getByText('Submit Match Result')).toBeTruthy()
  })

  it('displays mock match results', () => {
    render(<TeamManagerSubmits />)
    // Check that match results are displayed (multiple instances are expected)
    expect(screen.getAllByText('Lions FC').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Tigers United').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Eagles SC').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<TeamManagerSubmits />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="teammanagersubmits"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="teammanagersubmits-manager"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-hometeam"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-awayteam"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-homescore"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-awayscore"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-notes"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="teammanagersubmits-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-reset"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="teammanagersubmits-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teammanagersubmits-item"]')).toBeTruthy()
  })

  it('displays form fields with correct labels', () => {
    render(<TeamManagerSubmits />)
    expect(screen.getByText(/Manager Name/)).toBeTruthy()
    expect(screen.getByText(/Match Date/)).toBeTruthy()
    expect(screen.getByText(/Home Team/)).toBeTruthy()
    expect(screen.getByText(/Away Team/)).toBeTruthy()
    expect(screen.getByText(/Home Score/)).toBeTruthy()
    expect(screen.getByText(/Away Score/)).toBeTruthy()
  })

  it('displays submission history section', () => {
    render(<TeamManagerSubmits />)
    expect(screen.getByText('Recent Submissions')).toBeTruthy()
  })

  it('displays status badges for match results', () => {
    render(<TeamManagerSubmits />)
    // Multiple results may have the same status
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0)
    expect(screen.getByText('Pending')).toBeTruthy()
  })
})
