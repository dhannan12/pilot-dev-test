import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText(/Authentication & User Registration Setup/i)).toBeTruthy()
  })

  it('renders the user registration form', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText(/User Registration Form/i)).toBeTruthy()
    expect(screen.getByLabelText(/Full Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
  })

  it('displays mock registered users', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText(/Recently Registered/i)).toBeTruthy()
    expect(screen.getByText(/James Wilson/i)).toBeTruthy()
    expect(screen.getByText(/Sarah Martinez/i)).toBeTruthy()
    expect(screen.getByText(/Michael Chen/i)).toBeTruthy()
  })

  it('displays available user roles', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText(/Available User Roles/i)).toBeTruthy()
    // Verify we have all 5 user roles displayed
    const roleItems = document.querySelectorAll('[data-testid="setupauthentication-role-item"]')
    expect(roleItems.length).toBe(5)
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupauthentication"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="setupauthentication-fullname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-confirmpassword"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-role"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="setupauthentication-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-toggle-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-toggle-confirmpassword"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="setupauthentication-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="setupauthentication-item"]').length).toBeGreaterThan(0)
    expect(document.querySelector('[data-testid="setupauthentication-roles-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="setupauthentication-role-item"]').length).toBeGreaterThan(0)
  })

  it('renders minimum 5 mock registered users', () => {
    render(<SetupAuthentication />)
    const userItems = document.querySelectorAll('[data-testid="setupauthentication-item"]')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })

  it('renders minimum 5 user roles', () => {
    render(<SetupAuthentication />)
    const roleItems = document.querySelectorAll('[data-testid="setupauthentication-role-item"]')
    expect(roleItems.length).toBeGreaterThanOrEqual(5)
  })
})
