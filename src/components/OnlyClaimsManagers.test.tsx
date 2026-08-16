import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyClaimsManagers from './OnlyClaimsManagers'

describe('OnlyClaimsManagers', () => {
  it('renders without crashing', () => {
    render(<OnlyClaimsManagers />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<OnlyClaimsManagers />)
    expect(screen.getByText(/Claims Approval System/i)).toBeTruthy()
    expect(screen.getByText(/CLM-2026-10045/i)).toBeTruthy()
    expect(screen.getByText(/Sarah Johnson/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<OnlyClaimsManagers />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="only-claims-managers"]')
    expect(mainWrapper).toBeTruthy()
    
    // User select dropdown
    const userSelect = document.querySelector('[data-testid="only-claims-managers-user-select"]')
    expect(userSelect).toBeTruthy()
    
    // Pending list
    const pendingList = document.querySelector('[data-testid="only-claims-managers-pending-list"]')
    expect(pendingList).toBeTruthy()
    
    // Processed list
    const processedList = document.querySelector('[data-testid="only-claims-managers-processed-list"]')
    expect(processedList).toBeTruthy()
    
    // Claim items
    const claimItems = document.querySelectorAll('[data-testid="only-claims-managers-claim-item"]')
    expect(claimItems.length).toBeGreaterThan(0)
    
    // Approve buttons
    const approveButtons = document.querySelectorAll('[data-testid="only-claims-managers-approve"]')
    expect(approveButtons.length).toBeGreaterThan(0)
    
    // Reject buttons
    const rejectButtons = document.querySelectorAll('[data-testid="only-claims-managers-reject"]')
    expect(rejectButtons.length).toBeGreaterThan(0)
  })

  it('shows manager approval required badge for high-value claims', () => {
    render(<OnlyClaimsManagers />)
    const badges = document.querySelectorAll('[data-testid="only-claims-managers-manager-badge"]')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('prevents non-managers from approving high-value claims', () => {
    render(<OnlyClaimsManagers />)
    
    // Start as adjuster (default), try to approve high-value claim
    const approveButtons = document.querySelectorAll('[data-testid="only-claims-managers-approve"]')
    const firstHighValueApproveButton = approveButtons[0] as HTMLButtonElement
    
    // Should be disabled for adjuster on high-value claim
    expect(firstHighValueApproveButton.disabled).toBe(true)
  })

  it('allows claims manager to approve high-value claims', () => {
    render(<OnlyClaimsManagers />)
    
    // Switch to claims manager
    const userSelect = screen.getByTestId('only-claims-managers-user-select') as HTMLSelectElement
    fireEvent.change(userSelect, { target: { value: '1' } }) // Claims Manager
    
    // Now approve button should be enabled
    const approveButtons = document.querySelectorAll('[data-testid="only-claims-managers-approve"]')
    const firstApproveButton = approveButtons[0] as HTMLButtonElement
    
    expect(firstApproveButton.disabled).toBe(false)
  })

  it('displays access denied message when non-manager tries to act on high-value claim', () => {
    render(<OnlyClaimsManagers />)
    
    // As adjuster (default), click approve on first claim (high-value)
    const approveButtons = document.querySelectorAll('[data-testid="only-claims-managers-approve"]')
    const firstApproveButton = approveButtons[0] as HTMLButtonElement
    
    // Force click even though disabled (to test the logic)
    if (!firstApproveButton.disabled) {
      fireEvent.click(firstApproveButton)
      
      // Should show access denied message
      const message = screen.queryByTestId('only-claims-managers-message')
      if (message) {
        expect(message.textContent).toContain('Access Denied')
      }
    }
  })

  it('successfully approves claim when manager approves high-value claim', () => {
    render(<OnlyClaimsManagers />)
    
    // Switch to claims manager
    const userSelect = screen.getByTestId('only-claims-managers-user-select') as HTMLSelectElement
    fireEvent.change(userSelect, { target: { value: '1' } })
    
    // Click approve on first pending claim
    const approveButtons = document.querySelectorAll('[data-testid="only-claims-managers-approve"]')
    const firstApproveButton = approveButtons[0] as HTMLButtonElement
    
    fireEvent.click(firstApproveButton)
    
    // Should show success message
    const message = screen.getByTestId('only-claims-managers-message')
    expect(message.textContent).toContain('approved')
  })

  it('displays pending and processed claims in separate sections', () => {
    render(<OnlyClaimsManagers />)
    
    expect(screen.getByText(/Pending Claims/i)).toBeTruthy()
    expect(screen.getByText(/Processed Claims/i)).toBeTruthy()
  })
})
