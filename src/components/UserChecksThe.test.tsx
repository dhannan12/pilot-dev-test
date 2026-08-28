import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksThe from './UserChecksThe'

describe('UserChecksThe', () => {
  it('renders without crashing', () => {
    render(<UserChecksThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UserChecksThe />)
    
    // Check for product names
    expect(screen.getByText('Classic Denim Jacket')).toBeTruthy()
    expect(screen.getByText('Cotton T-Shirt')).toBeTruthy()
    expect(screen.getByText('Leather Boots')).toBeTruthy()
    expect(screen.getByText('Wool Sweater')).toBeTruthy()
    expect(screen.getByText('Slim Fit Jeans')).toBeTruthy()
    
    // Check for discount badges (using getAllByText for duplicates)
    const discountBadges = screen.getAllByText(/% OFF/)
    expect(discountBadges.length).toBeGreaterThanOrEqual(5)
    expect(screen.getByText('15% OFF')).toBeTruthy()
    expect(screen.getByText('30% OFF')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksThe />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="userchecksthe"]')
    expect(mainWrapper).toBeTruthy()
    
    const productList = document.querySelector('[data-testid="userchecksthe-list"]')
    expect(productList).toBeTruthy()
    
    const productItems = document.querySelectorAll('[data-testid="userchecksthe-item"]')
    expect(productItems.length).toBeGreaterThan(0)
    
    const summary = document.querySelector('[data-testid="userchecksthe-summary"]')
    expect(summary).toBeTruthy()
    
    const checkoutButton = document.querySelector('[data-testid="userchecksthe-checkout"]')
    expect(checkoutButton).toBeFalsy() // Should not be visible when no items selected
    
    const clearButton = document.querySelector('[data-testid="userchecksthe-clear"]')
    expect(clearButton).toBeFalsy() // Should not be visible when no items selected
  })

  it('displays price information correctly', () => {
    render(<UserChecksThe />)
    
    // When no products are selected, should show empty state
    expect(screen.getByText(/No products selected/)).toBeTruthy()
    expect(screen.getByText(/Click on products to add them to your cart/)).toBeTruthy()
  })

  it('shows discount information section', () => {
    render(<UserChecksThe />)
    
    expect(screen.getByText(/Discount Information/)).toBeTruthy()
    expect(screen.getByText(/All prices shown include applicable discounts/)).toBeTruthy()
  })
})
