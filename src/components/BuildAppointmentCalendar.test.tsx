import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildAppointmentCalendar from './BuildAppointmentCalendar'

describe('BuildAppointmentCalendar', () => {
  it('renders without crashing', () => {
    render(<BuildAppointmentCalendar />)
    expect(document.body).toBeTruthy()
  })

  it('displays the calendar header', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText('Appointment Calendar')).toBeTruthy()
    expect(screen.getByText('Manage and view all salon appointments')).toBeTruthy()
  })

  it('displays view mode toggles', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText('Day View')).toBeTruthy()
    expect(screen.getByText('Week View')).toBeTruthy()
  })

  it('displays appointments with client names', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
  })

  it('displays service information', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText(/Hair Cut & Style/)).toBeTruthy()
    expect(screen.getByText(/Color Treatment/)).toBeTruthy()
  })

  it('displays stylist names', () => {
    render(<BuildAppointmentCalendar />)
    const stylistMatches = screen.queryAllByText(/Stylist:/)
    expect(stylistMatches.length).toBeGreaterThan(0)
  })

  it('displays appointment status', () => {
    render(<BuildAppointmentCalendar />)
    const confirmedElements = screen.getAllByText(/confirmed/i)
    expect(confirmedElements.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText('Total')).toBeTruthy()
    expect(screen.getByText('Confirmed')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
  })

  it('displays new appointment button', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByText('+ New Appointment')).toBeTruthy()
  })

  it('displays date selector', () => {
    render(<BuildAppointmentCalendar />)
    expect(screen.getByLabelText('Select Date:')).toBeTruthy()
  })
})
