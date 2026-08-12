import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import ValidMembership from './ValidMembership'

describe('ValidMembership', () => {
  it('renders without crashing', () => {
    render(<ValidMembership />)
    expect(document.body).toBeTruthy()
  })

  it('displays the enrollment form with all required fields', () => {
    render(<ValidMembership />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit enrollment/i })).toBeInTheDocument()
  })

  it('displays mock enrollment data', () => {
    render(<ValidMembership />)
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('James Wilson')).toBeInTheDocument()
    expect(screen.getByText('Olivia Martinez')).toBeInTheDocument()
  })

  it('shows validation error when name is empty and field is blurred', async () => {
    render(<ValidMembership />)
    const nameInput = screen.getByLabelText(/full name/i)
    
    fireEvent.focus(nameInput)
    fireEvent.blur(nameInput)
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    render(<ValidMembership />)
    const emailInput = screen.getByLabelText(/email address/i)
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('shows validation error when phone number is too short', async () => {
    render(<ValidMembership />)
    const phoneInput = screen.getByLabelText(/phone number/i)
    
    fireEvent.change(phoneInput, { target: { value: '123' } })
    fireEvent.blur(phoneInput)
    
    await waitFor(() => {
      expect(screen.getByText(/phone number must contain at least 10 digits/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    render(<ValidMembership />)
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const submitButton = screen.getByRole('button', { name: /submit enrollment/i })
    
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '(555) 999-8888' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/enrollment submitted successfully/i)).toBeInTheDocument()
    })
    
    // Check that the new enrollment appears in the list
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('clears form after successful submission', async () => {
    render(<ValidMembership />)
    
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const phoneInput = screen.getByLabelText(/phone number/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /submit enrollment/i })
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '5551234567' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(phoneInput.value).toBe('')
    })
  })

  it('displays status badges for enrollments', () => {
    render(<ValidMembership />)
    
    // Check for status badges
    const statusBadges = screen.getAllByText(/active|pending/i)
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it('shows enrollment count', () => {
    render(<ValidMembership />)
    expect(screen.getByText(/recent enrollments/i)).toBeInTheDocument()
  })
})
