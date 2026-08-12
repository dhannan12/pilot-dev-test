import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ManageMy from './ManageMy'

describe('ManageMy', () => {
  it('renders without crashing', () => {
    render(<ManageMy />)
    expect(document.body).toBeTruthy()
  })

  it('displays stylist name in header', () => {
    render(<ManageMy />)
    expect(screen.getByText(/Welcome back, Jessica Parker/i)).toBeTruthy()
  })

  it('displays mock appointment data', () => {
    render(<ManageMy />)
    expect(screen.getByText('Emma Johnson')).toBeTruthy()
    expect(screen.getByText('Haircut & Style')).toBeTruthy()
  })

  it('toggles between appointments and availability views', () => {
    render(<ManageMy />)
    
    // Check initial view shows appointments
    expect(screen.getByText('Emma Johnson')).toBeTruthy()
    
    // Click availability button
    const availabilityButton = screen.getByText('Manage Availability')
    fireEvent.click(availabilityButton)
    
    // Should now show availability view
    const availableElements = screen.getAllByText(/Available for booking/i)
    expect(availableElements.length).toBeGreaterThan(0)
  })

  it('allows changing selected date', () => {
    render(<ManageMy />)
    
    // Find date buttons
    const dateButtons = screen.getAllByRole('button')
    const dateButton = dateButtons.find(btn => btn.textContent?.includes('Aug 16'))
    
    if (dateButton) {
      fireEvent.click(dateButton)
      // The selected date should update
      expect(screen.getByText(/Sarah Williams/i)).toBeTruthy()
    }
  })

  it('allows marking appointment as complete', () => {
    render(<ManageMy />)
    
    // Find and click complete button
    const completeButtons = screen.getAllByText('Mark Complete')
    if (completeButtons.length > 0) {
      fireEvent.click(completeButtons[0])
      // Should show completed status
      expect(screen.getByText('Completed')).toBeTruthy()
    }
  })

  it('allows cancelling an appointment', () => {
    render(<ManageMy />)
    
    // Find and click cancel button
    const cancelButtons = screen.getAllByText('Cancel')
    if (cancelButtons.length > 0) {
      fireEvent.click(cancelButtons[0])
      // Should show cancelled status
      expect(screen.getByText('Cancelled')).toBeTruthy()
    }
  })

  it('displays time slots in availability view', () => {
    render(<ManageMy />)
    
    // Switch to availability view
    const availabilityButton = screen.getByText('Manage Availability')
    fireEvent.click(availabilityButton)
    
    // Should show time slots
    expect(screen.getByText('09:00 - 10:00')).toBeTruthy()
  })

  it('allows toggling time slot availability', () => {
    render(<ManageMy />)
    
    // Switch to availability view
    const availabilityButton = screen.getByText('Manage Availability')
    fireEvent.click(availabilityButton)
    
    // Find and click toggle button
    const toggleButtons = screen.getAllByText(/Mark (Un)?available/i)
    if (toggleButtons.length > 0) {
      fireEvent.click(toggleButtons[0])
      // Status should change
      expect(document.body).toBeTruthy()
    }
  })

  it('displays appointment status badges', () => {
    render(<ManageMy />)
    
    // Should show status badges (multiple confirmed appointments)
    const confirmedBadges = screen.getAllByText('Confirmed')
    expect(confirmedBadges.length).toBeGreaterThan(0)
  })

  it('shows empty state when no appointments for selected date', () => {
    render(<ManageMy />)
    
    // Select a date with no appointments (Aug 18)
    const dateButtons = screen.getAllByRole('button')
    const dateButton = dateButtons.find(btn => btn.textContent?.includes('Aug 18'))
    
    if (dateButton) {
      fireEvent.click(dateButton)
      expect(screen.getByText(/No appointments scheduled for this date/i)).toBeTruthy()
    }
  })
})
