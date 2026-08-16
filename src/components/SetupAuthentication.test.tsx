import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the authentication setup heading', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication & RBAC Setup')).toBeTruthy()
  })

  it('displays all three role configuration cards', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Administrator')).toBeTruthy()
    expect(screen.getByText('Coordinator')).toBeTruthy()
    expect(screen.getByText('Volunteer')).toBeTruthy()
  })

  it('displays mock users data', () => {
    render(<SetupAuthentication />)
    // Switch to users tab
    const usersTab = screen.getByTestId('setup-authentication-tab-users')
    fireEvent.click(usersTab)
    
    expect(screen.getByText('Sarah Admin')).toBeTruthy()
    expect(screen.getByText('Mike Coordinator')).toBeTruthy()
    expect(screen.getByText('Emma Volunteer')).toBeTruthy()
  })

  it('displays permissions matrix', () => {
    render(<SetupAuthentication />)
    // Switch to permissions tab
    const permissionsTab = screen.getByTestId('setup-authentication-tab-permissions')
    fireEvent.click(permissionsTab)
    
    expect(screen.getByTestId('setup-authentication-matrix-section')).toBeTruthy()
    expect(screen.getAllByText('Manage Users').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Manage Events').length).toBeGreaterThan(0)
  })

  it('can toggle between tabs', () => {
    render(<SetupAuthentication />)
    
    // Check roles tab is active by default
    expect(screen.getByTestId('setup-authentication-roles-section')).toBeTruthy()
    
    // Click users tab
    const usersTab = screen.getByTestId('setup-authentication-tab-users')
    fireEvent.click(usersTab)
    expect(screen.getByTestId('setup-authentication-users-section')).toBeTruthy()
    
    // Click permissions tab
    const permissionsTab = screen.getByTestId('setup-authentication-tab-permissions')
    fireEvent.click(permissionsTab)
    expect(screen.getByTestId('setup-authentication-matrix-section')).toBeTruthy()
  })

  it('can toggle permission details visibility', () => {
    render(<SetupAuthentication />)
    
    const toggleButton = screen.getByTestId('setup-authentication-toggle-permissions')
    
    // Permissions should be hidden initially
    expect(screen.queryByTestId('setup-authentication-permissions-list')).toBeFalsy()
    
    // Click to show
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('setup-authentication-permissions-list')).toBeTruthy()
    
    // Click to hide
    fireEvent.click(toggleButton)
    expect(screen.queryByTestId('setup-authentication-permissions-list')).toBeFalsy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="setup-authentication"]')).toBeTruthy()
    
    // Verify tab buttons
    expect(document.querySelector('[data-testid="setup-authentication-tab-roles"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-tab-users"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-tab-permissions"]')).toBeTruthy()
    
    // Verify role cards
    expect(document.querySelector('[data-testid="setup-authentication-role-card"]')).toBeTruthy()
    
    // Verify toggle button
    expect(document.querySelector('[data-testid="setup-authentication-toggle-permissions"]')).toBeTruthy()
    
    // Switch to users tab and verify user elements
    const usersTab = screen.getByTestId('setup-authentication-tab-users')
    fireEvent.click(usersTab)
    
    expect(document.querySelector('[data-testid="setup-authentication-add-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-users-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-user-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-edit-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-delete-user"]')).toBeTruthy()
    
    // Switch to permissions tab and verify matrix elements
    const permissionsTab = screen.getByTestId('setup-authentication-tab-permissions')
    fireEvent.click(permissionsTab)
    
    expect(document.querySelector('[data-testid="setup-authentication-matrix-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-authentication-matrix-item"]')).toBeTruthy()
  })
})
