import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWhoIs from './UserWhoIs'

describe('UserWhoIs', () => {
  it('renders without crashing', () => {
    render(<UserWhoIs />)
    expect(document.body).toBeTruthy()
  })

  it('displays role-based access control heading', () => {
    render(<UserWhoIs />)
    expect(screen.getByText(/Billable Hours - Role Access Control/i)).toBeTruthy()
    expect(screen.getByText(/Only/i)).toBeTruthy()
    expect(screen.getByText(/Solicitors/i)).toBeTruthy()
    expect(screen.getByText(/Paralegals/i)).toBeTruthy()
  })

  it('displays user selection dropdown with mock users', () => {
    render(<UserWhoIs />)
    const userSelect = screen.getByTestId('userwhois-user')
    expect(userSelect).toBeTruthy()
    
    // Check that mock users are present
    const options = userSelect.querySelectorAll('option')
    expect(options.length).toBeGreaterThan(5) // At least 5 users + default option
  })

  it('displays mock attempt history', () => {
    render(<UserWhoIs />)
    const attemptList = screen.getByTestId('userwhois-list')
    expect(attemptList).toBeTruthy()
    
    // Check for attempt items
    const items = screen.getAllByTestId('userwhois-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('shows allowed and denied status badges', () => {
    render(<UserWhoIs />)
    
    // Check for ALLOWED status (should appear in multiple places)
    expect(screen.getAllByText('ALLOWED').length).toBeGreaterThan(0)
    
    // Check for DENIED status (should appear in multiple places)
    expect(screen.getAllByText('DENIED').length).toBeGreaterThan(0)
  })

  it('displays stats summary with allowed and denied counts', () => {
    render(<UserWhoIs />)
    expect(screen.getByText('Allowed Attempts')).toBeTruthy()
    expect(screen.getByText('Denied Attempts')).toBeTruthy()
  })

  it('shows authorization status when user is selected', () => {
    render(<UserWhoIs />)
    const userSelect = screen.getByTestId('userwhois-user') as HTMLSelectElement
    
    // Select first user (Sarah Mitchell - Solicitor)
    fireEvent.change(userSelect, { target: { value: '1' } })
    
    // Should show authorized message
    expect(screen.getByText(/This user is authorized to log billable hours/i)).toBeTruthy()
  })

  it('shows denial message when unauthorized user is selected', () => {
    render(<UserWhoIs />)
    const userSelect = screen.getByTestId('userwhois-user') as HTMLSelectElement
    
    // Select admin user (Emma Johnson - Admin)
    fireEvent.change(userSelect, { target: { value: '3' } })
    
    // Should show not authorized message
    expect(screen.getByText(/This user is NOT authorized to log billable hours/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWhoIs />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userwhois')).toBeTruthy()
    expect(screen.getByTestId('userwhois-user')).toBeTruthy()
    expect(screen.getByTestId('userwhois-casenumber')).toBeTruthy()
    expect(screen.getByTestId('userwhois-hours')).toBeTruthy()
    expect(screen.getByTestId('userwhois-description')).toBeTruthy()
    expect(screen.getByTestId('userwhois-submit')).toBeTruthy()
    expect(screen.getByTestId('userwhois-list')).toBeTruthy()
    
    const items = screen.getAllByTestId('userwhois-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('handles form submission for authorized user', () => {
    render(<UserWhoIs />)
    
    // Select solicitor
    const userSelect = screen.getByTestId('userwhois-user') as HTMLSelectElement
    fireEvent.change(userSelect, { target: { value: '1' } })
    
    // Fill form
    const caseInput = screen.getByTestId('userwhois-casenumber') as HTMLInputElement
    fireEvent.change(caseInput, { target: { value: 'CASE-2024-100' } })
    
    const hoursInput = screen.getByTestId('userwhois-hours') as HTMLInputElement
    fireEvent.change(hoursInput, { target: { value: '2.5' } })
    
    const descInput = screen.getByTestId('userwhois-description') as HTMLTextAreaElement
    fireEvent.change(descInput, { target: { value: 'Test work' } })
    
    // Submit
    const submitBtn = screen.getByTestId('userwhois-submit')
    fireEvent.click(submitBtn)
    
    // Form should be reset for authorized user
    expect(caseInput.value).toBe('')
  })

  it('shows error message when unauthorized user attempts to log hours', () => {
    render(<UserWhoIs />)
    
    // Select receptionist (unauthorized)
    const userSelect = screen.getByTestId('userwhois-user') as HTMLSelectElement
    fireEvent.change(userSelect, { target: { value: '4' } })
    
    // Fill form
    const caseInput = screen.getByTestId('userwhois-casenumber') as HTMLInputElement
    fireEvent.change(caseInput, { target: { value: 'CASE-2024-100' } })
    
    const hoursInput = screen.getByTestId('userwhois-hours') as HTMLInputElement
    fireEvent.change(hoursInput, { target: { value: '2.5' } })
    
    const descInput = screen.getByTestId('userwhois-description') as HTMLTextAreaElement
    fireEvent.change(descInput, { target: { value: 'Test work' } })
    
    // Submit
    const submitBtn = screen.getByTestId('userwhois-submit')
    fireEvent.click(submitBtn)
    
    // Error message should appear
    const errorDiv = screen.getByTestId('userwhois-error')
    expect(errorDiv).toBeTruthy()
    expect(screen.getByText(/Access Denied/i)).toBeTruthy()
  })
})
