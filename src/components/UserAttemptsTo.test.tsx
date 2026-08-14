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
    // Check that expense list shows example mock expenses
    expect(screen.getByText('Example: Grocery Shopping')).toBeTruthy()
    expect(screen.getByText('Example: Gas Station')).toBeTruthy()
    expect(screen.getByText('Example: Movie Tickets')).toBeTruthy()
    expect(screen.getByText('Example: Coffee Shop')).toBeTruthy()
    expect(screen.getByText('Example: Electricity Bill')).toBeTruthy()
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

  it('shows user as not logged in initially', () => {
    render(<UserAttemptsTo />)
    
    // Should show not logged in status
    expect(screen.getByText('Not logged in')).toBeTruthy()
    expect(screen.getByText('Please log in to add expenses')).toBeTruthy()
  })

  it('disables form fields when not logged in', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const categorySelect = screen.getByTestId('user-attempts-to-category') as HTMLSelectElement
    const dateInput = screen.getByTestId('user-attempts-to-date') as HTMLInputElement
    
    // All fields should be disabled when not logged in
    expect(titleInput.disabled).toBe(true)
    expect(amountInput.disabled).toBe(true)
    expect(categorySelect.disabled).toBe(true)
    expect(dateInput.disabled).toBe(true)
  })

  it('shows warning message when not logged in', () => {
    render(<UserAttemptsTo />)
    
    const warning = screen.getByTestId('user-attempts-to-warning')
    expect(warning).toBeTruthy()
    expect(warning.textContent).toContain('You are not logged in')
  })

  it('shows login prompt when attempting to submit without being logged in', () => {
    render(<UserAttemptsTo />)
    
    // Try to submit form while not logged in
    const submitButton = screen.getByTestId('user-attempts-to-submit')
    fireEvent.click(submitButton)
    
    // Login modal should appear
    const loginModal = screen.getByTestId('user-attempts-to-login-modal')
    expect(loginModal).toBeTruthy()
    expect(screen.getByText('Login Required')).toBeTruthy()
    expect(screen.getByText(/You must be logged in to add expenses/i)).toBeTruthy()
  })

  it('allows user to log in through the login prompt', () => {
    render(<UserAttemptsTo />)
    
    // Trigger login prompt
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Fill in username
    const usernameInput = screen.getByTestId('user-attempts-to-username') as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } })
    
    // Click login button
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Should now be logged in
    expect(screen.getByText('Welcome back, John Doe!')).toBeTruthy()
    expect(screen.getByText('Logged in as')).toBeTruthy()
    expect(screen.getByText('John Doe')).toBeTruthy()
    
    // Modal should be closed
    expect(screen.queryByTestId('user-attempts-to-login-modal')).toBeFalsy()
  })

  it('enables form fields after logging in', () => {
    render(<UserAttemptsTo />)
    
    // Trigger login
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    fireEvent.change(screen.getByTestId('user-attempts-to-username'), { 
      target: { value: 'Jane Smith' } 
    })
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Fields should now be enabled
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    const categorySelect = screen.getByTestId('user-attempts-to-category') as HTMLSelectElement
    const dateInput = screen.getByTestId('user-attempts-to-date') as HTMLInputElement
    
    expect(titleInput.disabled).toBe(false)
    expect(amountInput.disabled).toBe(false)
    expect(categorySelect.disabled).toBe(false)
    expect(dateInput.disabled).toBe(false)
  })

  it('allows canceling the login prompt', () => {
    render(<UserAttemptsTo />)
    
    // Trigger login prompt
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    expect(screen.getByTestId('user-attempts-to-login-modal')).toBeTruthy()
    
    // Click cancel
    fireEvent.click(screen.getByTestId('user-attempts-to-cancel'))
    
    // Modal should be closed
    expect(screen.queryByTestId('user-attempts-to-login-modal')).toBeFalsy()
    
    // Should still be logged out
    expect(screen.getByText('Not logged in')).toBeTruthy()
  })

  it('allows user to log out after logging in', () => {
    render(<UserAttemptsTo />)
    
    // Log in first
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    fireEvent.change(screen.getByTestId('user-attempts-to-username'), { 
      target: { value: 'Test User' } 
    })
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Verify logged in
    expect(screen.getByText('Welcome back, Test User!')).toBeTruthy()
    
    // Log out
    fireEvent.click(screen.getByTestId('user-attempts-to-logout'))
    
    // Should be logged out now
    expect(screen.getByText('Not logged in')).toBeTruthy()
    expect(screen.getByText('Please log in to add expenses')).toBeTruthy()
  })

  it('clears form data when logging out', () => {
    render(<UserAttemptsTo />)
    
    // Log in
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    fireEvent.change(screen.getByTestId('user-attempts-to-username'), { 
      target: { value: 'Test User' } 
    })
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Fill in some form data
    fireEvent.change(screen.getByTestId('user-attempts-to-title'), {
      target: { value: 'Test Expense' }
    })
    fireEvent.change(screen.getByTestId('user-attempts-to-amount'), {
      target: { value: '50.00' }
    })
    
    // Log out
    fireEvent.click(screen.getByTestId('user-attempts-to-logout'))
    
    // Form should be cleared
    const titleInput = screen.getByTestId('user-attempts-to-title') as HTMLInputElement
    const amountInput = screen.getByTestId('user-attempts-to-amount') as HTMLInputElement
    expect(titleInput.value).toBe('')
    expect(amountInput.value).toBe('')
  })

  it('displays example expenses regardless of login status', () => {
    render(<UserAttemptsTo />)
    
    // Should show example expenses even when not logged in
    expect(screen.getByText('Example Expenses')).toBeTruthy()
    expect(screen.getByText('Example: Grocery Shopping')).toBeTruthy()
    
    // Check for total
    expect(screen.getByText('Total Example Expenses')).toBeTruthy()
  })

  it('shows correct authentication state indicator', () => {
    render(<UserAttemptsTo />)
    
    // Initially not logged in - should show gray indicator
    let indicators = document.querySelectorAll('.bg-gray-400')
    expect(indicators.length).toBeGreaterThan(0)
    
    // Log in
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    fireEvent.change(screen.getByTestId('user-attempts-to-username'), { 
      target: { value: 'Test User' } 
    })
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Now should show green indicator
    indicators = document.querySelectorAll('.bg-green-500')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('prevents form submission with empty username in login modal', () => {
    render(<UserAttemptsTo />)
    
    // Trigger login prompt
    fireEvent.click(screen.getByTestId('user-attempts-to-submit'))
    
    // Try to login with empty username
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // Should still show modal (login didn't succeed)
    expect(screen.getByTestId('user-attempts-to-login-modal')).toBeTruthy()
    
    // Should still be logged out
    expect(screen.queryByText(/Welcome back/)).toBeFalsy()
  })

  it('displays category options in select dropdown', () => {
    render(<UserAttemptsTo />)
    
    const categorySelect = screen.getByTestId('user-attempts-to-category') as HTMLSelectElement
    
    // Should have multiple options
    expect(categorySelect.options.length).toBeGreaterThan(1)
    
    // Check for expected categories
    const optionValues = Array.from(categorySelect.options).map(opt => opt.value)
    expect(optionValues).toContain('Food')
    expect(optionValues).toContain('Transportation')
    expect(optionValues).toContain('Entertainment')
    expect(optionValues).toContain('Utilities')
  })

  it('changes submit button text based on login status', () => {
    render(<UserAttemptsTo />)
    
    // When logged out
    let submitButton = screen.getByTestId('user-attempts-to-submit')
    expect(submitButton.textContent).toContain('Log In to Add Expense')
    
    // Log in
    fireEvent.click(submitButton)
    fireEvent.change(screen.getByTestId('user-attempts-to-username'), { 
      target: { value: 'Test User' } 
    })
    fireEvent.click(screen.getByTestId('user-attempts-to-login'))
    
    // When logged in
    submitButton = screen.getByTestId('user-attempts-to-submit')
    expect(submitButton.textContent).toContain('Add Expense')
    expect(submitButton.textContent).not.toContain('Log In')
  })
})
