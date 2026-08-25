import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LeagueTableUpdates from './LeagueTableUpdates'

describe('LeagueTableUpdates', () => {
  it('renders without crashing', () => {
    render(<LeagueTableUpdates />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<LeagueTableUpdates />)
    expect(screen.getByText('League Table Updates')).toBeTruthy()
  })

  it('displays mock team data in the table', () => {
    render(<LeagueTableUpdates />)
    expect(screen.getAllByText('Manchester City').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Arsenal').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Liverpool').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Chelsea').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Newcastle United').length).toBeGreaterThan(0)
  })

  it('displays recent match results', () => {
    render(<LeagueTableUpdates />)
    expect(screen.getByText('Recent Results')).toBeTruthy()
    expect(screen.getAllByText('Tottenham').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<LeagueTableUpdates />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="leaguetableupdates"]')).toBeTruthy()
    
    // Match list
    expect(document.querySelector('[data-testid="leaguetableupdates-matches-list"]')).toBeTruthy()
    
    // Match items
    const matchItems = document.querySelectorAll('[data-testid="leaguetableupdates-match-item"]')
    expect(matchItems.length).toBeGreaterThan(0)
    
    // League table
    expect(document.querySelector('[data-testid="leaguetableupdates-table"]')).toBeTruthy()
    
    // Table body
    expect(document.querySelector('[data-testid="leaguetableupdates-table-body"]')).toBeTruthy()
    
    // Table rows
    const tableRows = document.querySelectorAll('[data-testid="leaguetableupdates-table-row"]')
    expect(tableRows.length).toBeGreaterThan(0)
  })

  it('displays table headers correctly', () => {
    render(<LeagueTableUpdates />)
    expect(screen.getByText('Pos')).toBeTruthy()
    expect(screen.getByText('Team')).toBeTruthy()
    expect(screen.getByText('Pts')).toBeTruthy()
  })

  it('displays legend information', () => {
    render(<LeagueTableUpdates />)
    expect(screen.getByText('Legend')).toBeTruthy()
    expect(screen.getByText('Played')).toBeTruthy()
    expect(screen.getByText('Goals For')).toBeTruthy()
  })
})
