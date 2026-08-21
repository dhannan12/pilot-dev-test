import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import IntegratePayment from './IntegratePayment'

describe('IntegratePayment', () => {
  it('renders without crashing', () => {
    render(<IntegratePayment />)
    expect(document.body).toBeTruthy()
  })

  it('displays payment gateway title', () => {
    render(<IntegratePayment />)
    expect(screen.getByText('Payment Checkout')).toBeTruthy()
  })

  it('displays all three payment methods', () => {
    render(<IntegratePayment />)
    expect(screen.getByText('Credit/Debit Card')).toBeTruthy()
    expect(screen.getByText('PayPal')).toBeTruthy()
    expect(screen.getByText('Apple Pay')).toBeTruthy()
  })

  it('displays order summary with mock items', () => {
    render(<IntegratePayment />)
    expect(screen.getByText('Order Summary')).toBeTruthy()
    expect(screen.getByText('Sweet and Sour Chicken')).toBeTruthy()
    expect(screen.getByText('Fried Rice')).toBeTruthy()
    expect(screen.getByText('Spring Rolls')).toBeTruthy()
  })

  it('displays order totals', () => {
    render(<IntegratePayment />)
    expect(screen.getByText('Subtotal')).toBeTruthy()
    expect(screen.getByText('Tax')).toBeTruthy()
    expect(screen.getByText('Delivery')).toBeTruthy()
    expect(screen.getByText('Total')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<IntegratePayment />)
    
    // Main wrapper
    const mainWrapper = screen.getByTestId('integrate-payment')
    expect(mainWrapper).toBeTruthy()
    
    // Payment methods list
    const methodsList = screen.getByTestId('integrate-payment-methods-list')
    expect(methodsList).toBeTruthy()
    
    // Payment method items
    const methodItems = screen.getAllByTestId('integrate-payment-method-item')
    expect(methodItems.length).toBe(3)
    
    // Order items
    const orderItems = screen.getAllByTestId('integrate-payment-order-item')
    expect(orderItems.length).toBeGreaterThan(0)
  })

  it('allows selecting a payment method', () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    // Should show card input fields
    expect(screen.getByTestId('integrate-payment-card-number')).toBeTruthy()
    expect(screen.getByTestId('integrate-payment-card-name')).toBeTruthy()
    expect(screen.getByTestId('integrate-payment-card-expiry')).toBeTruthy()
    expect(screen.getByTestId('integrate-payment-card-cvv')).toBeTruthy()
  })

  it('shows card form when credit card is selected', () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    expect(screen.getByText('Card Details')).toBeTruthy()
    expect(screen.getByPlaceholderText('1234 5678 9012 3456')).toBeTruthy()
    expect(screen.getByPlaceholderText('John Smith')).toBeTruthy()
  })

  it('shows PayPal form when PayPal is selected', () => {
    render(<IntegratePayment />)
    
    const paypalMethod = screen.getAllByTestId('integrate-payment-method-item')[1]
    fireEvent.click(paypalMethod)
    
    expect(screen.getByText('PayPal Account')).toBeTruthy()
    expect(screen.getByTestId('integrate-payment-paypal-email')).toBeTruthy()
  })

  it('shows Apple Pay info when Apple Pay is selected', () => {
    render(<IntegratePayment />)
    
    const applePayMethod = screen.getAllByTestId('integrate-payment-method-item')[2]
    fireEvent.click(applePayMethod)
    
    expect(screen.getByText(/Click the button below to pay with Apple Pay/i)).toBeTruthy()
    expect(screen.getByText(/Your payment information is securely handled by Apple/i)).toBeTruthy()
  })

  it('shows submit button after selecting payment method', () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    const submitButton = screen.getByTestId('integrate-payment-submit')
    expect(submitButton).toBeTruthy()
    expect(submitButton.textContent).toContain('Pay')
  })

  it('validates card inputs on submit', () => {
    render(<IntegratePayment />)
    
    // Select card payment
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    // Try to submit without filling fields
    const submitButton = screen.getByTestId('integrate-payment-submit')
    fireEvent.click(submitButton)
    
    // Should show validation errors
    expect(screen.getByText('Card number is required')).toBeTruthy()
    expect(screen.getByText('Cardholder name is required')).toBeTruthy()
  })

  it('formats card number with spaces', () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    const cardInput = screen.getByTestId('integrate-payment-card-number')
    fireEvent.change(cardInput, { target: { value: '1234567890123456' } })
    
    // Should be formatted with spaces
    expect((cardInput as HTMLInputElement).value).toContain(' ')
  })

  it('validates expiry date format', () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    const cardNumber = screen.getByTestId('integrate-payment-card-number')
    const cardName = screen.getByTestId('integrate-payment-card-name')
    const cardExpiry = screen.getByTestId('integrate-payment-card-expiry')
    const cardCvv = screen.getByTestId('integrate-payment-card-cvv')
    
    fireEvent.change(cardNumber, { target: { value: '4532123456789012' } })
    fireEvent.change(cardName, { target: { value: 'John Doe' } })
    fireEvent.change(cardExpiry, { target: { value: '1225' } })
    fireEvent.change(cardCvv, { target: { value: '123' } })
    
    // Expiry should be formatted as MM/YY
    expect((cardExpiry as HTMLInputElement).value).toBe('12/25')
  })

  it('validates PayPal email on submit', () => {
    render(<IntegratePayment />)
    
    const paypalMethod = screen.getAllByTestId('integrate-payment-method-item')[1]
    fireEvent.click(paypalMethod)
    
    const submitButton = screen.getByTestId('integrate-payment-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('PayPal email is required')).toBeTruthy()
  })

  it('shows processing state when payment is submitted', async () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    const cardNumber = screen.getByTestId('integrate-payment-card-number')
    const cardName = screen.getByTestId('integrate-payment-card-name')
    const cardExpiry = screen.getByTestId('integrate-payment-card-expiry')
    const cardCvv = screen.getByTestId('integrate-payment-card-cvv')
    
    fireEvent.change(cardNumber, { target: { value: '4532123456789012' } })
    fireEvent.change(cardName, { target: { value: 'John Doe' } })
    fireEvent.change(cardExpiry, { target: { value: '1225' } })
    fireEvent.change(cardCvv, { target: { value: '123' } })
    
    const submitButton = screen.getByTestId('integrate-payment-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Processing Payment/i)).toBeTruthy()
    })
  })

  it('shows success message after payment completes', async () => {
    render(<IntegratePayment />)
    
    const cardMethod = screen.getAllByTestId('integrate-payment-method-item')[0]
    fireEvent.click(cardMethod)
    
    const cardNumber = screen.getByTestId('integrate-payment-card-number')
    const cardName = screen.getByTestId('integrate-payment-card-name')
    const cardExpiry = screen.getByTestId('integrate-payment-card-expiry')
    const cardCvv = screen.getByTestId('integrate-payment-card-cvv')
    
    fireEvent.change(cardNumber, { target: { value: '4532123456789012' } })
    fireEvent.change(cardName, { target: { value: 'John Doe' } })
    fireEvent.change(cardExpiry, { target: { value: '1225' } })
    fireEvent.change(cardCvv, { target: { value: '123' } })
    
    const submitButton = screen.getByTestId('integrate-payment-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Payment Successful!')).toBeTruthy()
    }, { timeout: 3000 })
  })

  it('displays processing fee for PayPal', () => {
    render(<IntegratePayment />)
    
    const paypalMethod = screen.getAllByTestId('integrate-payment-method-item')[1]
    fireEvent.click(paypalMethod)
    
    expect(screen.getByText('+£0.50 fee')).toBeTruthy()
    expect(screen.getByText('Processing Fee')).toBeTruthy()
  })

  it('shows secure payment indicators', () => {
    render(<IntegratePayment />)
    
    expect(screen.getByText(/Secure Payment/i)).toBeTruthy()
    expect(screen.getByText(/SSL Encrypted/i)).toBeTruthy()
  })
})
