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
    expect(screen.getByTestId('user-attempts-to-date')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-submit')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-list')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-item"]')).toBeTruthy()
  })

  it('displays form with all required fields', () => {
    render(<UserAttemptsTo />)
    
    // Check all form fields are present
    expect(screen.getByLabelText(/Expense Title/i)).toBeTruthy()
    expect(screen.getByLabelText(/Amount/i)).toBeTruthy()
    expect(screen.getByLabelText(/Category/i)).toBeTruthy()
    expect(screen.getByLabelText(/Date/i)).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-submit')).toBeTruthy()
  })

  it('displays predefined categories in dropdown', () => {
    render(<UserAttemptsTo />)
    
    const categorySelect = screen.getByTestId('user-attempts-to-category') as HTMLSelectElement
    
    // Check that select has options
    expect(categorySelect.options.length).toBeGreaterThan(1)
    
    // Check for some expected categories
    const optionTexts = Array.from(categorySelect.options).map(opt => opt.value)
    expect(optionTexts).toContain('Food')
    expect(optionTexts).toContain('Transportation')
    expect(optionTexts).toContain('Entertainment')
  })

  it('shows error when submitting without selecting a category', () => {
    render(<UserAttemptsTo />)
    
    // Fill in all fields except category
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'Test Expense' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '50.00' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-date'), {
      target: { value: '2026-08-14' }
    })
    
    // Leave category empty and submit
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Should show error about missing category
    const errorElement = screen.getByTestId('user-attempts-to-error')
    expect(errorElement).toBeTruthy()
    expect(errorElement.textContent).toContain('select a category')
  })

  it('shows error when submitting without title', () => {
    render(<UserAttemptsTo />)
    
    // Fill in other fields but not title
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '50.00' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-category'), {
      target: { value: 'Food' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-date'), {
      target: { value: '2026-08-14' }
    })
    
    // Submit without title
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Should show error about missing title
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText(/enter an expense title/i)).toBeTruthy()
  })

  it('shows error when submitting without amount', () => {
    render(<UserAttemptsTo />)
    
    // Fill in other fields but not amount
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'Test Expense' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-category'), {
      target: { value: 'Food' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-date'), {
      target: { value: '2026-08-14' }
    })
    
    // Submit without amount
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Should show error about invalid amount
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText(/valid amount/i)).toBeTruthy()
  })

  it('shows error when submitting without date', () => {
    render(<UserAttemptsTo />)
    
    // Fill in other fields but not date
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'Test Expense' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '50.00' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-category'), {
      target: { value: 'Food' }
    })
    
    // Submit without date
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Should show error about missing date
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText(/select a date/i)).toBeTruthy()
  })

  it('successfully adds expense when all fields are filled including category', () => {
    render(<UserAttemptsTo />)
    
    const initialItems = screen.getAllByTestId('user-attempts-to-item')
    const initialCount = initialItems.length
    
    // Fill in all fields including category
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'New Test Expense' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '75.50' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-category'), {
      target: { value: 'Transportation' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-date'), {
      target: { value: '2026-08-14' }
    })
    
    // Submit the form
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Should show success message
    expect(screen.getByTestId('user-attempts-to-success')).toBeTruthy()
    expect(screen.getByText(/Successfully added/i)).toBeTruthy()
    
    // New expense should appear in the list
    const updatedItems = screen.getAllByTestId('user-attempts-to-item')
    expect(updatedItems.length).toBe(initialCount + 1)
    
    // Should find the new expense
    expect(screen.getByText('New Test Expense')).toBeTruthy()
    expect(screen.getByText('$75.50')).toBeTruthy()
  })

  it('clears form after successful submission', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const categorySelect = screen.getByTestId('user-attempts-to-category') as HTMLSelectElement
    const dateInput = screen.getByTestId('user-attempts-to-date') as HTMLInputElement
    
    // Fill in all fields
    fireEvent.change(titleInput, { target: { value: 'Test Expense' } })
    fireEvent.change(amountInput, { target: { value: '50.00' } })
    fireEvent.change(categorySelect, { target: { value: 'Food' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-14' } })
    
    // Submit
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Form should be cleared
    expect(titleInput.value).toBe('')
    expect(amountInput.value).toBe('')
    expect(categorySelect.value).toBe('')
    expect(dateInput.value).toBe('')
  })

  it('displays total expenses and count', () => {
    render(<UserAttemptsTo />)
    
    // Should display statistics
    expect(screen.getByText('Total Expenses')).toBeTruthy()
    expect(screen.getByText(/expense.*recorded/i)).toBeTruthy()
    
    // Should show a dollar amount
    const dollarAmounts = screen.getAllByText(/\$\d+\.\d{2}/)
    expect(dollarAmounts.length).toBeGreaterThan(0)
  })

  it('validates category is the critical field preventing submission', () => {
    render(<UserAttemptsTo />)
    
    // Fill all fields EXCEPT category
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'Critical Test' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '100.00' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-date'), {
      target: { value: '2026-08-14' }
    })
    
    // Get initial count
    const initialCount = screen.getAllByTestId('user-attempts-to-item').length
    
    // Try to submit without category
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Error should appear
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    
    // Expense should NOT be added
    const afterCount = screen.getAllByTestId('user-attempts-to-item').length
    expect(afterCount).toBe(initialCount)
    
    // Should not find the expense that wasn't added
    expect(screen.queryByText('Critical Test')).toBeFalsy()
  })
})
