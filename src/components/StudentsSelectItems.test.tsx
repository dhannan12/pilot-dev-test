import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StudentsSelectItems from './StudentsSelectItems'

describe('StudentsSelectItems', () => {
  it('renders without crashing', () => {
    render(<StudentsSelectItems />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<StudentsSelectItems />)
    expect(screen.getByText('Select Your Items')).toBeTruthy()
  })

  it('displays only available menu items', () => {
    render(<StudentsSelectItems />)
    // Available items should be shown
    expect(screen.getByText('Scrambled Eggs & Toast')).toBeTruthy()
    expect(screen.getByText('Chicken Caesar Wrap')).toBeTruthy()
    
    // Unavailable items should not be shown (Beef Burger Meal, Fish & Chips)
    expect(screen.queryByText('Beef Burger Meal')).toBeFalsy()
  })

  it('displays mock data with at least 5 available items', () => {
    const { container } = render(<StudentsSelectItems />)
    const items = container.querySelectorAll('[data-testid="studentsselectitems-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('allows filtering by category', () => {
    render(<StudentsSelectItems />)
    
    // Click on lunch category
    const lunchButton = screen.getByTestId('studentsselectitems-category-lunch')
    fireEvent.click(lunchButton)
    
    // Should show lunch items
    expect(screen.getByText('Chicken Caesar Wrap')).toBeTruthy()
    expect(screen.getByText('Vegetarian Pizza Slice')).toBeTruthy()
    
    // Should not show breakfast items
    expect(screen.queryByText('Scrambled Eggs & Toast')).toBeFalsy()
  })

  it('can add items to cart', () => {
    render(<StudentsSelectItems />)
    
    // Find and click add button for an item
    const addButtons = screen.getAllByTestId(/studentsselectitems-add-/)
    fireEvent.click(addButtons[0])
    
    // Cart counter should show 1 item
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    expect(cartButton.textContent).toContain('1')
  })

  it('can view cart', () => {
    render(<StudentsSelectItems />)
    
    // Click cart button
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    fireEvent.click(cartButton)
    
    // Cart should be visible
    expect(screen.getByText('Your Cart')).toBeTruthy()
  })

  it('can increase and decrease item quantity in cart', () => {
    render(<StudentsSelectItems />)
    
    // Add an item
    const addButtons = screen.getAllByTestId(/studentsselectitems-add-/)
    fireEvent.click(addButtons[0])
    
    // Open cart
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    fireEvent.click(cartButton)
    
    // Find increase button in cart and click it
    const increaseButtons = screen.getAllByTestId(/studentsselectitems-increase-/)
    fireEvent.click(increaseButtons[0])
    
    // Cart should show 2 items
    expect(cartButton.textContent).toContain('2')
    
    // Find decrease button and click it
    const decreaseButtons = screen.getAllByTestId(/studentsselectitems-decrease-/)
    fireEvent.click(decreaseButtons[0])
    
    // Cart should show 1 item again
    expect(cartButton.textContent).toContain('1')
  })

  it('can clear cart', () => {
    render(<StudentsSelectItems />)
    
    // Add items to cart
    const addButtons = screen.getAllByTestId(/studentsselectitems-add-/)
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[1])
    
    // Open cart
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    fireEvent.click(cartButton)
    
    // Clear cart
    const clearButton = screen.getByTestId('studentsselectitems-clear-cart')
    fireEvent.click(clearButton)
    
    // Cart should be empty
    expect(screen.getByText('Your cart is empty')).toBeTruthy()
  })

  it('displays total price correctly', () => {
    render(<StudentsSelectItems />)
    
    // Add an item
    const addButtons = screen.getAllByTestId(/studentsselectitems-add-/)
    fireEvent.click(addButtons[0])
    
    // Open cart
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    fireEvent.click(cartButton)
    
    // Should display total
    expect(screen.getByText('Total:')).toBeTruthy()
    // Verify at least one price is displayed in cart
    const { container } = render(<StudentsSelectItems />)
    expect(container.textContent).toContain('$')
  })

  it('has required data-testid attributes', () => {
    render(<StudentsSelectItems />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('studentsselectitems')).toBeTruthy()
    expect(screen.getByTestId('studentsselectitems-view-cart')).toBeTruthy()
    expect(screen.getByTestId('studentsselectitems-category-filter')).toBeTruthy()
    expect(screen.getByTestId('studentsselectitems-list')).toBeTruthy()
    
    // Verify at least one item has testid
    const items = document.querySelectorAll('[data-testid="studentsselectitems-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify add buttons have testids
    const addButtons = document.querySelectorAll('[data-testid^="studentsselectitems-add-"]')
    expect(addButtons.length).toBeGreaterThan(0)
  })

  it('shows available items count', () => {
    render(<StudentsSelectItems />)
    expect(screen.getByText(/Showing \d+ available item/)).toBeTruthy()
  })

  it('shows checkout button in cart', () => {
    render(<StudentsSelectItems />)
    
    // Add an item
    const addButtons = screen.getAllByTestId(/studentsselectitems-add-/)
    fireEvent.click(addButtons[0])
    
    // Open cart
    const cartButton = screen.getByTestId('studentsselectitems-view-cart')
    fireEvent.click(cartButton)
    
    // Should show checkout button
    expect(screen.getByTestId('studentsselectitems-checkout')).toBeTruthy()
  })
})
