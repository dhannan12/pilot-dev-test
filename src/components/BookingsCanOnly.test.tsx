import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BookingsCanOnly from './BookingsCanOnly'

describe('BookingsCanOnly', () => {
  it('renders without crashing', () => {
    render(<BookingsCanOnly />)
    expect(document.body).toBeTruthy()
  })

  it('displays the booking form with all required fields', () => {
    render(<BookingsCanOnly />)
    
    expect(screen.getByText('Book Your Appointment')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter your name')).toBeTruthy()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeTruthy()
    expect(screen.getByText('Select Service *')).toBeTruthy()
    expect(screen.getByText('Select Date *')).toBeTruthy()
  })

  it('displays mock services in the dropdown', () => {
    render(<BookingsCanOnly />)
    
    const serviceSelect = screen.getByTestId('bookingscanonly-service')
    expect(serviceSelect).toBeTruthy()
    
    // Check that services are present
    expect(screen.getByText(/Haircut/)).toBeTruthy()
    expect(screen.getByText(/Hair Coloring/)).toBeTruthy()
    expect(screen.getByText(/Styling/)).toBeTruthy()
  })

  it('displays mock dates with availability information', () => {
    render(<BookingsCanOnly />)
    
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    expect(dateSelect).toBeTruthy()
    
    // Check that dates with availability info are present
    expect(screen.getByText(/Thu, Sep 4/)).toBeTruthy()
    const fullyBookedOptions = screen.getAllByText(/Fully booked/)
    expect(fullyBookedOptions.length).toBeGreaterThan(0)
  })

  it('shows time slots when a date is selected', () => {
    render(<BookingsCanOnly />)
    
    const dateSelect = screen.getByTestId('bookingscanonly-date') as HTMLSelectElement
    
    // Select the first date (which has available slots)
    fireEvent.change(dateSelect, { target: { value: '1' } })
    
    // Time slots should appear
    expect(screen.getByText('Select Time Slot *')).toBeTruthy()
    const slots = screen.getAllByTestId('bookingscanonly-slot-item')
    expect(slots.length).toBeGreaterThan(0)
  })

  it('disables submit button when no date is selected', () => {
    render(<BookingsCanOnly />)
    
    const submitButton = screen.getByTestId('bookingscanonly-submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('disables submit button when date has no available slots', () => {
    render(<BookingsCanOnly />)
    
    const nameInput = screen.getByTestId('bookingscanonly-name')
    const emailInput = screen.getByTestId('bookingscanonly-email')
    const serviceSelect = screen.getByTestId('bookingscanonly-service')
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    
    // Fill in basic fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(serviceSelect, { target: { value: '1' } })
    
    // Select a date with no available slots (date id '3' or '4' based on mock data)
    fireEvent.change(dateSelect, { target: { value: '3' } })
    
    // Submit button should be disabled
    const submitButton = screen.getByTestId('bookingscanonly-submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    
    // Should show no available slots message
    const noSlotsMessages = screen.getAllByText(/No Available Slots/)
    expect(noSlotsMessages.length).toBeGreaterThan(0)
  })

  it('enables submit button when all fields are filled and slot is available', () => {
    render(<BookingsCanOnly />)
    
    const nameInput = screen.getByTestId('bookingscanonly-name')
    const emailInput = screen.getByTestId('bookingscanonly-email')
    const serviceSelect = screen.getByTestId('bookingscanonly-service')
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    
    // Fill in all fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(serviceSelect, { target: { value: '1' } })
    fireEvent.change(dateSelect, { target: { value: '1' } }) // Date with available slots
    
    // Select an available time slot
    const slots = screen.getAllByTestId('bookingscanonly-slot-item')
    const availableSlot = slots.find(slot => !(slot as HTMLButtonElement).disabled)
    if (availableSlot) {
      fireEvent.click(availableSlot)
    }
    
    // Submit button should be enabled
    const submitButton = screen.getByTestId('bookingscanonly-submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('shows confirmation screen after successful submission', () => {
    render(<BookingsCanOnly />)
    
    const nameInput = screen.getByTestId('bookingscanonly-name')
    const emailInput = screen.getByTestId('bookingscanonly-email')
    const serviceSelect = screen.getByTestId('bookingscanonly-service')
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    
    // Fill in all fields
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } })
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } })
    fireEvent.change(serviceSelect, { target: { value: '1' } })
    fireEvent.change(dateSelect, { target: { value: '1' } })
    
    // Select an available time slot
    const slots = screen.getAllByTestId('bookingscanonly-slot-item')
    const availableSlot = slots.find(slot => !(slot as HTMLButtonElement).disabled)
    if (availableSlot) {
      fireEvent.click(availableSlot)
    }
    
    // Submit the form
    const submitButton = screen.getByTestId('bookingscanonly-submit')
    fireEvent.click(submitButton)
    
    // Should show confirmation message
    expect(screen.getByText('Booking Confirmed!')).toBeTruthy()
    expect(screen.getByText('Jane Smith')).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<BookingsCanOnly />)
    
    const nameInput = screen.getByTestId('bookingscanonly-name') as HTMLInputElement
    const resetButton = screen.getByTestId('bookingscanonly-reset')
    
    // Fill in name
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    expect(nameInput.value).toBe('Test User')
    
    // Click reset
    fireEvent.click(resetButton)
    
    // Name should be cleared
    expect(nameInput.value).toBe('')
  })

  it('has required data-testid attributes', () => {
    render(<BookingsCanOnly />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="bookingscanonly"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="bookingscanonly-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="bookingscanonly-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="bookingscanonly-service"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="bookingscanonly-date"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="bookingscanonly-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="bookingscanonly-reset"]')).toBeTruthy()
  })

  it('shows slot list after selecting a date', () => {
    render(<BookingsCanOnly />)
    
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    fireEvent.change(dateSelect, { target: { value: '1' } })
    
    // Should show slot list container
    expect(document.querySelector('[data-testid="bookingscanonly-slot-list"]')).toBeTruthy()
    
    // Should show individual slot items
    const slotItems = document.querySelectorAll('[data-testid="bookingscanonly-slot-item"]')
    expect(slotItems.length).toBeGreaterThan(0)
  })

  it('displays availability summary when date is selected', () => {
    render(<BookingsCanOnly />)
    
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    
    // Select date with available slots
    fireEvent.change(dateSelect, { target: { value: '1' } })
    expect(screen.getByText(/Slot Availability/)).toBeTruthy()
    expect(screen.getByText(/available for/)).toBeTruthy()
    
    // Select date without available slots
    fireEvent.change(dateSelect, { target: { value: '3' } })
    expect(screen.getByText(/No slots available/)).toBeTruthy()
    expect(screen.getByText(/Booking cannot be submitted/)).toBeTruthy()
  })

  it('shows appropriate button text based on slot availability', () => {
    render(<BookingsCanOnly />)
    
    const dateSelect = screen.getByTestId('bookingscanonly-date')
    const submitButton = screen.getByTestId('bookingscanonly-submit')
    
    // Initially shows default text
    expect(submitButton.textContent).toContain('Confirm Booking')
    
    // Select date without slots
    fireEvent.change(dateSelect, { target: { value: '3' } })
    expect(submitButton.textContent).toContain('No Available Slots - Cannot Submit')
  })
})
