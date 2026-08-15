import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication & RBAC')).toBeTruthy()
    expect(screen.getByText(/Configure authentication providers/i)).toBeTruthy()
  })

  it('displays authentication providers by default', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Google OAuth')).toBeTruthy()
    expect(screen.getByText('Microsoft Azure AD')).toBeTruthy()
    expect(screen.getByText('Okta SSO')).toBeTruthy()
    expect(screen.getByText('Corporate LDAP')).toBeTruthy()
    expect(screen.getByText('Local Authentication')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupauthentication"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupauthentication-tab-providers"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-tab-roles"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-tab-permissions"]')).toBeTruthy()
    
    // Primary action button
    expect(document.querySelector('[data-testid="setupauthentication-add-provider"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="setupauthentication-providers-list"]')).toBeTruthy()
    
    // List items
    const providerItems = document.querySelectorAll('[data-testid="setupauthentication-provider-item"]')
    expect(providerItems.length).toBeGreaterThan(0)
    
    // Security settings inputs
    expect(document.querySelector('[data-testid="setupauthentication-mfa-toggle"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-session-timeout"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-password-policy"]')).toBeTruthy()
  })

  it('displays mock roles when switching to roles tab', async () => {
    render(<SetupAuthentication />)
    const rolesTab = screen.getByTestId('setupauthentication-tab-roles')
    rolesTab.click()
    
    await waitFor(() => {
      expect(screen.getByText('Administrator')).toBeTruthy()
      expect(screen.getByText('Manager')).toBeTruthy()
      expect(screen.getByText('Employee')).toBeTruthy()
      expect(screen.getByText('HR Staff')).toBeTruthy()
      expect(screen.getByText('Guest')).toBeTruthy()
    })
  })

  it('displays permission matrix when switching to permissions tab', async () => {
    render(<SetupAuthentication />)
    const permissionsTab = screen.getByTestId('setupauthentication-tab-permissions')
    permissionsTab.click()
    
    await waitFor(() => {
      expect(screen.getByText('View and manage system permissions by category')).toBeTruthy()
      expect(screen.getByText('User Management')).toBeTruthy()
      expect(screen.getByText('Data Access')).toBeTruthy()
    })
  })

  it('toggles provider form when add button is clicked', async () => {
    render(<SetupAuthentication />)
    const addButton = screen.getByTestId('setupauthentication-add-provider')
    
    // Form should not be visible initially
    expect(document.querySelector('[data-testid="setupauthentication-provider-form"]')).toBeFalsy()
    
    // Click add button
    addButton.click()
    
    // Form should now be visible
    await waitFor(() => {
      expect(document.querySelector('[data-testid="setupauthentication-provider-form"]')).toBeTruthy()
    })
  })

  it('displays security settings section', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Security Settings')).toBeTruthy()
    expect(screen.getByText('Enforce Multi-Factor Authentication')).toBeTruthy()
    expect(screen.getByText('Session Timeout')).toBeTruthy()
    expect(screen.getByText('Password Policy')).toBeTruthy()
  })
})
