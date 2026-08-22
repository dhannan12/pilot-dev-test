import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock provider data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Amanda Lee')).toBeTruthy()
  })

  it('displays consent requirement message', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Consent Required/i)).toBeTruthy()
    expect(screen.getByText(/You must review and accept all required consents/i)).toBeTruthy()
  })

  it('displays schedule telehealth consultation header', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Schedule Telehealth Consultation')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Form elements
    expect(document.querySelector('[data-testid="userattemptsto-provider"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-time"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-reason"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userattemptsto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-cancel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-view-consent"]')).toBeTruthy()
    
    // List elements
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-item"]')).toBeTruthy()
  })

  it('displays consent tracking information', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Consents Accepted: 0 \/ 5/i)).toBeTruthy()
  })

  it('shows submit button disabled initially', () => {
    render(<UserAttemptsTo />)
    const submitButton = document.querySelector('[data-testid="userattemptsto-submit"]') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('displays provider selection dropdown', () => {
    render(<UserAttemptsTo />)
    const providerSelect = document.querySelector('[data-testid="userattemptsto-provider"]') as HTMLSelectElement
    expect(providerSelect).toBeTruthy()
    expect(screen.getByText('-- Select a Provider --')).toBeTruthy()
  })

  it('displays date and time input fields', () => {
    render(<UserAttemptsTo />)
    const dateInput = document.querySelector('[data-testid="userattemptsto-date"]') as HTMLInputElement
    const timeInput = document.querySelector('[data-testid="userattemptsto-time"]') as HTMLInputElement
    expect(dateInput.type).toBe('date')
    expect(timeInput.type).toBe('time')
  })

  it('displays reason for visit textarea', () => {
    render(<UserAttemptsTo />)
    const reasonTextarea = document.querySelector('[data-testid="userattemptsto-reason"]') as HTMLTextAreaElement
    expect(reasonTextarea.tagName).toBe('TEXTAREA')
    expect(reasonTextarea.placeholder).toContain('describe your symptoms')
  })

  it('displays all 5 mock providers in the list', () => {
    render(<UserAttemptsTo />)
    const providerItems = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(providerItems.length).toBe(5)
  })

  it('displays review consent button', () => {
    render(<UserAttemptsTo />)
    const consentButton = document.querySelector('[data-testid="userattemptsto-view-consent"]') as HTMLButtonElement
    expect(consentButton).toBeTruthy()
    expect(consentButton.textContent).toContain('Review & Accept Consents')
  })
})
