import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsExceedingA from './ClaimsExceedingA'

describe('ClaimsExceedingA', () => {
  it('renders without crashing', () => {
    render(<ClaimsExceedingA />)
    expect(document.body).toBeTruthy()
  })

  it('displays claims exceeding $10,000 threshold', () => {
    render(<ClaimsExceedingA />)
    expect(screen.getByText(/High-Value Claims Management/i)).toBeTruthy()
    expect(screen.getByText(/Claims exceeding \$10,000 threshold/i)).toBeTruthy()
  })

  it('shows mock claims data', () => {
    render(<ClaimsExceedingA />)
    // Check for at least one claim number
    expect(screen.getByText(/CLM-2024-1001/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsExceedingA />)
    
    // Main wrapper
    expect(screen.getByTestId('claimsexceedinga')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('claimsexceedinga-list')).toBeTruthy()
    
    // List items - verify multiple claims are displayed
    const items = screen.getAllByTestId('claimsexceedinga-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify at least one testid exists (for QA)
    expect(document.querySelector('[data-testid]')).toBeTruthy()
  })

  it('displays finance approver routing panel', () => {
    render(<ClaimsExceedingA />)
    expect(screen.getByText(/Route to Finance Approver/i)).toBeTruthy()
  })

  it('shows status statistics', () => {
    render(<ClaimsExceedingA />)
    expect(screen.getByText(/Pending Routing/i)).toBeTruthy()
    expect(screen.getByText(/Routed to Finance/i)).toBeTruthy()
    // Use getAllByText for text that appears multiple times
    const approvedElements = screen.getAllByText(/Approved/i)
    expect(approvedElements.length).toBeGreaterThan(0)
  })
})
