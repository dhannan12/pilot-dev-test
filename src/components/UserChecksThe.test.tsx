import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksThe from './UserChecksThe'

describe('UserChecksThe', () => {
  it('renders without crashing', () => {
    render(<UserChecksThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays new arrivals heading', () => {
    render(<UserChecksThe />)
    expect(screen.getByText('New Arrivals')).toBeTruthy()
  })

  it('displays mock product data', () => {
    render(<UserChecksThe />)
    expect(screen.getByText('Summer Floral Dress')).toBeTruthy()
    expect(screen.getByText('Classic Denim Jacket')).toBeTruthy()
    expect(screen.getByText('Striped Cotton T-Shirt')).toBeTruthy()
  })

  it('shows product count', () => {
    render(<UserChecksThe />)
    expect(screen.getByText(/Showing \d+ products?/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksThe />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userchecksthe"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userchecksthe-list"]')).toBeTruthy()
    // List items
    expect(document.querySelectorAll('[data-testid="userchecksthe-item"]').length).toBeGreaterThan(0)
    // Filter controls
    expect(document.querySelector('[data-testid="userchecksthe-category"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userchecksthe-sort"]')).toBeTruthy()
    // Buttons
    expect(document.querySelector('[data-testid="userchecksthe-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userchecksthe-view"]')).toBeTruthy()
  })

  it('renders at least 5 products', () => {
    render(<UserChecksThe />)
    const items = document.querySelectorAll('[data-testid="userchecksthe-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays category filter options', () => {
    render(<UserChecksThe />)
    const categorySelect = screen.getByTestId('userchecksthe-category')
    expect(categorySelect).toBeTruthy()
  })

  it('displays sort filter options', () => {
    render(<UserChecksThe />)
    const sortSelect = screen.getByTestId('userchecksthe-sort')
    expect(sortSelect).toBeTruthy()
  })
})
