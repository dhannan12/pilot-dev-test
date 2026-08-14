import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWantsTo from './UserWantsTo'

describe('UserWantsTo', () => {
  it('renders without crashing', () => {
    render(<UserWantsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the title and description', () => {
    render(<UserWantsTo />)
    const title = screen.getByTestId('user-wants-to-title')
    expect(title).toBeTruthy()
    expect(title.textContent).toContain('Expense Breakdown')
  })

  it('displays total expenses', () => {
    render(<UserWantsTo />)
    const total = screen.getByTestId('user-wants-to-total')
    expect(total).toBeTruthy()
    expect(total.textContent).toMatch(/\$\d+\.\d{2}/)
  })

  it('displays category breakdown list', () => {
    render(<UserWantsTo />)
    const breakdownList = screen.getByTestId('user-wants-to-breakdown-list')
    expect(breakdownList).toBeTruthy()
    
    const categoryItems = screen.getAllByTestId('user-wants-to-category-item')
    expect(categoryItems.length).toBeGreaterThanOrEqual(3)
  })

  it('displays visual chart', () => {
    render(<UserWantsTo />)
    const chart = screen.getByTestId('user-wants-to-chart')
    expect(chart).toBeTruthy()
    
    const chartSegments = screen.getAllByTestId('user-wants-to-chart-segment')
    expect(chartSegments.length).toBeGreaterThanOrEqual(3)
  })

  it('displays expense list with mock data', () => {
    render(<UserWantsTo />)
    const expenseList = screen.getByTestId('user-wants-to-expense-list')
    expect(expenseList).toBeTruthy()
    
    const expenseRows = screen.getAllByTestId('user-wants-to-expense-row')
    expect(expenseRows.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes', () => {
    render(<UserWantsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('user-wants-to')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-title')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-total')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-breakdown-list')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-chart')).toBeTruthy()
    expect(screen.getByTestId('user-wants-to-expense-list')).toBeTruthy()
    expect(document.querySelector('[data-testid]')).toBeTruthy()
  })

  it('shows percentages for each category', () => {
    render(<UserWantsTo />)
    const breakdownList = screen.getByTestId('user-wants-to-breakdown-list')
    expect(breakdownList.textContent).toMatch(/\d+\.\d%/)
  })

  it('shows dollar amounts for expenses', () => {
    render(<UserWantsTo />)
    const tbody = screen.getByTestId('user-wants-to-expense-tbody')
    expect(tbody.textContent).toMatch(/\$\d+\.\d{2}/)
  })
})
