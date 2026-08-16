import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RoutingOfRental from './RoutingOfRental'

describe('RoutingOfRental', () => {
  it('renders without crashing', () => {
    render(<RoutingOfRental />)
    expect(document.body).toBeTruthy()
  })

  it('displays rental request routing header', () => {
    render(<RoutingOfRental />)
    expect(screen.getByText('Rental Request Routing')).toBeTruthy()
  })

  it('displays mock rental requests', () => {
    render(<RoutingOfRental />)
    expect(screen.getByText('REQ-001')).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Excavator 320D')).toBeTruthy()
  })

  it('displays depot staff members', () => {
    render(<RoutingOfRental />)
    expect(screen.getByText('Depot Staff')).toBeTruthy()
    expect(screen.getByText('Patricia Lee')).toBeTruthy()
    expect(screen.getByText('James Taylor')).toBeTruthy()
    expect(screen.getByText('Maria Garcia')).toBeTruthy()
  })

  it('displays statistics dashboard', () => {
    render(<RoutingOfRental />)
    expect(screen.getByText('Pending Requests')).toBeTruthy()
    expect(screen.getByText('Assigned Today')).toBeTruthy()
    expect(screen.getByText('Available Staff')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RoutingOfRental />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="routingofrental"]')).toBeTruthy()
    
    // Filter selects
    expect(document.querySelector('[data-testid="routingofrental-filter-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="routingofrental-filter-priority"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="routingofrental-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="routingofrental-staff-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="routingofrental-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    const staffItems = document.querySelectorAll('[data-testid="routingofrental-staff-item"]')
    expect(staffItems.length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="routingofrental-select"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="routingofrental-autoroute"]')).toBeTruthy()
  })
})
