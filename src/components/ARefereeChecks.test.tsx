import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ARefereeChecks from './ARefereeChecks'

describe('ARefereeChecks', () => {
  it('renders without crashing', () => {
    render(<ARefereeChecks />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with match information', () => {
    render(<ARefereeChecks />)
    // Check for component heading
    expect(screen.getByText('Referee Score Dashboard')).toBeTruthy()
    // Check for player names from mock data
    expect(screen.getByText('Zhang Wei')).toBeTruthy()
    expect(screen.getByText('Li Ming')).toBeTruthy()
    expect(screen.getByText('Wang Fang')).toBeTruthy()
    // Check for court numbers
    expect(screen.getByText('Court 1')).toBeTruthy()
    expect(screen.getByText('Court 2')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ARefereeChecks />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('arefereechecks')).toBeTruthy()
    expect(screen.getByTestId('arefereechecks-filter')).toBeTruthy()
    expect(screen.getByTestId('arefereechecks-refresh')).toBeTruthy()
    expect(screen.getByTestId('arefereechecks-list')).toBeTruthy()
    
    // Check for multiple match items
    const items = screen.getAllByTestId('arefereechecks-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Check for view buttons
    const viewButtons = screen.getAllByTestId('arefereechecks-view')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays match status badges', () => {
    render(<ARefereeChecks />)
    // Check for status indicators (using getAllByText since multiple matches can have same status)
    expect(screen.getAllByText('Live').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Finished').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Paused').length).toBeGreaterThan(0)
  })

  it('displays match summary statistics', () => {
    render(<ARefereeChecks />)
    expect(screen.getByText('Match Summary')).toBeTruthy()
    expect(screen.getByText('Live Matches')).toBeTruthy()
    expect(screen.getByText('Total Matches')).toBeTruthy()
  })
})
