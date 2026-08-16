import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the legal case management heading', () => {
    render(<UserAttemptsTo />)
    const heading = screen.getByText(/Legal Case Management/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock case attempts', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/CASE-2024-001/)).toBeTruthy()
    expect(screen.getByText(/John Smith/)).toBeTruthy()
    expect(screen.getByText(/Jane Doe/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="userattemptsto-casenumber"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-clientname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-description"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-toggle-form"]')).toBeTruthy()
    
    // List
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-item"]')).toBeTruthy()
  })

  it('shows validation error when submitting with empty fields', () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/All fields are required/i)).toBeTruthy()
  })

  it('shows error when attempting to create case with invalid status', () => {
    render(<UserAttemptsTo />)
    
    const caseNumberInput = screen.getByTestId('userattemptsto-casenumber') as HTMLInputElement
    const clientNameInput = screen.getByTestId('userattemptsto-clientname') as HTMLInputElement
    const statusSelect = screen.getByTestId('userattemptsto-status') as HTMLSelectElement
    const descriptionTextarea = screen.getByTestId('userattemptsto-description') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('userattemptsto-submit')
    
    fireEvent.change(caseNumberInput, { target: { value: 'CASE-2024-999' } })
    fireEvent.change(clientNameInput, { target: { value: 'Test Client' } })
    fireEvent.change(statusSelect, { target: { value: 'pending-review' } })
    fireEvent.change(descriptionTextarea, { target: { value: 'Test case' } })
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Invalid status "pending-review"/i)).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const caseNumberInput = screen.getByTestId('userattemptsto-casenumber') as HTMLInputElement
    const resetButton = screen.getByTestId('userattemptsto-reset')
    
    fireEvent.change(caseNumberInput, { target: { value: 'CASE-2024-999' } })
    expect(caseNumberInput.value).toBe('CASE-2024-999')
    
    fireEvent.click(resetButton)
    expect(caseNumberInput.value).toBe('')
  })

  it('toggles form visibility when toggle button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const toggleButton = screen.getByTestId('userattemptsto-toggle-form')
    const submitButton = screen.getByTestId('userattemptsto-submit')
    
    expect(submitButton).toBeTruthy()
    
    fireEvent.click(toggleButton)
    
    // After hiding, submit button should not be in document
    expect(() => screen.getByTestId('userattemptsto-submit')).toThrow()
  })

  it('displays both valid and invalid case attempts in the list', () => {
    render(<UserAttemptsTo />)
    
    // Check for valid status indicator
    expect(screen.getByText(/VALID - active/i)).toBeTruthy()
    
    // Check for invalid status indicators
    expect(screen.getByText(/INVALID - pending-review/i)).toBeTruthy()
    expect(screen.getByText(/INVALID - archived/i)).toBeTruthy()
  })

  it('has quick test buttons for invalid statuses', () => {
    render(<UserAttemptsTo />)
    
    expect(document.querySelector('[data-testid="userattemptsto-quick-pending-review"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-quick-archived"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-quick-cancelled"]')).toBeTruthy()
  })
})
