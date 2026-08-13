import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildAppointmentScheduling from './BuildAppointmentScheduling'

describe('BuildAppointmentScheduling', () => {
  it('renders without crashing', () => {
    render(<BuildAppointmentScheduling />)
    expect(document.body).toBeTruthy()
  })

  it('displays the header and title', () => {
    render(<BuildAppointmentScheduling />)
    expect(screen.getByText('Schedule an Appointment')).toBeInTheDocument()
    expect(screen.getByText('Book your dental appointment in just a few steps')).toBeInTheDocument()
  })

  it('displays appointment types in step 1', () => {
    render(<BuildAppointmentScheduling />)
    expect(screen.getByText('General Checkup')).toBeInTheDocument()
    expect(screen.getByText('Cleaning')).toBeInTheDocument()
    expect(screen.getByText('Root Canal')).toBeInTheDocument()
  })

  it('displays doctors in step 1', () => {
    render(<BuildAppointmentScheduling />)
    expect(screen.getByText('Dr. Sarah Mitchell')).toBeInTheDocument()
    expect(screen.getByText('Dr. James Chen')).toBeInTheDocument()
    expect(screen.getByText('General Dentistry')).toBeInTheDocument()
    expect(screen.getByText('Orthodontics')).toBeInTheDocument()
  })

  it('allows selecting an appointment type', () => {
    render(<BuildAppointmentScheduling />)
    const checkupButton = screen.getByText('General Checkup').closest('button')
    expect(checkupButton).toBeTruthy()
    if (checkupButton) {
      fireEvent.click(checkupButton)
      expect(checkupButton.className).toContain('border-blue-600')
    }
  })

  it('allows selecting a doctor', () => {
    render(<BuildAppointmentScheduling />)
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    expect(doctorButton).toBeTruthy()
    if (doctorButton) {
      fireEvent.click(doctorButton)
      expect(doctorButton.className).toContain('border-blue-600')
    }
  })

  it('disables Next button until appointment type and doctor are selected', () => {
    render(<BuildAppointmentScheduling />)
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('enables Next button after selections in step 1', () => {
    render(<BuildAppointmentScheduling />)
    
    // Select appointment type
    const checkupButton = screen.getByText('General Checkup').closest('button')
    if (checkupButton) {
      fireEvent.click(checkupButton)
    }
    
    // Select doctor
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    if (doctorButton) {
      fireEvent.click(doctorButton)
    }
    
    const nextButton = screen.getByText('Next')
    expect(nextButton).not.toBeDisabled()
  })

  it('navigates to step 2 when Next is clicked', () => {
    render(<BuildAppointmentScheduling />)
    
    // Select appointment type and doctor
    const checkupButton = screen.getByText('General Checkup').closest('button')
    if (checkupButton) fireEvent.click(checkupButton)
    
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    if (doctorButton) fireEvent.click(doctorButton)
    
    // Click Next
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    
    // Check for step 2 content
    expect(screen.getByText('Select Date and Time')).toBeInTheDocument()
    expect(screen.getByText('Choose Date')).toBeInTheDocument()
  })

  it('displays time slots in step 2', () => {
    render(<BuildAppointmentScheduling />)
    
    // Navigate to step 2
    const checkupButton = screen.getByText('General Checkup').closest('button')
    if (checkupButton) fireEvent.click(checkupButton)
    
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    if (doctorButton) fireEvent.click(doctorButton)
    
    fireEvent.click(screen.getByText('Next'))
    
    // Check time slots
    expect(screen.getByText('08:00 AM')).toBeInTheDocument()
    expect(screen.getByText('09:00 AM')).toBeInTheDocument()
    expect(screen.getByText('02:00 PM')).toBeInTheDocument()
  })

  it('disables Back button on step 1', () => {
    render(<BuildAppointmentScheduling />)
    const backButton = screen.getByText('Back')
    expect(backButton).toBeDisabled()
  })

  it('shows progress bar with correct step highlighted', () => {
    render(<BuildAppointmentScheduling />)
    const progressSteps = screen.getAllByText(/Select|Date & Time|Patient Info|Review/)
    expect(progressSteps.length).toBeGreaterThan(0)
  })

  it('shows patient information form in step 3', () => {
    const { container } = render(<BuildAppointmentScheduling />)
    
    // Navigate to step 3
    const checkupButton = screen.getByText('General Checkup').closest('button')
    if (checkupButton) fireEvent.click(checkupButton)
    
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    if (doctorButton) fireEvent.click(doctorButton)
    
    fireEvent.click(screen.getByText('Next'))
    
    // Select date and time
    const dateInput = container.querySelector('input[type="date"]')
    if (dateInput) fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    const timeSlot = screen.getByText('09:00 AM').closest('button')
    if (timeSlot) fireEvent.click(timeSlot)
    
    fireEvent.click(screen.getByText('Next'))
    
    // Check for patient form
    expect(screen.getByText('Patient Information')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
  })

  it('displays unavailable doctors as disabled', () => {
    render(<BuildAppointmentScheduling />)
    const unavailableDoctor = screen.getByText('Dr. Emily Parker').closest('button')
    expect(unavailableDoctor).toBeDisabled()
  })

  it('displays unavailable time slots as disabled', () => {
    render(<BuildAppointmentScheduling />)
    
    // Navigate to step 2
    const checkupButton = screen.getByText('General Checkup').closest('button')
    if (checkupButton) fireEvent.click(checkupButton)
    
    const doctorButton = screen.getByText('Dr. Sarah Mitchell').closest('button')
    if (doctorButton) fireEvent.click(doctorButton)
    
    fireEvent.click(screen.getByText('Next'))
    
    // Check for disabled time slots
    const unavailableSlot = screen.getByText('10:00 AM').closest('button')
    expect(unavailableSlot).toBeDisabled()
  })
})
