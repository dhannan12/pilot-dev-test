import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSelects from './UserSelects'

describe('UserSelects', () => {
  it('renders without crashing', () => {
    render(<UserSelects />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock catalog data', () => {
    render(<UserSelects />)
    // Check for some mock item names
    expect(screen.getByText(/Classic Blazer/i)).toBeTruthy()
    expect(screen.getByText(/Tailored Trousers/i)).toBeTruthy()
    expect(screen.getByText(/Casual T-Shirt/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserSelects />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userselects')).toBeTruthy()
    expect(screen.getByTestId('userselects-list')).toBeTruthy()
    expect(screen.getByTestId('userselects-all')).toBeTruthy()
    expect(screen.getByTestId('userselects-work')).toBeTruthy()
    const items = screen.getAllByTestId('userselects-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('filters catalog by work category when work button is clicked', () => {
    render(<UserSelects />)
    
    // Initially shows all items (10 items)
    let items = screen.getAllByTestId('userselects-item')
    expect(items.length).toBe(10)
    
    // Click work filter button
    const workButton = screen.getByTestId('userselects-work')
    fireEvent.click(workButton)
    
    // Should now show only work items (5 work items in mock data)
    items = screen.getAllByTestId('userselects-item')
    expect(items.length).toBe(5)
    
    // Verify work items are displayed
    expect(screen.getByText(/Classic Blazer/i)).toBeTruthy()
    expect(screen.getByText(/Tailored Trousers/i)).toBeTruthy()
    expect(screen.getByText(/Oxford Dress Shirt/i)).toBeTruthy()
  })

  it('shows all categories filter buttons', () => {
    render(<UserSelects />)
    
    expect(screen.getByTestId('userselects-all')).toBeTruthy()
    expect(screen.getByTestId('userselects-work')).toBeTruthy()
    expect(screen.getByTestId('userselects-casual')).toBeTruthy()
    expect(screen.getByTestId('userselects-formal')).toBeTruthy()
    expect(screen.getByTestId('userselects-sport')).toBeTruthy()
  })

  it('applies active styling to selected category button', () => {
    render(<UserSelects />)
    
    const workButton = screen.getByTestId('userselects-work')
    fireEvent.click(workButton)
    
    // Work button should have active styling
    expect(workButton.className).toContain('bg-blue-600')
  })
})
