import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateExpense from './CreateExpense'

describe('CreateExpense', () => {
  it('renders without crashing', () => {
    render(<CreateExpense />)
    expect(document.body).toBeTruthy()
  })

  it('displays the form title and fields', () => {
    render(<CreateExpense />)
    expect(screen.getByText('Expense Tracker')).toBeTruthy()
    expect(screen.getByText('Track and manage your expenses efficiently')).toBeTruthy()
    expect(screen.getByLabelText(/Category/)).toBeTruthy()
    expect(screen.getByLabelText(/Amount/)).toBeTruthy()
    expect(screen.getByLabelText(/Date/)).toBeTruthy()
    expect(screen.getByLabelText(/Payment Method/)).toBeTruthy()
    expect(screen.getByLabelText(/Description/)).toBeTruthy()
  })

  it('displays mock expense data', () => {
    render(<CreateExpense />)
    expect(screen.getByText('Recent Expenses')).toBeTruthy()
    expect(screen.getByText('Lunch at downtown restaurant')).toBeTruthy()
    expect(screen.getByText('Uber ride to office')).toBeTruthy()
    expect(screen.getByText('Groceries for the week')).toBeTruthy()
    expect(screen.getByText('Movie tickets')).toBeTruthy()
    expect(screen.getByText('Medical checkup')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateExpense />)
    
    // Main wrapper
    expect(screen.getByTestId('create-expense')).toBeTruthy()
    
    // Form wrapper
    expect(screen.getByTestId('create-expense-form')).toBeTruthy()
    
    // Form fields
    expect(screen.getByTestId('create-expense-category')).toBeTruthy()
    expect(screen.getByTestId('create-expense-amount')).toBeTruthy()
    expect(screen.getByTestId('create-expense-date')).toBeTruthy()
    expect(screen.getByTestId('create-expense-payment-method')).toBeTruthy()
    expect(screen.getByTestId('create-expense-description')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('create-expense-submit')).toBeTruthy()
    expect(screen.getByTestId('create-expense-reset')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('create-expense-list')).toBeTruthy()
    expect(screen.getAllByTestId('create-expense-item').length).toBeGreaterThan(0)
    
    // Total
    expect(screen.getByTestId('create-expense-total')).toBeTruthy()
  })

  it('allows user to input data into form fields', () => {
    render(<CreateExpense />)
    
    const categorySelect = screen.getByTestId('create-expense-category') as HTMLSelectElement
    const amountInput = screen.getByTestId('create-expense-amount') as HTMLInputElement
    const dateInput = screen.getByTestId('create-expense-date') as HTMLInputElement
    const paymentMethodSelect = screen.getByTestId('create-expense-payment-method') as HTMLSelectElement
    const descriptionTextarea = screen.getByTestId('create-expense-description') as HTMLTextAreaElement
    
    fireEvent.change(categorySelect, { target: { value: 'Food & Dining' } })
    fireEvent.change(amountInput, { target: { value: '50.00' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-15' } })
    fireEvent.change(paymentMethodSelect, { target: { value: 'Credit Card' } })
    fireEvent.change(descriptionTextarea, { target: { value: 'Test expense' } })
    
    expect(categorySelect.value).toBe('Food & Dining')
    expect(amountInput.value).toBe('50.00')
    expect(dateInput.value).toBe('2026-08-15')
    expect(paymentMethodSelect.value).toBe('Credit Card')
    expect(descriptionTextarea.value).toBe('Test expense')
  })

  it('adds a new expense when form is submitted with valid data', () => {
    render(<CreateExpense />)
    
    const categorySelect = screen.getByTestId('create-expense-category')
    const amountInput = screen.getByTestId('create-expense-amount')
    const dateInput = screen.getByTestId('create-expense-date')
    const paymentMethodSelect = screen.getByTestId('create-expense-payment-method')
    const descriptionTextarea = screen.getByTestId('create-expense-description')
    const submitButton = screen.getByTestId('create-expense-submit')
    
    // Get initial expense count
    const initialExpenses = screen.getAllByTestId('create-expense-item')
    const initialCount = initialExpenses.length
    
    // Fill out the form
    fireEvent.change(categorySelect, { target: { value: 'Shopping' } })
    fireEvent.change(amountInput, { target: { value: '100.00' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-15' } })
    fireEvent.change(paymentMethodSelect, { target: { value: 'Debit Card' } })
    fireEvent.change(descriptionTextarea, { target: { value: 'New test expense' } })
    
    // Submit the form
    fireEvent.click(submitButton)
    
    // Check that a new expense was added
    const updatedExpenses = screen.getAllByTestId('create-expense-item')
    expect(updatedExpenses.length).toBe(initialCount + 1)
    expect(screen.getByText('New test expense')).toBeTruthy()
  })

  it('resets the form when reset button is clicked', () => {
    render(<CreateExpense />)
    
    const categorySelect = screen.getByTestId('create-expense-category') as HTMLSelectElement
    const amountInput = screen.getByTestId('create-expense-amount') as HTMLInputElement
    const descriptionTextarea = screen.getByTestId('create-expense-description') as HTMLTextAreaElement
    const resetButton = screen.getByTestId('create-expense-reset')
    
    // Fill out some fields
    fireEvent.change(categorySelect, { target: { value: 'Food & Dining' } })
    fireEvent.change(amountInput, { target: { value: '25.00' } })
    fireEvent.change(descriptionTextarea, { target: { value: 'Test' } })
    
    expect(categorySelect.value).toBe('Food & Dining')
    expect(amountInput.value).toBe('25.00')
    expect(descriptionTextarea.value).toBe('Test')
    
    // Click reset
    fireEvent.click(resetButton)
    
    // Check that fields are cleared
    expect(categorySelect.value).toBe('')
    expect(amountInput.value).toBe('')
    expect(descriptionTextarea.value).toBe('')
  })

  it('displays total expense amount correctly', () => {
    render(<CreateExpense />)
    
    const totalElement = screen.getByTestId('create-expense-total')
    expect(totalElement).toBeTruthy()
    expect(totalElement.textContent).toContain('$')
  })
})
