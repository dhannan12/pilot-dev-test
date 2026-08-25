import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays museum ticket purchase heading', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Dundalk Museum - Ticket Purchase/i)).toBeTruthy()
  })

  it('displays all mock ticket types', () => {
    render(<UserAttemptsTo />)
    expect(screen.getAllByText('Adult').length).toBeGreaterThan(0)
    expect(screen.getByText('Senior')).toBeTruthy()
    expect(screen.getByText('Student')).toBeTruthy()
    expect(screen.getByText('Child')).toBeTruthy()
    expect(screen.getByText('Family Pass')).toBeTruthy()
  })

  it('displays ticket prices correctly', () => {
    render(<UserAttemptsTo />)
    // Prices appear multiple times (in ticket list and order summary)
    expect(screen.getAllByText(/€12\.00/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/€10\.00/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/€8\.00/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    
    // List items (ticket types)
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBe(5)
    
    // Form fields
    expect(document.querySelector('[data-testid="userattemptsto-quantity"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-firstname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-lastname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-terms"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userattemptsto-decrease"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-increase"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-cancel"]')).toBeTruthy()
  })

  it('allows ticket type selection', () => {
    render(<UserAttemptsTo />)
    const seniorTicket = screen.getByText('Senior').closest('button')
    if (seniorTicket) {
      fireEvent.click(seniorTicket)
      expect(seniorTicket.classList.contains('border-blue-600')).toBe(true)
    }
  })

  it('allows quantity adjustment', () => {
    render(<UserAttemptsTo />)
    const increaseBtn = document.querySelector('[data-testid="userattemptsto-increase"]') as HTMLButtonElement
    const quantityInput = document.querySelector('[data-testid="userattemptsto-quantity"]') as HTMLInputElement
    
    expect(quantityInput.value).toBe('1')
    
    if (increaseBtn) {
      fireEvent.click(increaseBtn)
      expect(quantityInput.value).toBe('2')
    }
  })

  it('calculates total price correctly', () => {
    render(<UserAttemptsTo />)
    const increaseBtn = document.querySelector('[data-testid="userattemptsto-increase"]') as HTMLButtonElement
    
    // Initial price: 1 Adult ticket @ €12 (appears in ticket list, order summary, and button)
    expect(screen.getAllByText(/€12\.00/).length).toBeGreaterThan(0)
    
    // Increase quantity to 2
    if (increaseBtn) {
      fireEvent.click(increaseBtn)
    }
    
    // Should show total of €24.00
    expect(screen.getByText(/Purchase Tickets - €24\.00/)).toBeTruthy()
  })

  it('validates form inputs', () => {
    render(<UserAttemptsTo />)
    const firstNameInput = document.querySelector('[data-testid="userattemptsto-firstname"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="userattemptsto-email"]') as HTMLInputElement
    
    expect(firstNameInput.hasAttribute('required')).toBe(true)
    expect(emailInput.hasAttribute('required')).toBe(true)
  })

  it('requires terms agreement before purchase', () => {
    render(<UserAttemptsTo />)
    const submitBtn = document.querySelector('[data-testid="userattemptsto-submit"]') as HTMLButtonElement
    
    // Submit button should be disabled initially
    expect(submitBtn.disabled).toBe(true)
    
    // Check terms checkbox
    const termsCheckbox = document.querySelector('[data-testid="userattemptsto-terms"]') as HTMLInputElement
    fireEvent.click(termsCheckbox)
    
    // Submit button should now be enabled
    expect(submitBtn.disabled).toBe(false)
  })

  it('displays museum information', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Museum Information/i)).toBeTruthy()
    expect(screen.getByText(/Dundalk, Co. Louth, Ireland/i)).toBeTruthy()
  })
})
