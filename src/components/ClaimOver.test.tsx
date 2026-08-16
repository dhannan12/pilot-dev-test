import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimOver from './ClaimOver'

describe('ClaimOver', () => {
  it('renders without crashing', () => {
    render(<ClaimOver />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<ClaimOver />)
    expect(screen.getByText('High-Value Claims Management')).toBeTruthy()
  })

  it('displays mock claim data', () => {
    render(<ClaimOver />)
    // Check for first mock claim
    expect(screen.getByText('CLM-2024-001')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimOver />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="claimover"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-new-claim"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-filter-all"]')).toBeTruthy()
  })

  it('shows new claim form when button is clicked', () => {
    render(<ClaimOver />)
    const newClaimButton = document.querySelector('[data-testid="claimover-new-claim"]') as HTMLElement
    fireEvent.click(newClaimButton)
    expect(document.querySelector('[data-testid="claimover-form"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-claimant-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-vehicle-reg"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-amount"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimover-submit"]')).toBeTruthy()
  })

  it('filters claims by status', () => {
    render(<ClaimOver />)
    const pendingFilter = document.querySelector('[data-testid="claimover-filter-pending"]') as HTMLElement
    fireEvent.click(pendingFilter)
    // Should still show claims (there are pending claims in mock data)
    expect(document.querySelector('[data-testid="claimover-list"]')).toBeTruthy()
  })

  it('displays approve and reject buttons for pending claims', () => {
    render(<ClaimOver />)
    // Look for approve and reject buttons
    const approveButtons = document.querySelectorAll('[data-testid="claimover-approve"]')
    const rejectButtons = document.querySelectorAll('[data-testid="claimover-reject"]')
    // Should have some pending claims with action buttons
    expect(approveButtons.length).toBeGreaterThan(0)
    expect(rejectButtons.length).toBeGreaterThan(0)
  })

  it('displays claim amounts in GBP format', () => {
    render(<ClaimOver />)
    // Check that amounts are displayed with currency format
    expect(screen.getByText(/£15,750.00/)).toBeTruthy()
  })

  it('shows manager notes for claims with notes', () => {
    render(<ClaimOver />)
    // Multiple claims have manager notes, so use getAllByText
    const managerNotesLabels = screen.getAllByText('Manager Notes')
    expect(managerNotesLabels.length).toBeGreaterThan(0)
  })
})
