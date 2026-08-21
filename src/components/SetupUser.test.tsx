import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupUser from './SetupUser'

describe('SetupUser', () => {
  it('renders without crashing', () => {
    render(<SetupUser />)
    expect(document.body).toBeTruthy()
  })

  it('displays auth system title and tabs', () => {
    render(<SetupUser />)
    expect(screen.getByText(/Restaurant Auth System/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-tab-login"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-tab-register"]')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupUser />)
    // Main wrapper
    expect(document.querySelector('[data-testid="setupuser"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupuser-tab-login"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-tab-register"]')).toBeTruthy()
    
    // Login form elements (default mode)
    expect(document.querySelector('[data-testid="setupuser-login-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-login-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-login-submit"]')).toBeTruthy()
  })

  it('displays login form by default', () => {
    render(<SetupUser />)
    const usernameInput = document.querySelector('[data-testid="setupuser-login-username"]')
    const passwordInput = document.querySelector('[data-testid="setupuser-login-password"]')
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]')
    
    expect(usernameInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(submitButton).toBeTruthy()
  })

  it('switches to register form when register tab clicked', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    
    fireEvent.click(registerTab)
    
    expect(document.querySelector('[data-testid="setupuser-register-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-register-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-register-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-register-confirm-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-register-role"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-register-submit"]')).toBeTruthy()
  })

  it('shows error when login with empty credentials', () => {
    render(<SetupUser />)
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]') as HTMLElement
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Please enter both username and password/i)).toBeTruthy()
  })

  it('shows error when login with invalid username', () => {
    render(<SetupUser />)
    const usernameInput = document.querySelector('[data-testid="setupuser-login-username"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-login-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'nonexistent' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Invalid username or password/i)).toBeTruthy()
  })

  it('successfully logs in with valid credentials', () => {
    render(<SetupUser />)
    const usernameInput = document.querySelector('[data-testid="setupuser-login-username"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-login-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Welcome back, admin/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-logout"]')).toBeTruthy()
  })

  it('displays user list after login', () => {
    render(<SetupUser />)
    const usernameInput = document.querySelector('[data-testid="setupuser-login-username"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-login-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(submitButton)
    
    expect(document.querySelector('[data-testid="setupuser-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="setupuser-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('logs out successfully', () => {
    render(<SetupUser />)
    const usernameInput = document.querySelector('[data-testid="setupuser-login-username"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-login-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-login-submit"]') as HTMLElement
    
    // Login
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(submitButton)
    
    // Logout
    const logoutButton = document.querySelector('[data-testid="setupuser-logout"]') as HTMLElement
    fireEvent.click(logoutButton)
    
    expect(screen.getByText(/Logged out successfully/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupuser-login-username"]')).toBeTruthy()
  })

  it('validates registration form - empty fields', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const submitButton = document.querySelector('[data-testid="setupuser-register-submit"]') as HTMLElement
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/All fields are required/i)).toBeTruthy()
  })

  it('validates registration form - password too short', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const usernameInput = document.querySelector('[data-testid="setupuser-register-username"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="setupuser-register-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-register-password"]') as HTMLInputElement
    const confirmInput = document.querySelector('[data-testid="setupuser-register-confirm-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-register-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'newuser' } })
    fireEvent.change(emailInput, { target: { value: 'new@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'short' } })
    fireEvent.change(confirmInput, { target: { value: 'short' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeTruthy()
  })

  it('validates registration form - passwords do not match', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const usernameInput = document.querySelector('[data-testid="setupuser-register-username"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="setupuser-register-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-register-password"]') as HTMLInputElement
    const confirmInput = document.querySelector('[data-testid="setupuser-register-confirm-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-register-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'newuser' } })
    fireEvent.change(emailInput, { target: { value: 'new@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'different123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Passwords do not match/i)).toBeTruthy()
  })

  it('successfully registers a new user', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const usernameInput = document.querySelector('[data-testid="setupuser-register-username"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="setupuser-register-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-register-password"]') as HTMLInputElement
    const confirmInput = document.querySelector('[data-testid="setupuser-register-confirm-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-register-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'newuser123' } })
    fireEvent.change(emailInput, { target: { value: 'newuser@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Account created successfully/i)).toBeTruthy()
  })

  it('prevents duplicate username registration', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const usernameInput = document.querySelector('[data-testid="setupuser-register-username"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="setupuser-register-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="setupuser-register-password"]') as HTMLInputElement
    const confirmInput = document.querySelector('[data-testid="setupuser-register-confirm-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="setupuser-register-submit"]') as HTMLElement
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Username already exists/i)).toBeTruthy()
  })

  it('allows role selection in registration', () => {
    render(<SetupUser />)
    const registerTab = document.querySelector('[data-testid="setupuser-tab-register"]') as HTMLElement
    fireEvent.click(registerTab)
    
    const roleSelect = document.querySelector('[data-testid="setupuser-register-role"]') as HTMLSelectElement
    expect(roleSelect).toBeTruthy()
    
    fireEvent.change(roleSelect, { target: { value: 'manager' } })
    expect(roleSelect.value).toBe('manager')
  })
})
