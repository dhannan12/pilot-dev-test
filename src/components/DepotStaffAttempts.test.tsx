import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DepotStaffAttempts from './DepotStaffAttempts'

describe('DepotStaffAttempts', () => {
  it('renders without crashing', () => {
    render(<DepotStaffAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock booking data', () => {
    render(<DepotStaffAttempts />)
    // Check for booking numbers
    expect(screen.getByText(/RNT-2026-001/i)).toBeTruthy()
    expect(screen.getByText(/RNT-2026-002/i)).toBeTruthy()
    expect(screen.getByText(/RNT-2026-003/i)).toBeTruthy()
    
    // Check for customer names
    expect(screen.getByText(/John Anderson/i)).toBeTruthy()
    expect(screen.getByText(/Sarah Mitchell/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DepotStaffAttempts />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="depotstaffattempts"]')
    expect(mainWrapper).toBeTruthy()
    
    const searchInput = document.querySelector('[data-testid="depotstaffattempts-search"]')
    expect(searchInput).toBeTruthy()
    
    const bookingList = document.querySelector('[data-testid="depotstaffattempts-list"]')
    expect(bookingList).toBeTruthy()
    
    const bookingItems = document.querySelectorAll('[data-testid="depotstaffattempts-item"]')
    expect(bookingItems.length).toBeGreaterThan(0)
  })

  it('displays all booking list items', () => {
    render(<DepotStaffAttempts />)
    
    const bookingItems = document.querySelectorAll('[data-testid="depotstaffattempts-item"]')
    // Should have at least 5 mock bookings as per requirements
    expect(bookingItems.length).toBeGreaterThanOrEqual(5)
  })

  it('shows search functionality', () => {
    render(<DepotStaffAttempts />)
    
    const searchInput = screen.getByTestId('depotstaffattempts-search')
    expect(searchInput).toBeTruthy()
    expect(searchInput.getAttribute('placeholder')).toContain('Search')
  })

  it('displays booking status badges', () => {
    render(<DepotStaffAttempts />)
    
    // Check for different statuses (using getAllByText since there are multiple)
    expect(screen.getAllByText('confirmed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('active').length).toBeGreaterThan(0)
  })

  it('shows equipment information in bookings', () => {
    render(<DepotStaffAttempts />)
    
    expect(screen.getByText(/Excavator CAT 320/i)).toBeTruthy()
    expect(screen.getByText(/Forklift Toyota 8FD25/i)).toBeTruthy()
    expect(screen.getByText(/Generator 50kW/i)).toBeTruthy()
  })
})
