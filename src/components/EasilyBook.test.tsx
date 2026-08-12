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
})
