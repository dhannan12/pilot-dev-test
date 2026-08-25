import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import APlayerAttempts from './APlayerAttempts'

describe('APlayerAttempts', () => {
  it('renders without crashing', () => {
    render(<APlayerAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main registration form', () => {
    render(<APlayerAttempts />)
    expect(screen.getByText(/Tournament Registration/i)).toBeTruthy()
    expect(screen.getByText(/Register for upcoming table tennis tournaments/i)).toBeTruthy()
  })

  it('displays tournament information', () => {
    render(<APlayerAttempts />)
    expect(screen.getByText(/Tournament Details/i)).toBeTruthy()
    expect(screen.getByText(/Registration Deadline:/i)).toBeTruthy()
  })

  it('shows deadline passed error message', () => {
    render(<APlayerAttempts />)
    expect(screen.getByText(/Registration Deadline Passed/i)).toBeTruthy()
    expect(screen.getByText(/Registration is no longer available/i)).toBeTruthy()
  })

  it('displays disabled form fields when deadline passed', () => {
    const { container } = render(<APlayerAttempts />)
    const nameInput = container.querySelector('[data-testid="aplayerattempts-name"]') as HTMLInputElement
    const emailInput = container.querySelector('[data-testid="aplayerattempts-email"]') as HTMLInputElement
    const submitButton = container.querySelector('[data-testid="aplayerattempts-submit"]') as HTMLButtonElement

    expect(nameInput?.disabled).toBe(true)
    expect(emailInput?.disabled).toBe(true)
    expect(submitButton?.disabled).toBe(true)
  })

  it('displays all tournaments in the list', () => {
    render(<APlayerAttempts />)
    // Each tournament name appears twice: once in dropdown, once in list
    expect(screen.getAllByText(/Spring Championship 2026/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Summer Open Tournament/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Regional Qualifier/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Youth Division Finals/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Mixed Doubles Classic/i).length).toBeGreaterThanOrEqual(1)
  })

  it('has required data-testid attributes', () => {
    const { container } = render(<APlayerAttempts />)
    
    // Main wrapper
    expect(container.querySelector('[data-testid="aplayerattempts"]')).toBeTruthy()
    
    // Form fields
    expect(container.querySelector('[data-testid="aplayerattempts-tournament"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="aplayerattempts-name"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="aplayerattempts-email"]')).toBeTruthy()
    
    // Submit button
    expect(container.querySelector('[data-testid="aplayerattempts-submit"]')).toBeTruthy()
    
    // Error message
    expect(container.querySelector('[data-testid="aplayerattempts-error"]')).toBeTruthy()
    
    // Tournament list
    expect(container.querySelector('[data-testid="aplayerattempts-list"]')).toBeTruthy()
    expect(container.querySelectorAll('[data-testid="aplayerattempts-item"]').length).toBeGreaterThan(0)
  })
})
