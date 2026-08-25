import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUserInputs from './RegisteredUserInputs'

describe('RegisteredUserInputs', () => {
  it('renders without crashing', () => {
    render(<RegisteredUserInputs />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<RegisteredUserInputs />)
    // Check that at least one user from mock data is displayed
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText('Bob Smith')).toBeTruthy()
    expect(screen.getByText('alice.johnson@example.com')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUserInputs />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="registereduserinputs"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduserinputs-item"]')).toBeTruthy()
  })

  it('filters users by name search', () => {
    render(<RegisteredUserInputs />)
    const searchInput = screen.getByTestId('registereduserinputs-search') as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'Alice' } })
    
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.queryByText('Bob Smith')).toBeFalsy()
  })

  it('filters users by status', () => {
    render(<RegisteredUserInputs />)
    const statusSelect = screen.getByTestId('registereduserinputs-status') as HTMLSelectElement
    
    fireEvent.change(statusSelect, { target: { value: 'pending' } })
    
    expect(screen.getByText('David Brown')).toBeTruthy()
  })

  it('resets filters when reset button is clicked', () => {
    render(<RegisteredUserInputs />)
    const searchInput = screen.getByTestId('registereduserinputs-search') as HTMLInputElement
    const resetButton = screen.getByTestId('registereduserinputs-reset')
    
    fireEvent.change(searchInput, { target: { value: 'Alice' } })
    expect(searchInput.value).toBe('Alice')
    
    fireEvent.click(resetButton)
    expect(searchInput.value).toBe('')
  })

  it('displays correct user count', () => {
    render(<RegisteredUserInputs />)
    // Should show 7 users initially
    expect(screen.getByText(/7 users found/)).toBeTruthy()
  })
})
