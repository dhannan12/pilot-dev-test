import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUserAttempts from './RegisteredUserAttempts'

describe('RegisteredUserAttempts', () => {
  it('renders without crashing', () => {
    render(<RegisteredUserAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<RegisteredUserAttempts />)
    // Check for user names from mock data
    expect(screen.getByText(/John Smith/i)).toBeTruthy()
    expect(screen.getByText(/Michael Jordan/i)).toBeTruthy()
    // Check for component title
    expect(screen.getByText(/Player Profile Access Attempts/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUserAttempts />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="registereduserattempts"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-view-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserattempts-view-profile"]')).toBeTruthy()
  })

  it('displays all filter buttons', () => {
    render(<RegisteredUserAttempts />)
    expect(screen.getByTestId('registereduserattempts-filter-all')).toBeTruthy()
    expect(screen.getByTestId('registereduserattempts-filter-success')).toBeTruthy()
    expect(screen.getByTestId('registereduserattempts-filter-denied')).toBeTruthy()
    expect(screen.getByTestId('registereduserattempts-filter-pending')).toBeTruthy()
  })

  it('displays multiple access attempt items', () => {
    render(<RegisteredUserAttempts />)
    const items = document.querySelectorAll('[data-testid="registereduserattempts-item"]')
    expect(items.length).toBeGreaterThan(5) // Should have at least 5 mock items
  })
})
