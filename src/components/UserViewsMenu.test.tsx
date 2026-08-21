import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViewsMenu from './UserViewsMenu'

describe('UserViewsMenu', () => {
  it('renders without crashing', () => {
    render(<UserViewsMenu />)
    expect(document.body).toBeTruthy()
  })

  it('displays the restaurant header', () => {
    render(<UserViewsMenu />)
    expect(screen.getByText('Golden Dragon Restaurant')).toBeTruthy()
    expect(screen.getByText('Authentic Chinese Cuisine')).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<UserViewsMenu />)
    // Check for some of the mock menu items
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Sweet and Sour Pork')).toBeTruthy()
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsMenu />)
    
    // Main wrapper
    expect(screen.getByTestId('userviewsmenu')).toBeTruthy()
    
    // Search input
    expect(screen.getByTestId('userviewsmenu-search')).toBeTruthy()
    
    // Category select
    expect(screen.getByTestId('userviewsmenu-category')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('userviewsmenu-list')).toBeTruthy()
    
    // List items (multiple)
    const items = screen.getAllByTestId('userviewsmenu-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Add to order buttons (multiple)
    const buttons = screen.getAllByTestId('userviewsmenu-add-to-order')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('filters menu items by category', () => {
    render(<UserViewsMenu />)
    const categorySelect = screen.getByTestId('userviewsmenu-category') as HTMLSelectElement
    
    // Filter by Appetizers
    fireEvent.change(categorySelect, { target: { value: 'Appetizers' } })
    
    // Should show Spring Rolls but not Kung Pao Chicken
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
    expect(screen.queryByText('Kung Pao Chicken')).toBeFalsy()
  })

  it('filters menu items by search term', () => {
    render(<UserViewsMenu />)
    const searchInput = screen.getByTestId('userviewsmenu-search') as HTMLInputElement
    
    // Search for "chicken"
    fireEvent.change(searchInput, { target: { value: 'chicken' } })
    
    // Should show chicken dishes
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText("General Tso's Chicken")).toBeTruthy()
    
    // Should not show non-chicken dishes
    expect(screen.queryByText('Vegetable Spring Rolls')).toBeFalsy()
  })

  it('displays prices correctly', () => {
    render(<UserViewsMenu />)
    // Multiple items may have the same price, so we use getAllByText
    const priceElements = screen.getAllByText('$14.99')
    expect(priceElements.length).toBeGreaterThan(0)
    expect(screen.getByText('$6.99')).toBeTruthy()
  })

  it('shows popular badge on popular items', () => {
    render(<UserViewsMenu />)
    const popularBadges = screen.getAllByText('Popular')
    expect(popularBadges.length).toBeGreaterThan(0)
  })

  it('displays dietary tags', () => {
    render(<UserViewsMenu />)
    expect(screen.getByText('Vegetarian')).toBeTruthy()
    expect(screen.getByText('Gluten-Free')).toBeTruthy()
  })

  it('shows item count summary', () => {
    render(<UserViewsMenu />)
    expect(screen.getByText(/Showing/)).toBeTruthy()
    expect(screen.getByText(/menu items/)).toBeTruthy()
  })
})
