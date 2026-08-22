import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementAuthentication from './ImplementAuthentication'

describe('ImplementAuthentication', () => {
  it('renders without crashing', () => {
    render(<ImplementAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form when not authenticated', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText(/Sign in to access your account/i)).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-username')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-password')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-login')).toBeTruthy()
  })

  it('shows demo accounts information', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText(/Demo Accounts:/i)).toBeTruthy()
    expect(screen.getByText(/admin \/ admin123/i)).toBeTruthy()
  })

  it('handles login with valid credentials', () => {
    render(<ImplementAuthentication />)
    
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const passwordInput = screen.getByTestId('implementauthentication-password') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin123' } })
    fireEvent.click(loginButton)

    // After login, should show logout button and session info
    expect(screen.getByTestId('implementauthentication-logout')).toBeTruthy()
    expect(screen.getByText('Session Information')).toBeTruthy()
  })

  it('shows error message with invalid credentials', () => {
    render(<ImplementAuthentication />)
    
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const passwordInput = screen.getByTestId('implementauthentication-password') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    fireEvent.change(usernameInput, { target: { value: 'invalid' } })
    fireEvent.change(passwordInput, { target: { value: 'wrong' } })
    fireEvent.click(loginButton)

    expect(screen.getByTestId('implementauthentication-error')).toBeTruthy()
    expect(screen.getByText(/Invalid username or password/i)).toBeTruthy()
  })

  it('displays session information after login', () => {
    render(<ImplementAuthentication />)
    
    // Login
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'doctor_smith' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'doctor123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    // Check session info is displayed
    expect(screen.getByText(/Session Information/i)).toBeTruthy()
    expect(screen.getByText('doctor_smith')).toBeTruthy()
  })

  it('displays user permissions after login', () => {
    render(<ImplementAuthentication />)
    
    // Login as admin
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    // Check permissions are displayed
    expect(screen.getByTestId('implementauthentication-permissions-list')).toBeTruthy()
    const permissionItems = screen.getAllByTestId('implementauthentication-permission-item')
    expect(permissionItems.length).toBeGreaterThan(0)
  })

  it('displays protected resources with RBAC', () => {
    render(<ImplementAuthentication />)
    
    // Login
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'patient_john' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'patient123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    // Check protected resources
    expect(screen.getByTestId('implementauthentication-resources-list')).toBeTruthy()
    const resourceItems = screen.getAllByTestId('implementauthentication-resource-item')
    expect(resourceItems.length).toBe(5)
  })

  it('handles logout correctly', () => {
    render(<ImplementAuthentication />)
    
    // Login
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    // Logout
    const logoutButton = screen.getByTestId('implementauthentication-logout')
    fireEvent.click(logoutButton)

    // Should show login form again
    expect(screen.getByTestId('implementauthentication-username')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-login')).toBeTruthy()
  })

  it('shows user management for admin role only', () => {
    render(<ImplementAuthentication />)
    
    // Login as admin
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    // Check user management section
    expect(screen.getByText('(Admin Only)')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-users-list')).toBeTruthy()
    const userItems = screen.getAllByTestId('implementauthentication-user-item')
    expect(userItems.length).toBe(5)
  })

  it('has required data-testid attributes', () => {
    render(<ImplementAuthentication />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('implementauthentication')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-username')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-password')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-login')).toBeTruthy()

    // Login and check authenticated state testids
    fireEvent.change(screen.getByTestId('implementauthentication-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('implementauthentication-password'), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByTestId('implementauthentication-login'))

    expect(screen.getByTestId('implementauthentication-logout')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-permissions-list')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-resources-list')).toBeTruthy()
  })
})
