import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupDatabase from './SetupDatabase'

describe('SetupDatabase', () => {
  it('renders without crashing', () => {
    render(<SetupDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database setup header', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('ClothesShop Database Setup')).toBeTruthy()
  })

  it('displays all 6 mock database tables', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('products')).toBeTruthy()
    expect(screen.getByText('categories')).toBeTruthy()
    expect(screen.getByText('inventory')).toBeTruthy()
    expect(screen.getByText('customers')).toBeTruthy()
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('order_items')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupDatabase />)
    // Main wrapper
    expect(document.querySelector('[data-testid="setupdatabase"]')).toBeTruthy()
    // Initialize button
    expect(document.querySelector('[data-testid="setupdatabase-initialize"]')).toBeTruthy()
    // Reset button
    expect(document.querySelector('[data-testid="setupdatabase-reset"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="setupdatabase-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="setupdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
    // Toggle buttons
    expect(document.querySelector('[data-testid="setupdatabase-toggle"]')).toBeTruthy()
  })

  it('shows table count in header', () => {
    render(<SetupDatabase />)
    expect(screen.getByText(/Database Tables \(6\)/)).toBeTruthy()
  })

  it('displays control buttons', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Initialize Database')).toBeTruthy()
    expect(screen.getByText('Reset')).toBeTruthy()
  })
})
