import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViewsA from './UserViewsA'

describe('UserViewsA', () => {
  it('renders without crashing', () => {
    render(<UserViewsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays sales page header', () => {
    render(<UserViewsA />)
    expect(screen.getByText('Summer Sale')).toBeTruthy()
    expect(screen.getByText(/Up to 30% off/i)).toBeTruthy()
  })

  it('displays mock products', () => {
    render(<UserViewsA />)
    expect(screen.getByText('Premium Cotton T-Shirt')).toBeTruthy()
    expect(screen.getByText('Denim Jeans Classic Fit')).toBeTruthy()
    expect(screen.getByText('Leather Sneakers')).toBeTruthy()
  })

  it('shows product count', () => {
    render(<UserViewsA />)
    expect(screen.getByText(/eligible products/i)).toBeTruthy()
  })

  it('displays category filters', () => {
    render(<UserViewsA />)
    expect(screen.getByTestId('userviewsa-filter-all')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-filter-clothing')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-filter-shoes')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsA />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userviewsa"]')).toBeTruthy()
    // Product list
    expect(document.querySelector('[data-testid="userviewsa-list"]')).toBeTruthy()
    // Product items
    expect(document.querySelector('[data-testid="userviewsa-item"]')).toBeTruthy()
    // Add to cart buttons
    expect(document.querySelector('[data-testid="userviewsa-add-to-cart"]')).toBeTruthy()
    // Filter buttons
    expect(document.querySelector('[data-testid="userviewsa-filter-all"]')).toBeTruthy()
  })

  it('displays pricing information', () => {
    render(<UserViewsA />)
    // Check for sale prices
    const salePrices = screen.getAllByText(/\$\d+\.\d+/)
    expect(salePrices.length).toBeGreaterThan(0)
  })

  it('shows discount badges', () => {
    render(<UserViewsA />)
    const discountBadges = screen.getAllByText(/-30%/)
    expect(discountBadges.length).toBeGreaterThan(0)
  })

  it('displays add to cart buttons for each product', () => {
    render(<UserViewsA />)
    const addToCartButtons = screen.getAllByText('Add to Cart')
    expect(addToCartButtons.length).toBeGreaterThan(0)
  })
})
