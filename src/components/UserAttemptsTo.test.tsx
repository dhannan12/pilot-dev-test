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
    expect(screen.getByTestId('user-attempts-to-list')).toBeTruthy()
    expect(screen.getByTestId('user-attempts-to-others-list')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-other-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-delete"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="user-attempts-to-delete-other"]')).toBeTruthy()
  })

  it('separates expenses into user and others sections', () => {
    render(<UserAttemptsTo />)
    
    // Check both section headings exist
    expect(screen.getByText(/Your Expenses \(You can delete\)/i)).toBeTruthy()
    expect(screen.getByText(/Others' Expenses \(Cannot delete\)/i)).toBeTruthy()
  })

  it('shows error when user attempts to delete expense they did not add', () => {
    render(<UserAttemptsTo />)
    
    // Find a delete button for an expense added by other user
    const deleteButtons = screen.getAllByTestId('user-attempts-to-delete-other')
    
    // Click the first one (should be "Gas Station" added by other_user)
    fireEvent.click(deleteButtons[0])

    // Should show error message
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    expect(screen.getByText(/You cannot delete/i)).toBeTruthy()
    expect(screen.getByText(/you did not add it/i)).toBeTruthy()
  })

  it('allows user to delete their own expenses', () => {
    render(<UserAttemptsTo />)
    
    // Find a delete button for user's own expense
    const deleteButtons = screen.getAllByTestId('user-attempts-to-delete')
    const initialCount = deleteButtons.length
    
    // Click to delete (should be "Grocery Shopping" added by current_user)
    fireEvent.click(deleteButtons[0])

    // Should show success message
    expect(screen.getByTestId('user-attempts-to-success')).toBeTruthy()
    expect(screen.getByText(/Successfully deleted/i)).toBeTruthy()
    
    // Expense count should decrease
    const updatedDeleteButtons = screen.getAllByTestId('user-attempts-to-delete')
    expect(updatedDeleteButtons.length).toBe(initialCount - 1)
  })

  it('prevents deletion of other users expenses with clear error message', () => {
    render(<UserAttemptsTo />)
    
    // Get all expenses added by others
    const otherDeleteButtons = screen.getAllByTestId('user-attempts-to-delete-other')
    const initialOtherCount = otherDeleteButtons.length
    
    // Try to delete an expense from another user
    fireEvent.click(otherDeleteButtons[0])
    
    // Check error appears
    const errorElement = screen.getByTestId('user-attempts-to-error')
    expect(errorElement).toBeTruthy()
    expect(errorElement.textContent).toContain('you did not add it')
    
    // Verify expense was NOT deleted (count unchanged)
    const afterDeleteButtons = screen.getAllByTestId('user-attempts-to-delete-other')
    expect(afterDeleteButtons.length).toBe(initialOtherCount)
  })

  it('displays ownership information for each expense', () => {
    render(<UserAttemptsTo />)
    
    // Check for "Added by you" text on user's expenses
    const userLabels = screen.getAllByText('Added by you')
    expect(userLabels.length).toBeGreaterThan(0)
    
    // Check for "Added by other user" text on others' expenses
    const otherLabels = screen.getAllByText('Added by other user')
    expect(otherLabels.length).toBeGreaterThan(0)
  })

  it('shows statistics for user and other expenses', () => {
    render(<UserAttemptsTo />)
    
    // Check that statistics are displayed
    expect(screen.getByText('Total Expenses')).toBeTruthy()
    expect(screen.getByText('Your Expenses')).toBeTruthy()
    expect(screen.getByText("Others' Expenses")).toBeTruthy()
  })

  it('clears error message when attempting another delete', () => {
    render(<UserAttemptsTo />)
    
    // Try to delete someone else's expense
    const otherDeleteButtons = screen.getAllByTestId('user-attempts-to-delete-other')
    fireEvent.click(otherDeleteButtons[0])
    
    // Error should appear
    expect(screen.getByTestId('user-attempts-to-error')).toBeTruthy()
    
    // Now delete own expense
    const userDeleteButtons = screen.getAllByTestId('user-attempts-to-delete')
    fireEvent.click(userDeleteButtons[0])
    
    // Error should be cleared and success message shown
    expect(screen.queryByTestId('user-attempts-to-error')).toBeFalsy()
    expect(screen.getByTestId('user-attempts-to-success')).toBeTruthy()
  })
})
