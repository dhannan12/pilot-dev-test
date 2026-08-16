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
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
    expect(screen.getByText('Authentication & RBAC System')).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-login')).toBeTruthy()
  })

  it('displays mock users in the table', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText('manager_jane')).toBeTruthy()
    expect(screen.getByText('member_john')).toBeTruthy()
    expect(screen.getByText('guest_sarah')).toBeTruthy()
    expect(screen.getByText('member_mike')).toBeTruthy()
    expect(screen.getByText('All Users')).toBeTruthy()
  })

  it('allows user login with valid username', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)

    expect(screen.getByText(/Logged in as: admin/)).toBeTruthy()
  })

  it('shows error for invalid username', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    fireEvent.change(usernameInput, { target: { value: 'invalid_user' } })
    fireEvent.click(loginButton)

    expect(screen.getByText('User not found')).toBeTruthy()
  })

  it('allows user logout', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    // Login first
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)

    // Then logout
    const logoutButton = screen.getByTestId('implementauthentication-logout')
    fireEvent.click(logoutButton)

    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
  })

  it('performs permission check', () => {
    render(<ImplementAuthentication />)
    const usernameInput = screen.getByTestId('implementauthentication-username') as HTMLInputElement
    const loginButton = screen.getByTestId('implementauthentication-login')

    // Login
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)

    // Check access
    const checkButton = screen.getByTestId('implementauthentication-checkaccess')
    fireEvent.click(checkButton)

    expect(screen.getByText(/Access granted/)).toBeTruthy()
  })

  it('displays role permissions matrix', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText('Role Permissions Matrix')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementAuthentication />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="implementauthentication"]')).toBeTruthy()
    
    // Verify inputs
    expect(document.querySelector('[data-testid="implementauthentication-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-permission"]')).toBeTruthy()
    
    // Verify buttons
    expect(document.querySelector('[data-testid="implementauthentication-login"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-checkaccess"]')).toBeTruthy()
    
    // Verify list elements
    expect(document.querySelector('[data-testid="implementauthentication-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-item"]')).toBeTruthy()
  })
})
