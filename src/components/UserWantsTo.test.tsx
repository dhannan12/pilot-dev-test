import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWantsTo from './UserWantsTo'

describe('UserWantsTo', () => {
  it('renders without crashing', () => {
    render(<UserWantsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the total monthly spend', () => {
    render(<UserWantsTo />)
    const totalElement = screen.getByTestId('user-wants-to-total-amount')
    expect(totalElement).toBeTruthy()
    expect(totalElement.textContent).toContain('$')
  })

  it('displays mock expense data', () => {
    render(<UserWantsTo />)
    // Check for transaction list
    const transactionList = screen.getByTestId('user-wants-to-transaction-list')
    expect(transactionList).toBeTruthy()
    
    // Check for transaction items
    const transactionItems = screen.getAllByTestId('user-wants-to-transaction-item')
    expect(transactionItems.length).toBeGreaterThan(0)
  })

  it('displays category breakdown', () => {
    render(<UserWantsTo />)
    const categoryList = screen.getByTestId('user-wants-to-category-list')
    expect(categoryList).toBeTruthy()
    
    const categoryItems = screen.getAllByTestId('user-wants-to-category-item')
    expect(categoryItems.length).toBeGreaterThan(0)
  })

  it('displays quick stats', () => {
    render(<UserWantsTo />)
    expect(screen.getByTestId('user-wants-to-stat-average')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-stat-highest')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-stat-lowest')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWantsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('user-wants-to')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-total-card')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-total-amount')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-category-list')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-transaction-list')).toBeTruthy()
    
    // Verify at least one of each item type
    expect(document.querySelector('[data-testid="user-wants-to-category-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-wants-to-transaction-item"]')).toBeTruthy()
  })

  it('formats currency correctly', () => {
    render(<UserWantsTo />)
    const totalElement = screen.getByTestId('user-wants-to-total-amount')
    
    // Check that currency is formatted with $ and decimal points
    expect(totalElement.textContent).toMatch(/\$[\d,]+\.\d{2}/)
  })

  it('displays transaction count', () => {
    render(<UserWantsTo />)
    const totalCard = screen.getByTestId('user-wants-to-total-card')
    expect(totalCard.textContent).toContain('transactions')
  })
})
