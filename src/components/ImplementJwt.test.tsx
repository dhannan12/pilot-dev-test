import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementJwt from './ImplementJwt'

describe('ImplementJwt', () => {
  it('renders without crashing', () => {
    render(<ImplementJwt />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form when not authenticated', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('JWT Authentication')).toBeTruthy()
    expect(screen.getByText('Sign in with your credentials')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter password')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementJwt />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="implementjwt"]')).toBeTruthy()
    
    // Login form inputs
    expect(document.querySelector('[data-testid="implementjwt-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementjwt-password"]')).toBeTruthy()
    
    // Login button
    expect(document.querySelector('[data-testid="implementjwt-login"]')).toBeTruthy()
  })

  it('shows error message for empty credentials', () => {
    render(<ImplementJwt />)
    
    const loginButton = screen.getByTestId('implementjwt-login')
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Username and password are required')).toBeTruthy()
  })

  it('successfully logs in with valid credentials', () => {
    render(<ImplementJwt />)
    
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // After login, should show logout button and JWT token info
    expect(screen.getByTestId('implementjwt-logout')).toBeTruthy()
    expect(screen.getByText('JWT Token')).toBeTruthy()
  })

  it('displays JWT token information after login', () => {
    render(<ImplementJwt />)
    
    // Login first
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Check for JWT token section
    expect(screen.getByText('JWT Token')).toBeTruthy()
    expect(screen.getByText('Role-Based Permissions')).toBeTruthy()
  })

  it('displays user list with data-testid attributes after login', () => {
    render(<ImplementJwt />)
    
    // Login first
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Check for user list
    expect(document.querySelector('[data-testid="implementjwt-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="implementjwt-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows admin actions for admin role', () => {
    render(<ImplementJwt />)
    
    // Login as admin
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Check for admin action buttons
    expect(document.querySelector('[data-testid="implementjwt-refresh"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementjwt-revoke"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementjwt-audit"]')).toBeTruthy()
  })

  it('logs out successfully', () => {
    render(<ImplementJwt />)
    
    // Login first
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Now logout
    const logoutButton = screen.getByTestId('implementjwt-logout')
    fireEvent.click(logoutButton)
    
    // Should be back to login screen
    expect(screen.getByText('Sign in with your credentials')).toBeTruthy()
  })

  it('displays different permissions for different roles', () => {
    render(<ImplementJwt />)
    
    // Login as guest (limited permissions)
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'guest_visitor' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Guest should have limited permissions
    expect(screen.getByText('GUEST')).toBeTruthy()
    expect(screen.getByText('Role-Based Permissions')).toBeTruthy()
  })

  it('displays all mock users', () => {
    render(<ImplementJwt />)
    
    // Login to see user list
    const usernameInput = screen.getByTestId('implementjwt-username')
    const passwordInput = screen.getByTestId('implementjwt-password')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Should show at least 5 users
    const userItems = document.querySelectorAll('[data-testid="implementjwt-item"]')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })
})
