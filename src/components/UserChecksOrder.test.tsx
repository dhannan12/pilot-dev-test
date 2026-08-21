import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksOrder from './UserChecksOrder'

describe('UserChecksOrder', () => {
  it('renders without crashing', () => {
    render(<UserChecksOrder />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock order items', () => {
    render(<UserChecksOrder />)
    
    // Check for specific menu items
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Vegetable Spring Rolls (6pc)')).toBeTruthy()
    expect(screen.getByText('Beef Chow Mein')).toBeTruthy()
    expect(screen.getByText('Hot and Sour Soup')).toBeTruthy()
    expect(screen.getByText('Egg Fried Rice')).toBeTruthy()
  })

  it('displays order total breakdown', () => {
    render(<UserChecksOrder />)
    
    // Check for total labels
    expect(screen.getByText('Subtotal')).toBeTruthy()
    expect(screen.getByText('Tax (13%)')).toBeTruthy()
    expect(screen.getByText('Delivery Fee')).toBeTruthy()
    expect(screen.getByText('Total')).toBeTruthy()
  })

  it('calculates and displays correct subtotal', () => {
    render(<UserChecksOrder />)
    
    // Subtotal should be: (13.99*2) + 6.99 + 11.99 + (4.99*2) + 8.99 = 65.93
    const subtotalElements = screen.getAllByText(/\$65\.93/)
    expect(subtotalElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksOrder />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="userchecksorder"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="userchecksorder-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="userchecksorder-item"]')
    expect(listItems.length).toBe(5)
    
    // Promo code input
    const promoInput = document.querySelector('[data-testid="userchecksorder-promocode"]')
    expect(promoInput).toBeTruthy()
    
    // Apply button
    const applyButton = document.querySelector('[data-testid="userchecksorder-apply"]')
    expect(applyButton).toBeTruthy()
    
    // Action buttons
    const backButton = document.querySelector('[data-testid="userchecksorder-back"]')
    expect(backButton).toBeTruthy()
    
    const checkoutButton = document.querySelector('[data-testid="userchecksorder-checkout"]')
    expect(checkoutButton).toBeTruthy()
  })

  it('displays special instructions when present', () => {
    render(<UserChecksOrder />)
    
    expect(screen.getByText('Note: Extra spicy')).toBeTruthy()
  })

  it('shows item quantities and prices correctly', () => {
    render(<UserChecksOrder />)
    
    // Check for quantity display
    const quantityElements = screen.getAllByText(/Quantity: \d+/)
    expect(quantityElements.length).toBeGreaterThan(0)
  })

  it('allows applying a promo code', () => {
    render(<UserChecksOrder />)
    
    const promoInput = screen.getByTestId('userchecksorder-promocode') as HTMLInputElement
    const applyButton = screen.getByTestId('userchecksorder-apply')
    
    // Enter promo code
    fireEvent.change(promoInput, { target: { value: 'SAVE10' } })
    expect(promoInput.value).toBe('SAVE10')
    
    // Apply promo code
    fireEvent.click(applyButton)
    
    // Check if promo was applied
    const appliedMessage = screen.getByText(/Promo code "SAVE10" applied/)
    expect(appliedMessage).toBeTruthy()
  })

  it('shows error for invalid promo code', () => {
    render(<UserChecksOrder />)
    
    const promoInput = screen.getByTestId('userchecksorder-promocode') as HTMLInputElement
    const applyButton = screen.getByTestId('userchecksorder-apply')
    
    // Enter invalid promo code
    fireEvent.change(promoInput, { target: { value: 'INVALID' } })
    fireEvent.click(applyButton)
    
    // Check for error message
    const errorMessage = screen.getByText('Invalid promo code')
    expect(errorMessage).toBeTruthy()
  })

  it('allows removing applied promo code', () => {
    render(<UserChecksOrder />)
    
    const promoInput = screen.getByTestId('userchecksorder-promocode') as HTMLInputElement
    const applyButton = screen.getByTestId('userchecksorder-apply')
    
    // Apply promo code
    fireEvent.change(promoInput, { target: { value: 'SAVE10' } })
    fireEvent.click(applyButton)
    
    // Remove promo code
    const removeButton = screen.getByTestId('userchecksorder-removepromo')
    fireEvent.click(removeButton)
    
    // Check that input is visible again
    const promoInputAfter = screen.getByTestId('userchecksorder-promocode')
    expect(promoInputAfter).toBeTruthy()
  })

  it('displays free delivery for orders over $30', () => {
    render(<UserChecksOrder />)
    
    // Our mock order is over $30, so should show FREE delivery
    const freeDelivery = screen.getByText('FREE')
    expect(freeDelivery).toBeTruthy()
  })

  it('shows estimated delivery time', () => {
    render(<UserChecksOrder />)
    
    expect(screen.getByText(/Estimated delivery time: 30-45 minutes/)).toBeTruthy()
  })
})
