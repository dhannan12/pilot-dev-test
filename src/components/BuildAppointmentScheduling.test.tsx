import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildAppointmentScheduling from './BuildAppointmentScheduling'

describe('BuildAppointmentScheduling', () => {
  it('renders without crashing', () => {
    render(<BuildAppointmentScheduling />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<BuildAppointmentScheduling />)
    const heading = screen.getByText('Appointment Scheduling')
    expect(heading).toBeTruthy()
  })

  it('displays therapist options', () => {
    render(<BuildAppointmentScheduling />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
  })

  it('allows switching between schedule and appointments view', () => {
    render(<BuildAppointmentScheduling />)
    
    const appointmentsButton = screen.getByText('📋 View Appointments')
    fireEvent.click(appointmentsButton)
    
    expect(screen.getByText('All Appointments')).toBeTruthy()
  })

  it('displays appointment list in appointments view', () => {
    render(<BuildAppointmentScheduling />)
    
    const appointmentsButton = screen.getByText('📋 View Appointments')
    fireEvent.click(appointmentsButton)
    
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Emma Davis')).toBeTruthy()
    expect(screen.getByText('Robert Johnson')).toBeTruthy()
  })

  it('allows therapist selection', () => {
    render(<BuildAppointmentScheduling />)
    
    const therapistButton = screen.getByText('Dr. Sarah Johnson').closest('button')
    expect(therapistButton).toBeTruthy()
    if (therapistButton) {
      fireEvent.click(therapistButton)
      expect(therapistButton.className).toContain('border-blue-600')
    }
  })

  it('displays time slots after therapist selection', () => {
    render(<BuildAppointmentScheduling />)
    
    const therapistButton = screen.getByText('Dr. Sarah Johnson').closest('button')
    if (therapistButton) {
      fireEvent.click(therapistButton)
      expect(screen.getByText('09:00 AM')).toBeTruthy()
    }
  })

  it('displays patient information form', () => {
    render(<BuildAppointmentScheduling />)
    
    expect(screen.getByPlaceholderText('Enter patient name')).toBeTruthy()
    expect(screen.getByText('Treatment Type *')).toBeTruthy()
  })

  it('displays booking summary section', () => {
    render(<BuildAppointmentScheduling />)
    
    expect(screen.getByText('Booking Summary')).toBeTruthy()
    expect(screen.getByText('Book Appointment')).toBeTruthy()
  })
})
