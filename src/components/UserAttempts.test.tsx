import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttempts from './UserAttempts'

describe('UserAttempts', () => {
  it('renders without crashing', () => {
    render(<UserAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main component wrapper', () => {
    render(<UserAttempts />)
    const wrapper = screen.getByTestId('userattempts')
    expect(wrapper).toBeTruthy()
  })

  it('displays current user information', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Current User')).toBeTruthy()
    expect(screen.getAllByText('john.doe').length).toBeGreaterThan(0)
    expect(screen.getByText('john.doe@example.com')).toBeTruthy()
  })

  it('displays attempt access button', () => {
    render(<UserAttempts />)
    const button = screen.getByTestId('userattempts-access')
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Attempt Staff Access')
  })

  it('shows access denied message when attempting access', () => {
    render(<UserAttempts />)
    const button = screen.getByTestId('userattempts-access')
    fireEvent.click(button)
    
    expect(screen.getByText('Access Denied')).toBeTruthy()
    expect(screen.getByText(/You do not have sufficient privileges/)).toBeTruthy()
  })

  it('disables the access button after attempting', () => {
    render(<UserAttempts />)
    const button = screen.getByTestId('userattempts-access')
    fireEvent.click(button)
    
    expect(button.textContent).toContain('Access Attempted')
    expect(button).toHaveProperty('disabled', true)
  })

  it('displays list of access attempts', () => {
    render(<UserAttempts />)
    const list = screen.getByTestId('userattempts-list')
    expect(list).toBeTruthy()
    
    const items = screen.getAllByTestId('userattempts-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays mock data for access attempts', () => {
    render(<UserAttempts />)
    expect(screen.getAllByText('john.doe').length).toBeGreaterThan(0)
    expect(screen.getByText('sarah.smith')).toBeTruthy()
    expect(screen.getByText('mike.johnson')).toBeTruthy()
  })

  it('shows view details buttons for each attempt', () => {
    render(<UserAttempts />)
    const viewButtons = screen.getAllByTestId('userattempts-view')
    expect(viewButtons.length).toBeGreaterThanOrEqual(5)
  })

  it('opens modal when view details is clicked', () => {
    render(<UserAttempts />)
    const viewButtons = screen.getAllByTestId('userattempts-view')
    fireEvent.click(viewButtons[0])
    
    const modal = screen.getByTestId('userattempts-modal')
    expect(modal).toBeTruthy()
    expect(screen.getByText('Access Attempt Details')).toBeTruthy()
  })

  it('closes modal when close button is clicked', () => {
    render(<UserAttempts />)
    const viewButtons = screen.getAllByTestId('userattempts-view')
    fireEvent.click(viewButtons[0])
    
    const closeButton = screen.getByTestId('userattempts-close-modal')
    fireEvent.click(closeButton)
    
    expect(screen.queryByTestId('userattempts-modal')).toBeFalsy()
  })

  it('closes modal when close action button is clicked', () => {
    render(<UserAttempts />)
    const viewButtons = screen.getAllByTestId('userattempts-view')
    fireEvent.click(viewButtons[0])
    
    const closeButton = screen.getByTestId('userattempts-close')
    fireEvent.click(closeButton)
    
    expect(screen.queryByTestId('userattempts-modal')).toBeFalsy()
  })

  it('can close access denied alert', () => {
    render(<UserAttempts />)
    const button = screen.getByTestId('userattempts-access')
    fireEvent.click(button)
    
    expect(screen.getByText('Access Denied')).toBeTruthy()
    
    const closeAlert = screen.getByTestId('userattempts-close-alert')
    fireEvent.click(closeAlert)
    
    expect(screen.queryByText('Access Denied')).toBeFalsy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttempts />)
    
    // Main wrapper
    expect(screen.getByTestId('userattempts')).toBeTruthy()
    
    // Access button
    expect(screen.getByTestId('userattempts-access')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('userattempts-list')).toBeTruthy()
    expect(screen.getAllByTestId('userattempts-item').length).toBeGreaterThan(0)
    
    // View buttons
    expect(screen.getAllByTestId('userattempts-view').length).toBeGreaterThan(0)
    
    // Verify at least one data-testid exists
    expect(document.querySelector('[data-testid]')).toBeTruthy()
  })
})
