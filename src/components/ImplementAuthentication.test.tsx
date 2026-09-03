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
    expect(screen.getByText(/Salon Authentication/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementAuthentication />)
    // Main wrapper
    expect(document.querySelector('[data-testid="implementauthentication"]')).toBeTruthy()
    // Login form inputs
    expect(document.querySelector('[data-testid="implementauthentication-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-password"]')).toBeTruthy()
    // Submit button
    expect(document.querySelector('[data-testid="implementauthentication-submit"]')).toBeTruthy()
    // Quick login buttons
    expect(document.querySelector('[data-testid="implementauthentication-quick-admin"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-quick-customer"]')).toBeTruthy()
  })

  it('displays error message for invalid credentials', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username')
    const passwordInput = screen.getByTestId('implementauthentication-password')
    const submitButton = screen.getByTestId('implementauthentication-submit')

    fireEvent.change(usernameInput, { target: { value: 'invalid' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(submitButton)

    expect(screen.getByTestId('implementauthentication-error')).toBeTruthy()
  })

  it('logs in successfully with valid credentials', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username')
    const passwordInput = screen.getByTestId('implementauthentication-password')
    const submitButton = screen.getByTestId('implementauthentication-submit')

    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(submitButton)

    // Should display user info after login
    expect(screen.getByText(/Admin User/i)).toBeTruthy()
  })

  it('quick login works for admin role', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    
    fireEvent.click(adminButton)

    // Should display authenticated view
    expect(screen.getByText(/Admin User/i)).toBeTruthy()
    const adminBadges = screen.getAllByText(/ADMIN/i)
    expect(adminBadges.length).toBeGreaterThan(0)
  })

  it('quick login works for customer role', () => {
    render(<ImplementAuthentication />)
    const customerButton = screen.getByTestId('implementauthentication-quick-customer')
    
    fireEvent.click(customerButton)

    // Should display authenticated view
    expect(screen.getByText(/John Doe/i)).toBeTruthy()
    const customerElements = screen.getAllByText(/CUSTOMER/i)
    expect(customerElements.length).toBeGreaterThan(0)
  })

  it('displays permissions list for authenticated user', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    
    fireEvent.click(adminButton)

    // Should display permissions
    expect(screen.getByText(/Your Permissions/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="implementauthentication-item"]').length).toBeGreaterThan(0)
  })

  it('toggles permission details', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    fireEvent.click(adminButton)

    const toggleButton = screen.getByTestId('implementauthentication-toggle-permissions')
    expect(toggleButton).toBeTruthy()
    
    // Click to show details
    fireEvent.click(toggleButton)
    expect(screen.getByText(/Can view all booking records/i)).toBeTruthy()
  })

  it('displays role-based access control section', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    fireEvent.click(adminButton)

    expect(screen.getByText(/Role-Based Access Control/i)).toBeTruthy()
    const manageUsers = screen.getAllByText(/Manage Users/i)
    expect(manageUsers.length).toBeGreaterThan(0)
    const viewReports = screen.getAllByText(/View Reports/i)
    expect(viewReports.length).toBeGreaterThan(0)
  })

  it('shows different permissions for different roles', () => {
    const { rerender } = render(<ImplementAuthentication />)
    
    // Login as admin
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    fireEvent.click(adminButton)
    
    // Admin should see "Allowed" for Manage Users
    const allowedElements = screen.getAllByText(/✓ Allowed/i)
    expect(allowedElements.length).toBeGreaterThan(0)
    
    // Logout
    const logoutButton = screen.getByTestId('implementauthentication-logout')
    fireEvent.click(logoutButton)
    
    // Login as customer
    const customerButton = screen.getByTestId('implementauthentication-quick-customer')
    fireEvent.click(customerButton)
    
    // Customer should see "Denied" for Manage Users
    const deniedElements = screen.getAllByText(/✗ Denied/i)
    expect(deniedElements.length).toBeGreaterThan(0)
  })

  it('logout button works correctly', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    fireEvent.click(adminButton)

    // Should be authenticated
    expect(screen.getByText(/Admin User/i)).toBeTruthy()
    
    const logoutButton = screen.getByTestId('implementauthentication-logout')
    fireEvent.click(logoutButton)

    // Should return to login screen
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeTruthy()
  })

  it('displays session information', () => {
    render(<ImplementAuthentication />)
    const adminButton = screen.getByTestId('implementauthentication-quick-admin')
    fireEvent.click(adminButton)

    expect(screen.getByText(/Session Information/i)).toBeTruthy()
    expect(screen.getByText(/User ID/i)).toBeTruthy()
    expect(screen.getByText(/Username/i)).toBeTruthy()
    const tokenElements = screen.getAllByText(/Token/i)
    expect(tokenElements.length).toBeGreaterThan(0)
  })

  it('displays all mock users in quick login', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByTestId('implementauthentication-quick-admin')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-quick-manager')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-quick-stylist')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-quick-customer')).toBeTruthy()
  })
})
