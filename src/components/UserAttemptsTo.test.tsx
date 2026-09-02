import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data services', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Find Local Plumbers')).toBeTruthy()
    expect(screen.getByText('Electrician Services')).toBeTruthy()
    expect(screen.getByText('HVAC Specialists')).toBeTruthy()
    expect(screen.getByText('General Contractors')).toBeTruthy()
    expect(screen.getByText('Landscaping Services')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    
    // Location input
    expect(screen.getByTestId('userattemptsto-location')).toBeTruthy()
    
    // Service list and items
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    expect(screen.getAllByTestId('userattemptsto-item').length).toBeGreaterThan(0)
    
    // Access buttons
    expect(screen.getAllByTestId('userattemptsto-access').length).toBeGreaterThan(0)
  })

  it('shows error when accessing service without location', () => {
    render(<UserAttemptsTo />)
    
    // Click first "Access Service" button without entering location
    const accessButtons = screen.getAllByTestId('userattemptsto-access')
    fireEvent.click(accessButtons[0])
    
    // Error should be displayed
    const error = screen.getByTestId('userattemptsto-error')
    expect(error).toBeTruthy()
    expect(error.textContent).toContain('Please provide a valid location')
  })

  it('shows error for invalid location (too short)', () => {
    render(<UserAttemptsTo />)
    
    // Enter very short location
    const locationInput = screen.getByTestId('userattemptsto-location')
    fireEvent.change(locationInput, { target: { value: 'NY' } })
    
    // Try to access service
    const accessButtons = screen.getAllByTestId('userattemptsto-access')
    fireEvent.click(accessButtons[0])
    
    // Error should be displayed
    const error = screen.getByTestId('userattemptsto-error')
    expect(error).toBeTruthy()
    expect(error.textContent).toContain('at least 3 characters')
  })

  it('allows access with valid location', () => {
    // Mock alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UserAttemptsTo />)
    
    // Enter valid location
    const locationInput = screen.getByTestId('userattemptsto-location')
    fireEvent.change(locationInput, { target: { value: 'New York, NY' } })
    
    // Try to access service
    const accessButtons = screen.getAllByTestId('userattemptsto-access')
    fireEvent.click(accessButtons[0])
    
    // Alert should be called (simulating success)
    expect(alertMock).toHaveBeenCalled()
    
    alertMock.mockRestore()
  })

  it('shows clear button when location is entered', () => {
    render(<UserAttemptsTo />)
    
    // Initially, clear button should not exist
    expect(screen.queryByTestId('userattemptsto-clear')).toBeNull()
    
    // Enter location
    const locationInput = screen.getByTestId('userattemptsto-location')
    fireEvent.change(locationInput, { target: { value: 'Boston' } })
    
    // Clear button should now be visible
    expect(screen.getByTestId('userattemptsto-clear')).toBeTruthy()
  })

  it('clears location when clear button is clicked', () => {
    render(<UserAttemptsTo />)
    
    // Enter location
    const locationInput = screen.getByTestId('userattemptsto-location') as HTMLInputElement
    fireEvent.change(locationInput, { target: { value: 'Boston' } })
    expect(locationInput.value).toBe('Boston')
    
    // Click clear button
    const clearButton = screen.getByTestId('userattemptsto-clear')
    fireEvent.click(clearButton)
    
    // Location should be cleared
    expect(locationInput.value).toBe('')
  })

  it('clears error when user starts typing', () => {
    render(<UserAttemptsTo />)
    
    // Trigger error first
    const accessButtons = screen.getAllByTestId('userattemptsto-access')
    fireEvent.click(accessButtons[0])
    expect(screen.getByTestId('userattemptsto-error')).toBeTruthy()
    
    // Start typing
    const locationInput = screen.getByTestId('userattemptsto-location')
    fireEvent.change(locationInput, { target: { value: 'Los Angeles' } })
    
    // Error should be cleared
    expect(screen.queryByTestId('userattemptsto-error')).toBeNull()
  })
})
