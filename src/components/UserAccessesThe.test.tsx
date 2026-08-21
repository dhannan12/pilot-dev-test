import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAccessesThe from './UserAccessesThe'

describe('UserAccessesThe', () => {
  it('renders without crashing', () => {
    render(<UserAccessesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the restaurant name and header', () => {
    render(<UserAccessesThe />)
    expect(screen.getByText('Golden Dragon Takeaway')).toBeTruthy()
    expect(screen.getByText('Authentic Chinese Cuisine')).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<UserAccessesThe />)
    expect(screen.getByText('Sweet and Sour Chicken')).toBeTruthy()
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Beef in Black Bean Sauce')).toBeTruthy()
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
    expect(screen.getByText('Egg Fried Rice')).toBeTruthy()
  })

  it('displays prices for menu items', () => {
    render(<UserAccessesThe />)
    expect(screen.getByText('£12.99')).toBeTruthy()
    expect(screen.getAllByText('£13.99').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserAccessesThe />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="useraccessesthe"]')).toBeTruthy()
    
    // Category select
    expect(document.querySelector('[data-testid="useraccessesthe-category"]')).toBeTruthy()
    
    // Vegetarian checkbox
    expect(document.querySelector('[data-testid="useraccessesthe-vegetarian"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="useraccessesthe-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="useraccessesthe-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Add buttons
    const addButtons = document.querySelectorAll('[data-testid="useraccessesthe-add"]')
    expect(addButtons.length).toBeGreaterThan(0)
  })

  it('shows category filter dropdown', () => {
    render(<UserAccessesThe />)
    const categorySelect = screen.getByTestId('useraccessesthe-category')
    expect(categorySelect).toBeTruthy()
  })

  it('shows vegetarian filter checkbox', () => {
    render(<UserAccessesThe />)
    const vegetarianCheckbox = screen.getByTestId('useraccessesthe-vegetarian')
    expect(vegetarianCheckbox).toBeTruthy()
  })

  it('displays dietary tags (spicy and vegetarian)', () => {
    render(<UserAccessesThe />)
    expect(screen.getAllByText(/Spicy/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Vegetarian/).length).toBeGreaterThan(0)
  })
})
