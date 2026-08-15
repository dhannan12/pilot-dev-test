import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsMust from './ClaimsMust'

describe('ClaimsMust', () => {
  it('renders without crashing', () => {
    render(<ClaimsMust />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and threshold information', () => {
    render(<ClaimsMust />)
    expect(screen.getByText('High-Value Claims Approval')).toBeInTheDocument()
    expect(screen.getByText(/Claims exceeding/)).toBeInTheDocument()
  })

  it('displays mock claims data', () => {
    render(<ClaimsMust />)
    // Check that at least one claim is displayed
    expect(screen.getByText('CLM-2026-001234')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('$125,000')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsMust />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('claims-must')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-list')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-filters')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-pending-count')).toBeInTheDocument()
    
    // Check that claim items exist
    const claimItems = screen.getAllByTestId('claims-must-item')
    expect(claimItems.length).toBeGreaterThan(0)
  })

  it('displays pending claims count', () => {
    render(<ClaimsMust />)
    const pendingCount = screen.getByTestId('claims-must-pending-count')
    expect(pendingCount).toBeInTheDocument()
    expect(pendingCount.textContent).toBe('5') // All 5 mock claims are pending initially
  })

  it('allows filtering claims by status', () => {
    render(<ClaimsMust />)
    
    // Click the pending filter
    const pendingFilter = screen.getByTestId('claims-must-filter-pending')
    fireEvent.click(pendingFilter)
    
    // All claims should still be visible (all are pending initially)
    const claimItems = screen.getAllByTestId('claims-must-item')
    expect(claimItems.length).toBe(5)
  })

  it('shows claim details when a claim is selected', () => {
    render(<ClaimsMust />)
    
    // Click on the first claim
    const claimItems = screen.getAllByTestId('claims-must-item')
    fireEvent.click(claimItems[0])
    
    // Detail panel should appear
    expect(screen.getByTestId('claims-must-detail')).toBeInTheDocument()
  })

  it('shows approve and reject buttons for pending claims', () => {
    render(<ClaimsMust />)
    
    // Click on a claim to select it
    const claimItems = screen.getAllByTestId('claims-must-item')
    fireEvent.click(claimItems[0])
    
    // Buttons should be visible
    expect(screen.getByTestId('claims-must-approve')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-reject')).toBeInTheDocument()
  })

  it('approves a claim when approve button is clicked', () => {
    render(<ClaimsMust />)
    
    // Select first claim
    const claimItems = screen.getAllByTestId('claims-must-item')
    fireEvent.click(claimItems[0])
    
    // Click approve
    const approveButton = screen.getByTestId('claims-must-approve')
    fireEvent.click(approveButton)
    
    // Pending count should decrease
    const pendingCount = screen.getByTestId('claims-must-pending-count')
    expect(pendingCount.textContent).toBe('4')
  })

  it('rejects a claim when reject button is clicked', () => {
    render(<ClaimsMust />)
    
    // Select first claim
    const claimItems = screen.getAllByTestId('claims-must-item')
    fireEvent.click(claimItems[0])
    
    // Click reject
    const rejectButton = screen.getByTestId('claims-must-reject')
    fireEvent.click(rejectButton)
    
    // Pending count should decrease
    const pendingCount = screen.getByTestId('claims-must-pending-count')
    expect(pendingCount.textContent).toBe('4')
  })

  it('displays all filter tabs', () => {
    render(<ClaimsMust />)
    
    expect(screen.getByTestId('claims-must-filter-all')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-filter-pending')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-filter-approved')).toBeInTheDocument()
    expect(screen.getByTestId('claims-must-filter-rejected')).toBeInTheDocument()
  })
})
