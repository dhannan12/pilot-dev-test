import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UserAttemptsTo />)
    // Check that expense list shows mock expenses
    expect(screen.getByText('Grocery Shopping')).toBeTruthy()
    expect(screen.getByText('Gas Station')).toBeTruthy()
    expect(screen.getByText('Movie Tickets')).toBeTruthy()
    expect(screen.getByText('Coffee Shop')).toBeTruthy()
    expect(screen.getByText('Electricity Bill')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('user-attempts-to')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-form')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-title')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-amount')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-category')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-submit')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-list')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-item"]')).toBeTruthy()
  })

  it('shows validation error when attempting to submit without title', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const submitButton = screen.getByTestId('user-attempts-to-submit')

    // Fill only amount, leave title empty
    fireEvent.change(amountInput, { target: { value: '50.00' } })
    
    // Try to submit
    fireEvent.click(submitButton)

    // Should show error message
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText(/Title is required/i)).toBeTruthy()
  })

  it('allows submission when title is provided', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const submitButton = screen.getByTestId('user-attempts-to-submit')

    // Fill both title and amount
    fireEvent.change(titleInput, { target: { value: 'Test Expense' } })
    fireEvent.change(amountInput, { target: { value: '75.50' } })
    
    // Submit
    fireEvent.click(submitButton)

    // Should add new expense to the list
    expect(screen.getByText('Test Expense')).toBeTruthy()
  })

  it('clears error message when user starts typing in title field', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const submitButton = screen.getByTestId('user-attempts-to-submit')

    // Try to submit without title to trigger error
    fireEvent.click(submitButton)
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()

    // Start typing in title
    fireEvent.change(titleInput, { target: { value: 'New' } })

    // Error should be cleared
    expect(screen.queryByTestId('user-attempts-to-error')).toBeFalsy()
  })

  it('calculates and displays total expenses correctly', () => {
    render(<UserAttemptsTo />)
    
    // Check that total is displayed
    // Mock data totals: 85.50 + 45.00 + 28.00 + 12.50 + 120.00 = 291.00
    expect(screen.getByText('$291.00')).toBeTruthy()
  })
})
