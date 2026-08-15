import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock expenses', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Office Supplies')).toBeTruthy()
    expect(screen.getByText('Client Lunch')).toBeTruthy()
    expect(screen.getByText('Software Subscription')).toBeTruthy()
    expect(screen.getByText('Travel Expenses')).toBeTruthy()
    expect(screen.getByText('Conference Ticket')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('user-attempts-to')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-form')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-description')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-amount')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-date')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-submit')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-list')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="user-attempts-to-item"]').length).toBeGreaterThan(0)
  })

  it('shows error when submitting with empty fields', () => {
    render(<UserAttemptsTo />)
    const submitButton = screen.getByTestId('user-attempts-to-submit')
    
    fireEvent.click(submitButton)
    
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText('Description is required')).toBeTruthy()
  })

  it('shows error when attempting to add expense with future date', async () => {
    render(<UserAttemptsTo />)
    
    const descriptionInput = screen.getByTestId('user-attempts-to-description') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const dateInput = screen.getByTestId('user-attempts-to-date') as HTMLInputElement
    const submitButton = screen.getByTestId('user-attempts-to-submit')
    
    fireEvent.change(descriptionInput, { target: { value: 'Future Expense' } })
    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    // Verify the values are actually set
    expect(descriptionInput.value).toBe('Future Expense')
    expect(amountInput.value).toBe('100')
    expect(dateInput.value).toBe('2026-08-20')
    
    fireEvent.click(submitButton)
    
    // Wait for async state update
    await screen.findByTestId('user-attempts-to-error')
    expect(screen.getByText(/Cannot add expenses with future dates/)).toBeTruthy()
  })

  it('successfully adds expense with valid past date', () => {
    render(<UserAttemptsTo />)
    
    const descriptionInput = screen.getByTestId('user-attempts-to-description')
    const amountInput = screen.getByTestId('user-attempts-to-amount')
    const dateInput = screen.getByTestId('user-attempts-to-date')
    const submitButton = screen.getByTestId('user-attempts-to-submit')
    
    fireEvent.change(descriptionInput, { target: { value: 'Past Expense' } })
    fireEvent.change(amountInput, { target: { value: '75.50' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-10' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByTestId('user-attempts-to-success')).toBeTruthy()
    expect(screen.getByText('Expense added successfully!')).toBeTruthy()
  })

  it('marks rejected expenses in the list', () => {
    render(<UserAttemptsTo />)
    
    // Check for the rejected expense in mock data
    expect(screen.getByText('REJECTED')).toBeTruthy()
    expect(screen.getByText('Future date not allowed')).toBeTruthy()
  })
})
