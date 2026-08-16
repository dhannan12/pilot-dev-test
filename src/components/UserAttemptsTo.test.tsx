import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main component wrapper', () => {
    render(<UserAttemptsTo />)
    const wrapper = screen.getByTestId('userattemptsto')
    expect(wrapper).toBeTruthy()
  })

  it('displays expired membership warning', () => {
    render(<UserAttemptsTo />)
    expect(screen.getAllByText(/Membership Expired/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/expired on/i).length).toBeGreaterThan(0)
  })

  it('displays mock class data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getAllByText('Yoga Flow').length).toBeGreaterThan(0)
    expect(screen.getAllByText('HIIT Training').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Spin Class').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pilates').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Zumba Dance').length).toBeGreaterThan(0)
  })

  it('displays booking attempt history with at least 5 items', () => {
    render(<UserAttemptsTo />)
    const attemptItems = document.querySelectorAll('[data-testid="userattemptsto-attempt-item"]')
    expect(attemptItems.length).toBeGreaterThanOrEqual(5)
  })

  it('shows expired membership modal when attempting to book', () => {
    render(<UserAttemptsTo />)
    const bookButtons = screen.getAllByTestId('userattemptsto-book')
    fireEvent.click(bookButtons[0])
    
    const modal = screen.getByTestId('userattemptsto-modal')
    expect(modal).toBeTruthy()
    expect(screen.getByText('Booking Failed')).toBeTruthy()
  })

  it('redirects to renewal page when clicking renew button', () => {
    render(<UserAttemptsTo />)
    const renewButton = screen.getByTestId('userattemptsto-renew')
    fireEvent.click(renewButton)
    
    expect(screen.getByText(/Redirecting to Renewal Page/i)).toBeTruthy()
  })

  it('closes modal when clicking close button', () => {
    render(<UserAttemptsTo />)
    const bookButtons = screen.getAllByTestId('userattemptsto-book')
    fireEvent.click(bookButtons[0])
    
    const modal = screen.getByTestId('userattemptsto-modal')
    expect(modal).toBeTruthy()
    
    const closeButton = screen.getByTestId('userattemptsto-close')
    fireEvent.click(closeButton)
    
    expect(screen.queryByTestId('userattemptsto-modal')).toBeNull()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-renew')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    expect(screen.getAllByTestId('userattemptsto-item').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('userattemptsto-book').length).toBeGreaterThan(0)
    expect(screen.getByTestId('userattemptsto-attempts-list')).toBeTruthy()
    expect(screen.getAllByTestId('userattemptsto-attempt-item').length).toBeGreaterThan(0)
  })

  it('adds new booking attempt when booking is clicked', () => {
    render(<UserAttemptsTo />)
    const initialAttempts = document.querySelectorAll('[data-testid="userattemptsto-attempt-item"]')
    const initialCount = initialAttempts.length
    
    const bookButtons = screen.getAllByTestId('userattemptsto-book')
    fireEvent.click(bookButtons[0])
    
    // Close the modal
    const closeButton = screen.getByTestId('userattemptsto-close')
    fireEvent.click(closeButton)
    
    const updatedAttempts = document.querySelectorAll('[data-testid="userattemptsto-attempt-item"]')
    expect(updatedAttempts.length).toBe(initialCount + 1)
  })

  it('shows redirect button in modal', () => {
    render(<UserAttemptsTo />)
    const bookButtons = screen.getAllByTestId('userattemptsto-book')
    fireEvent.click(bookButtons[0])
    
    const redirectButton = screen.getByTestId('userattemptsto-redirect')
    expect(redirectButton).toBeTruthy()
    expect(redirectButton.textContent).toContain('Renew Membership')
  })

  it('allows return to classes from redirect page', () => {
    render(<UserAttemptsTo />)
    const renewButton = screen.getByTestId('userattemptsto-renew')
    fireEvent.click(renewButton)
    
    expect(screen.getByText(/Redirecting to Renewal Page/i)).toBeTruthy()
    
    const backButton = screen.getByTestId('userattemptsto-back')
    fireEvent.click(backButton)
    
    expect(screen.getByText('Book a Class')).toBeTruthy()
  })
})
