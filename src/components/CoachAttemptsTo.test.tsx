import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CoachAttemptsTo from './CoachAttemptsTo'

describe('CoachAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<CoachAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard header', () => {
    render(<CoachAttemptsTo />)
    expect(screen.getByText('Player Statistics Dashboard')).toBeTruthy()
    expect(screen.getByText('Access and analyze player performance data')).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<CoachAttemptsTo />)
    expect(screen.getByText('Marcus Johnson')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
    expect(screen.getByText('Tyler Anderson')).toBeTruthy()
  })

  it('has filter controls', () => {
    render(<CoachAttemptsTo />)
    expect(screen.getByTestId('coachattemptsto-search')).toBeTruthy()
    expect(screen.getByTestId('coachattemptsto-team')).toBeTruthy()
    expect(screen.getByTestId('coachattemptsto-position')).toBeTruthy()
  })

  it('has required data-testid attributes', async () => {
    const { container } = render(<CoachAttemptsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('coachattemptsto')).toBeTruthy()
    
    // Filter inputs
    expect(screen.getByTestId('coachattemptsto-search')).toBeTruthy()
    expect(screen.getByTestId('coachattemptsto-team')).toBeTruthy()
    expect(screen.getByTestId('coachattemptsto-position')).toBeTruthy()
    
    // Buttons (always visible)
    expect(screen.getByTestId('coachattemptsto-reset')).toBeTruthy()
    expect(screen.getByTestId('coachattemptsto-export')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('coachattemptsto-list')).toBeTruthy()
    const items = screen.getAllByTestId('coachattemptsto-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Click first player to show detail buttons
    items[0].click()
    
    // Wait for detail buttons to appear (visible only when player is selected)
    await waitFor(() => {
      expect(screen.getByTestId('coachattemptsto-compare')).toBeTruthy()
      expect(screen.getByTestId('coachattemptsto-details')).toBeTruthy()
    })
  })

  it('displays player count', () => {
    render(<CoachAttemptsTo />)
    // Should show "Players (7)" as we have 7 mock players
    expect(screen.getByText(/Players \(\d+\)/)).toBeTruthy()
  })

  it('shows empty state message when no player is selected', () => {
    render(<CoachAttemptsTo />)
    expect(screen.getByText('No Player Selected')).toBeTruthy()
    expect(screen.getByText('Select a player from the list to view detailed statistics')).toBeTruthy()
  })
})
