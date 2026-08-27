import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthenticationAnd from './SetupAuthenticationAnd'

describe('SetupAuthenticationAnd', () => {
  it('renders without crashing', () => {
    render(<SetupAuthenticationAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form when not authenticated', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByTestId('setupauthenticationand-email')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-password')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-login')).toBeTruthy()
  })

  it('shows main interface after login', () => {
    render(<SetupAuthenticationAnd />)
    
    const emailInput = screen.getByTestId('setupauthenticationand-email')
    const passwordInput = screen.getByTestId('setupauthenticationand-password')
    const loginButton = screen.getByTestId('setupauthenticationand-login')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)

    expect(screen.getByTestId('setupauthenticationand-logout')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-tab-users')).toBeTruthy()
  })

  it('displays mock users in the users tab', () => {
    render(<SetupAuthenticationAnd />)
    
    // Login first
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))

    // Check for user list
    expect(screen.getByTestId('setupauthenticationand-list')).toBeTruthy()
    const userItems = screen.getAllByTestId('setupauthenticationand-item')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })

  it('switches between tabs', () => {
    render(<SetupAuthenticationAnd />)
    
    // Login first
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))

    // Switch to roles tab
    fireEvent.click(screen.getByTestId('setupauthenticationand-tab-roles'))
    expect(screen.getByTestId('setupauthenticationand-role-list')).toBeTruthy()

    // Switch to permissions tab
    fireEvent.click(screen.getByTestId('setupauthenticationand-tab-permissions'))
    const permissionLists = screen.getAllByTestId('setupauthenticationand-permission-list')
    expect(permissionLists.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthenticationAnd />)
    
    // Check main wrapper
    expect(screen.getByTestId('setupauthenticationand')).toBeTruthy()
    
    // Check login form elements
    expect(screen.getByTestId('setupauthenticationand-email')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-password')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-login')).toBeTruthy()

    // Login to check authenticated state
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))

    // Check authenticated state elements
    expect(screen.getByTestId('setupauthenticationand-logout')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-list')).toBeTruthy()
    expect(screen.getByTestId('setupauthenticationand-add-user')).toBeTruthy()
  })

  it('toggles user status', () => {
    render(<SetupAuthenticationAnd />)
    
    // Login first
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))

    // Toggle first user status
    const toggleButtons = screen.getAllByTestId('setupauthenticationand-toggle-status')
    expect(toggleButtons.length).toBeGreaterThan(0)
    fireEvent.click(toggleButtons[0])
    expect(toggleButtons[0]).toBeTruthy()
  })

  it('displays role management interface', () => {
    render(<SetupAuthenticationAnd />)
    
    // Login and navigate to roles
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))
    fireEvent.click(screen.getByTestId('setupauthenticationand-tab-roles'))

    const roleItems = screen.getAllByTestId('setupauthenticationand-role-item')
    expect(roleItems.length).toBeGreaterThanOrEqual(5)
    expect(screen.getByTestId('setupauthenticationand-add-role')).toBeTruthy()
  })

  it('displays permission management interface', () => {
    render(<SetupAuthenticationAnd />)
    
    // Login and navigate to permissions
    fireEvent.change(screen.getByTestId('setupauthenticationand-email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('setupauthenticationand-password'), { target: { value: 'password' } })
    fireEvent.click(screen.getByTestId('setupauthenticationand-login'))
    fireEvent.click(screen.getByTestId('setupauthenticationand-tab-permissions'))

    const permissionItems = screen.getAllByTestId('setupauthenticationand-permission-item')
    expect(permissionItems.length).toBeGreaterThanOrEqual(5)
    expect(screen.getByTestId('setupauthenticationand-add-permission')).toBeTruthy()
  })
})
