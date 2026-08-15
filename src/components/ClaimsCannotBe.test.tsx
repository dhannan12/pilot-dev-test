import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsCannotBe from './ClaimsCannotBe'

describe('ClaimsCannotBe', () => {
  it('renders without crashing', () => {
    render(<ClaimsCannotBe />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<ClaimsCannotBe />)
    // Check that multiple claims are rendered
    const claimItems = screen.getAllByTestId('claims-cannot-be-item')
    expect(claimItems.length).toBeGreaterThanOrEqual(5)
    
    // Check for specific claimant name
    expect(screen.getByText('John Smith')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsCannotBe />)
    
    // Main wrapper
    expect(screen.getByTestId('claims-cannot-be')).toBeInTheDocument()
    
    // Claims list
    expect(screen.getByTestId('claims-cannot-be-list')).toBeInTheDocument()
    
    // Claim items
    const claimItems = screen.getAllByTestId('claims-cannot-be-item')
    expect(claimItems.length).toBeGreaterThan(0)
    
    // Documents list
    expect(screen.getByTestId('claims-cannot-be-documents-list')).toBeInTheDocument()
    
    // Document items
    const documentItems = screen.getAllByTestId('claims-cannot-be-document-item')
    expect(documentItems.length).toBeGreaterThan(0)
    
    // Close button
    expect(screen.getByTestId('claims-cannot-be-close')).toBeInTheDocument()
    
    // Cancel button
    expect(screen.getByTestId('claims-cannot-be-cancel')).toBeInTheDocument()
  })

  it('shows disabled close button when required documents are missing', () => {
    render(<ClaimsCannotBe />)
    
    // The close button should be disabled when required docs are missing
    const closeButton = screen.getByTestId('claims-cannot-be-close')
    expect(closeButton).toBeDisabled()
    
    // Helper text should be visible
    expect(screen.getByText(/All required documents must be uploaded before closing the claim/i)).toBeInTheDocument()
  })

  it('keeps close button disabled after uploading only some required docs', () => {
    render(<ClaimsCannotBe />)
    
    // Upload one document to trigger state change
    const uploadButtons = screen.getAllByTestId('claims-cannot-be-upload')
    fireEvent.click(uploadButtons[0])
    
    // Button should still be disabled (other required docs missing)
    const closeButton = screen.getByTestId('claims-cannot-be-close')
    expect(closeButton).toBeDisabled()
  })

  it('allows closing claim when all required documents are uploaded', () => {
    render(<ClaimsCannotBe />)
    
    // Select a claim with all required docs uploaded (CLM-2024-002)
    const claimItems = screen.getAllByTestId('claims-cannot-be-item')
    fireEvent.click(claimItems[1]) // Second claim has all docs
    
    // Close button should be enabled
    const closeButton = screen.getByTestId('claims-cannot-be-close')
    expect(closeButton).not.toBeDisabled()
    
    // Click close
    fireEvent.click(closeButton)
    
    // Should show "Claim is Closed" text
    expect(screen.getByText('Claim is Closed')).toBeInTheDocument()
  })

  it('allows uploading documents', () => {
    render(<ClaimsCannotBe />)
    
    // Find upload buttons
    const uploadButtons = screen.getAllByTestId('claims-cannot-be-upload')
    const initialUploadButtonCount = uploadButtons.length
    expect(initialUploadButtonCount).toBeGreaterThan(0)
    
    // Click first upload button
    fireEvent.click(uploadButtons[0])
    
    // Check that upload button count decreased
    const remainingUploadButtons = screen.queryAllByTestId('claims-cannot-be-upload')
    expect(remainingUploadButtons.length).toBe(initialUploadButtonCount - 1)
  })

  it('displays progress bar for required documents', () => {
    render(<ClaimsCannotBe />)
    
    // Check for progress text
    expect(screen.getByText(/Required Documents:/i)).toBeInTheDocument()
  })

  it('marks required documents with asterisk', () => {
    render(<ClaimsCannotBe />)
    
    // Check for required marker
    const requiredMarkers = screen.getAllByText('* Required')
    expect(requiredMarkers.length).toBeGreaterThan(0)
  })
})
