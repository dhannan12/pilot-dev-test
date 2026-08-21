import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWantsTo from './UserWantsTo'

describe('UserWantsTo', () => {
  it('renders without crashing', () => {
    render(<UserWantsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<UserWantsTo />)
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
    expect(screen.getByText('Mapo Tofu')).toBeTruthy()
    expect(screen.getByText('Sweet and Sour Pork')).toBeTruthy()
    expect(screen.getByText('Hot and Sour Soup')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWantsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('userwantsto')).toBeTruthy()
    
    // Filter inputs
    expect(screen.getByTestId('userwantsto-search')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-category')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-spicy')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-price')).toBeTruthy()
    
    // Dietary checkboxes
    expect(screen.getByTestId('userwantsto-vegetarian')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-vegan')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-glutenfree')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('userwantsto-reset')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('userwantsto-list')).toBeTruthy()
    expect(screen.getAllByTestId('userwantsto-item').length).toBeGreaterThan(0)
  })

  it('filters menu items by search term', () => {
    render(<UserWantsTo />)
    const searchInput = screen.getByTestId('userwantsto-search') as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'chicken' } })
    
    expect(screen.getByText('Kung Pao Chicken')).toBeTruthy()
    expect(screen.getByText('General Tso\'s Chicken')).toBeTruthy()
    expect(screen.queryByText('Mapo Tofu')).toBeNull()
  })

  it('filters menu items by category', () => {
    render(<UserWantsTo />)
    const categorySelect = screen.getByTestId('userwantsto-category') as HTMLSelectElement
    
    fireEvent.change(categorySelect, { target: { value: 'Soup' } })
    
    expect(screen.getByText('Hot and Sour Soup')).toBeTruthy()
    expect(screen.getByText('Wonton Soup')).toBeTruthy()
    expect(screen.queryByText('Kung Pao Chicken')).toBeNull()
  })

  it('filters menu items by vegetarian option', () => {
    render(<UserWantsTo />)
    const vegetarianCheckbox = screen.getByTestId('userwantsto-vegetarian') as HTMLInputElement
    
    fireEvent.click(vegetarianCheckbox)
    
    expect(screen.getByText('Vegetable Spring Rolls')).toBeTruthy()
    expect(screen.getByText('Mapo Tofu')).toBeTruthy()
    expect(screen.queryByText('Kung Pao Chicken')).toBeNull()
  })

  it('resets all filters when reset button is clicked', () => {
    render(<UserWantsTo />)
    const searchInput = screen.getByTestId('userwantsto-search') as HTMLInputElement
    const categorySelect = screen.getByTestId('userwantsto-category') as HTMLSelectElement
    const resetButton = screen.getByTestId('userwantsto-reset')
    
    // Apply filters
    fireEvent.change(searchInput, { target: { value: 'chicken' } })
    fireEvent.change(categorySelect, { target: { value: 'Main' } })
    
    // Reset
    fireEvent.click(resetButton)
    
    expect(searchInput.value).toBe('')
    expect(categorySelect.value).toBe('All')
  })

  it('shows all items count', () => {
    render(<UserWantsTo />)
    expect(screen.getByText(/Showing/)).toBeTruthy()
    // Check that the count summary is displayed with the expected structure
    const summaryText = screen.getByText(/Showing/).closest('p')
    expect(summaryText?.textContent).toContain('10')
    expect(summaryText?.textContent).toContain('items')
  })

  it('shows no results message when no items match filters', () => {
    render(<UserWantsTo />)
    const searchInput = screen.getByTestId('userwantsto-search') as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'xyz123notfound' } })
    
    expect(screen.getByText('No items match your filters')).toBeTruthy()
    expect(screen.getByTestId('userwantsto-clear')).toBeTruthy()
  })

  it('displays dietary restriction badges on items', () => {
    render(<UserWantsTo />)
    
    // Check that vegetarian/vegan/gluten-free badges appear
    const vegetarianBadges = screen.getAllByText('Vegetarian')
    const veganBadges = screen.getAllByText('Vegan')
    const glutenFreeBadges = screen.getAllByText('Gluten-Free')
    
    expect(vegetarianBadges.length).toBeGreaterThan(0)
    expect(veganBadges.length).toBeGreaterThan(0)
    expect(glutenFreeBadges.length).toBeGreaterThan(0)
  })
})
