import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AuthenticationAnd from './AuthenticationAnd'

describe('AuthenticationAnd', () => {
  it('renders without crashing', () => {
    render(<AuthenticationAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form initially', () => {
    render(<AuthenticationAnd />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter password')).toBeTruthy()
  })

  it('displays mock users in test users list', () => {
    render(<AuthenticationAnd />)
    expect(screen.getByText(/Test users:/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AuthenticationAnd />)
    // Main wrapper
    expect(document.querySelector('[data-testid="authenticationand"]')).toBeTruthy()
    // Login form fields
    expect(document.querySelector('[data-testid="authenticationand-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="authenticationand-password"]')).toBeTruthy()
    // Login button
    expect(document.querySelector('[data-testid="authenticationand-login"]')).toBeTruthy()
  })

  it('allows user to login with mock username', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Current User')).toBeTruthy()
    expect(screen.getByText('Logged in as admin_user')).toBeTruthy()
  })

  it('displays user management section after login', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'coach_sarah' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('User Management')).toBeTruthy()
    expect(screen.getByTestId('authenticationand-users-list')).toBeTruthy()
  })

  it('displays logout button when logged in', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByTestId('authenticationand-logout')).toBeTruthy()
  })

  it('allows filtering users by status', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.click(loginButton)
    
    const statusFilter = screen.getByTestId('authenticationand-status-filter') as HTMLSelectElement
    expect(statusFilter).toBeTruthy()
    
    fireEvent.change(statusFilter, { target: { value: 'active' } })
    expect(statusFilter.value).toBe('active')
  })

  it('displays role selection dropdown', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'manager_mike' } })
    fireEvent.click(loginButton)
    
    const roleSelect = screen.getByTestId('authenticationand-role-select') as HTMLSelectElement
    expect(roleSelect).toBeTruthy()
  })

  it('displays permissions for logged in user', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Your Permissions')).toBeTruthy()
    expect(screen.getByTestId('authenticationand-permissions-list')).toBeTruthy()
  })

  it('renders user items in the table', () => {
    render(<AuthenticationAnd />)
    const usernameInput = screen.getByTestId('authenticationand-username') as HTMLInputElement
    const loginButton = screen.getByTestId('authenticationand-login')
    
    fireEvent.change(usernameInput, { target: { value: 'admin_user' } })
    fireEvent.click(loginButton)
    
    const userItems = document.querySelectorAll('[data-testid="authenticationand-user-item"]')
    expect(userItems.length).toBeGreaterThan(0)
  })
})
