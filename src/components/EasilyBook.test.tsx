import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EasilyBook from './EasilyBook'

describe('EasilyBook', () => {
  it('renders without crashing', () => {
    render(<EasilyBook />)
    expect(document.body).toBeTruthy()
  })

  it('displays the booking form title', () => {
    render(<EasilyBook />)
    expect(screen.getByText('Book Your Appointment')).toBeTruthy()
  })

  it('displays mock services data', () => {
    render(<EasilyBook />)
    // Check for services in the select dropdown
    expect(screen.getByText('Haircut - $50 (30 min)')).toBeTruthy()
    expect(screen.getByText('Hair Coloring - $120 (90 min)')).toBeTruthy()
    expect(screen.getByText('Blowout - $60 (45 min)')).toBeTruthy()
    expect(screen.getByText('Hair Treatment - $80 (60 min)')).toBeTruthy()
    expect(screen.getByText('Styling - $55 (40 min)')).toBeTruthy()
  })

  it('displays mock stylists data', () => {
    render(<EasilyBook />)
    expect(screen.getByText(/Emily Rodriguez/)).toBeTruthy()
    expect(screen.getByText(/Michael Chen/)).toBeTruthy()
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
  })

  it('displays mock time slots', () => {
    render(<EasilyBook />)
    expect(screen.getByText('09:00 AM')).toBeTruthy()
    expect(screen.getByText('10:00 AM')).toBeTruthy()
    expect(screen.getByText('01:00 PM')).toBeTruthy()
  })

  it('requires email address for booking', () => {
    render(<EasilyBook />)
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    expect(emailInput).toBeTruthy()
    expect(emailInput.getAttribute('required')).toBe('')
  })

  it('shows email validation message for invalid email', () => {
    render(<EasilyBook />)
    const emailInput = screen.getByPlaceholderText('your.email@example.com') as HTMLInputElement
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    expect(screen.getByText('Please provide a valid email address')).toBeTruthy()
  })

  it('shows confirmation message in email field description', () => {
    render(<EasilyBook />)
    expect(screen.getByText(/You will receive booking confirmation at this email address/)).toBeTruthy()
  })

  it('allows user to select service, stylist, and time slot', () => {
    render(<EasilyBook />)
    
    const serviceSelect = screen.getByLabelText(/Select Service/) as HTMLSelectElement
    const stylistSelect = screen.getByLabelText(/Select Stylist/) as HTMLSelectElement
    
    expect(serviceSelect).toBeTruthy()
    expect(stylistSelect).toBeTruthy()
    
    fireEvent.change(serviceSelect, { target: { value: '1' } })
    expect(serviceSelect.value).toBe('1')
    
    fireEvent.change(stylistSelect, { target: { value: '2' } })
    expect(stylistSelect.value).toBe('2')
  })

  it('disables submit button when email is invalid', () => {
    render(<EasilyBook />)
    const emailInput = screen.getByPlaceholderText('your.email@example.com') as HTMLInputElement
    const submitButton = screen.getByText('Confirm Booking') as HTMLButtonElement
    
    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    
    expect(submitButton.disabled).toBe(true)
  })

  it('shows confirmation page after successful booking', () => {
    render(<EasilyBook />)
    
    // Fill out the form
    const serviceSelect = screen.getByLabelText(/Select Service/) as HTMLSelectElement
    const stylistSelect = screen.getByLabelText(/Select Stylist/) as HTMLSelectElement
    const dateInput = screen.getByLabelText(/Select Date/) as HTMLInputElement
    const nameInput = screen.getByPlaceholderText('Enter your full name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('your.email@example.com') as HTMLInputElement
    
    fireEvent.change(serviceSelect, { target: { value: '1' } })
    fireEvent.change(stylistSelect, { target: { value: '1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-15' } })
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    
    // Select time slot
    const timeSlotButton = screen.getByText('09:00 AM')
    fireEvent.click(timeSlotButton)
    
    // Submit form
    const submitButton = screen.getByText('Confirm Booking')
    fireEvent.click(submitButton)
    
    // Check confirmation message
    expect(screen.getByText('Booking Confirmed!')).toBeTruthy()
    expect(screen.getByText(/A confirmation email has been sent to/)).toBeTruthy()
  })
})
