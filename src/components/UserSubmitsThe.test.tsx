import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsThe from './UserSubmitsThe'

describe('UserSubmitsThe', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the contact form with all fields', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument()
  })

  it('displays invalid email format examples', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByText('user@')).toBeInTheDocument()
    expect(screen.getByText('@domain.com')).toBeInTheDocument()
    expect(screen.getByText('user.domain.com')).toBeInTheDocument()
  })

  it('shows validation error for invalid email format', () => {
    render(<UserSubmitsThe />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit form/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    const errorMessages = screen.getAllByText(/invalid email format/i)
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('shows validation error for email without @ symbol', () => {
    render(<UserSubmitsThe />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit form/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'user.domain.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    const errorMessages = screen.getAllByText(/invalid email format/i)
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('allows user to click invalid email examples', () => {
    render(<UserSubmitsThe />)
    
    const invalidEmailButton = screen.getByText('user@')
    fireEvent.click(invalidEmailButton)

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    expect(emailInput.value).toBe('user@')
  })

  it('displays submission history after form submission', () => {
    render(<UserSubmitsThe />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit form/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'invalid@' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Submission History')).toBeInTheDocument()
  })

  it('clears field error when user starts typing', () => {
    render(<UserSubmitsThe />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit form/i })

    // Submit with empty email to trigger error
    fireEvent.click(submitButton)
    const errorsBefore = screen.getAllByText(/email is required/i)
    expect(errorsBefore.length).toBeGreaterThan(0)

    // Start typing - form field error should clear (but history may still have it)
    fireEvent.change(emailInput, { target: { value: 'test@' } })
    // The error in the form field should be gone or reduced
    const errorsAfter = screen.queryAllByText(/email is required/i)
    expect(errorsAfter.length).toBeLessThan(errorsBefore.length)
  })
})
