import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Schedule Physiotherapy Appointment')).toBeTruthy()
  })

  it('displays filter options for training times', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Training Time')).toBeTruthy()
    expect(screen.getByText('Morning (8AM - 12PM)')).toBeTruthy()
    expect(screen.getByText('Afternoon (12PM - 6PM)')).toBeTruthy()
    expect(screen.getByText('Evening (6PM - 9PM)')).toBeTruthy()
  })

  it('displays therapist filter options', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Therapist')).toBeTruthy()
    expect(screen.getAllByText('Dr. Sarah Johnson').length).toBeGreaterThan(0)
  })

  it('displays available appointment slots', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getAllByText('Book Appointment').length).toBeGreaterThan(0)
  })

  it('displays session type filter', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Session Type')).toBeTruthy()
  })

  it('displays clear filters button', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Clear All Filters')).toBeTruthy()
  })

  it('shows available appointments count', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText(/available appointments found/i)).toBeTruthy()
  })
})
