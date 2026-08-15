import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsMustBe from './ClaimsMustBe'

describe('ClaimsMustBe', () => {
  it('renders without crashing', () => {
    render(<ClaimsMustBe />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<ClaimsMustBe />)
    // Check for claim numbers
    expect(screen.getByText(/CLM-2024-001/i)).toBeTruthy()
    expect(screen.getByText(/CLM-2024-002/i)).toBeTruthy()
    
    // Check for claimant names
    expect(screen.getByText(/John Smith/i)).toBeTruthy()
    expect(screen.getByText(/Sarah Johnson/i)).toBeTruthy()
  })

  it('displays claims with different statuses', () => {
    render(<ClaimsMustBe />)
    // Check for status badges
    const statusElements = screen.getAllByText(/OPEN|CLOSED|PENDING/i)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsMustBe />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="claimsmustbe"]')).toBeTruthy()
    
    // Verify filter buttons
    expect(document.querySelector('[data-testid="claimsmustbe-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsmustbe-filter-open"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsmustbe-filter-pending"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsmustbe-filter-closed"]')).toBeTruthy()
    
    // Verify list container
    expect(document.querySelector('[data-testid="claimsmustbe-list"]')).toBeTruthy()
    
    // Verify list items exist
    const items = document.querySelectorAll('[data-testid="claimsmustbe-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify view buttons exist
    const viewButtons = document.querySelectorAll('[data-testid="claimsmustbe-view"]')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays status summary cards', () => {
    render(<ClaimsMustBe />)
    expect(screen.getByText(/Open Claims/i)).toBeTruthy()
    expect(screen.getByText(/Pending Claims/i)).toBeTruthy()
    expect(screen.getByText(/Closed Claims/i)).toBeTruthy()
  })

  it('displays claim amounts and dates', () => {
    render(<ClaimsMustBe />)
    // Check for amount formatting
    expect(screen.getByText(/\$4,500\.00/i)).toBeTruthy()
    // Check for date information (multiple instances)
    const submittedElements = screen.getAllByText(/Submitted:/i)
    expect(submittedElements.length).toBeGreaterThan(0)
  })
})
