import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUserSchedules from './RegisteredUserSchedules'

describe('RegisteredUserSchedules', () => {
  it('renders without crashing', () => {
    render(<RegisteredUserSchedules />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<RegisteredUserSchedules />)
    
    // Check for form title
    expect(screen.getByText('Schedule an Appointment')).toBeTruthy()
    expect(screen.getByText('New Appointment')).toBeTruthy()
    
    // Check for appointment history
    expect(screen.getByText('Your Appointments')).toBeTruthy()
    
    // Check for mock services in dropdown
    const plumbingElements = screen.getAllByText(/Plumbing Repair/)
    expect(plumbingElements.length).toBeGreaterThan(0)
    
    // Check for mock tradespeople
    const johnSmithElements = screen.getAllByText(/John Smith/)
    expect(johnSmithElements.length).toBeGreaterThan(0)
    
    // Check for existing appointments
    expect(screen.getByText('Fix kitchen sink leak')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUserSchedules />)
    
    // Verify main wrapper
    expect(screen.getByTestId('registereduserschedules')).toBeTruthy()
    
    // Verify form fields
    expect(screen.getByTestId('registereduserschedules-service')).toBeTruthy()
    expect(screen.getByTestId('registereduserschedules-tradesperson')).toBeTruthy()
    expect(screen.getByTestId('registereduserschedules-date')).toBeTruthy()
    expect(screen.getByTestId('registereduserschedules-notes')).toBeTruthy()
    
    // Verify time slots
    const timeSlots = screen.getAllByTestId('registereduserschedules-timeslot')
    expect(timeSlots.length).toBeGreaterThan(0)
    
    // Verify submit button
    expect(screen.getByTestId('registereduserschedules-submit')).toBeTruthy()
    
    // Verify appointment list
    expect(screen.getByTestId('registereduserschedules-list')).toBeTruthy()
    
    // Verify appointment items
    const items = screen.getAllByTestId('registereduserschedules-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // Verify action buttons on scheduled appointments
    expect(screen.getAllByTestId('registereduserschedules-reschedule').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('registereduserschedules-cancel').length).toBeGreaterThan(0)
  })
})
