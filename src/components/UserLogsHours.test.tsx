import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserLogsHours from './UserLogsHours'

describe('UserLogsHours', () => {
  it('renders without crashing', () => {
    render(<UserLogsHours />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock time entries', () => {
    render(<UserLogsHours />)
    expect(screen.getByText(/Contract review and analysis/i)).toBeTruthy()
    expect(screen.getByText(/Client consultation/i)).toBeTruthy()
    expect(screen.getByText(/Legal research and memo preparation/i)).toBeTruthy()
  })

  it('displays billable hours summary', () => {
    render(<UserLogsHours />)
    expect(screen.getByText(/Total Billable Hours/i)).toBeTruthy()
    expect(screen.getByText(/Non-Billable Hours/i)).toBeTruthy()
    expect(screen.getByText(/Total Hours/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserLogsHours />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userlogshours"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="userlogshours-case"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshours-hours"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshours-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshours-billable"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="userlogshours-submit"]')).toBeTruthy()
    
    // Filter
    expect(document.querySelector('[data-testid="userlogshours-filter"]')).toBeTruthy()
    
    // List and items
    expect(document.querySelector('[data-testid="userlogshours-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshours-item"]')).toBeTruthy()
  })

  it('displays case selection dropdown', () => {
    render(<UserLogsHours />)
    const caseSelect = document.querySelector('[data-testid="userlogshours-case"]') as HTMLSelectElement
    expect(caseSelect).toBeTruthy()
    expect(caseSelect.options.length).toBeGreaterThan(1)
  })

  it('shows log hours form', () => {
    render(<UserLogsHours />)
    expect(screen.getAllByText(/Log Hours/i).length).toBeGreaterThan(0)
    expect(screen.getByLabelText(/Select Case/i)).toBeTruthy()
    expect(screen.getByLabelText(/Description/i)).toBeTruthy()
  })
})
