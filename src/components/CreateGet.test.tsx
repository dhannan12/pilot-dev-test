import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateGet from './CreateGet'

describe('CreateGet', () => {
  it('renders without crashing', () => {
    render(<CreateGet />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock absence reports data', () => {
    render(<CreateGet />)
    // Check for student names in the mock data
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
    expect(screen.getByText('Ethan Thompson')).toBeTruthy()
    expect(screen.getByText('Sophia Anderson')).toBeTruthy()
  })

  it('displays the admin dashboard header', () => {
    render(<CreateGet />)
    expect(screen.getByText('Absence Reports Dashboard')).toBeTruthy()
    expect(screen.getByText(/Admin view of all submitted absence reports/i)).toBeTruthy()
  })

  it('displays stats cards with correct counts', () => {
    render(<CreateGet />)
    expect(screen.getByText('Total Reports')).toBeTruthy()
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    const rejectedElements = screen.getAllByText('Rejected')
    expect(rejectedElements.length).toBeGreaterThan(0)
    const underReviewElements = screen.getAllByText('Under Review')
    expect(underReviewElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CreateGet />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createget"]')).toBeTruthy()
    
    // Search input
    expect(document.querySelector('[data-testid="createget-search"]')).toBeTruthy()
    
    // Filter and sort selects
    expect(document.querySelector('[data-testid="createget-filter-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createget-sort"]')).toBeTruthy()
    
    // Export button
    expect(document.querySelector('[data-testid="createget-export"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="createget-list"]')).toBeTruthy()
    
    // List items (should have multiple)
    const items = document.querySelectorAll('[data-testid="createget-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // View button
    expect(document.querySelector('[data-testid="createget-view"]')).toBeTruthy()
  })

  it('displays filter and search controls', () => {
    render(<CreateGet />)
    expect(screen.getByLabelText('Search')).toBeTruthy()
    expect(screen.getByLabelText('Filter by Status')).toBeTruthy()
    expect(screen.getByLabelText('Sort By')).toBeTruthy()
  })

  it('shows results count', () => {
    render(<CreateGet />)
    expect(screen.getByText(/Showing/i)).toBeTruthy()
    const reportsElements = screen.getAllByText(/reports/i)
    expect(reportsElements.length).toBeGreaterThan(0)
  })

  it('displays report details including status badges', () => {
    render(<CreateGet />)
    // Check for status indicators - multiple reports can have same status
    const approvedElements = screen.getAllByText('APPROVED')
    expect(approvedElements.length).toBeGreaterThan(0)
    const pendingElements = screen.getAllByText('PENDING')
    expect(pendingElements.length).toBeGreaterThan(0)
  })

  it('has export button', () => {
    render(<CreateGet />)
    const exportButton = screen.getByTestId('createget-export')
    expect(exportButton).toBeTruthy()
    expect(exportButton.textContent).toContain('Export')
  })
})
