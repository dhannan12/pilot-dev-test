import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AuthenticationAndRbac from './AuthenticationAndRbac'

describe('AuthenticationAndRbac', () => {
  it('renders without crashing', () => {
    render(<AuthenticationAndRbac />)
    expect(document.body).toBeTruthy()
  })

  it('displays main component wrapper', () => {
    render(<AuthenticationAndRbac />)
    const wrapper = screen.getByTestId('authenticationandrbac')
    expect(wrapper).toBeTruthy()
  })

  it('renders navigation tabs', () => {
    render(<AuthenticationAndRbac />)
    expect(screen.getByTestId('authenticationandrbac-tabs')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-tab-users')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-tab-roles')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-tab-permissions')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-tab-audit')).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<AuthenticationAndRbac />)
    const usersList = screen.getByTestId('authenticationandrbac-users-list')
    expect(usersList).toBeTruthy()
    const userItems = screen.getAllByTestId('authenticationandrbac-user-item')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes for interactive elements', () => {
    render(<AuthenticationAndRbac />)
    
    // Main wrapper
    expect(screen.getByTestId('authenticationandrbac')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('authenticationandrbac-logout')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-add-user')).toBeTruthy()
    
    // Tab buttons
    expect(screen.getByTestId('authenticationandrbac-tab-users')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-tab-roles')).toBeTruthy()
    
    // Tables and lists
    expect(screen.getByTestId('authenticationandrbac-users-table')).toBeTruthy()
    expect(screen.getByTestId('authenticationandrbac-users-list')).toBeTruthy()
    
    // User items
    const userItems = screen.getAllByTestId('authenticationandrbac-user-item')
    expect(userItems.length).toBeGreaterThan(0)
  })

  it('renders header with authentication info', () => {
    render(<AuthenticationAndRbac />)
    expect(screen.getByText('Authentication & RBAC')).toBeTruthy()
    expect(screen.getByText('Security & Access Control')).toBeTruthy()
  })

  it('displays user management table with columns', () => {
    render(<AuthenticationAndRbac />)
    expect(screen.getByText('User')).toBeTruthy()
    expect(screen.getByText('Role')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
  })

  it('has action buttons for users', () => {
    render(<AuthenticationAndRbac />)
    const viewButtons = screen.getAllByTestId('authenticationandrbac-view-user')
    expect(viewButtons.length).toBeGreaterThan(0)
    
    const editButtons = screen.getAllByTestId('authenticationandrbac-edit-user')
    expect(editButtons.length).toBeGreaterThan(0)
  })

  it('verifies all critical data-testid attributes exist', () => {
    render(<AuthenticationAndRbac />)
    
    // Critical elements for Playwright QA
    expect(document.querySelector('[data-testid="authenticationandrbac"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="authenticationandrbac-add-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="authenticationandrbac-logout"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="authenticationandrbac-users-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="authenticationandrbac-user-item"]')).toBeTruthy()
  })
})
