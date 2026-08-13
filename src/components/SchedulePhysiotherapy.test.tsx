import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Schedule Physiotherapy Appointment')).toBeTruthy()
  })

  it('displays mock therapists', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getAllByText('Dr. Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. Michael Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. Emily Davis').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. James Wilson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. Amanda Brown').length).toBeGreaterThan(0)
  })

  it('displays time slots', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('08:00 AM')).toBeTruthy()
    expect(screen.getByText('09:00 AM')).toBeTruthy()
    expect(screen.getByText('11:00 AM')).toBeTruthy()
  })

  it('displays 24-hour reminder information', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('24-Hour Reminders')).toBeTruthy()
    expect(screen.getByText(/Automated reminders are sent 24 hours before/)).toBeTruthy()
  })

  it('displays upcoming appointments', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Upcoming Appointments')).toBeTruthy()
    expect(screen.getByText('Sports Injury Assessment')).toBeTruthy()
    expect(screen.getByText('Post-Surgery Recovery Session')).toBeTruthy()
  })

  it('shows reminder sent badges', () => {
    render(<SchedulePhysiotherapy />)
    const reminderBadges = screen.getAllByText('Reminder Sent')
    expect(reminderBadges.length).toBeGreaterThan(0)
  })

  it('displays book appointment button', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Book Appointment')).toBeTruthy()
  })
})
