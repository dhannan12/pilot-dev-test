import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateAttendancePercentage from './CalculateAttendancePercentage'

describe('CalculateAttendancePercentage', () => {
  it('renders without crashing', () => {
    render(<CalculateAttendancePercentage />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CalculateAttendancePercentage />)
    expect(screen.getByText(/Attendance Percentage Calculator/i)).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<CalculateAttendancePercentage />)
    expect(screen.getAllByText(/Emily Johnson/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Michael Chen/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sarah Williams/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/David Martinez/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Jessica Anderson/i).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CalculateAttendancePercentage />)
    
    // Main wrapper
    expect(screen.getByTestId('calculateattendancepercentage')).toBeTruthy()
    
    // Student select
    expect(screen.getByTestId('calculateattendancepercentage-student')).toBeTruthy()
    
    // Custom calculation inputs
    expect(screen.getByTestId('calculateattendancepercentage-totaldays')).toBeTruthy()
    expect(screen.getByTestId('calculateattendancepercentage-presentdays')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('calculateattendancepercentage-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('calculateattendancepercentage-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('renders all student list items', () => {
    render(<CalculateAttendancePercentage />)
    const items = screen.getAllByTestId('calculateattendancepercentage-item')
    expect(items.length).toBe(6)
  })

  it('displays percentage calculations', () => {
    render(<CalculateAttendancePercentage />)
    // Check for percentage symbols
    const percentages = screen.getAllByText(/%/)
    expect(percentages.length).toBeGreaterThan(0)
  })
})
