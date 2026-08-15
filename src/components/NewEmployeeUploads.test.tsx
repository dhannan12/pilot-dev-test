import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewEmployeeUploads from './NewEmployeeUploads'

describe('NewEmployeeUploads', () => {
  it('renders without crashing', () => {
    render(<NewEmployeeUploads />)
    expect(document.body).toBeTruthy()
  })

  it('displays the document upload portal header', () => {
    render(<NewEmployeeUploads />)
    expect(screen.getByText('Document Upload Portal')).toBeTruthy()
    expect(screen.getByText(/Upload your onboarding documents and track confirmation status/i)).toBeTruthy()
  })

  it('displays mock uploaded documents', () => {
    render(<NewEmployeeUploads />)
    expect(screen.getByText('ID_Card_Front.pdf')).toBeTruthy()
    expect(screen.getByText('Tax_Form_W4.pdf')).toBeTruthy()
    expect(screen.getByText('Bank_Details.pdf')).toBeTruthy()
    expect(screen.getByText('Educational_Certificate.pdf')).toBeTruthy()
    expect(screen.getByText('Previous_Employment_Letter.pdf')).toBeTruthy()
  })

  it('displays document status badges correctly', () => {
    render(<NewEmployeeUploads />)
    const confirmed = screen.getAllByText('Confirmed')
    const pending = screen.getAllByText('Pending')
    const rejected = screen.getAllByText('Rejected')
    
    expect(confirmed.length).toBeGreaterThan(0)
    expect(pending.length).toBeGreaterThan(0)
    expect(rejected.length).toBeGreaterThan(0)
  })

  it('displays status summary with counts', () => {
    render(<NewEmployeeUploads />)
    // Should show confirmed and pending counts in the summary section
    const confirmedSections = screen.getAllByText(/Confirmed/i)
    const awaitingSections = screen.getAllByText(/Awaiting Confirmation/i)
    
    expect(confirmedSections.length).toBeGreaterThan(0)
    expect(awaitingSections.length).toBeGreaterThan(0)
  })

  it('has document type selector', () => {
    render(<NewEmployeeUploads />)
    const select = screen.getByTestId('newemployeeuploads-type')
    expect(select).toBeTruthy()
  })

  it('has file input', () => {
    render(<NewEmployeeUploads />)
    const fileInput = screen.getByTestId('newemployeeuploads-file')
    expect(fileInput).toBeTruthy()
  })

  it('has upload button', () => {
    render(<NewEmployeeUploads />)
    const uploadButton = screen.getByTestId('newemployeeuploads-upload')
    expect(uploadButton).toBeTruthy()
    expect(uploadButton.textContent).toBe('Upload Document')
  })

  it('has required data-testid attributes', () => {
    render(<NewEmployeeUploads />)
    
    // Main wrapper
    expect(screen.getByTestId('newemployeeuploads')).toBeTruthy()
    
    // Form elements
    expect(screen.getByTestId('newemployeeuploads-type')).toBeTruthy()
    expect(screen.getByTestId('newemployeeuploads-file')).toBeTruthy()
    expect(screen.getByTestId('newemployeeuploads-upload')).toBeTruthy()
    
    // List elements
    expect(screen.getByTestId('newemployeeuploads-list')).toBeTruthy()
    const items = screen.getAllByTestId('newemployeeuploads-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows changing document type', () => {
    render(<NewEmployeeUploads />)
    const select = screen.getByTestId('newemployeeuploads-type') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'Tax Documents' } })
    expect(select.value).toBe('Tax Documents')
  })

  it('displays confirmation messages for different statuses', () => {
    render(<NewEmployeeUploads />)
    
    // Should display confirmation message for confirmed documents
    const confirmedMessages = screen.getAllByText(/This document has been verified and approved by HR/i)
    expect(confirmedMessages.length).toBeGreaterThan(0)
    
    // Should display awaiting message for pending documents
    const awaitingMessages = screen.getAllByText(/Your document is being reviewed by HR/i)
    expect(awaitingMessages.length).toBeGreaterThan(0)
    
    // Should display rejection message for rejected documents
    expect(screen.getByText(/This document was rejected/i)).toBeTruthy()
  })
})
