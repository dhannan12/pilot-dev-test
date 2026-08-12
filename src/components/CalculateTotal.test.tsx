import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTotal from './CalculateTotal'

describe('CalculateTotal', () => {
  it('renders without crashing', () => {
    render(<CalculateTotal />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<CalculateTotal />)
    expect(screen.getByText('Volunteer Hours Calculator')).toBeTruthy()
  })

  it('displays total hours calculated from shifts', () => {
    render(<CalculateTotal />)
    const totalHoursElements = screen.getAllByText('Total Hours')
    expect(totalHoursElements.length).toBeGreaterThan(0)
  })

  it('displays total shifts count', () => {
    render(<CalculateTotal />)
    const totalShiftsElements = screen.getAllByText('Total Shifts')
    expect(totalShiftsElements.length).toBeGreaterThan(0)
  })

  it('displays volunteer statistics table', () => {
    render(<CalculateTotal />)
    expect(screen.getByText('Volunteer Statistics')).toBeTruthy()
    expect(screen.getByText('Volunteer Name')).toBeTruthy()
  })

  it('displays shift details section', () => {
    render(<CalculateTotal />)
    expect(screen.getByText('Shift Details')).toBeTruthy()
  })

  it('displays mock volunteer names', () => {
    render(<CalculateTotal />)
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mike Chen').length).toBeGreaterThan(0)
  })

  it('displays filter dropdown', () => {
    render(<CalculateTotal />)
    expect(screen.getByText('Filter by Volunteer')).toBeTruthy()
    const select = screen.getByLabelText('Filter by Volunteer')
    expect(select).toBeTruthy()
  })

  it('displays average hours per shift', () => {
    render(<CalculateTotal />)
    expect(screen.getByText('Average Hours/Shift')).toBeTruthy()
  })

  it('displays shift duration information', () => {
    render(<CalculateTotal />)
    // Check for "hours" text which appears in shift durations
    const hoursElements = screen.getAllByText(/hours/)
    expect(hoursElements.length).toBeGreaterThan(0)
  })
})
