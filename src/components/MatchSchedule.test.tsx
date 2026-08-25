import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MatchSchedule from './MatchSchedule'

describe('MatchSchedule', () => {
  it('renders without crashing', () => {
    render(<MatchSchedule />)
    expect(document.body).toBeTruthy()
  })

  it('displays component title and warning message', () => {
    render(<MatchSchedule />)
    expect(screen.getByText('Match Schedule')).toBeTruthy()
    expect(screen.getByText(/Match schedules must be confirmed at least 24 hours/i)).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<MatchSchedule />)
    expect(screen.getByText(/Rafael Nadal/i)).toBeTruthy()
    expect(screen.getByText(/Roger Federer/i)).toBeTruthy()
    expect(screen.getByText(/Serena Williams/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MatchSchedule />)
    // Main wrapper
    expect(document.querySelector('[data-testid="matchschedule"]')).toBeTruthy()
    // Filter select
    expect(document.querySelector('[data-testid="matchschedule-filter"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="matchschedule-list"]')).toBeTruthy()
    // List items
    expect(document.querySelector('[data-testid="matchschedule-item"]')).toBeTruthy()
    // Confirm buttons (at least one should exist for matches that can be confirmed)
    expect(document.querySelector('[data-testid="matchschedule-confirm"]')).toBeTruthy()
  })

  it('filters matches by status', () => {
    render(<MatchSchedule />)
    const filterSelect = screen.getByTestId('matchschedule-filter')
    
    // Filter to confirmed only
    fireEvent.change(filterSelect, { target: { value: 'confirmed' } })
    expect(screen.getByText(/Serena Williams/i)).toBeTruthy()
    
    // Filter to pending only
    fireEvent.change(filterSelect, { target: { value: 'pending' } })
    expect(screen.getByText(/Rafael Nadal/i)).toBeTruthy()
    
    // Show all
    fireEvent.change(filterSelect, { target: { value: 'all' } })
    expect(screen.getByText(/Rafael Nadal/i)).toBeTruthy()
  })

  it('shows correct status badges for matches', () => {
    render(<MatchSchedule />)
    // Should have confirmed matches
    const confirmedBadges = screen.getAllByText(/✓ Confirmed/i)
    expect(confirmedBadges.length).toBeGreaterThan(0)
    // Should have pending matches
    const pendingBadges = screen.getAllByText(/⏳ Pending Confirmation/i)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<MatchSchedule />)
    expect(screen.getByText('Total Matches')).toBeTruthy()
    expect(screen.getByText('Confirmed')).toBeTruthy()
    expect(screen.getByText('Too Late to Confirm')).toBeTruthy()
  })

  it('allows confirming eligible matches', () => {
    render(<MatchSchedule />)
    const confirmButtons = document.querySelectorAll('[data-testid="matchschedule-confirm"]')
    // Should have at least one confirm button for matches eligible for confirmation
    expect(confirmButtons.length).toBeGreaterThan(0)
    
    // Click the first confirm button
    if (confirmButtons.length > 0) {
      fireEvent.click(confirmButtons[0])
      // After clicking, the match should show as confirmed
      expect(screen.getAllByText(/✓ Confirmed/i).length).toBeGreaterThan(0)
    }
  })

  it('enforces 24-hour confirmation rule', () => {
    render(<MatchSchedule />)
    // Should display warning for matches too late to confirm
    const tooLateMessages = screen.queryAllByText(/Too Late to Confirm/i)
    expect(tooLateMessages.length).toBeGreaterThan(0)
    
    // Should display message about deadline passing
    const deadlineMessages = screen.queryAllByText(/Confirmation deadline has passed/i)
    expect(deadlineMessages.length).toBeGreaterThan(0)
  })

  it('displays time until match for each match', () => {
    render(<MatchSchedule />)
    const hoursText = screen.queryAllByText(/hours until match/i)
    expect(hoursText.length).toBeGreaterThan(0)
  })
})
