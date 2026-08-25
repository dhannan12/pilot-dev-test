import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWithLow from './UserWithLow'

describe('UserWithLow', () => {
  it('renders without crashing', () => {
    render(<UserWithLow />)
    expect(document.body).toBeTruthy()
  })

  it('displays the header and instructions', () => {
    render(<UserWithLow />)
    expect(screen.getByText('Coffee Origins')).toBeTruthy()
    expect(screen.getByText('Learn where your coffee comes from')).toBeTruthy()
    expect(screen.getByText('Click on any coffee to learn more about it')).toBeTruthy()
  })

  it('displays mock coffee origin data', () => {
    render(<UserWithLow />)
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeTruthy()
    expect(screen.getByText('Colombian Supremo')).toBeTruthy()
    expect(screen.getByText('Brazilian Santos')).toBeTruthy()
    expect(screen.getByText('Guatemalan Antigua')).toBeTruthy()
    expect(screen.getByText('Kenyan AA')).toBeTruthy()
    expect(screen.getByText('Sumatran Mandheling')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWithLow />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userwithlow"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userwithlow-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="userwithlow-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows user to select a coffee and view details', () => {
    render(<UserWithLow />)
    
    // Click on first coffee item
    const coffeeItems = screen.getAllByTestId('userwithlow-item')
    fireEvent.click(coffeeItems[0])
    
    // Check if detail view is displayed
    expect(screen.getByText('About This Coffee')).toBeTruthy()
    expect(screen.getByText('Flavor Notes')).toBeTruthy()
    expect(screen.getByText('Roast Level')).toBeTruthy()
    expect(screen.getByText('Growing Altitude')).toBeTruthy()
  })

  it('shows back button in detail view', () => {
    render(<UserWithLow />)
    
    // Click on first coffee item
    const coffeeItems = screen.getAllByTestId('userwithlow-item')
    fireEvent.click(coffeeItems[0])
    
    // Check for back button with correct testid
    const backButton = screen.getByTestId('userwithlow-back')
    expect(backButton).toBeTruthy()
    expect(backButton.textContent).toContain('Back to All Coffees')
  })

  it('returns to list view when back button is clicked', () => {
    render(<UserWithLow />)
    
    // Click on first coffee item
    const coffeeItems = screen.getAllByTestId('userwithlow-item')
    fireEvent.click(coffeeItems[0])
    
    // Verify detail view is shown
    expect(screen.getByText('About This Coffee')).toBeTruthy()
    
    // Click back button
    const backButton = screen.getByTestId('userwithlow-back')
    fireEvent.click(backButton)
    
    // Verify list view is shown again
    expect(screen.getByText('Click on any coffee to learn more about it')).toBeTruthy()
    expect(screen.getByTestId('userwithlow-list')).toBeTruthy()
  })

  it('displays flavor notes for each coffee', () => {
    render(<UserWithLow />)
    
    // Click on first coffee
    const coffeeItems = screen.getAllByTestId('userwithlow-item')
    fireEvent.click(coffeeItems[0])
    
    // Check that flavor notes are displayed (Ethiopian Yirgacheffe has Lemon, Bergamot, Floral, Black Tea)
    expect(screen.getByText('Lemon')).toBeTruthy()
    expect(screen.getByText('Bergamot')).toBeTruthy()
    expect(screen.getByText('Floral')).toBeTruthy()
    expect(screen.getByText('Black Tea')).toBeTruthy()
  })
})
