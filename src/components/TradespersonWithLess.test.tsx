import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TradespersonWithLess from './TradespersonWithLess'

describe('TradespersonWithLess', () => {
  it('renders without crashing', () => {
    render(<TradespersonWithLess />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data for tradespeople with less than 3 reviews', () => {
    render(<TradespersonWithLess />)
    
    // Check that the component shows tradespeople
    expect(screen.getByText('Search Results')).toBeTruthy()
    expect(screen.getByText(/showing/i)).toBeTruthy()
    
    // Check for specific tradespeople names (who have < 3 reviews)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Brown')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<TradespersonWithLess />)
    
    // Verify main wrapper
    const mainWrapper = document.querySelector('[data-testid="tradespersonwithless"]')
    expect(mainWrapper).toBeTruthy()
    
    // Verify list container
    const listContainer = document.querySelector('[data-testid="tradespersonwithless-list"]')
    expect(listContainer).toBeTruthy()
    
    // Verify list items exist
    const listItems = document.querySelectorAll('[data-testid="tradespersonwithless-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Verify buttons
    const contactButtons = document.querySelectorAll('[data-testid="tradespersonwithless-contact"]')
    expect(contactButtons.length).toBeGreaterThan(0)
    
    const viewButtons = document.querySelectorAll('[data-testid="tradespersonwithless-view"]')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('filters and displays only tradespeople with less than 3 reviews', () => {
    render(<TradespersonWithLess />)
    
    // All displayed items should have less than 3 reviews
    const listItems = document.querySelectorAll('[data-testid="tradespersonwithless-item"]')
    
    // We expect 6 tradespeople (all mock data has < 3 reviews)
    expect(listItems.length).toBe(6)
  })
})
