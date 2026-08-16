import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSelectsA from './UserSelectsA'

describe('UserSelectsA', () => {
  it('renders without crashing', () => {
    render(<UserSelectsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with case list', () => {
    render(<UserSelectsA />)
    expect(screen.getByText(/Legal Case Tracker/i)).toBeTruthy()
    expect(screen.getByText(/CASE-2024-001/i)).toBeTruthy()
    expect(screen.getByText(/Johnson & Associates LLC/i)).toBeTruthy()
    expect(screen.getByText(/Maria Rodriguez/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserSelectsA />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userselectsa"]')).toBeTruthy()
    // Search input
    expect(document.querySelector('[data-testid="userselectsa-search"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userselectsa-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="userselectsa-item"]')
    expect(items.length).toBeGreaterThan(0)
    // Action buttons (will appear after selection)
    expect(document.querySelector('[data-testid="userselectsa-view"]')).toBeFalsy() // Not visible initially
  })

  it('allows selecting a case from the list', () => {
    render(<UserSelectsA />)
    const firstCase = screen.getAllByTestId('userselectsa-item')[0]
    fireEvent.click(firstCase)
    
    // Check that details panel appears
    expect(document.querySelector('[data-testid="userselectsa-details"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userselectsa-view"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userselectsa-edit"]')).toBeTruthy()
  })

  it('filters cases based on search input', () => {
    render(<UserSelectsA />)
    const searchInput = screen.getByTestId('userselectsa-search') as HTMLInputElement
    
    // Initially shows all cases
    const initialItems = document.querySelectorAll('[data-testid="userselectsa-item"]')
    expect(initialItems.length).toBeGreaterThan(5)
    
    // Filter by case number
    fireEvent.change(searchInput, { target: { value: 'CASE-2024-001' } })
    const filteredItems = document.querySelectorAll('[data-testid="userselectsa-item"]')
    expect(filteredItems.length).toBe(1)
  })

  it('displays case details when a case is selected', () => {
    render(<UserSelectsA />)
    const firstCase = screen.getAllByTestId('userselectsa-item')[0]
    fireEvent.click(firstCase)
    
    // Verify details section shows
    expect(screen.getByTestId('userselectsa-details')).toBeTruthy()
    expect(screen.getByText(/View Full Case/i)).toBeTruthy()
    expect(screen.getByText(/Edit Case/i)).toBeTruthy()
  })

  it('shows message when no cases match search', () => {
    render(<UserSelectsA />)
    const searchInput = screen.getByTestId('userselectsa-search')
    
    fireEvent.change(searchInput, { target: { value: 'nonexistent-case-xyz' } })
    expect(screen.getByText(/No cases found matching your search/i)).toBeTruthy()
  })

  it('displays all required case information', () => {
    render(<UserSelectsA />)
    const firstCase = screen.getAllByTestId('userselectsa-item')[0]
    fireEvent.click(firstCase)
    
    // Check that case details include all key fields
    const detailsPanel = document.querySelector('[data-testid="userselectsa-details"]')
    expect(detailsPanel).toBeTruthy()
    expect(detailsPanel?.textContent).toContain('Case Type')
    expect(detailsPanel?.textContent).toContain('Priority')
    expect(detailsPanel?.textContent).toContain('Assigned Attorney')
    expect(detailsPanel?.textContent).toContain('Filing Date')
    expect(detailsPanel?.textContent).toContain('Next Hearing')
  })
})
