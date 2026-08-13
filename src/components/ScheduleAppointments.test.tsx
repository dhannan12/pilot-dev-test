import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScheduleAppointments from './ScheduleAppointments'

describe('ScheduleAppointments', () => {
  it('renders without crashing', () => {
    const { container } = render(<ScheduleAppointments />)
    expect(container).toBeTruthy()
  })

  it('displays insurance information form initially', () => {
    const { container } = render(<ScheduleAppointments />)
    const text = container.textContent || ''
    expect(text).toContain('Insurance Information')
    expect(text).toContain('Insurance Provider')
    expect(text).toContain('Policy Number')
    expect(text).toContain('Group Number')
    expect(text).toContain('Subscriber Name')
  })

  it('displays insurance verification notice', () => {
    const { container } = render(<ScheduleAppointments />)
    const text = container.textContent || ''
    expect(text).toContain('Insurance Verification Required')
  })

  it('renders the continue button', () => {
    const { container } = render(<ScheduleAppointments />)
    const text = container.textContent || ''
    expect(text).toContain('Continue to Appointment Details')
  })

  it('contains all required form fields', () => {
    const { container } = render(<ScheduleAppointments />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBeGreaterThanOrEqual(4)
  })
})
