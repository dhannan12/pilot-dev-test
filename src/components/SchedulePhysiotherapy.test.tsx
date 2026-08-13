import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Physiotherapy Management')).toBeTruthy()
  })

  it('displays mock physiotherapists', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Lisa Anderson')).toBeTruthy()
  })

  it('displays schedule appointment button', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getAllByText('Schedule Appointment').length).toBeGreaterThan(0)
  })

  it('displays appointment history button', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Appointment History')).toBeTruthy()
  })

  it('displays time slots', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('09:00 AM')).toBeTruthy()
    expect(screen.getByText('02:00 PM')).toBeTruthy()
  })
})
