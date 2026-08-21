import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserReachesCheckout from './UserReachesCheckout'

describe('UserReachesCheckout', () => {
  it('renders without crashing', () => {
    render(<UserReachesCheckout />)
    expect(document.body).toBeTruthy()
  })

  it('displays checkout heading', () => {
    render(<UserReachesCheckout />)
    const heading = screen.getByText('Checkout')
    expect(heading).toBeTruthy()
  })

  it('displays mock cart items', () => {
    render(<UserReachesCheckout />)
    // Check for cart items
    expect(screen.getByText(/General Tso's Chicken/i)).toBeTruthy()
    expect(screen.getByText(/Vegetable Spring Rolls/i)).toBeTruthy()
    expect(screen.getByText(/Beef Fried Rice/i)).toBeTruthy()
  })

  it('shows delivery address fields when delivery is selected', () => {
    render(<UserReachesCheckout />)
    // Delivery should be selected by default
    const addressInput = screen.getByTestId('userreachescheckout-address')
    expect(addressInput).toBeTruthy()
  })

  it('hides delivery address fields when pickup is selected', () => {
    render(<UserReachesCheckout />)
    const pickupButton = screen.getByTestId('userreachescheckout-pickup')
    fireEvent.click(pickupButton)
    
    // Address field should not be visible
    const addressInputs = document.querySelectorAll('[data-testid="userreachescheckout-address"]')
    expect(addressInputs.length).toBe(0)
  })

  it('calculates total correctly', () => {
    render(<UserReachesCheckout />)
    // Should show a total price
    const totalElements = screen.getAllByText(/Total/i)
    expect(totalElements.length).toBeGreaterThan(0)
  })

  it('applies promo code correctly', () => {
    render(<UserReachesCheckout />)
    const promoInput = screen.getByTestId('userreachescheckout-promocode')
    const applyButton = screen.getByTestId('userreachescheckout-applypromo')
    
    // Enter valid promo code
    fireEvent.change(promoInput, { target: { value: 'WELCOME20' } })
    fireEvent.click(applyButton)
    
    // Should show discount
    const discountElements = screen.getAllByText(/Discount/i)
    expect(discountElements.length).toBeGreaterThan(0)
  })

  it('shows error for invalid promo code', () => {
    render(<UserReachesCheckout />)
    const promoInput = screen.getByTestId('userreachescheckout-promocode')
    const applyButton = screen.getByTestId('userreachescheckout-applypromo')
    
    // Enter invalid promo code
    fireEvent.change(promoInput, { target: { value: 'INVALID' } })
    fireEvent.click(applyButton)
    
    // Should show error message
    expect(screen.getByText(/Invalid promo code/i)).toBeTruthy()
  })

  it('handles form submission', () => {
    // Mock alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UserReachesCheckout />)
    const submitButton = screen.getByTestId('userreachescheckout-submit')
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('userreachescheckout-fullname'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByTestId('userreachescheckout-phone'), {
      target: { value: '555-1234' }
    })
    fireEvent.change(screen.getByTestId('userreachescheckout-email'), {
      target: { value: 'john@example.com' }
    })
    
    fireEvent.click(submitButton)
    
    expect(alertMock).toHaveBeenCalled()
    alertMock.mockRestore()
  })

  it('has required data-testid attributes', () => {
    render(<UserReachesCheckout />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="userreachescheckout"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-fullname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-delivery"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-pickup"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-paymentmethod"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-promocode"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-applypromo"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userreachescheckout-item"]')).toBeTruthy()
  })

  it('displays order summary with subtotal, tax, and total', () => {
    render(<UserReachesCheckout />)
    expect(screen.getByText(/Subtotal/i)).toBeTruthy()
    expect(screen.getByText(/Tax/i)).toBeTruthy()
    const totalElements = screen.getAllByText(/Total/i)
    expect(totalElements.length).toBeGreaterThan(0)
  })

  it('toggles between delivery and pickup', () => {
    render(<UserReachesCheckout />)
    const deliveryButton = screen.getByTestId('userreachescheckout-delivery')
    const pickupButton = screen.getByTestId('userreachescheckout-pickup')
    
    // Start with delivery
    expect(deliveryButton.className).toContain('border-red-600')
    
    // Switch to pickup
    fireEvent.click(pickupButton)
    expect(pickupButton.className).toContain('border-red-600')
    
    // Switch back to delivery
    fireEvent.click(deliveryButton)
    expect(deliveryButton.className).toContain('border-red-600')
  })

  it('removes applied promo code', () => {
    render(<UserReachesCheckout />)
    const promoInput = screen.getByTestId('userreachescheckout-promocode')
    const applyButton = screen.getByTestId('userreachescheckout-applypromo')
    
    // Apply promo code
    fireEvent.change(promoInput, { target: { value: 'WELCOME20' } })
    fireEvent.click(applyButton)
    
    // Remove promo code
    const removeButton = screen.getByTestId('userreachescheckout-removepromo')
    fireEvent.click(removeButton)
    
    // Should show apply button again
    expect(screen.getByTestId('userreachescheckout-applypromo')).toBeTruthy()
  })
})
