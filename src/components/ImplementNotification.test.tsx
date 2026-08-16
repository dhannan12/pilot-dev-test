import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementNotification from './ImplementNotification'

describe('ImplementNotification', () => {
  it('renders without crashing', () => {
    render(<ImplementNotification />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock notifications', () => {
    render(<ImplementNotification />)
    expect(screen.getByText('Notification & Email Service')).toBeTruthy()
    expect(screen.getByText('Absence Notification')).toBeTruthy()
    expect(screen.getByText(/parent@example\.com/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementNotification />)
    
    // Main wrapper
    expect(screen.getByTestId('implementnotification')).toBeTruthy()
    
    // Filters
    expect(screen.getByTestId('implementnotification-status-filter')).toBeTruthy()
    expect(screen.getByTestId('implementnotification-type-filter')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('implementnotification-list')).toBeTruthy()
    const items = screen.getAllByTestId('implementnotification-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Form fields
    expect(screen.getByTestId('implementnotification-template')).toBeTruthy()
    expect(screen.getByTestId('implementnotification-recipient')).toBeTruthy()
    expect(screen.getByTestId('implementnotification-subject')).toBeTruthy()
    expect(screen.getByTestId('implementnotification-message')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('implementnotification-send')).toBeTruthy()
    expect(screen.getByTestId('implementnotification-clear')).toBeTruthy()
  })

  it('filters notifications by status', () => {
    render(<ImplementNotification />)
    
    const statusFilter = screen.getByTestId('implementnotification-status-filter') as HTMLSelectElement
    
    // Change to 'sent' filter
    fireEvent.change(statusFilter, { target: { value: 'sent' } })
    
    // Verify filter was applied
    expect(statusFilter.value).toBe('sent')
  })

  it('filters notifications by type', () => {
    render(<ImplementNotification />)
    
    const typeFilter = screen.getByTestId('implementnotification-type-filter') as HTMLSelectElement
    
    // Change to 'email' filter
    fireEvent.change(typeFilter, { target: { value: 'email' } })
    
    // Verify filter was applied
    expect(typeFilter.value).toBe('email')
  })

  it('allows template selection', () => {
    render(<ImplementNotification />)
    
    const templateSelect = screen.getByTestId('implementnotification-template') as HTMLSelectElement
    
    // Select a template
    fireEvent.change(templateSelect, { target: { value: 'T001' } })
    
    // Verify template was selected
    expect(templateSelect.value).toBe('T001')
  })

  it('allows filling notification form fields', () => {
    render(<ImplementNotification />)
    
    const recipientInput = screen.getByTestId('implementnotification-recipient') as HTMLInputElement
    const subjectInput = screen.getByTestId('implementnotification-subject') as HTMLInputElement
    const messageInput = screen.getByTestId('implementnotification-message') as HTMLTextAreaElement
    
    // Fill in form
    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message content' } })
    
    // Verify values
    expect(recipientInput.value).toBe('test@example.com')
    expect(subjectInput.value).toBe('Test Subject')
    expect(messageInput.value).toBe('Test message content')
  })

  it('clears form when clear button is clicked', () => {
    render(<ImplementNotification />)
    
    const recipientInput = screen.getByTestId('implementnotification-recipient') as HTMLInputElement
    const clearButton = screen.getByTestId('implementnotification-clear')
    
    // Fill in form
    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } })
    expect(recipientInput.value).toBe('test@example.com')
    
    // Click clear
    fireEvent.click(clearButton)
    
    // Verify form is cleared
    expect(recipientInput.value).toBe('')
  })

  it('displays statistics dashboard', () => {
    render(<ImplementNotification />)
    
    // Check for statistics labels (use getAllByText since they appear in multiple places)
    expect(screen.getAllByText('Sent').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Failed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Scheduled').length).toBeGreaterThan(0)
  })

  it('shows retry button for failed notifications', () => {
    render(<ImplementNotification />)
    
    // Check for retry button (only shown for failed notifications)
    const retryButton = screen.getByTestId('implementnotification-retry')
    expect(retryButton).toBeTruthy()
  })
})
