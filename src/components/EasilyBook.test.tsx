import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EasilyBook from './EasilyBook'

describe('EasilyBook', () => {
  it('renders without crashing', () => {
    render(<EasilyBook />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and cancellation policy', () => {
    render(<EasilyBook />)
    expect(screen.getByText('Easy Online Booking')).toBeTruthy()
    expect(screen.getByText(/24 hours in advance/i)).toBeTruthy()
    expect(screen.getByText(/avoid cancellation fees/i)).toBeTruthy()
  })

  it('displays service selection with multiple choice support', () => {
    render(<EasilyBook />)
    expect(screen.getByText('1. Select Services')).toBeTruthy()
    expect(screen.getByText('Select one or more services')).toBeTruthy()
  })

  it('displays all service options', () => {
    render(<EasilyBook />)
    expect(screen.getAllByText('Haircut').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hair Coloring').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Blowout').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Highlights').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Keratin Treatment').length).toBeGreaterThan(0)
  })

  it('displays all stylists', () => {
    render(<EasilyBook />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emma Williams')).toBeTruthy()
    expect(screen.getByText('David Martinez')).toBeTruthy()
    expect(screen.getByText('Lisa Anderson')).toBeTruthy()
  })

  it('displays time slots', () => {
    render(<EasilyBook />)
    const timeSlots = screen.getAllByText('09:00 AM')
    expect(timeSlots.length).toBeGreaterThan(0)
    expect(screen.getAllByText('10:00 AM').length).toBeGreaterThan(0)
    expect(screen.getAllByText('03:00 PM').length).toBeGreaterThan(0)
  })

  it('displays recent appointments', () => {
    render(<EasilyBook />)
    expect(screen.getByText('Recent Appointments')).toBeTruthy()
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('Jane Smith')).toBeTruthy()
    expect(screen.getByText('Alice Brown')).toBeTruthy()
    expect(screen.getByText('Bob Wilson')).toBeTruthy()
    expect(screen.getByText('Carol Davis')).toBeTruthy()
  })

  it('renders form fields for client information', () => {
    render(<EasilyBook />)
    expect(screen.getByPlaceholderText('John Doe')).toBeTruthy()
    expect(screen.getByPlaceholderText('john@example.com')).toBeTruthy()
    expect(screen.getByPlaceholderText('(555) 123-4567')).toBeTruthy()
  })

  it('renders book appointment button', () => {
    render(<EasilyBook />)
    expect(screen.getByText('Book Appointment')).toBeTruthy()
  })

  it('allows selecting a service and displays checkmark', () => {
    render(<EasilyBook />)
    const haircutElements = screen.getAllByText('Haircut')
    const haircutButton = haircutElements[0].closest('button')
    expect(haircutButton).toBeTruthy()
    if (haircutButton) {
      fireEvent.click(haircutButton)
      expect(haircutButton.classList.contains('bg-purple-50')).toBe(true)
    }
  })

  it('allows selecting multiple services and calculates total cost', () => {
    render(<EasilyBook />)
    
    // Select Haircut ($50)
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) {
      fireEvent.click(haircutButton)
    }
    
    // Select Blowout ($40)
    const blowoutButton = screen.getAllByText('Blowout')[0].closest('button')
    if (blowoutButton) {
      fireEvent.click(blowoutButton)
    }
    
    // Check that total cost is displayed
    expect(screen.getByText('Total Cost:')).toBeTruthy()
    expect(screen.getByText('$90')).toBeTruthy()
    expect(screen.getByText('Selected: 2 service(s)')).toBeTruthy()
  })

  it('calculates total duration when multiple services are selected', () => {
    render(<EasilyBook />)
    
    // Select Haircut (45 minutes)
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) {
      fireEvent.click(haircutButton)
    }
    
    // Select Blowout (30 minutes)
    const blowoutButton = screen.getAllByText('Blowout')[0].closest('button')
    if (blowoutButton) {
      fireEvent.click(blowoutButton)
    }
    
    // Check that total duration is displayed (75 minutes)
    expect(screen.getByText('Total Duration: 75 minutes')).toBeTruthy()
  })

  it('allows deselecting a service', () => {
    render(<EasilyBook />)
    
    // Select Haircut
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) {
      fireEvent.click(haircutButton)
      expect(haircutButton.classList.contains('bg-purple-50')).toBe(true)
      
      // Deselect Haircut
      fireEvent.click(haircutButton)
      expect(haircutButton.classList.contains('bg-purple-50')).toBe(false)
    }
  })

  it('allows selecting a stylist', () => {
    render(<EasilyBook />)
    const stylistButton = screen.getByText('Sarah Johnson').closest('button')
    expect(stylistButton).toBeTruthy()
    if (stylistButton) {
      fireEvent.click(stylistButton)
      expect(stylistButton.classList.contains('bg-purple-50')).toBe(true)
    }
  })

  it('allows filling in client name', () => {
    render(<EasilyBook />)
    const nameInput = screen.getByPlaceholderText('John Doe') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    expect(nameInput.value).toBe('Test User')
  })

  it('displays feedback status for completed appointments', () => {
    render(<EasilyBook />)
    const feedbackProvided = screen.getAllByText(/Feedback provided/i)
    const feedbackPending = screen.getAllByText(/Feedback pending/i)
    expect(feedbackProvided.length).toBeGreaterThan(0)
    expect(feedbackPending.length).toBeGreaterThan(0)
  })

  it('shows feedback prompt when client with pending feedback tries to book', () => {
    render(<EasilyBook />)
    
    // Select a service
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) fireEvent.click(haircutButton)
    
    // Select a stylist
    const stylistButton = screen.getByText('Sarah Johnson').closest('button')
    if (stylistButton) fireEvent.click(stylistButton)
    
    // Select a date
    const dateInput = screen.getByLabelText(/Select Date/i) as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    // Select a time
    const timeButton = screen.getAllByText('09:00 AM')[0].closest('button')
    if (timeButton) fireEvent.click(timeButton)
    
    // Fill in client information with a name that has pending feedback
    const nameInput = screen.getByPlaceholderText('John Doe') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    
    const phoneInput = screen.getByPlaceholderText('(555) 123-4567') as HTMLInputElement
    fireEvent.change(phoneInput, { target: { value: '555-1234' } })
    
    // Submit the form
    const submitButton = screen.getByText('Book Appointment')
    fireEvent.click(submitButton)
    
    // Should show feedback prompt
    expect(screen.getByText('Feedback Required')).toBeTruthy()
    expect(screen.getByText(/Before booking your next appointment/i)).toBeTruthy()
  })

  it('allows submitting feedback from the prompt', () => {
    render(<EasilyBook />)
    
    // Trigger feedback prompt by booking with a client who has pending feedback
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) fireEvent.click(haircutButton)
    
    const stylistButton = screen.getByText('Sarah Johnson').closest('button')
    if (stylistButton) fireEvent.click(stylistButton)
    
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    const timeButton = screen.getAllByText('09:00 AM')[0].closest('button')
    if (timeButton) fireEvent.click(timeButton)
    
    const nameInput = screen.getByPlaceholderText('John Doe') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    
    const phoneInput = screen.getByPlaceholderText('(555) 123-4567') as HTMLInputElement
    fireEvent.change(phoneInput, { target: { value: '555-1234' } })
    
    const submitButton = screen.getByText('Book Appointment')
    fireEvent.click(submitButton)
    
    // Now in feedback modal, click a rating star
    const stars = screen.getAllByText('☆')
    if (stars.length > 0) fireEvent.click(stars[4]) // 5th star
    
    // Submit feedback
    const feedbackSubmitButton = screen.getByText('Submit Feedback')
    fireEvent.click(feedbackSubmitButton)
    
    // Should show booking confirmation
    expect(screen.getByText(/Appointment booked successfully/i)).toBeTruthy()
  })

  it('allows skipping feedback prompt', () => {
    render(<EasilyBook />)
    
    // Trigger feedback prompt
    const haircutButton = screen.getAllByText('Haircut')[0].closest('button')
    if (haircutButton) fireEvent.click(haircutButton)
    
    const stylistButton = screen.getByText('Sarah Johnson').closest('button')
    if (stylistButton) fireEvent.click(stylistButton)
    
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    const timeButton = screen.getAllByText('09:00 AM')[0].closest('button')
    if (timeButton) fireEvent.click(timeButton)
    
    const nameInput = screen.getByPlaceholderText('John Doe') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Alice Brown' } })
    
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } })
    
    const phoneInput = screen.getByPlaceholderText('(555) 123-4567') as HTMLInputElement
    fireEvent.change(phoneInput, { target: { value: '555-5678' } })
    
    const submitButton = screen.getByText('Book Appointment')
    fireEvent.click(submitButton)
    
    // Skip feedback
    const skipButton = screen.getByText('Skip for Now')
    fireEvent.click(skipButton)
    
    // Should show booking confirmation
    expect(screen.getByText(/Appointment booked successfully/i)).toBeTruthy()
  })
})
