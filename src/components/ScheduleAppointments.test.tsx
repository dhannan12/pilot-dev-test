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
    expect(screen.getByText('Schedule Appointments')).toBeTruthy()
  })

  it('displays 24-hour reminder information', () => {
    render(<ScheduleAppointments />)
    const elements = screen.getAllByText(/24 hours before/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('displays dentist selection dropdown with mock dentists', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText(/Dr. Sarah Johnson/i)).toBeTruthy()
    expect(screen.getByText(/Dr. Michael Chen/i)).toBeTruthy()
    expect(screen.getByText(/Dr. Emily Rodriguez/i)).toBeTruthy()
  })

  it('displays available time slots', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('09:00 AM')).toBeTruthy()
    expect(screen.getByText('02:00 PM')).toBeTruthy()
  })

  it('switches between schedule and list views', () => {
    render(<ScheduleAppointments />)
    const listButton = screen.getByText('View Appointments')
    fireEvent.click(listButton)
    expect(screen.getByText('Scheduled Appointments')).toBeTruthy()
  })

  it('displays mock appointments in list view', () => {
    render(<ScheduleAppointments />)
    const listButton = screen.getByText('View Appointments')
    fireEvent.click(listButton)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Mary Williams')).toBeTruthy()
    expect(screen.getByText('Robert Brown')).toBeTruthy()
  })

  it('shows reminder status for appointments', () => {
    render(<ScheduleAppointments />)
    const listButton = screen.getByText('View Appointments')
    fireEvent.click(listButton)
    const reminderElements = screen.getAllByText('Reminder Sent')
    expect(reminderElements.length).toBeGreaterThan(0)
  })

  it('allows input in patient name field', () => {
    render(<ScheduleAppointments />)
    const input = screen.getByPlaceholderText('Enter your full name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test Patient' } })
    expect(input.value).toBe('Test Patient')
  })

  it('displays appointment type selection', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Regular Checkup')).toBeTruthy()
    expect(screen.getByText('Teeth Cleaning')).toBeTruthy()
  })

  it('has schedule button disabled when form is incomplete', () => {
    render(<ScheduleAppointments />)
    const scheduleButton = screen.getByText('Schedule Appointment')
    expect(scheduleButton.className).toContain('cursor-not-allowed')
  })
})
