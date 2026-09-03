import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CustomersCanOnly from './CustomersCanOnly'

describe('CustomersCanOnly', () => {
  it('renders without crashing', () => {
    render(<CustomersCanOnly />)
    expect(document.body).toBeTruthy()
  })

  it('displays the booking form and appointments list', () => {
    render(<CustomersCanOnly />)
    expect(screen.getByText('Appointment Booking System')).toBeTruthy()
    expect(screen.getByText('Book New Appointment')).toBeTruthy()
    expect(screen.getByText('Booked Appointments')).toBeTruthy()
  })

  it('displays mock appointments', () => {
    render(<CustomersCanOnly />)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Brown')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CustomersCanOnly />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="customerscanonly"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="customerscanonly-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customerscanonly-service"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customerscanonly-date"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="customerscanonly-submit"]')).toBeTruthy()
    
    // List
    expect(document.querySelector('[data-testid="customerscanonly-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="customerscanonly-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows time slot selector when date is selected', () => {
    render(<CustomersCanOnly />)
    
    const dateInput = screen.getByTestId('customerscanonly-date') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-09-15' } })
    
    expect(screen.getByTestId('customerscanonly-timeslot')).toBeTruthy()
  })

  it('shows error when trying to book without filling all fields', () => {
    render(<CustomersCanOnly />)
    
    const submitButton = screen.getByTestId('customerscanonly-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please fill in all fields')).toBeTruthy()
  })

  it('prevents double booking for the same time slot', () => {
    render(<CustomersCanOnly />)
    
    // Fill in the form with a time slot that's already booked (09:00 AM on 2026-09-10)
    const nameInput = screen.getByTestId('customerscanonly-name') as HTMLInputElement
    const serviceInput = screen.getByTestId('customerscanonly-service') as HTMLInputElement
    const dateInput = screen.getByTestId('customerscanonly-date') as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'Test Customer' } })
    fireEvent.change(serviceInput, { target: { value: 'Haircut' } })
    fireEvent.change(dateInput, { target: { value: '2026-09-10' } })
    
    // Wait for time slot selector to appear
    const timeSlotSelect = screen.getByTestId('customerscanonly-timeslot') as HTMLSelectElement
    fireEvent.change(timeSlotSelect, { target: { value: '09:00 AM' } })
    
    const submitButton = screen.getByTestId('customerscanonly-submit')
    fireEvent.click(submitButton)
    
    // Should show error about slot being booked
    expect(screen.getByTestId('customerscanonly-error')).toBeTruthy()
    expect(screen.getByText(/already booked/i)).toBeTruthy()
  })

  it('successfully books an available time slot', () => {
    render(<CustomersCanOnly />)
    
    // Fill in the form with an available time slot
    const nameInput = screen.getByTestId('customerscanonly-name') as HTMLInputElement
    const serviceInput = screen.getByTestId('customerscanonly-service') as HTMLInputElement
    const dateInput = screen.getByTestId('customerscanonly-date') as HTMLInputElement
    
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })
    fireEvent.change(serviceInput, { target: { value: 'Manicure' } })
    fireEvent.change(dateInput, { target: { value: '2026-09-15' } })
    
    const timeSlotSelect = screen.getByTestId('customerscanonly-timeslot') as HTMLSelectElement
    fireEvent.change(timeSlotSelect, { target: { value: '09:00 AM' } })
    
    const submitButton = screen.getByTestId('customerscanonly-submit')
    fireEvent.click(submitButton)
    
    // Should show success message
    expect(screen.getByTestId('customerscanonly-success')).toBeTruthy()
    expect(screen.getByText(/booked successfully/i)).toBeTruthy()
    
    // Should see the new appointment in the list
    expect(screen.getByText('Jane Doe')).toBeTruthy()
  })
})
