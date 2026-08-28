import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UnregisteredUserTries from './UnregisteredUserTries'

describe('UnregisteredUserTries', () => {
  it('renders without crashing', () => {
    render(<UnregisteredUserTries />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UnregisteredUserTries />)
    expect(screen.getByText(/Never Miss a Discount!/i)).toBeTruthy()
  })

  it('displays mock discount data', () => {
    render(<UnregisteredUserTries />)
    expect(screen.getByText(/Summer Sale/i)).toBeTruthy()
    expect(screen.getByText(/Flash Friday/i)).toBeTruthy()
    expect(screen.getByText(/Weekend Special/i)).toBeTruthy()
    expect(screen.getByText(/Clearance Sale/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UnregisteredUserTries />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="unregisteredusertries"]')).toBeTruthy()
    
    // Email input
    expect(document.querySelector('[data-testid="unregisteredusertries-email"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="unregisteredusertries-submit"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="unregisteredusertries-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="unregisteredusertries-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('validates email input', () => {
    render(<UnregisteredUserTries />)
    
    const submitButton = screen.getByTestId('unregisteredusertries-submit')
    
    // Submit without email
    fireEvent.click(submitButton)
    expect(screen.getByText(/Please enter your email address/i)).toBeTruthy()
  })

  it('validates email format', () => {
    render(<UnregisteredUserTries />)
    
    const emailInput = screen.getByTestId('unregisteredusertries-email') as HTMLInputElement
    const submitButton = screen.getByTestId('unregisteredusertries-submit')
    
    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    expect(screen.getByText(/Please enter a valid email address/i)).toBeTruthy()
  })

  it('shows success message after valid submission', () => {
    render(<UnregisteredUserTries />)
    
    const emailInput = screen.getByTestId('unregisteredusertries-email') as HTMLInputElement
    const submitButton = screen.getByTestId('unregisteredusertries-submit')
    
    // Valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/You're Subscribed!/i)).toBeTruthy()
  })

  it('allows resetting after successful submission', () => {
    render(<UnregisteredUserTries />)
    
    const emailInput = screen.getByTestId('unregisteredusertries-email') as HTMLInputElement
    const submitButton = screen.getByTestId('unregisteredusertries-submit')
    
    // Submit valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    // Find and click reset button
    const resetButton = screen.getByTestId('unregisteredusertries-reset')
    fireEvent.click(resetButton)
    
    // Should return to form
    expect(screen.getByText(/Never Miss a Discount!/i)).toBeTruthy()
  })
})
