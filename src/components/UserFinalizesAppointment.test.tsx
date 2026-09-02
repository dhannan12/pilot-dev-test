import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserFinalizesAppointment from './UserFinalizesAppointment'

describe('UserFinalizesAppointment', () => {
  it('renders without crashing', () => {
    render(<UserFinalizesAppointment />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UserFinalizesAppointment />)
    expect(screen.getByText('Finalize Appointment')).toBeTruthy()
  })

  it('displays mock appointment data', () => {
    render(<UserFinalizesAppointment />)
    // Check for at least one appointment service (may appear multiple times)
    expect(screen.getAllByText('Kitchen Renovation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bathroom Plumbing Repair').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Electrical Panel Upgrade').length).toBeGreaterThan(0)
  })

  it('displays unconfirmed details list', () => {
    render(<UserFinalizesAppointment />)
    // Check for unconfirmed items from the first appointment
    expect(screen.getByText('Payment method')).toBeTruthy()
    expect(screen.getByText('Access instructions')).toBeTruthy()
  })

  it('displays warning about unconfirmed details', () => {
    render(<UserFinalizesAppointment />)
    expect(screen.getByText(/attempting to finalize this appointment without confirming/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserFinalizesAppointment />)
    
    // Main wrapper
    expect(screen.getByTestId('user-finalizes-appointment')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('user-finalizes-appointment-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('user-finalizes-appointment-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Warning element
    expect(screen.getByTestId('user-finalizes-appointment-warning')).toBeTruthy()
    
    // Action buttons
    expect(screen.getByTestId('user-finalizes-appointment-go-back')).toBeTruthy()
    expect(screen.getByTestId('user-finalizes-appointment-proceed')).toBeTruthy()
    
    // Unconfirmed list
    expect(screen.getByTestId('user-finalizes-appointment-unconfirmed-list')).toBeTruthy()
    
    // Unconfirmed items
    const unconfirmedItems = screen.getAllByTestId('user-finalizes-appointment-unconfirmed-item')
    expect(unconfirmedItems.length).toBeGreaterThan(0)
  })

  it('allows user to select different appointments', () => {
    render(<UserFinalizesAppointment />)
    
    const items = screen.getAllByTestId('user-finalizes-appointment-item')
    // Click the second appointment
    fireEvent.click(items[1])
    
    // Should display the second appointment's details (appears in list and summary)
    expect(screen.getAllByText('Bathroom Plumbing Repair').length).toBeGreaterThan(0)
  })

  it('shows proceed anyway button interaction', () => {
    render(<UserFinalizesAppointment />)
    
    const proceedButton = screen.getByTestId('user-finalizes-appointment-proceed')
    fireEvent.click(proceedButton)
    
    // After proceeding, should show confirmation
    expect(screen.getByText(/Appointment Finalized/i)).toBeTruthy()
  })

  it('displays appointment summary details', () => {
    render(<UserFinalizesAppointment />)
    
    expect(screen.getByText('Appointment Summary')).toBeTruthy()
    expect(screen.getByText('Service:')).toBeTruthy()
    expect(screen.getByText('Tradesperson:')).toBeTruthy()
    expect(screen.getByText('Date:')).toBeTruthy()
    expect(screen.getByText('Time:')).toBeTruthy()
    expect(screen.getByText('Location:')).toBeTruthy()
    expect(screen.getByText('Price:')).toBeTruthy()
  })

  it('displays at least 5 mock appointments', () => {
    render(<UserFinalizesAppointment />)
    
    const items = screen.getAllByTestId('user-finalizes-appointment-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('shows done button after finalization', () => {
    render(<UserFinalizesAppointment />)
    
    // Click proceed anyway
    const proceedButton = screen.getByTestId('user-finalizes-appointment-proceed')
    fireEvent.click(proceedButton)
    
    // Done button should be visible
    expect(screen.getByTestId('user-finalizes-appointment-done')).toBeTruthy()
  })
})
