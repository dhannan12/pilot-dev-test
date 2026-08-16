import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminCoordinatorAttempts from './AdminCoordinatorAttempts'

describe('AdminCoordinatorAttempts', () => {
  it('renders without crashing', () => {
    render(<AdminCoordinatorAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the scheduling form', () => {
    render(<AdminCoordinatorAttempts />)
    expect(
      screen.getByText('Volunteer Shift Scheduling')
    ).toBeInTheDocument()
    expect(screen.getByText('Schedule New Shift')).toBeInTheDocument()
  })

  it('displays initial scheduled shifts', () => {
    render(<AdminCoordinatorAttempts />)
    expect(screen.getByText(/Scheduled Shifts/)).toBeInTheDocument()
    const sarahElements = screen.getAllByText('Sarah Johnson')
    expect(sarahElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<AdminCoordinatorAttempts />)
    
    // Main wrapper
    expect(
      screen.getByTestId('admincoordinatorattempts')
    ).toBeInTheDocument()
    
    // Form inputs
    expect(
      screen.getByTestId('admincoordinatorattempts-volunteer')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('admincoordinatorattempts-date')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('admincoordinatorattempts-starttime')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('admincoordinatorattempts-endtime')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('admincoordinatorattempts-role')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('admincoordinatorattempts-location')
    ).toBeInTheDocument()
    
    // Submit button
    expect(
      screen.getByTestId('admincoordinatorattempts-submit')
    ).toBeInTheDocument()
    
    // List container
    expect(
      screen.getByTestId('admincoordinatorattempts-list')
    ).toBeInTheDocument()
    
    // List items (at least one)
    const items = screen.getAllByTestId('admincoordinatorattempts-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('validates required fields on submit', () => {
    render(<AdminCoordinatorAttempts />)
    
    const submitButton = screen.getByTestId('admincoordinatorattempts-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
  })

  it('validates end time is after start time', () => {
    render(<AdminCoordinatorAttempts />)
    
    const volunteerSelect = screen.getByTestId(
      'admincoordinatorattempts-volunteer'
    )
    const dateInput = screen.getByTestId('admincoordinatorattempts-date')
    const startTimeInput = screen.getByTestId(
      'admincoordinatorattempts-starttime'
    )
    const endTimeInput = screen.getByTestId(
      'admincoordinatorattempts-endtime'
    )
    const roleInput = screen.getByTestId('admincoordinatorattempts-role')
    const locationInput = screen.getByTestId(
      'admincoordinatorattempts-location'
    )
    const submitButton = screen.getByTestId('admincoordinatorattempts-submit')
    
    fireEvent.change(volunteerSelect, { target: { value: 'v1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-25' } })
    fireEvent.change(startTimeInput, { target: { value: '14:00' } })
    fireEvent.change(endTimeInput, { target: { value: '10:00' } })
    fireEvent.change(roleInput, { target: { value: 'Reception' } })
    fireEvent.change(locationInput, { target: { value: 'Main Office' } })
    
    fireEvent.click(submitButton)
    
    expect(
      screen.getByText('End time must be after start time')
    ).toBeInTheDocument()
  })

  it('detects overlapping shifts', () => {
    render(<AdminCoordinatorAttempts />)
    
    const volunteerSelect = screen.getByTestId(
      'admincoordinatorattempts-volunteer'
    )
    const dateInput = screen.getByTestId('admincoordinatorattempts-date')
    const startTimeInput = screen.getByTestId(
      'admincoordinatorattempts-starttime'
    )
    const endTimeInput = screen.getByTestId(
      'admincoordinatorattempts-endtime'
    )
    const roleInput = screen.getByTestId('admincoordinatorattempts-role')
    const locationInput = screen.getByTestId(
      'admincoordinatorattempts-location'
    )
    const submitButton = screen.getByTestId('admincoordinatorattempts-submit')
    
    // Try to schedule overlapping shift for Sarah Johnson (v1)
    // She has a shift on 2026-08-20 from 09:00 to 13:00
    fireEvent.change(volunteerSelect, { target: { value: 'v1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    fireEvent.change(startTimeInput, { target: { value: '11:00' } })
    fireEvent.change(endTimeInput, { target: { value: '15:00' } })
    fireEvent.change(roleInput, { target: { value: 'Admin Support' } })
    fireEvent.change(locationInput, { target: { value: 'Main Office' } })
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/OVERLAP DETECTED/)).toBeInTheDocument()
  })

  it('successfully schedules non-overlapping shift', () => {
    render(<AdminCoordinatorAttempts />)
    
    const volunteerSelect = screen.getByTestId(
      'admincoordinatorattempts-volunteer'
    )
    const dateInput = screen.getByTestId('admincoordinatorattempts-date')
    const startTimeInput = screen.getByTestId(
      'admincoordinatorattempts-starttime'
    )
    const endTimeInput = screen.getByTestId(
      'admincoordinatorattempts-endtime'
    )
    const roleInput = screen.getByTestId('admincoordinatorattempts-role')
    const locationInput = screen.getByTestId(
      'admincoordinatorattempts-location'
    )
    const submitButton = screen.getByTestId('admincoordinatorattempts-submit')
    
    // Schedule a non-overlapping shift for Sarah Johnson
    fireEvent.change(volunteerSelect, { target: { value: 'v1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-25' } })
    fireEvent.change(startTimeInput, { target: { value: '09:00' } })
    fireEvent.change(endTimeInput, { target: { value: '13:00' } })
    fireEvent.change(roleInput, { target: { value: 'Reception' } })
    fireEvent.change(locationInput, { target: { value: 'Main Office' } })
    
    fireEvent.click(submitButton)
    
    expect(
      screen.getByText(/Shift successfully scheduled/)
    ).toBeInTheDocument()
  })

  it('can delete a shift', () => {
    render(<AdminCoordinatorAttempts />)
    
    const deleteButtons = screen.getAllByTestId(
      'admincoordinatorattempts-delete'
    )
    const initialCount = deleteButtons.length
    
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByText('Shift deleted successfully')).toBeInTheDocument()
    
    const remainingButtons = screen.getAllByTestId(
      'admincoordinatorattempts-delete'
    )
    expect(remainingButtons.length).toBe(initialCount - 1)
  })
})
