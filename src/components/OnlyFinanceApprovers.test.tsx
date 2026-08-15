import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyFinanceApprovers from './OnlyFinanceApprovers'

describe('OnlyFinanceApprovers', () => {
  it('renders without crashing', () => {
    render(<OnlyFinanceApprovers />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<OnlyFinanceApprovers />)
    // Check for component title
    expect(screen.getByText('Financial Claims Approval')).toBeTruthy()
    // Check for mock claim numbers
    expect(screen.getByText('CLM-2026-001')).toBeTruthy()
    expect(screen.getByText('CLM-2026-002')).toBeTruthy()
    // Check for mock user (Sarah Chen is default) - using getAllByText since name appears multiple times
    expect(screen.getAllByText(/Sarah Chen/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    const { container } = render(<OnlyFinanceApprovers />)
    // Verify key testids exist — Playwright QA depends on these
    expect(container.querySelector('[data-testid="onlyfinanceapprovers"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="onlyfinanceapprovers-user-select"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="onlyfinanceapprovers-list"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="onlyfinanceapprovers-item"]')).toBeTruthy()
    // Notes, approve, and reject buttons are only visible when a claim is selected
    // so we just verify the main interactive elements exist
  })

  it('shows finance approver role badge', () => {
    render(<OnlyFinanceApprovers />)
    expect(screen.getByText(/Finance Approver - Can approve financial claims/)).toBeTruthy()
  })

  it('displays pending claims with financial amounts', () => {
    render(<OnlyFinanceApprovers />)
    expect(screen.getByText('Pending Financial Approvals')).toBeTruthy()
    // Check for financial amounts in proper format
    expect(screen.getByText(/\$5,420\.00/)).toBeTruthy()
    expect(screen.getByText(/\$1,250\.50/)).toBeTruthy()
  })
})
