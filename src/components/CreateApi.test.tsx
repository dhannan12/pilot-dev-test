import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateApi from './CreateApi'

describe('CreateApi', () => {
  it('renders without crashing', () => {
    render(<CreateApi />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<CreateApi />)
    // Check for component title
    expect(screen.getByText('Tradesperson Search API')).toBeTruthy()
    
    // Check for mock tradesperson names
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    
    // Check for results count
    expect(screen.getByText(/Found \d+ tradespeople/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateApi />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="createapi"]')
    expect(mainWrapper).toBeTruthy()
    
    // Check search input
    const searchInput = document.querySelector('[data-testid="createapi-search"]')
    expect(searchInput).toBeTruthy()
    
    // Check filter selects
    const tradeSelect = document.querySelector('[data-testid="createapi-trade"]')
    expect(tradeSelect).toBeTruthy()
    
    const locationSelect = document.querySelector('[data-testid="createapi-location"]')
    expect(locationSelect).toBeTruthy()
    
    const ratingSelect = document.querySelector('[data-testid="createapi-rating"]')
    expect(ratingSelect).toBeTruthy()
    
    // Check available checkbox
    const availableCheckbox = document.querySelector('[data-testid="createapi-available"]')
    expect(availableCheckbox).toBeTruthy()
    
    // Check clear button
    const clearButton = document.querySelector('[data-testid="createapi-clear"]')
    expect(clearButton).toBeTruthy()
    
    // Check results list
    const resultsList = document.querySelector('[data-testid="createapi-list"]')
    expect(resultsList).toBeTruthy()
    
    // Check that list items exist
    const listItems = document.querySelectorAll('[data-testid="createapi-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Check contact buttons
    const contactButtons = document.querySelectorAll('[data-testid="createapi-contact"]')
    expect(contactButtons.length).toBeGreaterThan(0)
  })

  it('displays all mock tradespeople initially', () => {
    render(<CreateApi />)
    
    // Should show all 8 mock tradespeople
    const items = document.querySelectorAll('[data-testid="createapi-item"]')
    expect(items.length).toBe(8)
  })
})
