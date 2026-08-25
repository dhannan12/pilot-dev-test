import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays empty state message when no matches are recorded', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('No Statistics Available')).toBeTruthy()
    expect(
      screen.getByText(/You don't have any recorded matches yet/i)
    ).toBeTruthy()
  })

  it('shows call-to-action buttons', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Record Your First Match')).toBeTruthy()
    expect(screen.getByText('Learn How It Works')).toBeTruthy()
  })

  it('displays info cards about features', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Add Matches')).toBeTruthy()
    expect(screen.getByText('View Statistics')).toBeTruthy()
    expect(screen.getByText('Improve Performance')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    // Action buttons
    expect(document.querySelector('[data-testid="userattemptsto-record"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-learn"]')).toBeTruthy()
    // Info cards
    const cards = document.querySelectorAll('[data-testid="userattemptsto-card"]')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('displays placeholder statistics cards', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Recent Performance')).toBeTruthy()
    expect(screen.getByText('Best Streak')).toBeTruthy()
    expect(screen.getByText('Total Goals')).toBeTruthy()
  })

  it('shows header with title', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Match Statistics')).toBeTruthy()
    expect(screen.getByText('Track your performance and win percentage')).toBeTruthy()
  })
})
