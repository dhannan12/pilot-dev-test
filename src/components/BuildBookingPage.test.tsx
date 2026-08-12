import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildBookingPage from './BuildBookingPage'

describe('BuildBookingPage', () => {
  it('renders without crashing', () => {
    render(<BuildBookingPage />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and header', () => {
    render(<BuildBookingPage />)
    expect(screen.getByText('Book Your Appointment')).toBeTruthy()
    expect(screen.getByText('Experience luxury hair care with our expert stylists')).toBeTruthy()
  })

  it('displays service selection on step 1', () => {
    render(<BuildBookingPage />)
    expect(screen.getByText('Choose Your Service')).toBeTruthy()
    expect(screen.getByText('Classic Haircut')).toBeTruthy()
    expect(screen.getByText('Premium Color')).toBeTruthy()
    expect(screen.getByText('Styling & Blowout')).toBeTruthy()
    expect(screen.getByText('Balayage Highlights')).toBeTruthy()
    expect(screen.getByText('Keratin Smoothing')).toBeTruthy()
  })

  it('displays mock services with prices and durations', () => {
    render(<BuildBookingPage />)
    expect(screen.getByText('$55')).toBeTruthy()
    expect(screen.getByText('$145')).toBeTruthy()
    expect(screen.getByText('$45')).toBeTruthy()
    expect(screen.getAllByText(/min/i).length).toBeGreaterThan(0)
  })

  it('advances to step 2 when a service is selected', () => {
    render(<BuildBookingPage />)
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      expect(screen.getByText('Select Your Stylist')).toBeTruthy()
    }
  })

  it('displays stylists on step 2', () => {
    render(<BuildBookingPage />)
    // Select a service first
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      expect(screen.getByText('Isabella Rodriguez')).toBeTruthy()
      expect(screen.getByText('Marcus Thompson')).toBeTruthy()
      expect(screen.getByText('Sophia Chen')).toBeTruthy()
      expect(screen.getByText('Oliver Bennett')).toBeTruthy()
      expect(screen.getByText('Ava Martinez')).toBeTruthy()
    }
  })

  it('displays stylist ratings and experience', () => {
    render(<BuildBookingPage />)
    // Select a service first
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      expect(screen.getAllByText(/\d\.\d/).length).toBeGreaterThan(0)
      expect(screen.getByText('10+ years')).toBeTruthy()
    }
  })

  it('allows navigation back to previous step', () => {
    render(<BuildBookingPage />)
    // Select a service
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      // Now on step 2, click back
      const backButton = screen.getByText('← Back')
      fireEvent.click(backButton)
      expect(screen.getByText('Choose Your Service')).toBeTruthy()
    }
  })

  it('advances to step 3 when stylist is selected', () => {
    render(<BuildBookingPage />)
    // Select service
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      // Select stylist
      const stylistButton = screen.getByText('Isabella Rodriguez').closest('button')
      if (stylistButton) {
        fireEvent.click(stylistButton)
        expect(screen.getByText('Pick Date & Time')).toBeTruthy()
      }
    }
  })

  it('displays date picker and time slots on step 3', () => {
    render(<BuildBookingPage />)
    // Navigate to step 3
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      const stylistButton = screen.getByText('Isabella Rodriguez').closest('button')
      if (stylistButton) {
        fireEvent.click(stylistButton)
        expect(screen.getByLabelText('Select Date')).toBeTruthy()
        expect(screen.getByText('Available Time Slots')).toBeTruthy()
        expect(screen.getByText('09:00 AM')).toBeTruthy()
        expect(screen.getByText('10:00 AM')).toBeTruthy()
      }
    }
  })

  it('displays client information form on step 4', () => {
    render(<BuildBookingPage />)
    // Navigate through all steps
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      const stylistButton = screen.getByText('Isabella Rodriguez').closest('button')
      if (stylistButton) {
        fireEvent.click(stylistButton)
        
        // Select date and time
        const dateInput = screen.getByLabelText('Select Date')
        fireEvent.change(dateInput, { target: { value: '2026-12-31' } })
        
        const timeSlot = screen.getByText('09:00 AM').closest('button')
        if (timeSlot && !timeSlot.disabled) {
          fireEvent.click(timeSlot)
          
          // Click continue
          const continueButton = screen.getByText('Continue →')
          fireEvent.click(continueButton)
          
          expect(screen.getByText('Your Information')).toBeTruthy()
          expect(screen.getByLabelText('Full Name *')).toBeTruthy()
          expect(screen.getByLabelText('Email Address *')).toBeTruthy()
          expect(screen.getByLabelText('Phone Number *')).toBeTruthy()
        }
      }
    }
  })

  it('displays appointment summary on step 4', () => {
    render(<BuildBookingPage />)
    // Navigate to step 4
    const serviceButton = screen.getByText('Classic Haircut').closest('button')
    if (serviceButton) {
      fireEvent.click(serviceButton)
      const stylistButton = screen.getByText('Isabella Rodriguez').closest('button')
      if (stylistButton) {
        fireEvent.click(stylistButton)
        
        const dateInput = screen.getByLabelText('Select Date')
        fireEvent.change(dateInput, { target: { value: '2026-12-31' } })
        
        const timeSlot = screen.getByText('09:00 AM').closest('button')
        if (timeSlot && !timeSlot.disabled) {
          fireEvent.click(timeSlot)
          
          const continueButton = screen.getByText('Continue →')
          fireEvent.click(continueButton)
          
          expect(screen.getByText('Appointment Summary')).toBeTruthy()
          expect(screen.getByText('Total:')).toBeTruthy()
        }
      }
    }
  })

  it('displays cancellation policy information', () => {
    render(<BuildBookingPage />)
    expect(screen.getByText('Cancellation Policy')).toBeTruthy()
    expect(screen.getByText(/24 hours notice/i)).toBeTruthy()
  })

  it('shows progress steps indicator', () => {
    render(<BuildBookingPage />)
    expect(screen.getByText('Service')).toBeTruthy()
    expect(screen.getByText('Stylist')).toBeTruthy()
    expect(screen.getByText('Date & Time')).toBeTruthy()
    expect(screen.getByText('Details')).toBeTruthy()
  })
})
