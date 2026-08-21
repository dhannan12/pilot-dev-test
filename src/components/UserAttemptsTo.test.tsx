import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock cart items', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Spring Rolls (4 pcs)')).toBeTruthy()
    expect(screen.getByText('Fried Rice')).toBeTruthy()
    expect(screen.getByText('Sweet and Sour Pork')).toBeTruthy()
    expect(screen.getByText('Wonton Soup')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('userattemptsto-ordertype')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-name')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-phone')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-email')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-address')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-instructions')).toBeTruthy()
    
    // Submit button
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items.length).toBe(5)
  })

  it('shows order summary with correct totals', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Order Summary')).toBeTruthy()
    expect(screen.getByText(/Subtotal/)).toBeTruthy()
    expect(screen.getByText(/Tax/)).toBeTruthy()
    expect(screen.getByText(/Total/)).toBeTruthy()
  })

  it('validates required fields on submit', async () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeTruthy()
      expect(screen.getByText('Phone number is required')).toBeTruthy()
      expect(screen.getByText('Email is required')).toBeTruthy()
    })
  })

  it('allows user to fill out form', () => {
    render(<UserAttemptsTo />)
    
    const nameInput = screen.getByTestId('userattemptsto-name') as HTMLInputElement
    const phoneInput = screen.getByTestId('userattemptsto-phone') as HTMLInputElement
    const emailInput = screen.getByTestId('userattemptsto-email') as HTMLInputElement
    const addressInput = screen.getByTestId('userattemptsto-address') as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(phoneInput, { target: { value: '5551234567' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(addressInput, { target: { value: '123 Main St' } })
    
    expect(nameInput.value).toBe('John Doe')
    expect(phoneInput.value).toBe('5551234567')
    expect(emailInput.value).toBe('john@example.com')
    expect(addressInput.value).toBe('123 Main St')
  })

  it('switches between delivery and pickup', () => {
    render(<UserAttemptsTo />)
    
    const orderTypeSelect = screen.getByTestId('userattemptsto-ordertype') as HTMLSelectElement
    
    // Should start with delivery
    expect(orderTypeSelect.value).toBe('delivery')
    expect(screen.getByTestId('userattemptsto-address')).toBeTruthy()
    
    // Switch to pickup
    fireEvent.change(orderTypeSelect, { target: { value: 'pickup' } })
    expect(orderTypeSelect.value).toBe('pickup')
  })

  it('shows success message after valid form submission', async () => {
    render(<UserAttemptsTo />)
    
    // Fill out form
    fireEvent.change(screen.getByTestId('userattemptsto-name'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByTestId('userattemptsto-phone'), {
      target: { value: '5551234567' },
    })
    fireEvent.change(screen.getByTestId('userattemptsto-email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByTestId('userattemptsto-address'), {
      target: { value: '123 Main St' },
    })
    
    // Submit form
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    
    // Wait for success message
    await waitFor(
      () => {
        expect(screen.getByText('Order Placed Successfully!')).toBeTruthy()
      },
      { timeout: 2000 }
    )
  })
})
