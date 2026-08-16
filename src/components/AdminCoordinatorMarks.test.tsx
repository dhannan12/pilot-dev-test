import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminCoordinatorMarks from './AdminCoordinatorMarks'

describe('AdminCoordinatorMarks', () => {
  it('renders without crashing', () => {
    render(<AdminCoordinatorMarks />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title and description', () => {
    render(<AdminCoordinatorMarks />)
    expect(screen.getByText('Volunteer Attendance')).toBeTruthy()
    expect(screen.getByText(/Mark attendance for volunteers/i)).toBeTruthy()
  })

  it('displays mock volunteer data', () => {
    render(<AdminCoordinatorMarks />)
    // Check for first volunteer in shift 1
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('sarah.j@email.com')).toBeTruthy()
    expect(screen.getByText('Team Leader')).toBeTruthy()
  })

  it('displays shift selection dropdown', () => {
    render(<AdminCoordinatorMarks />)
    const shiftSelect = screen.getByTestId('admincoordinatormarks-shift')
    expect(shiftSelect).toBeTruthy()
    expect(shiftSelect.tagName).toBe('SELECT')
  })

  it('has required data-testid attributes', () => {
    render(<AdminCoordinatorMarks />)
    
    // Main wrapper
    expect(screen.getByTestId('admincoordinatormarks')).toBeTruthy()
    
    // Shift selector
    expect(screen.getByTestId('admincoordinatormarks-shift')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('admincoordinatormarks-list')).toBeTruthy()
    const items = screen.getAllByTestId('admincoordinatormarks-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getByTestId('admincoordinatormarks-save')).toBeTruthy()
    expect(screen.getByTestId('admincoordinatormarks-select-all')).toBeTruthy()
  })

  it('displays attendance statistics', () => {
    render(<AdminCoordinatorMarks />)
    // Check for statistics cards by looking for the label + value combination
    expect(screen.getAllByText('Present').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Absent').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Late').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
  })

  it('allows marking volunteer as present', () => {
    render(<AdminCoordinatorMarks />)
    const presentButton = screen.getByTestId('admincoordinatormarks-present-v1')
    fireEvent.click(presentButton)
    // Button should be highlighted after click
    expect(presentButton.classList.contains('bg-green-600')).toBeTruthy()
  })

  it('allows changing shift selection', () => {
    render(<AdminCoordinatorMarks />)
    const shiftSelect = screen.getByTestId('admincoordinatormarks-shift') as HTMLSelectElement
    
    // Change to shift 2
    fireEvent.change(shiftSelect, { target: { value: '2' } })
    expect(shiftSelect.value).toBe('2')
    
    // Should show different volunteers
    expect(screen.getByText('Robert Williams')).toBeTruthy()
  })

  it('allows selecting individual volunteers', () => {
    render(<AdminCoordinatorMarks />)
    const checkbox = screen.getByTestId('admincoordinatormarks-checkbox-v1') as HTMLInputElement
    
    // Initially unchecked
    expect(checkbox.checked).toBe(false)
    
    // Click to select
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })

  it('shows bulk action buttons when volunteers are selected', () => {
    render(<AdminCoordinatorMarks />)
    const checkbox = screen.getByTestId('admincoordinatormarks-checkbox-v1')
    
    // Initially no bulk actions shown
    expect(screen.queryByTestId('admincoordinatormarks-bulk-present')).toBeFalsy()
    
    // Select a volunteer
    fireEvent.click(checkbox)
    
    // Bulk action buttons should appear
    expect(screen.getByTestId('admincoordinatormarks-bulk-present')).toBeTruthy()
    expect(screen.getByTestId('admincoordinatormarks-bulk-absent')).toBeTruthy()
    expect(screen.getByTestId('admincoordinatormarks-bulk-late')).toBeTruthy()
  })

  it('allows select all functionality', () => {
    render(<AdminCoordinatorMarks />)
    const selectAllButton = screen.getByTestId('admincoordinatormarks-select-all')
    
    expect(selectAllButton.textContent).toBe('Select All')
    
    // Click select all
    fireEvent.click(selectAllButton)
    
    // Should show bulk actions
    expect(screen.getByTestId('admincoordinatormarks-bulk-present')).toBeTruthy()
  })

  it('displays attendance rate calculation', () => {
    render(<AdminCoordinatorMarks />)
    expect(screen.getByText(/Attendance Rate:/i)).toBeTruthy()
    expect(screen.getByText(/Total Volunteers:/i)).toBeTruthy()
  })
})
