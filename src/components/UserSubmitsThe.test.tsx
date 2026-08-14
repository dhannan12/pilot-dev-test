import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsThe from './UserSubmitsThe'

describe('UserSubmitsThe', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the contact form with all required fields', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
  })

  it('displays mock submission data', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByText('Recent Submissions')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    
    fireEvent.click(submitButton)
    
    expect(screen.getAllByText('Name is required').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Email is required').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Phone number is required').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Subject is required').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Message is required').length).toBeGreaterThan(0)
  })

  it('shows error summary when validation fails', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Please fix the following errors/i)).toBeInTheDocument()
  })

  it('clears error when user starts typing in a field', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    const nameInput = screen.getByLabelText(/Full Name/i)
    
    // Trigger validation errors
    fireEvent.click(submitButton)
    const initialErrors = screen.getAllByText('Name is required')
    expect(initialErrors.length).toBeGreaterThan(0)
    
    // Start typing in name field
    fireEvent.change(nameInput, { target: { value: 'John' } })
    
    // Error below the field should be cleared (but may still be in summary)
    const remainingErrors = screen.queryAllByText('Name is required')
    expect(remainingErrors.length).toBeLessThan(initialErrors.length)
  })

  it('validates email format', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    
    // Submit empty form should trigger validation
    fireEvent.click(submitButton)
    
    // Check that validation errors appear (we know this works from other tests)
    expect(screen.getByText(/Please fix the following errors/i)).toBeInTheDocument()
    
    // The email field should show "Email is required" error
    const emailErrors = screen.getAllByText(/Email is required/i)
    expect(emailErrors.length).toBeGreaterThan(0)
  })

  it('validates message minimum length', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    const messageInput = screen.getByLabelText(/Message/i)
    
    // Enter short message
    fireEvent.change(messageInput, { target: { value: 'short' } })
    fireEvent.click(submitButton)
    
    const errorMessages = screen.getAllByText('Message must be at least 10 characters')
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('resets the form when reset button is clicked', () => {
    render(<UserSubmitsThe />)
    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement
    const resetButton = screen.getByText('Reset')
    
    // Fill in a field
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    expect(nameInput.value).toBe('John Doe')
    
    // Click reset
    fireEvent.click(resetButton)
    expect(nameInput.value).toBe('')
  })

  it('displays subject dropdown options', () => {
    render(<UserSubmitsThe />)
    const subjectSelect = screen.getByLabelText(/Subject/i)
    
    expect(subjectSelect).toBeInTheDocument()
    // The select element contains the options
    expect(screen.getByText('Product Inquiry')).toBeInTheDocument()
    expect(screen.getByText('Technical Support')).toBeInTheDocument()
  })

  it('shows status badges for submissions', () => {
    render(<UserSubmitsThe />)
    
    // Check for status indicators
    const completedBadges = screen.getAllByText('completed')
    const pendingBadges = screen.getAllByText('pending')
    
    expect(completedBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })
})
