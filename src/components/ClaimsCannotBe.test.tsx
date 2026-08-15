import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsCannotBe from './ClaimsCannotBe'

describe('ClaimsCannotBe', () => {
  it('renders without crashing', () => {
    render(<ClaimsCannotBe />)
    expect(document.body).toBeTruthy()
  })

  it('displays pending claims list', () => {
    render(<ClaimsCannotBe />)
    expect(screen.getByText(/Pending Claims/i)).toBeTruthy()
    expect(screen.getByText('CLM-2026-001')).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
  })

  it('displays mock data with multiple claims', () => {
    render(<ClaimsCannotBe />)
    expect(screen.getByText('CLM-2026-001')).toBeTruthy()
    expect(screen.getByText('CLM-2026-002')).toBeTruthy()
    expect(screen.getByText('CLM-2026-003')).toBeTruthy()
    expect(screen.getByText('CLM-2026-004')).toBeTruthy()
    expect(screen.getByText('CLM-2026-005')).toBeTruthy()
  })

  it('shows claim details when a claim is selected', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0)
    expect(screen.getByText(/Attached Documents/i)).toBeTruthy()
  })

  it('displays documents for selected claim', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    expect(screen.getByText('Medical Report.pdf')).toBeTruthy()
    expect(screen.getByText('Invoice.pdf')).toBeTruthy()
    expect(screen.getByText('ID Document.jpg')).toBeTruthy()
  })

  it('allows marking documents as reviewed', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    const reviewButtons = screen.getAllByText('Mark as Reviewed')
    expect(reviewButtons.length).toBeGreaterThan(0)
    
    fireEvent.click(reviewButtons[0])
    expect(screen.getByText('Reviewed ✓')).toBeTruthy()
  })

  it('prevents approval without complete document review', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    const approveButton = screen.getByTestId('claimscannotbe-approve')
    fireEvent.click(approveButton)
    
    expect(screen.getByText(/Cannot approve claim/i)).toBeTruthy()
    const allDocsText = screen.getAllByText(/All documents must be reviewed/i)
    expect(allDocsText.length).toBeGreaterThan(0)
  })

  it('allows approval after all documents are reviewed', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    const reviewButtons = screen.getAllByText('Mark as Reviewed')
    reviewButtons.forEach(button => fireEvent.click(button))
    
    const approveButton = screen.getByTestId('claimscannotbe-approve')
    fireEvent.click(approveButton)
    
    expect(screen.getByText(/Claim approved successfully/i)).toBeTruthy()
  })

  it('allows rejection without document review', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    const rejectButton = screen.getByTestId('claimscannotbe-reject')
    fireEvent.click(rejectButton)
    
    expect(screen.getByText(/Claim rejected/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsCannotBe />)
    
    // Main wrapper
    expect(screen.getByTestId('claimscannotbe')).toBeTruthy()
    
    // Lists
    expect(screen.getByTestId('claimscannotbe-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('claimscannotbe-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // Select a claim to test document-related testids
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    // Document list
    expect(screen.getByTestId('claimscannotbe-document-list')).toBeTruthy()
    
    // Document items
    const docItems = screen.getAllByTestId('claimscannotbe-document-item')
    expect(docItems.length).toBeGreaterThan(0)
    
    // Buttons
    expect(screen.getByTestId('claimscannotbe-approve')).toBeTruthy()
    expect(screen.getByTestId('claimscannotbe-reject')).toBeTruthy()
    
    // Review buttons
    const reviewButtons = screen.getAllByTestId('claimscannotbe-review-document')
    expect(reviewButtons.length).toBeGreaterThan(0)
  })

  it('shows progress indicator for document review', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    expect(screen.getByText(/0\/3 reviewed/i)).toBeTruthy()
    
    const reviewButtons = screen.getAllByText('Mark as Reviewed')
    fireEvent.click(reviewButtons[0])
    
    expect(screen.getByText(/1\/3 reviewed/i)).toBeTruthy()
  })

  it('updates UI to show all documents reviewed', () => {
    render(<ClaimsCannotBe />)
    const claimItem = screen.getByText('CLM-2026-001')
    fireEvent.click(claimItem)
    
    const reviewButtons = screen.getAllByText('Mark as Reviewed')
    reviewButtons.forEach(button => fireEvent.click(button))
    
    expect(screen.getByText('All Reviewed ✓')).toBeTruthy()
  })
})
