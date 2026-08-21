import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksAllergen from './UserChecksAllergen'

describe('UserChecksAllergen', () => {
  it('renders without crashing', () => {
    render(<UserChecksAllergen />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<UserChecksAllergen />)
    // Check for some menu items
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Sweet and Sour Pork')).toBeTruthy()
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
  })

  it('displays allergen filter options', () => {
    render(<UserChecksAllergen />)
    expect(screen.getByText('Filter Allergens')).toBeTruthy()
    // Use getAllByText since allergen names appear both in filters and on menu items
    const peanutsElements = screen.getAllByText('Peanuts')
    expect(peanutsElements.length).toBeGreaterThan(0)
    const treeNutsElements = screen.getAllByText('Tree Nuts')
    expect(treeNutsElements.length).toBeGreaterThan(0)
  })

  it('displays allergen information warning', () => {
    render(<UserChecksAllergen />)
    expect(screen.getByText(/If you have severe allergies/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksAllergen />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userchecksallergen"]')).toBeTruthy()
    
    // Search input
    expect(document.querySelector('[data-testid="userchecksallergen-search"]')).toBeTruthy()
    
    // Clear button should exist after filters are applied (but check if testid exists in code)
    // List containers
    expect(document.querySelector('[data-testid="userchecksallergen-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userchecksallergen-menu-list"]')).toBeTruthy()
    
    // List items
    const allergenItems = document.querySelectorAll('[data-testid="userchecksallergen-item"]')
    expect(allergenItems.length).toBeGreaterThan(0)
    
    const menuItems = document.querySelectorAll('[data-testid="userchecksallergen-menu-item"]')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('displays allergen badges on menu items', () => {
    render(<UserChecksAllergen />)
    // Check that allergen information is displayed (appears multiple times on each menu item)
    const allergenLabels = screen.getAllByText('CONTAINS ALLERGENS:')
    expect(allergenLabels.length).toBeGreaterThan(0)
    // Should show multiple allergen badges
    const allergenText = document.body.textContent || ''
    expect(allergenText.includes('Peanuts') || allergenText.includes('Soy')).toBeTruthy()
  })

  it('shows item count', () => {
    render(<UserChecksAllergen />)
    expect(screen.getByText(/Showing \d+ of \d+ dishes/)).toBeTruthy()
  })
})
