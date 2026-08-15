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
    expect(screen.getByText('Cases Without Scheduled Court Dates')).toBeTruthy()
  })

  it('displays mock case data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('CV-2026-001234')).toBeTruthy()
    expect(screen.getByText('Smith v. Johnson Construction LLC')).toBeTruthy()
    expect(screen.getByText(/Robert Smith/)).toBeTruthy()
    expect(screen.getByText('CR-2026-005678')).toBeTruthy()
    expect(screen.getByText(/Jennifer Williams/)).toBeTruthy()
  })

  it('displays warning message about missing court dates', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/A court date must be scheduled before proceeding/)).toBeTruthy()
  })

  it('displays last attempt information', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Attempted to file motion for summary judgment/)).toBeTruthy()
    expect(screen.getByText(/Attempted to submit plea bargain documents/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="userattemptsto-schedule"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-view"]')).toBeTruthy()
  })

  it('opens schedule modal when schedule button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const scheduleButtons = document.querySelectorAll('[data-testid="userattemptsto-schedule"]')
    fireEvent.click(scheduleButtons[0])
    
    // Modal should appear
    expect(document.querySelector('[data-testid="userattemptsto-modal"]')).toBeTruthy()
    expect(screen.getByText(/Please schedule a court date before proceeding/)).toBeTruthy()
  })

  it('has all form fields in modal with correct data-testid', () => {
    render(<UserAttemptsTo />)
    
    const scheduleButtons = document.querySelectorAll('[data-testid="userattemptsto-schedule"]')
    fireEvent.click(scheduleButtons[0])
    
    // Check form fields
    expect(document.querySelector('[data-testid="userattemptsto-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-time"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-courtroom"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-judge"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-cancel"]')).toBeTruthy()
  })

  it('closes modal when cancel button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const scheduleButtons = document.querySelectorAll('[data-testid="userattemptsto-schedule"]')
    fireEvent.click(scheduleButtons[0])
    
    // Modal is open
    expect(document.querySelector('[data-testid="userattemptsto-modal"]')).toBeTruthy()
    
    // Click cancel
    const cancelButton = document.querySelector('[data-testid="userattemptsto-cancel"]') as HTMLElement
    fireEvent.click(cancelButton)
    
    // Modal should be closed
    expect(document.querySelector('[data-testid="userattemptsto-modal"]')).toBeFalsy()
  })

  it('closes modal when submit button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const scheduleButtons = document.querySelectorAll('[data-testid="userattemptsto-schedule"]')
    fireEvent.click(scheduleButtons[0])
    
    // Modal is open
    expect(document.querySelector('[data-testid="userattemptsto-modal"]')).toBeTruthy()
    
    // Click submit
    const submitButton = document.querySelector('[data-testid="userattemptsto-submit"]') as HTMLElement
    fireEvent.click(submitButton)
    
    // Modal should be closed
    expect(document.querySelector('[data-testid="userattemptsto-modal"]')).toBeFalsy()
  })
})
