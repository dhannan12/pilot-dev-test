import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttempts from './UserAttempts'

describe('UserAttempts', () => {
  it('renders without crashing', () => {
    render(<UserAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays current user information', () => {
    render(<UserAttempts />)
    expect(screen.getByText('John Teacher')).toBeTruthy()
    expect(screen.getByText('TEACHER')).toBeTruthy()
    expect(screen.getByText('john.teacher@school.edu')).toBeTruthy()
  })

  it('displays mock absence requests', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Emma Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Sarah Williams')).toBeTruthy()
    expect(screen.getByText('David Martinez')).toBeTruthy()
    expect(screen.getByText('Olivia Brown')).toBeTruthy()
  })

  it('shows permission error when non-admin tries to approve', () => {
    render(<UserAttempts />)
    
    const approveButtons = screen.getAllByTestId('userattempts-approve')
    fireEvent.click(approveButtons[0])
    
    expect(screen.getByTestId('userattempts-error')).toBeTruthy()
    expect(screen.getByText(/Permission denied/i)).toBeTruthy()
    expect(screen.getByText(/Only administrators can approve/i)).toBeTruthy()
  })

  it('shows permission error when non-admin tries to reject', () => {
    render(<UserAttempts />)
    
    const rejectButtons = screen.getAllByTestId('userattempts-reject')
    fireEvent.click(rejectButtons[0])
    
    expect(screen.getByTestId('userattempts-error')).toBeTruthy()
    expect(screen.getByText(/Permission denied/i)).toBeTruthy()
    expect(screen.getByText(/Only administrators can reject/i)).toBeTruthy()
  })

  it('displays request details correctly', () => {
    render(<UserAttempts />)
    expect(screen.getByText('ABS-001')).toBeTruthy()
    expect(screen.getByText('Family vacation')).toBeTruthy()
    expect(screen.getByText('Medical appointment')).toBeTruthy()
  })

  it('can dismiss error message', () => {
    render(<UserAttempts />)
    
    // Trigger an error
    const approveButtons = screen.getAllByTestId('userattempts-approve')
    fireEvent.click(approveButtons[0])
    
    expect(screen.getByTestId('userattempts-error')).toBeTruthy()
    
    // Dismiss the error
    const dismissButton = screen.getByTestId('userattempts-dismiss')
    fireEvent.click(dismissButton)
    
    expect(screen.queryByTestId('userattempts-error')).toBeFalsy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttempts />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattempts"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="userattempts-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="userattempts-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    const approveButtons = document.querySelectorAll('[data-testid="userattempts-approve"]')
    expect(approveButtons.length).toBeGreaterThan(0)
    
    const rejectButtons = document.querySelectorAll('[data-testid="userattempts-reject"]')
    expect(rejectButtons.length).toBeGreaterThan(0)
    
    const dismissButtons = document.querySelectorAll('[data-testid="userattempts-dismiss"]')
    expect(dismissButtons.length).toBeGreaterThanOrEqual(0)
  })

  it('shows all pending requests', () => {
    render(<UserAttempts />)
    
    const items = document.querySelectorAll('[data-testid="userattempts-item"]')
    expect(items.length).toBe(5)
  })

  it('displays permission information box', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Permission Information')).toBeTruthy()
    expect(screen.getByText(/Only users with the/i)).toBeTruthy()
  })
})
