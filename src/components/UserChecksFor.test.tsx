import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksFor from './UserChecksFor'

describe('UserChecksFor', () => {
  it('renders without crashing', () => {
    render(<UserChecksFor />)
    expect(document.body).toBeTruthy()
  })

  it('displays promotion cards with mock data', () => {
    render(<UserChecksFor />)
    
    // Check that promotions are displayed
    expect(screen.getByText('New Customer Special')).toBeTruthy()
    expect(screen.getByText('Free Spring Rolls')).toBeTruthy()
    expect(screen.getByText('Weekend Deal')).toBeTruthy()
    expect(screen.getByText('20% OFF')).toBeTruthy()
    expect(screen.getByText('WELCOME20')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksFor />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="userchecksfor"]')).toBeTruthy()
    
    // Verify category filter
    expect(document.querySelector('[data-testid="userchecksfor-category"]')).toBeTruthy()
    
    // Verify list container
    expect(document.querySelector('[data-testid="userchecksfor-list"]')).toBeTruthy()
    
    // Verify list items (should be multiple)
    const items = document.querySelectorAll('[data-testid="userchecksfor-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify copy buttons
    const copyButtons = document.querySelectorAll('[data-testid="userchecksfor-copy"]')
    expect(copyButtons.length).toBeGreaterThan(0)
    
    // Verify apply buttons
    const applyButtons = document.querySelectorAll('[data-testid="userchecksfor-apply"]')
    expect(applyButtons.length).toBeGreaterThan(0)
  })

  it('filters promotions by category', () => {
    render(<UserChecksFor />)
    
    const categorySelect = document.querySelector('[data-testid="userchecksfor-category"]') as HTMLSelectElement
    expect(categorySelect).toBeTruthy()
    
    // Initially shows all promotions
    let items = document.querySelectorAll('[data-testid="userchecksfor-item"]')
    const initialCount = items.length
    expect(initialCount).toBeGreaterThan(1)
    
    // Filter by 'new-customer' category
    fireEvent.change(categorySelect, { target: { value: 'new-customer' } })
    items = document.querySelectorAll('[data-testid="userchecksfor-item"]')
    expect(items.length).toBeLessThan(initialCount)
    expect(screen.getByText('New Customer Special')).toBeTruthy()
  })

  it('displays promotion details correctly', () => {
    render(<UserChecksFor />)
    
    // Check for promo code
    expect(screen.getByText('WELCOME20')).toBeTruthy()
    
    // Check for discount amount
    expect(screen.getByText('20% OFF')).toBeTruthy()
    
    // Check for min order display (multiple promotions have this)
    expect(screen.getAllByText('Min order:').length).toBeGreaterThan(0)
    
    // Check for expiry date (multiple promotions have this)
    expect(screen.getAllByText('Expires:').length).toBeGreaterThan(0)
  })

  it('has copy and apply buttons for each promotion', () => {
    render(<UserChecksFor />)
    
    const copyButtons = document.querySelectorAll('[data-testid="userchecksfor-copy"]')
    const applyButtons = document.querySelectorAll('[data-testid="userchecksfor-apply"]')
    const items = document.querySelectorAll('[data-testid="userchecksfor-item"]')
    
    // Each promotion should have both copy and apply buttons
    expect(copyButtons.length).toBe(items.length)
    expect(applyButtons.length).toBe(items.length)
  })

  it('shows promotion count', () => {
    render(<UserChecksFor />)
    
    // Check that active promotion count is displayed
    expect(screen.getByText(/Showing/)).toBeTruthy()
    expect(screen.getByText(/active promotion/)).toBeTruthy()
  })
})
