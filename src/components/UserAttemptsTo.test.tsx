import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock fishing trip data', () => {
    render(<UserAttemptsTo />)
    
    // Check for trip names in the component
    expect(screen.getByText('Deep Sea Fishing')).toBeTruthy()
    expect(screen.getByText('Lake Fishing Adventure')).toBeTruthy()
    expect(screen.getByText('Fly Fishing Experience')).toBeTruthy()
    expect(screen.getByText('Night Fishing Expedition')).toBeTruthy()
    expect(screen.getByText('Family Fishing Trip')).toBeTruthy()
    expect(screen.getByText('Shore Fishing Tour')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify main wrapper
    const wrapper = document.querySelector('[data-testid="userattemptsto"]')
    expect(wrapper).toBeTruthy()
    
    // Verify form inputs
    expect(document.querySelector('[data-testid="userattemptsto-trip"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-participants"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-requests"]')).toBeTruthy()
    
    // Verify submit button
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    
    // Verify list container and items
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('allows user to select a fishing trip', () => {
    render(<UserAttemptsTo />)
    
    const tripSelect = document.querySelector('[data-testid="userattemptsto-trip"]') as HTMLSelectElement
    expect(tripSelect).toBeTruthy()
    
    // Select a trip
    fireEvent.change(tripSelect, { target: { value: 'deep-sea' } })
    expect(tripSelect.value).toBe('deep-sea')
  })

  it('displays booking summary when trip is selected', () => {
    render(<UserAttemptsTo />)
    
    const tripSelect = document.querySelector('[data-testid="userattemptsto-trip"]') as HTMLSelectElement
    fireEvent.change(tripSelect, { target: { value: 'lake-fishing' } })
    
    // Check for booking summary
    expect(screen.getByText('Booking Summary')).toBeTruthy()
    expect(screen.getByText(/Total:/)).toBeTruthy()
  })

  it('handles form submission', () => {
    render(<UserAttemptsTo />)
    
    // Fill in the form
    const tripSelect = document.querySelector('[data-testid="userattemptsto-trip"]') as HTMLSelectElement
    const nameInput = document.querySelector('[data-testid="userattemptsto-name"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="userattemptsto-email"]') as HTMLInputElement
    const phoneInput = document.querySelector('[data-testid="userattemptsto-phone"]') as HTMLInputElement
    const dateInput = document.querySelector('[data-testid="userattemptsto-date"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="userattemptsto-submit"]') as HTMLButtonElement
    
    fireEvent.change(tripSelect, { target: { value: 'deep-sea' } })
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '+353 123 4567' } })
    fireEvent.change(dateInput, { target: { value: '2026-09-01' } })
    
    // Submit the form
    fireEvent.click(submitButton)
    
    // Check for success message
    expect(screen.getByText('Booking Submitted!')).toBeTruthy()
    expect(screen.getByText(/Thank you, John Doe/)).toBeTruthy()
  })
})
