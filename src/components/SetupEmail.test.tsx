import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupEmail from './SetupEmail'

describe('SetupEmail', () => {
  it('renders without crashing', () => {
    render(<SetupEmail />)
    expect(document.body).toBeTruthy()
  })

  it('displays main heading and description', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Email Notification System')).toBeTruthy()
    expect(screen.getByText('Configure email templates for application status changes')).toBeTruthy()
  })

  it('displays mock templates', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Application Received')).toBeTruthy()
    expect(screen.getByText('Application Under Review')).toBeTruthy()
    expect(screen.getByText('Interview Scheduled')).toBeTruthy()
    expect(screen.getByText('Application Approved')).toBeTruthy()
    expect(screen.getByText('Application Rejected')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupemail"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupemail-templates-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-history-tab"]')).toBeTruthy()
    
    // Template list
    expect(document.querySelector('[data-testid="setupemail-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-item"]')).toBeTruthy()
    
    // Action buttons in list
    const toggleButtons = document.querySelectorAll('[data-testid^="setupemail-toggle-"]')
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('switches between tabs', () => {
    render(<SetupEmail />)
    
    const historyTab = screen.getByTestId('setupemail-history-tab')
    fireEvent.click(historyTab)
    
    expect(screen.getByTestId('setupemail-history-list')).toBeTruthy()
  })

  it('displays notification history in history tab', () => {
    render(<SetupEmail />)
    
    const historyTab = screen.getByTestId('setupemail-history-tab')
    fireEvent.click(historyTab)
    
    expect(screen.getByText('john.smith@email.com')).toBeTruthy()
    expect(screen.getByText('jane.doe@email.com')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-history-item"]')).toBeTruthy()
  })

  it('opens template editor when template is clicked', () => {
    render(<SetupEmail />)
    
    const firstTemplate = screen.getByTestId('setupemail-select-1')
    fireEvent.click(firstTemplate)
    
    expect(screen.getByTestId('setupemail-name')).toBeTruthy()
    expect(screen.getByTestId('setupemail-subject')).toBeTruthy()
    expect(screen.getByTestId('setupemail-body')).toBeTruthy()
    expect(screen.getByTestId('setupemail-trigger')).toBeTruthy()
    expect(screen.getByTestId('setupemail-save')).toBeTruthy()
    expect(screen.getByTestId('setupemail-cancel')).toBeTruthy()
  })

  it('shows preview when preview button is clicked', () => {
    render(<SetupEmail />)
    
    const firstTemplate = screen.getByTestId('setupemail-select-1')
    fireEvent.click(firstTemplate)
    
    const previewButton = screen.getByTestId('setupemail-preview')
    fireEvent.click(previewButton)
    
    expect(screen.getByTestId('setupemail-preview-box')).toBeTruthy()
  })

  it('allows editing template fields', () => {
    render(<SetupEmail />)
    
    const firstTemplate = screen.getByTestId('setupemail-select-1')
    fireEvent.click(firstTemplate)
    
    const nameInput = screen.getByTestId('setupemail-name') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Updated Template' } })
    
    expect(nameInput.value).toBe('Updated Template')
  })

  it('closes editor when cancel is clicked', () => {
    render(<SetupEmail />)
    
    const firstTemplate = screen.getByTestId('setupemail-select-1')
    fireEvent.click(firstTemplate)
    
    expect(screen.getByTestId('setupemail-save')).toBeTruthy()
    
    const cancelButton = screen.getByTestId('setupemail-cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.getByText('Select a template to edit')).toBeTruthy()
  })
})
