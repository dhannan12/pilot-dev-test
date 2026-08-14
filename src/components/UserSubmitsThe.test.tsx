import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsThe from './UserSubmitsThe'

describe('UserSubmitsThe', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the contact form title', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByText('Contact Form')).toBeTruthy()
  })

  it('displays all form fields', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByLabelText(/Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email/i)).toBeTruthy()
    expect(screen.getByLabelText(/Phone/i)).toBeTruthy()
    expect(screen.getByLabelText(/Subject/i)).toBeTruthy()
    expect(screen.getByLabelText(/Message/i)).toBeTruthy()
  })

  it('shows validation errors when submitting empty form', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Form submission failed/i)).toBeTruthy()
  })

  it('displays mock data buttons', () => {
    render(<UserSubmitsThe />)
    expect(screen.getByText('Test with Mock Invalid Data')).toBeTruthy()
    expect(screen.getByText('Load Invalid #1')).toBeTruthy()
    expect(screen.getByText('Load Invalid #2')).toBeTruthy()
  })

  it('loads mock invalid data when button clicked', () => {
    render(<UserSubmitsThe />)
    const loadButton = screen.getByText('Load Invalid #1')
    fireEvent.click(loadButton)
    
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement
    expect(emailInput.value).toBeTruthy()
  })

  it('shows field-specific error messages', () => {
    render(<UserSubmitsThe />)
    const submitButton = screen.getByText('Submit Form')
    fireEvent.click(submitButton)
    
    const nameErrors = screen.getAllByText(/Name is required/i)
    expect(nameErrors.length).toBeGreaterThan(0)
    const emailErrors = screen.getAllByText(/Invalid email format/i)
    expect(emailErrors.length).toBeGreaterThan(0)
  })

  it('validates email format', () => {
    render(<UserSubmitsThe />)
    const emailInput = screen.getByLabelText(/Email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByText('Submit Form')
    fireEvent.click(submitButton)
    
    const emailErrors = screen.getAllByText(/Invalid email format/i)
    expect(emailErrors.length).toBeGreaterThan(0)
  })

  it('validates phone number format', () => {
    render(<UserSubmitsThe />)
    const phoneInput = screen.getByLabelText(/Phone/i)
    fireEvent.change(phoneInput, { target: { value: '123' } })
    
    const submitButton = screen.getByText('Submit Form')
    fireEvent.click(submitButton)
    
    const phoneErrors = screen.getAllByText(/Phone number must be 10 digits/i)
    expect(phoneErrors.length).toBeGreaterThan(0)
  })

  it('validates message length', () => {
    render(<UserSubmitsThe />)
    const messageInput = screen.getByLabelText(/Message/i)
    fireEvent.change(messageInput, { target: { value: 'Short' } })
    
    const submitButton = screen.getByText('Submit Form')
    fireEvent.click(submitButton)
    
    const messageErrors = screen.getAllByText(/Message must be at least 10 characters/i)
    expect(messageErrors.length).toBeGreaterThan(0)
  })
})
