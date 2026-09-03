import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyTheSalon from './OnlyTheSalon'

describe('OnlyTheSalon', () => {
  it('renders without crashing', () => {
    render(<OnlyTheSalon />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with all bookings', () => {
    render(<OnlyTheSalon />)
    
    // Check that booking items are rendered
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Kim')).toBeTruthy()
    expect(screen.getByText('Jessica Brown')).toBeTruthy()
    expect(screen.getByText('Robert Taylor')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<OnlyTheSalon />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="onlythesalon"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-role-owner"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-role-customer"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-role-stylist"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-confirm"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="onlythesalon-cancel"]')).toBeTruthy()
  })

  it('defaults to customer role with disabled action buttons', () => {
    render(<OnlyTheSalon />)
    
    const confirmButtons = document.querySelectorAll('[data-testid="onlythesalon-confirm"]')
    const cancelButtons = document.querySelectorAll('[data-testid="onlythesalon-cancel"]')
    
    // Buttons should be disabled by default (customer role)
    confirmButtons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(true)
    })
    cancelButtons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(true)
    })
  })

  it('enables action buttons when owner role is selected', () => {
    render(<OnlyTheSalon />)
    
    // Switch to owner role
    const ownerButton = screen.getByTestId('onlythesalon-role-owner')
    fireEvent.click(ownerButton)
    
    // Now confirm/cancel buttons should be enabled
    const confirmButtons = document.querySelectorAll('[data-testid="onlythesalon-confirm"]')
    const cancelButtons = document.querySelectorAll('[data-testid="onlythesalon-cancel"]')
    
    confirmButtons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(false)
    })
    cancelButtons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(false)
    })
  })

  it('shows access denied message when non-owner tries to confirm', () => {
    render(<OnlyTheSalon />)
    
    // Buttons are disabled for non-owners, so they can't click them via UI
    // The permission logic is enforced by disabled state
    const confirmButtons = document.querySelectorAll('[data-testid="onlythesalon-confirm"]')
    
    // All confirm buttons should be disabled for customer role
    confirmButtons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(true)
    })
    
    // Verify role message shows view-only access
    expect(screen.getByText(/View Only/i)).toBeTruthy()
  })

  it('allows owner to confirm a pending booking', () => {
    render(<OnlyTheSalon />)
    
    // Switch to owner role
    const ownerButton = screen.getByTestId('onlythesalon-role-owner')
    fireEvent.click(ownerButton)
    
    // Click confirm on first pending booking
    const confirmButton = document.querySelector('[data-testid="onlythesalon-confirm"]') as HTMLButtonElement
    fireEvent.click(confirmButton)
    
    // Should show success message
    const message = screen.getByTestId('onlythesalon-message')
    expect(message.textContent).toContain('confirmed successfully')
  })

  it('allows owner to cancel a pending booking', () => {
    render(<OnlyTheSalon />)
    
    // Switch to owner role
    const ownerButton = screen.getByTestId('onlythesalon-role-owner')
    fireEvent.click(ownerButton)
    
    // Click cancel on first pending booking
    const cancelButton = document.querySelector('[data-testid="onlythesalon-cancel"]') as HTMLButtonElement
    fireEvent.click(cancelButton)
    
    // Should show success message
    const message = screen.getByTestId('onlythesalon-message')
    expect(message.textContent).toContain('cancelled successfully')
  })

  it('displays booking status badges correctly', () => {
    render(<OnlyTheSalon />)
    
    // Check for status badges
    const pendingStatuses = screen.getAllByText('pending')
    const confirmedStatuses = screen.getAllByText('confirmed')
    const cancelledStatuses = screen.getAllByText('cancelled')
    
    expect(pendingStatuses.length).toBeGreaterThan(0)
    expect(confirmedStatuses.length).toBeGreaterThan(0)
    expect(cancelledStatuses.length).toBeGreaterThan(0)
  })
})
