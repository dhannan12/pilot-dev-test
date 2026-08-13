import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScheduleAppointments from './ScheduleAppointments'

describe('ScheduleAppointments', () => {
  it('renders without crashing', () => {
    render(<ScheduleAppointments />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Schedule Your Appointment')).toBeTruthy()
    expect(screen.getByText(/Book your dental appointment online with ease/)).toBeTruthy()
  })

  it('displays appointment types', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText(/Emergency Visit/i)).toBeTruthy()
    expect(screen.getByText('General Checkup')).toBeTruthy()
    expect(screen.getByText('Teeth Cleaning')).toBeTruthy()
    expect(screen.getByText('Root Canal')).toBeTruthy()
    expect(screen.getByText('Tooth Extraction')).toBeTruthy()
  })

  it('displays dentist selection dropdown', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Preferred Dentist (Optional)')).toBeTruthy()
    expect(screen.getByText('Any Available Dentist')).toBeTruthy()
  })

  it('displays patient information form fields', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByPlaceholderText('John Doe')).toBeTruthy()
    expect(screen.getByPlaceholderText('john@example.com')).toBeTruthy()
    expect(screen.getByPlaceholderText('(555) 123-4567')).toBeTruthy()
  })

  it('shows time slots after selecting appointment type', () => {
    render(<ScheduleAppointments />)
    const emergencyButton = screen.getByText(/Emergency Visit/i).closest('button')
    if (emergencyButton) {
      fireEvent.click(emergencyButton)
      expect(screen.getByText(/Select Time Slot/i)).toBeTruthy()
    }
  })

  it('displays emergency priority notification when emergency appointment is selected', () => {
    render(<ScheduleAppointments />)
    const emergencyButton = screen.getByText(/Emergency Visit/i).closest('button')
    if (emergencyButton) {
      fireEvent.click(emergencyButton)
      expect(screen.getByText(/Emergency Appointment Selected/i)).toBeTruthy()
      expect(screen.getByText(/Priority slots available/i)).toBeTruthy()
    }
  })

  it('submit button is disabled when required fields are not filled', () => {
    render(<ScheduleAppointments />)
    const submitButton = screen.getByText('Confirm Appointment')
    expect(submitButton.hasAttribute('disabled')).toBe(true)
  })

  it('enables submit button when all required fields are filled', () => {
    render(<ScheduleAppointments />)
    
    // Select appointment type
    const appointmentType = screen.getByText('General Checkup').closest('button')
    if (appointmentType) fireEvent.click(appointmentType)
    
    // Select time slot
    const timeSlot = screen.getAllByText(/2026-08-/)[0]?.closest('button')
    if (timeSlot) fireEvent.click(timeSlot)
    
    // Fill patient information
    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('john@example.com')
    const phoneInput = screen.getByPlaceholderText('(555) 123-4567')
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '555-123-4567' } })
    
    const submitButton = screen.getByText('Confirm Appointment')
    expect(submitButton.hasAttribute('disabled')).toBe(false)
  })

  it('shows confirmation screen after successful submission', () => {
    render(<ScheduleAppointments />)
    
    // Select appointment type
    const appointmentType = screen.getByText('General Checkup').closest('button')
    if (appointmentType) fireEvent.click(appointmentType)
    
    // Select time slot
    const timeSlot = screen.getAllByText(/2026-08-/)[0]?.closest('button')
    if (timeSlot) fireEvent.click(timeSlot)
    
    // Fill patient information
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('(555) 123-4567'), { target: { value: '555-123-4567' } })
    
    // Submit form
    const submitButton = screen.getByText('Confirm Appointment')
    fireEvent.click(submitButton)
    
    // Check for confirmation message
    expect(screen.getByText('Appointment Confirmed!')).toBeTruthy()
  })

  it('displays appointment guidelines', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText(/Appointment Guidelines/i)).toBeTruthy()
    expect(screen.getByText(/Emergency appointments are prioritized and have dedicated time slots/i)).toBeTruthy()
  })

  it('reset button clears the form', () => {
    render(<ScheduleAppointments />)
    
    // Fill some fields
    const appointmentType = screen.getByText('General Checkup').closest('button')
    if (appointmentType) fireEvent.click(appointmentType)
    
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } })
    
    // Click reset
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    
    // Check that name field is cleared
    const nameInput = screen.getByPlaceholderText('John Doe') as HTMLInputElement
    expect(nameInput.value).toBe('')
  })
})
