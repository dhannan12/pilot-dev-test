import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteringForAn from './RegisteringForAn'

describe('RegisteringForAn', () => {
  it('renders without crashing', () => {
    render(<RegisteringForAn />)
    expect(document.body).toBeTruthy()
  })

  it('displays the event registration form', () => {
    render(<RegisteringForAn />)
    expect(screen.getByText('Event Registration')).toBeTruthy()
    expect(screen.getByText('Register for upcoming events and workshops')).toBeTruthy()
  })

  it('displays mock events data', () => {
    render(<RegisteringForAn />)
    expect(screen.getByText('Summer Tech Conference 2026')).toBeTruthy()
    expect(screen.getByText('Web Development Workshop')).toBeTruthy()
    expect(screen.getByText('Product Design Bootcamp')).toBeTruthy()
    expect(screen.getByText('AI & Machine Learning Summit')).toBeTruthy()
    expect(screen.getByText('Startup Founders Meetup')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteringForAn />)
    
    // Main wrapper
    expect(screen.getByTestId('registeringforan')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('registeringforan-name')).toBeTruthy()
    expect(screen.getByTestId('registeringforan-email')).toBeTruthy()
    expect(screen.getByTestId('registeringforan-phone')).toBeTruthy()
    expect(screen.getByTestId('registeringforan-event')).toBeTruthy()
    
    // Submit button
    expect(screen.getByTestId('registeringforan-submit')).toBeTruthy()
    
    // List elements
    expect(screen.getByTestId('registeringforan-list')).toBeTruthy()
    const items = screen.getAllByTestId('registeringforan-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('validates email format and shows error for invalid email', async () => {
    render(<RegisteringForAn />)
    
    const emailInput = screen.getByTestId('registeringforan-email') as HTMLInputElement
    
    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    await waitFor(() => {
      expect(screen.getByTestId('registeringforan-email-error')).toBeTruthy()
      expect(screen.getByText('Please enter a valid email address')).toBeTruthy()
    })
  })

  it('clears email error when valid email is entered', async () => {
    render(<RegisteringForAn />)
    
    const emailInput = screen.getByTestId('registeringforan-email') as HTMLInputElement
    
    // Enter invalid email first
    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    
    await waitFor(() => {
      expect(screen.getByTestId('registeringforan-email-error')).toBeTruthy()
    })
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
    
    await waitFor(() => {
      expect(screen.queryByTestId('registeringforan-email-error')).toBeFalsy()
    })
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<RegisteringForAn />)
    
    const submitButton = screen.getByTestId('registeringforan-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeTruthy()
      expect(screen.getByText('Email is required')).toBeTruthy()
      expect(screen.getByText('Please select an event')).toBeTruthy()
    })
  })

  it('displays event details preview when an event is selected', async () => {
    render(<RegisteringForAn />)
    
    const eventSelect = screen.getByTestId('registeringforan-event') as HTMLSelectElement
    
    // Select the first event (Summer Tech Conference)
    fireEvent.change(eventSelect, { target: { value: 'evt-001' } })
    
    await waitFor(() => {
      const preview = screen.getByTestId('registeringforan-preview')
      expect(preview).toBeTruthy()
      expect(screen.getByText('Event Details')).toBeTruthy()
      // Check that preview section contains the event location
      expect(preview.textContent).toContain('San Francisco Convention Center')
    })
  })

  it('shows success message after valid form submission', async () => {
    render(<RegisteringForAn />)
    
    const nameInput = screen.getByTestId('registeringforan-name') as HTMLInputElement
    const emailInput = screen.getByTestId('registeringforan-email') as HTMLInputElement
    const eventSelect = screen.getByTestId('registeringforan-event') as HTMLSelectElement
    const submitButton = screen.getByTestId('registeringforan-submit')
    
    // Fill form with valid data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(eventSelect, { target: { value: 'evt-001' } })
    
    // Submit form
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('registeringforan-success')).toBeTruthy()
      expect(screen.getByText('Registration Successful!')).toBeTruthy()
    })
  })

  it('renders all event list items', () => {
    render(<RegisteringForAn />)
    
    const items = screen.getAllByTestId('registeringforan-item')
    expect(items.length).toBe(6) // We have 6 mock events
  })
})
