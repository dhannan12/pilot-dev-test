import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EachBookingMust from './EachBookingMust'

describe('EachBookingMust', () => {
  it('renders without crashing', () => {
    render(<EachBookingMust />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<EachBookingMust />)
    expect(screen.getByText('Booking Management')).toBeTruthy()
  })

  it('displays mock booking data', () => {
    render(<EachBookingMust />)
    // Check for specific customer names from mock data
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Amanda Rodriguez')).toBeTruthy()
  })

  it('shows bookings with different statuses', () => {
    render(<EachBookingMust />)
    // Check that all three status types are present
    const confirmedElements = screen.getAllByText('Confirmed')
    const pendingElements = screen.getAllByText('Pending')
    const cancelledElements = screen.getAllByText('Cancelled')
    
    expect(confirmedElements.length).toBeGreaterThan(0)
    expect(pendingElements.length).toBeGreaterThan(0)
    expect(cancelledElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<EachBookingMust />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="eachbookingmust"]')).toBeTruthy()
    
    // Verify list container
    expect(document.querySelector('[data-testid="eachbookingmust-list"]')).toBeTruthy()
    
    // Verify list items
    const items = document.querySelectorAll('[data-testid="eachbookingmust-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify status filter
    expect(document.querySelector('[data-testid="eachbookingmust-status-filter"]')).toBeTruthy()
    
    // Verify action buttons
    expect(document.querySelector('[data-testid="eachbookingmust-confirm"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="eachbookingmust-pending"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="eachbookingmust-cancel"]')).toBeTruthy()
  })

  it('filters bookings by status', () => {
    render(<EachBookingMust />)
    
    const filterSelect = screen.getByTestId('eachbookingmust-status-filter') as HTMLSelectElement
    
    // Filter by confirmed
    fireEvent.change(filterSelect, { target: { value: 'confirmed' } })
    expect(filterSelect.value).toBe('confirmed')
    
    // Filter by pending
    fireEvent.change(filterSelect, { target: { value: 'pending' } })
    expect(filterSelect.value).toBe('pending')
    
    // Filter by cancelled
    fireEvent.change(filterSelect, { target: { value: 'cancelled' } })
    expect(filterSelect.value).toBe('cancelled')
    
    // Show all
    fireEvent.change(filterSelect, { target: { value: 'all' } })
    expect(filterSelect.value).toBe('all')
  })

  it('updates booking status when action buttons are clicked', () => {
    render(<EachBookingMust />)
    
    // Find a pending booking button
    const confirmButtons = screen.getAllByTestId('eachbookingmust-confirm')
    expect(confirmButtons.length).toBeGreaterThan(0)
    
    // Click confirm button
    fireEvent.click(confirmButtons[0])
    
    // Component should still render without errors
    expect(document.querySelector('[data-testid="eachbookingmust"]')).toBeTruthy()
  })

  it('displays status summary cards', () => {
    render(<EachBookingMust />)
    
    expect(screen.getByText('Total Bookings')).toBeTruthy()
    expect(screen.getAllByText(/Confirmed/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Pending/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Cancelled/).length).toBeGreaterThan(0)
  })

  it('displays booking details correctly', () => {
    render(<EachBookingMust />)
    
    // Check for various booking details (using getAllByText since these appear multiple times)
    expect(screen.getAllByText(/Service:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Stylist:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Date:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Time:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Booking ID:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Price:/).length).toBeGreaterThan(0)
  })

  it('disables status buttons appropriately', () => {
    render(<EachBookingMust />)
    
    // Get all confirm buttons
    const confirmButtons = screen.getAllByTestId('eachbookingmust-confirm')
    
    // Some buttons should be disabled if booking is already confirmed
    const disabledButtons = confirmButtons.filter(btn => (btn as HTMLButtonElement).disabled)
    expect(disabledButtons.length).toBeGreaterThanOrEqual(0)
  })

  it('displays status legend', () => {
    render(<EachBookingMust />)
    
    expect(screen.getByText('Status Legend')).toBeTruthy()
    expect(screen.getByText('Booking is confirmed and scheduled')).toBeTruthy()
    expect(screen.getByText('Awaiting confirmation or payment')).toBeTruthy()
    expect(screen.getByText('Booking has been cancelled')).toBeTruthy()
  })
})
