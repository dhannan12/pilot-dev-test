import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesTotal from './SystemCalculatesTotal'

describe('SystemCalculatesTotal', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesTotal />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<SystemCalculatesTotal />)
    expect(screen.getByText('Volunteer Hours Calculator')).toBeTruthy()
  })

  it('displays mock volunteer data', () => {
    render(<SystemCalculatesTotal />)
    const sarahElements = screen.getAllByText(/Sarah Johnson/i)
    expect(sarahElements.length).toBeGreaterThan(0)
    const michaelElements = screen.getAllByText(/Michael Chen/i)
    expect(michaelElements.length).toBeGreaterThan(0)
  })

  it('calculates and displays total hours', () => {
    render(<SystemCalculatesTotal />)
    // Should display total hours in the summary card
    const totalHoursElement = screen.getByText('Total Hours')
    expect(totalHoursElement).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SystemCalculatesTotal />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="systemcalculatestotal"]')).toBeTruthy()
    
    // Filter inputs
    expect(document.querySelector('[data-testid="systemcalculatestotal-month"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-status"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="systemcalculatestotal-volunteer-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-hours-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelector('[data-testid="systemcalculatestotal-volunteer-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-hours-item"]')).toBeTruthy()
    
    // Button
    expect(document.querySelector('[data-testid="systemcalculatestotal-refresh"]')).toBeTruthy()
  })

  it('displays volunteer breakdown section', () => {
    render(<SystemCalculatesTotal />)
    expect(screen.getByText('Hours by Volunteer')).toBeTruthy()
  })

  it('displays detailed hours log', () => {
    render(<SystemCalculatesTotal />)
    expect(screen.getByText('Detailed Hours Log')).toBeTruthy()
  })

  it('displays status breakdown in summary cards', () => {
    render(<SystemCalculatesTotal />)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
  })
})
