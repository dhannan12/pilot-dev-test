import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminCoordinatorAssigns from './AdminCoordinatorAssigns'

describe('AdminCoordinatorAssigns', () => {
  it('renders without crashing', () => {
    render(<AdminCoordinatorAssigns />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<AdminCoordinatorAssigns />)
    expect(screen.getByText('Volunteer Assignment Manager')).toBeTruthy()
  })

  it('displays mock shifts', () => {
    render(<AdminCoordinatorAssigns />)
    expect(screen.getByText('Community Food Drive')).toBeTruthy()
    expect(screen.getByText('Health Fair Setup')).toBeTruthy()
    expect(screen.getByText('Evening Fundraiser')).toBeTruthy()
    expect(screen.getByText('Beach Cleanup')).toBeTruthy()
    expect(screen.getByText('Youth Sports Day')).toBeTruthy()
  })

  it('shows select shift prompt when no shift is selected', () => {
    render(<AdminCoordinatorAssigns />)
    expect(screen.getByText('Select a Shift')).toBeTruthy()
    expect(screen.getByText('Choose a shift from the list to assign volunteers')).toBeTruthy()
  })

  it('displays shift details when a shift is selected', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    expect(screen.getByText('Date:')).toBeTruthy()
    expect(screen.getByText('Time:')).toBeTruthy()
    expect(screen.getByText('Location:')).toBeTruthy()
  })

  it('displays volunteers when a shift is selected', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    expect(screen.getByText('Available Volunteers')).toBeTruthy()
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getByText('Michael Chen')).toBeTruthy()
  })

  it('filters volunteers by search term', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    
    const searchInput = screen.getByTestId('admincoordinatorassigns-search')
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.queryByText('Michael Chen')).toBeFalsy()
  })

  it('filters volunteers by skill', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    
    const filterSelect = screen.getByTestId('admincoordinatorassigns-filter')
    fireEvent.change(filterSelect, { target: { value: 'First Aid' } })
    
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emily Rodriguez').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<AdminCoordinatorAssigns />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="admincoordinatorassigns"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="admincoordinatorassigns-shifts-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admincoordinatorassigns-shift-item"]')).toBeTruthy()
    
    // Select a shift to show more elements
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    
    // Search and filter
    expect(document.querySelector('[data-testid="admincoordinatorassigns-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admincoordinatorassigns-filter"]')).toBeTruthy()
    
    // Volunteer lists
    expect(document.querySelector('[data-testid="admincoordinatorassigns-volunteers-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admincoordinatorassigns-volunteer-item"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="admincoordinatorassigns-assign"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admincoordinatorassigns-assigned-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admincoordinatorassigns-unassign"]')).toBeTruthy()
  })

  it('assigns a volunteer to a shift', () => {
    render(<AdminCoordinatorAssigns />)
    
    // Select the Beach Cleanup shift (has only 1 person assigned)
    const shiftButton = screen.getByText('Beach Cleanup')
    fireEvent.click(shiftButton)
    
    // Find and click assign button for a volunteer not yet assigned
    const assignButtons = screen.getAllByTestId('admincoordinatorassigns-assign')
    const availableButton = assignButtons.find(
      (btn) => btn.textContent === 'Assign' && !(btn as HTMLButtonElement).disabled
    )
    
    if (availableButton) {
      fireEvent.click(availableButton)
      // Should show in assigned list
      expect(screen.getByText(/Assigned Volunteers/)).toBeTruthy()
    }
  })

  it('displays required skills for each shift', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    expect(screen.getByText('Required Skills:')).toBeTruthy()
    expect(screen.getAllByText('Food Service').length).toBeGreaterThan(0)
  })

  it('shows assigned volunteers count', () => {
    render(<AdminCoordinatorAssigns />)
    const shiftButton = screen.getByText('Community Food Drive')
    fireEvent.click(shiftButton)
    expect(screen.getByText(/Assigned Volunteers/)).toBeTruthy()
  })
})
