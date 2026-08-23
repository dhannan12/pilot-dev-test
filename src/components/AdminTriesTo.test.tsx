import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminTriesTo from './AdminTriesTo'

describe('AdminTriesTo', () => {
  it('renders without crashing', () => {
    render(<AdminTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays initial mock data items', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText('Espresso')).toBeTruthy()
    expect(screen.getByText('Cappuccino')).toBeTruthy()
    expect(screen.getByText('Latte')).toBeTruthy()
  })

  it('shows current item count', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText(/Current Items/i)).toBeTruthy()
    expect(screen.getByText(/7 \/ 20/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminTriesTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="admintriesto"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="admintriesto-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-price"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-description"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="admintriesto-submit"]')).toBeTruthy()
    
    // List and items
    expect(document.querySelector('[data-testid="admintriesto-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="admintriesto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows error when trying to add item with empty name', () => {
    render(<AdminTriesTo />)
    
    const submitButton = screen.getByTestId('admintriesto-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Item name is required')).toBeTruthy()
  })

  it('can add a new item when under the limit', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name')
    const priceInput = screen.getByTestId('admintriesto-price')
    const descInput = screen.getByTestId('admintriesto-description')
    const submitButton = screen.getByTestId('admintriesto-submit')
    
    fireEvent.change(nameInput, { target: { value: 'New Item' } })
    fireEvent.change(priceInput, { target: { value: '6.99' } })
    fireEvent.change(descInput, { target: { value: 'New description' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('New Item')).toBeTruthy()
  })

  it('can remove an item from the list', () => {
    render(<AdminTriesTo />)
    
    const removeButtons = screen.getAllByTestId('admintriesto-remove')
    const initialCount = removeButtons.length
    
    fireEvent.click(removeButtons[0])
    
    const updatedButtons = screen.getAllByTestId('admintriesto-remove')
    expect(updatedButtons.length).toBe(initialCount - 1)
  })

  it('disables add button when at maximum items', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name')
    const priceInput = screen.getByTestId('admintriesto-price')
    const descInput = screen.getByTestId('admintriesto-description')
    const submitButton = screen.getByTestId('admintriesto-submit') as HTMLButtonElement
    
    // Add items until we reach 20
    for (let i = 8; i <= 20; i++) {
      if (submitButton.disabled) break
      
      fireEvent.change(nameInput, { target: { value: `Item ${i}` } })
      fireEvent.change(priceInput, { target: { value: `${i}.99` } })
      fireEvent.change(descInput, { target: { value: `Description ${i}` } })
      fireEvent.click(submitButton)
    }
    
    // Button should be disabled at 20 items
    expect(submitButton.disabled).toBe(true)
  })

  it('shows error message when trying to exceed 20 item limit', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name')
    const priceInput = screen.getByTestId('admintriesto-price')
    const descInput = screen.getByTestId('admintriesto-description')
    const submitButton = screen.getByTestId('admintriesto-submit') as HTMLButtonElement
    
    // Add items to reach the limit
    for (let i = 8; i <= 20; i++) {
      if (submitButton.disabled) break
      
      fireEvent.change(nameInput, { target: { value: `Item ${i}` } })
      fireEvent.change(priceInput, { target: { value: `${i}.99` } })
      fireEvent.change(descInput, { target: { value: `Description ${i}` } })
      fireEvent.click(submitButton)
    }
    
    // Try to add one more (this should show an error)
    fireEvent.change(nameInput, { target: { value: 'Extra Item' } })
    fireEvent.change(priceInput, { target: { value: '99.99' } })
    fireEvent.change(descInput, { target: { value: 'This should fail' } })
    
    // The button is disabled, but if we try to submit the form anyway
    // (by clicking when enabled or programmatically), we'd see the error
    // Since button is disabled, we verify the disabled state
    expect(submitButton.disabled).toBe(true)
    expect(screen.getByText('Maximum Items Reached')).toBeTruthy()
  })
})
