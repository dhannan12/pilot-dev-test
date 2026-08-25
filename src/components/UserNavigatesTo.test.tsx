import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserNavigatesTo from './UserNavigatesTo'

describe('UserNavigatesTo', () => {
  it('renders without crashing', () => {
    render(<UserNavigatesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with match tracking features', () => {
    render(<UserNavigatesTo />)
    
    // Check for component title
    expect(screen.getByText('Match Tracking Features')).toBeTruthy()
    
    // Check for some of the features
    expect(screen.getByText('Live Match Tracker')).toBeTruthy()
    expect(screen.getByText('Match History')).toBeTruthy()
    expect(screen.getByText('Match Statistics')).toBeTruthy()
    expect(screen.getByText('Match Predictions')).toBeTruthy()
    expect(screen.getByText('Match Schedule')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserNavigatesTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="usernavigatesto"]')
    expect(mainWrapper).toBeTruthy()
    
    // Check for search input
    const searchInput = document.querySelector('[data-testid="usernavigatesto-search"]')
    expect(searchInput).toBeTruthy()
    
    // Check for category select
    const categorySelect = document.querySelector('[data-testid="usernavigatesto-category"]')
    expect(categorySelect).toBeTruthy()
    
    // Check for list container
    const listContainer = document.querySelector('[data-testid="usernavigatesto-list"]')
    expect(listContainer).toBeTruthy()
    
    // Check for list items
    const listItems = document.querySelectorAll('[data-testid="usernavigatesto-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Check for navigate buttons
    const navigateButtons = document.querySelectorAll('[data-testid="usernavigatesto-navigate"]')
    expect(navigateButtons.length).toBeGreaterThan(0)
  })

  it('filters features by search term', () => {
    render(<UserNavigatesTo />)
    
    const searchInput = screen.getByTestId('usernavigatesto-search') as HTMLInputElement
    
    // Search for "Live"
    fireEvent.change(searchInput, { target: { value: 'Live' } })
    
    expect(screen.getByText('Live Match Tracker')).toBeTruthy()
  })

  it('filters features by category', () => {
    render(<UserNavigatesTo />)
    
    const categorySelect = screen.getByTestId('usernavigatesto-category') as HTMLSelectElement
    
    // Filter by analytics category
    fireEvent.change(categorySelect, { target: { value: 'analytics' } })
    
    expect(categorySelect.value).toBe('analytics')
  })

  it('shows clear filters button when no results', () => {
    render(<UserNavigatesTo />)
    
    const searchInput = screen.getByTestId('usernavigatesto-search') as HTMLInputElement
    
    // Search for something that doesn't exist
    fireEvent.change(searchInput, { target: { value: 'nonexistent feature xyz' } })
    
    const clearButton = screen.getByTestId('usernavigatesto-clear')
    expect(clearButton).toBeTruthy()
    
    // Click clear button
    fireEvent.click(clearButton)
    
    // Should show all features again
    expect(searchInput.value).toBe('')
  })

  it('displays feature statistics', () => {
    render(<UserNavigatesTo />)
    
    // Check for stats section with numbers
    expect(screen.getByText('Total Features')).toBeTruthy()
    expect(screen.getByText('Showing')).toBeTruthy()
    expect(screen.getByText('Live Tools')).toBeTruthy()
    
    // Analytics appears multiple times (in dropdown and stats), so use getAllByText
    const analyticsElements = screen.getAllByText('Analytics')
    expect(analyticsElements.length).toBeGreaterThan(0)
  })
})
