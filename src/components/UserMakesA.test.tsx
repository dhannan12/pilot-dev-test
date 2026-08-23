import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserMakesA from './UserMakesA'

describe('UserMakesA', () => {
  it('renders without crashing', () => {
    render(<UserMakesA />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock menu products', () => {
    render(<UserMakesA />)
    expect(screen.getByText('Espresso')).toBeTruthy()
    expect(screen.getByText('Latte')).toBeTruthy()
    expect(screen.getByText('Cappuccino')).toBeTruthy()
    expect(screen.getByText('Americano')).toBeTruthy()
    expect(screen.getByText('Mocha')).toBeTruthy()
  })

  it('displays initial rewards points balance', () => {
    render(<UserMakesA />)
    const balance = screen.getByTestId('usermakesa-points-balance')
    expect(balance.textContent).toBe('250')
  })

  it('has required data-testid attributes', () => {
    render(<UserMakesA />)
    // Main wrapper
    expect(screen.getByTestId('usermakesa')).toBeTruthy()
    // List container
    expect(screen.getByTestId('usermakesa-list')).toBeTruthy()
    // List items
    expect(screen.getAllByTestId('usermakesa-item').length).toBeGreaterThan(0)
    // Add button
    expect(screen.getAllByTestId('usermakesa-add').length).toBeGreaterThan(0)
  })

  it('adds product to cart when Add to Cart is clicked', () => {
    render(<UserMakesA />)
    const addButtons = screen.getAllByTestId('usermakesa-add')
    fireEvent.click(addButtons[0])
    
    // Cart should now show an item
    expect(screen.getByTestId('usermakesa-cart')).toBeTruthy()
    expect(screen.getByTestId('usermakesa-cart-item')).toBeTruthy()
  })

  it('calculates total and points correctly', () => {
    render(<UserMakesA />)
    const addButtons = screen.getAllByTestId('usermakesa-add')
    
    // Add first product (Espresso $3.50, 35 points)
    fireEvent.click(addButtons[0])
    
    const total = screen.getByTestId('usermakesa-total')
    const points = screen.getByTestId('usermakesa-points-earn')
    
    expect(total.textContent).toBe('$3.50')
    expect(points.textContent).toBe('+35')
  })

  it('completes purchase and updates rewards points', () => {
    render(<UserMakesA />)
    
    // Add a product to cart
    const addButtons = screen.getAllByTestId('usermakesa-add')
    fireEvent.click(addButtons[0]) // Espresso: 35 points
    
    // Complete purchase
    const submitButton = screen.getByTestId('usermakesa-submit')
    fireEvent.click(submitButton)
    
    // Check confirmation message
    expect(screen.getByTestId('usermakesa-confirmation')).toBeTruthy()
    
    // Check updated balance (250 + 35 = 285)
    const balance = screen.getByTestId('usermakesa-points-balance')
    expect(balance.textContent).toBe('285')
  })

  it('clears cart when Clear Cart is clicked', () => {
    render(<UserMakesA />)
    
    // Add a product
    const addButtons = screen.getAllByTestId('usermakesa-add')
    fireEvent.click(addButtons[0])
    
    // Clear cart
    const clearButton = screen.getByTestId('usermakesa-clear')
    fireEvent.click(clearButton)
    
    // Cart should be empty
    expect(screen.getByTestId('usermakesa-empty')).toBeTruthy()
  })

  it('increases and decreases item quantity in cart', () => {
    render(<UserMakesA />)
    
    // Add a product twice
    const addButtons = screen.getAllByTestId('usermakesa-add')
    fireEvent.click(addButtons[0])
    
    // Increase quantity
    const increaseButton = screen.getByTestId('usermakesa-increase')
    fireEvent.click(increaseButton)
    
    // Check total is doubled
    const total = screen.getByTestId('usermakesa-total')
    expect(total.textContent).toBe('$7.00') // 3.50 * 2
    
    // Decrease quantity
    const decreaseButton = screen.getByTestId('usermakesa-decrease')
    fireEvent.click(decreaseButton)
    
    // Total should be back to single item
    expect(total.textContent).toBe('$3.50')
  })
})
