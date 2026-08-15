import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Case Status Management')).toBeTruthy()
  })

  it('displays mock cases in the list', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('CASE-2024-001')).toBeTruthy()
    expect(screen.getByText('Acme Corporation')).toBeTruthy()
    expect(screen.getByText('TechStart Inc')).toBeTruthy()
    expect(screen.getByText('Global Ventures LLC')).toBeTruthy()
    expect(screen.getByText('Riverside Properties')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    // Form fields
    expect(document.querySelector('[data-testid="userattemptsto-case"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-status"]')).toBeTruthy()
    // Submit button
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    // List containers
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows selecting a case from dropdown', () => {
    render(<UserAttemptsTo />)
    const caseSelect = screen.getByTestId('userattemptsto-case') as HTMLSelectElement
    
    fireEvent.change(caseSelect, { target: { value: '1' } })
    expect(caseSelect.value).toBe('1')
  })

  it('shows current status when case is selected', () => {
    render(<UserAttemptsTo />)
    const caseSelect = screen.getByTestId('userattemptsto-case') as HTMLSelectElement
    
    fireEvent.change(caseSelect, { target: { value: '1' } })
    expect(screen.getByText(/Current Status:/)).toBeTruthy()
    expect(screen.getByText('Valid transitions: In Progress, On Hold, Closed')).toBeTruthy()
  })

  it('allows selecting a new status', () => {
    render(<UserAttemptsTo />)
    const statusSelect = screen.getByTestId('userattemptsto-status') as HTMLSelectElement
    
    fireEvent.change(statusSelect, { target: { value: 'Closed' } })
    expect(statusSelect.value).toBe('Closed')
  })

  it('submit button is disabled when no case or status selected', () => {
    render(<UserAttemptsTo />)
    const submitButton = screen.getByTestId('userattemptsto-submit') as HTMLButtonElement
    
    expect(submitButton.disabled).toBe(true)
  })

  it('submit button is enabled when both case and status are selected', () => {
    render(<UserAttemptsTo />)
    const caseSelect = screen.getByTestId('userattemptsto-case') as HTMLSelectElement
    const statusSelect = screen.getByTestId('userattemptsto-status') as HTMLSelectElement
    const submitButton = screen.getByTestId('userattemptsto-submit') as HTMLButtonElement
    
    fireEvent.change(caseSelect, { target: { value: '1' } })
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } })
    
    expect(submitButton.disabled).toBe(false)
  })

  it('shows error message when invalid status is attempted', () => {
    render(<UserAttemptsTo />)
    const caseSelect = screen.getByTestId('userattemptsto-case') as HTMLSelectElement
    const statusSelect = screen.getByTestId('userattemptsto-status') as HTMLSelectElement
    const submitButton = screen.getByTestId('userattemptsto-submit') as HTMLButtonElement
    
    // Select case with status 'Open' (valid statuses: In Progress, On Hold, Closed)
    fireEvent.change(caseSelect, { target: { value: '1' } })
    // Try to set an invalid status
    fireEvent.change(statusSelect, { target: { value: 'Archived' } })
    fireEvent.click(submitButton)
    
    // Check that error appears in multiple places (form and history)
    const errorMessages = screen.getAllByText(/Invalid status transition/)
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('creates history entry after status update attempt', () => {
    render(<UserAttemptsTo />)
    const caseSelect = screen.getByTestId('userattemptsto-case') as HTMLSelectElement
    const statusSelect = screen.getByTestId('userattemptsto-status') as HTMLSelectElement
    const submitButton = screen.getByTestId('userattemptsto-submit') as HTMLButtonElement
    
    fireEvent.change(caseSelect, { target: { value: '1' } })
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } })
    fireEvent.click(submitButton)
    
    // History section should appear
    expect(screen.getByText('Status Update History')).toBeTruthy()
  })
})
