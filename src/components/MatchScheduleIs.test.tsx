import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MatchScheduleIs from './MatchScheduleIs'

describe('MatchScheduleIs', () => {
  it('renders without crashing', () => {
    render(<MatchScheduleIs />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<MatchScheduleIs />)
    expect(screen.getByText(/Match Schedule Confirmations/i)).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<MatchScheduleIs />)
    expect(screen.getByText(/Manchester United/i)).toBeTruthy()
    expect(screen.getByText(/Liverpool/i)).toBeTruthy()
    expect(screen.getByText(/Chelsea/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MatchScheduleIs />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="matchscheduleis"]')).toBeTruthy()
    
    // Filter select
    expect(document.querySelector('[data-testid="matchscheduleis-status"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="matchscheduleis-refresh"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchscheduleis-view"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchscheduleis-notify"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchscheduleis-export"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="matchscheduleis-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="matchscheduleis-item"]')).toBeTruthy()
  })

  it('displays urgent alert notification', () => {
    render(<MatchScheduleIs />)
    expect(screen.getByText(/URGENT ALERT/i)).toBeTruthy()
    expect(screen.getByText(/Late confirmations detected/i)).toBeTruthy()
  })

  it('shows confirmation status for matches', () => {
    render(<MatchScheduleIs />)
    const confirmedBadges = screen.getAllByText(/CONFIRMED/i)
    expect(confirmedBadges.length).toBeGreaterThan(0)
  })

  it('displays venue information', () => {
    render(<MatchScheduleIs />)
    expect(screen.getByText(/Old Trafford/i)).toBeTruthy()
    expect(screen.getByText(/Stamford Bridge/i)).toBeTruthy()
  })

  it('shows urgency badges for matches', () => {
    render(<MatchScheduleIs />)
    const urgencyBadges = document.querySelectorAll('[class*="font-bold"]')
    expect(urgencyBadges.length).toBeGreaterThan(0)
  })
})
