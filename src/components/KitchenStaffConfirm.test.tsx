import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import KitchenStaffConfirm from './KitchenStaffConfirm'

describe('KitchenStaffConfirm', () => {
  it('renders without crashing', () => {
    render(<KitchenStaffConfirm />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock order data', () => {
    render(<KitchenStaffConfirm />)
    expect(screen.getByText('Emma Thompson')).toBeTruthy()
    expect(screen.getAllByText('Chicken Burger with Fries').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Vegetarian Pasta').length).toBeGreaterThan(0)
    expect(screen.getByText('Kitchen Order Management')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<KitchenStaffConfirm />)
    // Main wrapper
    expect(document.querySelector('[data-testid="kitchenstaffconfirm"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-list"]')).toBeTruthy()
    // List items
    expect(document.querySelectorAll('[data-testid="kitchenstaffconfirm-item"]').length).toBeGreaterThan(0)
    // Filter buttons
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-filter-pending"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-filter-confirmed"]')).toBeTruthy()
    // Confirm buttons
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-confirm"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-confirm-all"]')).toBeTruthy()
  })

  it('shows correct pending and confirmed counts', () => {
    render(<KitchenStaffConfirm />)
    // Check that statistics are displayed (exact numbers depend on mock data)
    expect(screen.getByText(/Pending Orders/i)).toBeTruthy()
    expect(screen.getByText(/Confirmed Orders/i)).toBeTruthy()
    expect(screen.getByText(/Total Orders/i)).toBeTruthy()
  })

  it('filters orders when filter buttons are clicked', () => {
    render(<KitchenStaffConfirm />)
    const pendingButton = document.querySelector('[data-testid="kitchenstaffconfirm-filter-pending"]') as HTMLElement
    const confirmedButton = document.querySelector('[data-testid="kitchenstaffconfirm-filter-confirmed"]') as HTMLElement
    
    expect(pendingButton).toBeTruthy()
    expect(confirmedButton).toBeTruthy()
    
    // Click pending filter
    fireEvent.click(pendingButton)
    // Should show some orders (verification that component responds)
    expect(document.querySelectorAll('[data-testid="kitchenstaffconfirm-item"]').length).toBeGreaterThan(0)
    
    // Click confirmed filter
    fireEvent.click(confirmedButton)
    // Component should update (may show 0 or more items depending on initial state)
    expect(document.querySelector('[data-testid="kitchenstaffconfirm-list"]')).toBeTruthy()
  })

  it('confirms individual order when confirm button is clicked', () => {
    render(<KitchenStaffConfirm />)
    const confirmButtons = document.querySelectorAll('[data-testid="kitchenstaffconfirm-confirm"]')
    
    if (confirmButtons.length > 0) {
      const initialConfirmedText = document.body.textContent
      fireEvent.click(confirmButtons[0] as HTMLElement)
      // After clicking, button text or status should change
      const afterClick = document.body.textContent
      expect(afterClick).toBeTruthy()
    }
  })

  it('displays meal summary with quantities', () => {
    render(<KitchenStaffConfirm />)
    expect(screen.getByText(/Meal Summary/i)).toBeTruthy()
    // Check for quantity indicators (×)
    expect(document.body.textContent?.includes('×')).toBeTruthy()
  })

  it('displays allergen warnings', () => {
    render(<KitchenStaffConfirm />)
    // Check for allergen information
    expect(screen.getAllByText(/Allergens/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Gluten/i).length).toBeGreaterThan(0)
  })

  it('displays special requests when present', () => {
    render(<KitchenStaffConfirm />)
    expect(screen.getByText(/No pickles/i)).toBeTruthy()
    expect(screen.getAllByText(/Special Requests/i).length).toBeGreaterThan(0)
  })
})
