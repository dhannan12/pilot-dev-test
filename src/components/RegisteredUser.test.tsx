import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUser from './RegisteredUser'

describe('RegisteredUser', () => {
  it('renders without crashing', () => {
    render(<RegisteredUser />)
    expect(document.body).toBeTruthy()
  })

  it('displays player rankings list', () => {
    render(<RegisteredUser />)
    expect(screen.getByText('Rafael Nadal')).toBeTruthy()
    expect(screen.getByText('Roger Federer')).toBeTruthy()
    expect(screen.getByText('Novak Djokovic')).toBeTruthy()
    expect(screen.getByText('Serena Williams')).toBeTruthy()
    expect(screen.getByText('Andy Murray')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUser />)
    // Main wrapper
    expect(document.querySelector('[data-testid="registereduser"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="registereduser-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="registereduser-item"]')
    expect(items.length).toBeGreaterThan(0)
    // Buttons
    expect(document.querySelector('[data-testid="registereduser-view-profile"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registereduser-logout"]')).toBeTruthy()
  })

  it('shows registered user status by default', () => {
    render(<RegisteredUser />)
    expect(screen.getByText('Registered User')).toBeTruthy()
  })

  it('allows viewing player profile when registered', () => {
    render(<RegisteredUser />)
    const viewButtons = screen.getAllByTestId('registereduser-view-profile')
    fireEvent.click(viewButtons[0])
    
    // Should show profile details for registered user
    expect(document.querySelector('[data-testid="registereduser-profile-details"]')).toBeTruthy()
    expect(screen.getByText('Player Profile')).toBeTruthy()
  })

  it('shows access denied for unregistered users', () => {
    render(<RegisteredUser />)
    
    // Switch to unregistered user
    const switchButtons = screen.getAllByTestId('registereduser-switch-user')
    // Find unregistered user (user3 or user5)
    fireEvent.click(switchButtons[2]) // user3 is unregistered
    
    // Try to view profile
    const viewButtons = screen.getAllByTestId('registereduser-view-profile')
    fireEvent.click(viewButtons[0])
    
    // Should show access denied message
    expect(document.querySelector('[data-testid="registereduser-access-denied"]')).toBeTruthy()
    expect(screen.getByText('Access Denied')).toBeTruthy()
  })

  it('allows registration from access denied message', () => {
    render(<RegisteredUser />)
    
    // Switch to unregistered user
    const switchButtons = screen.getAllByTestId('registereduser-switch-user')
    fireEvent.click(switchButtons[2]) // user3 is unregistered
    
    // Try to view profile to trigger access denied
    const viewButtons = screen.getAllByTestId('registereduser-view-profile')
    fireEvent.click(viewButtons[0])
    
    // Click register button
    const registerButton = screen.getByTestId('registereduser-register')
    fireEvent.click(registerButton)
    
    // Should now show registered user status
    expect(screen.getByText('Registered User')).toBeTruthy()
  })

  it('allows logout and login', () => {
    render(<RegisteredUser />)
    
    // Logout
    const logoutButton = screen.getByTestId('registereduser-logout')
    fireEvent.click(logoutButton)
    
    // Should show login button
    expect(screen.getByTestId('registereduser-login')).toBeTruthy()
    expect(screen.getByText('Please Log In')).toBeTruthy()
    
    // Login
    const loginButton = screen.getByTestId('registereduser-login')
    fireEvent.click(loginButton)
    
    // Should be logged in again
    expect(screen.getByTestId('registereduser-logout')).toBeTruthy()
  })

  it('closes player profile when close button is clicked', () => {
    render(<RegisteredUser />)
    
    // View a profile
    const viewButtons = screen.getAllByTestId('registereduser-view-profile')
    fireEvent.click(viewButtons[0])
    
    // Profile should be visible
    expect(document.querySelector('[data-testid="registereduser-profile-details"]')).toBeTruthy()
    
    // Close profile
    const closeButton = screen.getByTestId('registereduser-close-profile')
    fireEvent.click(closeButton)
    
    // Profile should be hidden
    expect(document.querySelector('[data-testid="registereduser-profile-details"]')).toBeFalsy()
  })

  it('displays player statistics in profile', () => {
    render(<RegisteredUser />)
    
    // View first player profile (Rafael Nadal)
    const viewButtons = screen.getAllByTestId('registereduser-view-profile')
    fireEvent.click(viewButtons[0])
    
    // Check statistics are displayed
    expect(screen.getByText('Match Statistics')).toBeTruthy()
    expect(screen.getByText('Matches Won:')).toBeTruthy()
    expect(screen.getByText('Matches Lost:')).toBeTruthy()
  })
})
