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
    expect(screen.getByText('Appointment Scheduling')).toBeTruthy()
  })

  it('displays schedule and appointments tabs', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Schedule New Appointment')).toBeTruthy()
    expect(screen.getByText('My Appointments')).toBeTruthy()
  })

  it('displays doctor selection dropdown', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByLabelText('Select Doctor')).toBeTruthy()
  })

  it('displays time slots', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('09:00 AM')).toBeTruthy()
    expect(screen.getByText('10:00 AM')).toBeTruthy()
    expect(screen.getByText('01:00 PM')).toBeTruthy()
  })

  it('displays feedback notice about 7-day deadline', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText(/7 days to submit feedback/i)).toBeTruthy()
  })

  it('switches to appointments tab when clicked', () => {
    render(<ScheduleAppointments />)
    const appointmentsTab = screen.getByRole('button', { name: 'My Appointments' })
    fireEvent.click(appointmentsTab)
    // After clicking, the h2 heading should appear
    const appointmentsHeadings = screen.getAllByText('My Appointments')
    expect(appointmentsHeadings.length).toBeGreaterThan(1)
  })

  it('displays mock appointments', () => {
    render(<ScheduleAppointments />)
    const appointmentsTab = screen.getByText('My Appointments')
    fireEvent.click(appointmentsTab)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
  })

  it('shows feedback pending status for appointments', () => {
    render(<ScheduleAppointments />)
    const appointmentsTab = screen.getByText('My Appointments')
    fireEvent.click(appointmentsTab)
    const feedbackPendingElements = screen.getAllByText('Feedback Pending')
    expect(feedbackPendingElements.length).toBeGreaterThan(0)
  })

  it('displays schedule appointment button', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Schedule Appointment')).toBeTruthy()
  })
})
