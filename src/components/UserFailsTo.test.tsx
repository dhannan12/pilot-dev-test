import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserFailsTo from './UserFailsTo'

describe('UserFailsTo', () => {
  it('renders without crashing', () => {
    render(<UserFailsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays payment method options', () => {
    render(<UserFailsTo />)
    expect(screen.getByText('Credit Card')).toBeTruthy()
    expect(screen.getByText('Debit Card')).toBeTruthy()
    expect(screen.getByText('PayPal')).toBeTruthy()
    expect(screen.getByText('Apple Pay')).toBeTruthy()
    expect(screen.getByText('Google Pay')).toBeTruthy()
  })

  it('displays order summary with mock items', () => {
    render(<UserFailsTo />)
    expect(screen.getByText('Order Summary')).toBeTruthy()
    expect(screen.getByText('Premium Gym Membership')).toBeTruthy()
    expect(screen.getByText(/Personal Training Session/)).toBeTruthy()
  })

  it('shows error banner when submitting without selecting payment method', () => {
    render(<UserFailsTo />)
    const submitButton = screen.getByTestId('userfailsto-submit')
    
    fireEvent.click(submitButton)
    
    expect(screen.getByTestId('userfailsto-error-banner')).toBeTruthy()
    expect(screen.getByText('Payment Method Required')).toBeTruthy()
  })

  it('clears error when payment method is selected', () => {
    render(<UserFailsTo />)
    const submitButton = screen.getByTestId('userfailsto-submit')
    
    // First, trigger the error
    fireEvent.click(submitButton)
    expect(screen.getByTestId('userfailsto-error-banner')).toBeTruthy()
    
    // Then select a payment method
    const paymentItems = screen.getAllByTestId('userfailsto-item')
    fireEvent.click(paymentItems[0])
    
    // Error should be cleared
    expect(screen.queryByTestId('userfailsto-error-banner')).toBeFalsy()
  })

  it('allows user to reset the form', () => {
    render(<UserFailsTo />)
    const resetButton = screen.getByTestId('userfailsto-reset')
    const nameInput = screen.getByTestId('userfailsto-billingname') as HTMLInputElement
    
    // Fill in some data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    expect(nameInput.value).toBe('John Doe')
    
    // Reset form
    fireEvent.click(resetButton)
    expect(nameInput.value).toBe('')
  })

  it('has required data-testid attributes', () => {
    render(<UserFailsTo />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="userfailsto"]')).toBeTruthy()
    
    // Verify buttons
    expect(document.querySelector('[data-testid="userfailsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userfailsto-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userfailsto-help"]')).toBeTruthy()
    
    // Verify inputs
    expect(document.querySelector('[data-testid="userfailsto-billingname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userfailsto-billingemail"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userfailsto-billingaddress"]')).toBeTruthy()
    
    // Verify list and items
    expect(document.querySelector('[data-testid="userfailsto-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="userfailsto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays form fields correctly', () => {
    render(<UserFailsTo />)
    
    expect(screen.getByTestId('userfailsto-billingname')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-billingemail')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-billingaddress')).toBeTruthy()
  })

  it('calculates and displays total amount', () => {
    render(<UserFailsTo />)
    
    // Check that total is displayed
    expect(screen.getByText('Total')).toBeTruthy()
    // The total should be $244.99 (49.99 + 120.00 + 15.00 + 35.00 + 25.00)
    expect(screen.getByText('$244.99')).toBeTruthy()
  })

  it('allows selection of payment method', () => {
    render(<UserFailsTo />)
    
    const paymentItems = screen.getAllByTestId('userfailsto-item')
    expect(paymentItems.length).toBe(5)
    
    // Click first payment method
    fireEvent.click(paymentItems[0])
    
    // Should have selected class or styling applied
    expect(paymentItems[0].className).toContain('border-teal-600')
  })
})
