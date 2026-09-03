import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CustomerMustEnter from './CustomerMustEnter'

describe('CustomerMustEnter', () => {
  it('renders without crashing', () => {
    render(<CustomerMustEnter />)
    expect(document.body).toBeTruthy()
  })

  it('displays the booking form with all fields', () => {
    render(<CustomerMustEnter />)
    
    expect(screen.getByText('Book Your Appointment')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter your full name')).toBeTruthy()
    expect(screen.getByPlaceholderText('e.g., 1234567890')).toBeTruthy()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeTruthy()
  })

  it('displays mock services data', () => {
    render(<CustomerMustEnter />)
    
    const serviceSelect = screen.getByTestId('customermustenter-service')
    expect(serviceSelect).toBeTruthy()
    // Check if options are rendered (5 services + 1 default option)
    const options = serviceSelect.querySelectorAll('option')
    expect(options.length).toBe(6) // 5 services + "Choose a service..." option
  })

  it('displays mock stylists data', () => {
    render(<CustomerMustEnter />)
    
    const stylistSelect = screen.getByTestId('customermustenter-stylist')
    expect(stylistSelect).toBeTruthy()
    // Check if options are rendered (5 stylists + 1 default option)
    const options = stylistSelect.querySelectorAll('option')
    expect(options.length).toBe(6) // 5 stylists + "Choose a stylist..." option
  })

  it('displays mock time slots', () => {
    render(<CustomerMustEnter />)
    
    const timeslots = screen.getAllByTestId('customermustenter-timeslot')
    expect(timeslots.length).toBe(8) // 8 time slots as per mock data
  })

  it('has required data-testid attributes', () => {
    render(<CustomerMustEnter />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('customermustenter')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-name')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-contact')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-email')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-service')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-stylist')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-date')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-timeslots')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-submit')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-reset')).toBeTruthy()
  })

  it('validates contact number field', () => {
    render(<CustomerMustEnter />)
    
    const contactInput = screen.getByTestId('customermustenter-contact') as HTMLInputElement
    
    // Initially no error
    expect(screen.queryByTestId('customermustenter-contact-error')).toBeNull()
    
    // Enter invalid contact
    fireEvent.change(contactInput, { target: { value: '123' } })
    expect(screen.getByTestId('customermustenter-contact-error')).toBeTruthy()
    expect(screen.getByTestId('customermustenter-contact-error').textContent).toContain('valid contact number')
  })

  it('allows valid contact number input', () => {
    render(<CustomerMustEnter />)
    
    const contactInput = screen.getByTestId('customermustenter-contact') as HTMLInputElement
    
    // Enter valid contact
    fireEvent.change(contactInput, { target: { value: '1234567890' } })
    expect(contactInput.value).toBe('1234567890')
    
    // Error should be cleared
    expect(screen.queryByTestId('customermustenter-contact-error')).toBeNull()
  })

  it('requires contact number to enable submit button', () => {
    render(<CustomerMustEnter />)
    
    const submitButton = screen.getByTestId('customermustenter-submit') as HTMLButtonElement
    
    // Initially disabled when contact is empty
    expect(submitButton.disabled).toBe(true)
    
    // Fill in contact number
    const contactInput = screen.getByTestId('customermustenter-contact') as HTMLInputElement
    fireEvent.change(contactInput, { target: { value: '1234567890' } })
    
    // Submit should now be enabled
    expect(submitButton.disabled).toBe(false)
  })

  it('allows time slot selection', () => {
    render(<CustomerMustEnter />)
    
    const timeslots = screen.getAllByTestId('customermustenter-timeslot')
    const firstAvailableSlot = timeslots.find(slot => !slot.classList.contains('cursor-not-allowed'))
    
    expect(firstAvailableSlot).toBeTruthy()
    
    if (firstAvailableSlot) {
      fireEvent.click(firstAvailableSlot)
      expect(firstAvailableSlot.classList.contains('bg-indigo-600')).toBe(true)
    }
  })

  it('resets form when reset button is clicked', () => {
    render(<CustomerMustEnter />)
    
    // Fill in some fields
    const nameInput = screen.getByTestId('customermustenter-name') as HTMLInputElement
    const contactInput = screen.getByTestId('customermustenter-contact') as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(contactInput, { target: { value: '1234567890' } })
    
    expect(nameInput.value).toBe('John Doe')
    expect(contactInput.value).toBe('1234567890')
    
    // Click reset
    const resetButton = screen.getByTestId('customermustenter-reset')
    fireEvent.click(resetButton)
    
    // Fields should be cleared
    expect(nameInput.value).toBe('')
    expect(contactInput.value).toBe('')
  })
})
