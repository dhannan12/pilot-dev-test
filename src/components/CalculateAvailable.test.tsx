import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateAvailable from './CalculateAvailable'

describe('CalculateAvailable', () => {
  it('renders without crashing', () => {
    render(<CalculateAvailable />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Available Appointments Calculator')).toBeTruthy()
  })

  it('displays mock clinic hours for all days', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Monday')).toBeTruthy()
    expect(screen.getByText('Tuesday')).toBeTruthy()
    expect(screen.getByText('Wednesday')).toBeTruthy()
    expect(screen.getByText('Thursday')).toBeTruthy()
    expect(screen.getByText('Friday')).toBeTruthy()
  })

  it('displays appointment configuration options', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('clinic-001')).toBeTruthy()
    expect(screen.getByText('clinic-002')).toBeTruthy()
    expect(screen.getByText('clinic-003')).toBeTruthy()
    expect(screen.getByText('clinic-004')).toBeTruthy()
    expect(screen.getByText('clinic-005')).toBeTruthy()
  })

  it('displays summary cards with calculations', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Total Slots')).toBeTruthy()
    expect(screen.getByText('Total Capacity')).toBeTruthy()
    expect(screen.getByText('Slot Duration')).toBeTruthy()
  })

  it('allows day selection and updates display', () => {
    render(<CalculateAvailable />)
    const tuesdayButton = screen.getByText('Tuesday')
    fireEvent.click(tuesdayButton)
    expect(screen.getByText('Tuesday Schedule Details')).toBeTruthy()
  })

  it('displays available time slots', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Available Time Slots')).toBeTruthy()
    // Check that slots are rendered (at least one should be visible)
    const availableBadges = screen.getAllByText('Available')
    expect(availableBadges.length).toBeGreaterThan(0)
  })

  it('updates calculations when configuration changes', () => {
    render(<CalculateAvailable />)
    const clinic002Button = screen.getByText('clinic-002')
    fireEvent.click(clinic002Button)
    // After clicking, the component should still display calculation summary
    expect(screen.getByText('Calculation Summary')).toBeTruthy()
  })

  it('displays schedule details with operating hours', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Opens')).toBeTruthy()
    expect(screen.getByText('Closes')).toBeTruthy()
  })

  it('shows capacity information for slots', () => {
    render(<CalculateAvailable />)
    const capacityElements = screen.getAllByText(/Capacity:/)
    expect(capacityElements.length).toBeGreaterThan(0)
  })

  it('displays calculation summary with all parameters', () => {
    render(<CalculateAvailable />)
    expect(screen.getByText('Appointment Duration')).toBeTruthy()
    expect(screen.getByText('Buffer Time')).toBeTruthy()
    expect(screen.getByText('Concurrent Patients')).toBeTruthy()
    expect(screen.getByText('Total Appointments')).toBeTruthy()
  })
})
