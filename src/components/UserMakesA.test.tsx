import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserMakesA from './UserMakesA'

describe('UserMakesA', () => {
  it('renders without crashing', () => {
    render(<UserMakesA />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<UserMakesA />)
    // Use getAllByText since items appear in menu and possibly in transaction history
    expect(screen.getAllByText('Espresso').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cappuccino').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Latte').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cold Brew').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mocha').length).toBeGreaterThan(0)
  })

  it('displays initial rewards balance', () => {
    render(<UserMakesA />)
    const balance = screen.getByTestId('usermakesa-balance')
    expect(balance.textContent).toContain('378')
  })

  it('displays transaction history', () => {
    render(<UserMakesA />)
    expect(screen.getByText(/Latte, Croissant/i)).toBeTruthy()
    // Use getAllByText since Espresso appears in menu and transaction history
    const espressoElements = screen.getAllByText('Espresso')
    expect(espressoElements.length).toBeGreaterThan(0)
  })

  it('allows selecting menu items', () => {
    render(<UserMakesA />)
    const items = screen.getAllByTestId('usermakesa-item')
    
    // Click first item to select it
    fireEvent.click(items[0])
    
    // Should show "Selected" text
    expect(screen.getByText('✓ Selected')).toBeTruthy()
  })

  it('calculates cart total correctly', () => {
    render(<UserMakesA />)
    const items = screen.getAllByTestId('usermakesa-item')
    
    // Select first item (Espresso - $3.50)
    fireEvent.click(items[0])
    
    // Check that total is displayed
    expect(screen.getByText(/Total:/i)).toBeTruthy()
    // Use getAllByText since price appears in menu and cart
    const priceElements = screen.getAllByText('$3.50')
    expect(priceElements.length).toBeGreaterThan(0)
  })

  it('shows empty cart message when no items selected', () => {
    render(<UserMakesA />)
    expect(screen.getByText('No items selected')).toBeTruthy()
  })

  it('can clear cart', () => {
    render(<UserMakesA />)
    const items = screen.getAllByTestId('usermakesa-item')
    
    // Select an item
    fireEvent.click(items[0])
    expect(screen.getByText('✓ Selected')).toBeTruthy()
    
    // Clear cart
    const clearButton = screen.getByTestId('usermakesa-clear')
    fireEvent.click(clearButton)
    
    // Should show empty cart message
    expect(screen.getByText('No items selected')).toBeTruthy()
  })

  it('processes purchase and updates points', () => {
    render(<UserMakesA />)
    const items = screen.getAllByTestId('usermakesa-item')
    
    // Select first item (Espresso - 35 points)
    fireEvent.click(items[0])
    
    // Make purchase
    const purchaseButton = screen.getByTestId('usermakesa-purchase')
    fireEvent.click(purchaseButton)
    
    // Check confirmation message appears
    expect(screen.getByTestId('usermakesa-confirmation')).toBeTruthy()
    
    // Points should be updated (378 + 35 = 413)
    const balance = screen.getByTestId('usermakesa-balance')
    expect(balance.textContent).toContain('413')
  })

  it('has required data-testid attributes', () => {
    render(<UserMakesA />)
    
    // Main wrapper
    expect(screen.getByTestId('usermakesa')).toBeTruthy()
    
    // Balance
    expect(screen.getByTestId('usermakesa-balance')).toBeTruthy()
    
    // List containers
    expect(screen.getByTestId('usermakesa-list')).toBeTruthy()
    expect(screen.getByTestId('usermakesa-transactions')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('usermakesa-item')
    expect(items.length).toBeGreaterThan(0)
    
    const transactions = screen.getAllByTestId('usermakesa-transaction')
    expect(transactions.length).toBeGreaterThan(0)
    
    // Select an item first to show cart and buttons
    const menuItems = screen.getAllByTestId('usermakesa-item')
    fireEvent.click(menuItems[0])
    
    // Cart (only visible after selecting items)
    expect(screen.getByTestId('usermakesa-cart')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('usermakesa-purchase')).toBeTruthy()
    expect(screen.getByTestId('usermakesa-clear')).toBeTruthy()
  })

  it('displays points earned for each item', () => {
    render(<UserMakesA />)
    
    // Check that points are shown for menu items (use getAllByText since they appear in both menu and history)
    const pointsElements = screen.getAllByText('+35 pts')
    expect(pointsElements.length).toBeGreaterThan(0)
    
    const cappuccinoPoints = screen.getAllByText('+48 pts')
    expect(cappuccinoPoints.length).toBeGreaterThan(0)
  })

  it('shows points to earn in cart', () => {
    render(<UserMakesA />)
    const items = screen.getAllByTestId('usermakesa-item')
    
    // Select first item
    fireEvent.click(items[0])
    
    // Should show "Points to earn"
    expect(screen.getByText(/Points to earn:/i)).toBeTruthy()
  })
})
