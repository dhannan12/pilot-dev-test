import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScheduleAppointments from './ScheduleAppointments'

describe('ScheduleAppointments', () => {
  it('renders without crashing', () => {
    render(<ScheduleAppointments />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Schedule an Appointment')).toBeInTheDocument()
  })

  it('displays appointment type options', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('General Checkup')).toBeInTheDocument()
    expect(screen.getByText('Teeth Cleaning')).toBeInTheDocument()
    expect(screen.getByText('Cavity Filling')).toBeInTheDocument()
    expect(screen.getByText('Root Canal')).toBeInTheDocument()
    expect(screen.getByText('Teeth Whitening')).toBeInTheDocument()
  })

  it('shows progress steps', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Select Service')).toBeInTheDocument()
    expect(screen.getByText('Choose Date')).toBeInTheDocument()
    expect(screen.getByText('Pick Time')).toBeInTheDocument()
    expect(screen.getByText('Your Details')).toBeInTheDocument()
  })

  it('advances to date selection when appointment type is selected', () => {
    render(<ScheduleAppointments />)
    const generalCheckup = screen.getByText('General Checkup')
    fireEvent.click(generalCheckup)
    expect(screen.getByText('Choose a Date')).toBeInTheDocument()
  })

  it('displays available dates in step 2', () => {
    render(<ScheduleAppointments />)
    // Select appointment type
    fireEvent.click(screen.getByText('General Checkup'))
    // Check for dates
    expect(screen.getByText('Mon, Dec 18, 2026')).toBeInTheDocument()
    expect(screen.getByText('Tue, Dec 19, 2026')).toBeInTheDocument()
  })

  it('advances to time slot selection when date is chosen', () => {
    render(<ScheduleAppointments />)
    // Select appointment type
    fireEvent.click(screen.getByText('Teeth Cleaning'))
    // Select date
    fireEvent.click(screen.getByText('Mon, Dec 18, 2026'))
    expect(screen.getByText('Available Time Slots')).toBeInTheDocument()
  })

  it('displays available time slots with dentist names', () => {
    render(<ScheduleAppointments />)
    // Navigate to time slots
    fireEvent.click(screen.getByText('General Checkup'))
    fireEvent.click(screen.getByText('Mon, Dec 18, 2026'))
    // Check for time slots
    expect(screen.getByText('09:00 AM')).toBeInTheDocument()
    const drSarahElements = screen.getAllByText('Dr. Sarah Johnson')
    expect(drSarahElements.length).toBeGreaterThan(0)
  })

  it('shows patient information form in step 4', () => {
    render(<ScheduleAppointments />)
    // Navigate to patient info
    fireEvent.click(screen.getByText('General Checkup'))
    fireEvent.click(screen.getByText('Mon, Dec 18, 2026'))
    fireEvent.click(screen.getByText('09:00 AM'))
    expect(screen.getByText('Your Information')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
  })

  it('displays dentist information', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Our Dentists')).toBeInTheDocument()
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Dr. Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeInTheDocument()
  })

  it('allows going back to previous steps', () => {
    render(<ScheduleAppointments />)
    // Navigate forward
    fireEvent.click(screen.getByText('General Checkup'))
    expect(screen.getByText('Choose a Date')).toBeInTheDocument()
    // Go back
    const backButtons = screen.getAllByText('← Back')
    fireEvent.click(backButtons[0])
    expect(screen.getByText('Select Appointment Type')).toBeInTheDocument()
  })

  it('shows confirmation after form submission', () => {
    render(<ScheduleAppointments />)
    // Navigate through all steps
    fireEvent.click(screen.getByText('General Checkup'))
    fireEvent.click(screen.getByText('Mon, Dec 18, 2026'))
    fireEvent.click(screen.getByText('09:00 AM'))
    
    // Fill out form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('(555) 123-4567'), {
      target: { value: '555-123-4567' }
    })
    
    // Submit
    fireEvent.click(screen.getByText('Confirm Appointment'))
    expect(screen.getByText('Appointment Confirmed!')).toBeInTheDocument()
  })

  it('displays only available time slots', () => {
    render(<ScheduleAppointments />)
    fireEvent.click(screen.getByText('General Checkup'))
    fireEvent.click(screen.getByText('Mon, Dec 18, 2026'))
    
    // Check that available slots are shown
    const availableBadges = screen.getAllByText('Available')
    expect(availableBadges.length).toBeGreaterThan(0)
  })
})
