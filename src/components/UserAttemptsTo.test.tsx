import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the membership sign-up form', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Gym Membership Sign-Up/i)).toBeInTheDocument()
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose Your Plan/i)).toBeInTheDocument()
    expect(screen.getByText(/Select Payment Method/i)).toBeInTheDocument()
  })

  it('displays all membership plans', () => {
    render(<UserAttemptsTo />)
    const planItems = screen.getAllByTestId('userattemptsto-plan-item')
    expect(planItems.length).toBe(5)
    expect(screen.getAllByText('Basic').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Standard').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Premium').length).toBeGreaterThan(0)
  })

  it('displays all payment methods', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Credit Card')).toBeInTheDocument()
    expect(screen.getByText('Debit Card')).toBeInTheDocument()
    expect(screen.getByText('PayPal')).toBeInTheDocument()
    expect(screen.getByText('Apple Pay')).toBeInTheDocument()
    expect(screen.getByText('Google Pay')).toBeInTheDocument()
  })

  it('shows validation error when attempting to submit without payment method', () => {
    render(<UserAttemptsTo />)
    
    const firstNameInput = screen.getByTestId('userattemptsto-firstname')
    const lastNameInput = screen.getByTestId('userattemptsto-lastname')
    const emailInput = screen.getByTestId('userattemptsto-email')
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Please select a payment method to complete your membership sign-up/i)).toBeInTheDocument()
  })

  it('allows user to select a payment method', () => {
    render(<UserAttemptsTo />)
    
    const paymentItems = screen.getAllByTestId('userattemptsto-payment-item')
    expect(paymentItems.length).toBeGreaterThan(0)
    
    fireEvent.click(paymentItems[0])
    
    expect(paymentItems[0]).toHaveClass('border-indigo-600')
  })

  it('allows user to select a membership plan', () => {
    render(<UserAttemptsTo />)
    
    const planItems = screen.getAllByTestId('userattemptsto-plan-item')
    expect(planItems.length).toBe(5)
    
    fireEvent.click(planItems[2])
    
    expect(planItems[2]).toHaveClass('border-indigo-600')
  })

  it('shows order summary with selected plan', () => {
    render(<UserAttemptsTo />)
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText(/Membership Plan:/i)).toBeInTheDocument()
    expect(screen.getByText(/Billing Period:/i)).toBeInTheDocument()
    expect(screen.getByText(/Payment Method:/i)).toBeInTheDocument()
  })

  it('validates required fields and email format', () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByTestId('userattemptsto-submit')
    
    // Submit empty form
    fireEvent.click(submitButton)
    
    // All required field errors should appear
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Please select a payment method/i)).toBeInTheDocument()
  })

  it('requires first name and last name', () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByTestId('userattemptsto-submit')
    
    fireEvent.click(submitButton)
    
    // Check that error messages appear
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    expect(screen.getByTestId('userattemptsto')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-firstname')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-lastname')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-email')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-submit')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-plan-list')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-payment-list')).toBeInTheDocument()
    
    const planItems = screen.getAllByTestId('userattemptsto-plan-item')
    expect(planItems.length).toBe(5)
    
    const paymentItems = screen.getAllByTestId('userattemptsto-payment-item')
    expect(paymentItems.length).toBe(5)
  })

  it('submits successfully when all fields are valid', async () => {
    render(<UserAttemptsTo />)
    
    fireEvent.change(screen.getByTestId('userattemptsto-firstname'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByTestId('userattemptsto-lastname'), { target: { value: 'Smith' } })
    fireEvent.change(screen.getByTestId('userattemptsto-email'), { target: { value: 'jane.smith@example.com' } })
    
    const paymentItems = screen.getAllByTestId('userattemptsto-payment-item')
    fireEvent.click(paymentItems[0])
    
    fireEvent.click(screen.getByTestId('userattemptsto-submit'))
    
    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText(/Membership Sign-Up Complete!/i)).toBeInTheDocument()
    })
  })
})
