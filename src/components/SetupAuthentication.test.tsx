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
    const heading = screen.getByText(/Authentication & RBAC System/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<SetupAuthentication />)
    // Check for at least one user from the mock data
    const adminUser = screen.getByText('admin_user')
    expect(adminUser).toBeTruthy()
  })

  it('displays login form by default', () => {
    render(<SetupAuthentication />)
    const loginButton = screen.getByTestId('setupauthentication-login')
    expect(loginButton).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="setupauthentication"]')).toBeTruthy()
    
    // Verify authentication mode tabs (always visible)
    expect(document.querySelector('[data-testid="setupauthentication-login-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-register-tab"]')).toBeTruthy()
    
    // Verify login form elements (visible by default)
    expect(document.querySelector('[data-testid="setupauthentication-login"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-password"]')).toBeTruthy()
    
    // Verify RBAC tab navigation
    expect(document.querySelector('[data-testid="setupauthentication-users-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-roles-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-permissions-tab"]')).toBeTruthy()
    
    // Verify list containers (users tab is active by default)
    expect(document.querySelector('[data-testid="setupauthentication-user-list"]')).toBeTruthy()
    
    // Verify action buttons
    expect(document.querySelector('[data-testid="setupauthentication-add-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-assign-role"]')).toBeTruthy()
    
    // Verify select dropdowns in role assignment section
    expect(document.querySelector('[data-testid="setupauthentication-select-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-select-role"]')).toBeTruthy()
  })

  it('displays all user list items', () => {
    render(<SetupAuthentication />)
    const userItems = document.querySelectorAll('[data-testid="setupauthentication-user-item"]')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays role assignment section', () => {
    render(<SetupAuthentication />)
    const selectUser = screen.getByTestId('setupauthentication-select-user')
    const selectRole = screen.getByTestId('setupauthentication-select-role')
    expect(selectUser).toBeTruthy()
    expect(selectRole).toBeTruthy()
  })
})
