import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildTournamentProgress from './BuildTournamentProgress'

describe('BuildTournamentProgress', () => {
  it('renders without crashing', () => {
    render(<BuildTournamentProgress />)
    expect(document.body).toBeTruthy()
  })

  it('displays tournament progress header', () => {
    render(<BuildTournamentProgress />)
    expect(screen.getByText('Tournament Progress')).toBeTruthy()
    expect(screen.getByText('Live updates and match results')).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<BuildTournamentProgress />)
    expect(screen.getByText('Rafael Nadal')).toBeTruthy()
    expect(screen.getByText('Novak Djokovic')).toBeTruthy()
    expect(screen.getByText('Roger Federer')).toBeTruthy()
    expect(screen.getByText('Carlos Alcaraz')).toBeTruthy()
  })

  it('displays live updates', () => {
    render(<BuildTournamentProgress />)
    expect(screen.getByText('Live Updates')).toBeTruthy()
    expect(screen.getByText(/Rafael Nadal defeats Novak Djokovic/)).toBeTruthy()
  })

  it('displays statistics section', () => {
    render(<BuildTournamentProgress />)
    expect(screen.getByText('Statistics')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Scheduled')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildTournamentProgress />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="buildtournamentprogress"]')).toBeTruthy()
    
    // Round filter select
    expect(document.querySelector('[data-testid="buildtournamentprogress-round-filter"]')).toBeTruthy()
    
    // Updates list and items
    expect(document.querySelector('[data-testid="buildtournamentprogress-updates-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="buildtournamentprogress-update-item"]').length).toBeGreaterThan(0)
    
    // Matches list and items
    expect(document.querySelector('[data-testid="buildtournamentprogress-matches-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="buildtournamentprogress-match-item"]').length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="buildtournamentprogress-refresh"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildtournamentprogress-schedule"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildtournamentprogress-standings"]')).toBeTruthy()
  })

  it('displays match details including round and court', () => {
    render(<BuildTournamentProgress />)
    expect(screen.getAllByText('Final').length).toBeGreaterThan(0)
    const centerCourtMatches = screen.getAllByText(/Center Court/)
    expect(centerCourtMatches.length).toBeGreaterThan(0)
  })
})
