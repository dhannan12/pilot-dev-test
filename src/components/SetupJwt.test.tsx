import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupJwt from './SetupJwt'

describe('SetupJwt', () => {
  it('renders without crashing', () => {
    render(<SetupJwt />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<SetupJwt />)
    expect(screen.getByText('JWT Authentication & RBAC')).toBeTruthy()
    expect(screen.getByText('Manage users, roles, permissions, and JWT tokens')).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<SetupJwt />)
    expect(screen.getByText('admin_user')).toBeTruthy()
    expect(screen.getByText('manager_john')).toBeTruthy()
    expect(screen.getByText('user_sarah')).toBeTruthy()
    expect(screen.getByText('guest_mike')).toBeTruthy()
    expect(screen.getByText('user_emma')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupJwt />)
    // Main wrapper
    expect(screen.getByTestId('setup-jwt')).toBeTruthy()
    
    // Tab navigation
    expect(screen.getByTestId('setup-jwt-tab-users')).toBeTruthy()
    expect(screen.getByTestId('setup-jwt-tab-tokens')).toBeTruthy()
    expect(screen.getByTestId('setup-jwt-tab-roles')).toBeTruthy()
    
    // User list and items
    expect(screen.getByTestId('setup-jwt-users-list')).toBeTruthy()
    expect(screen.getAllByTestId('setup-jwt-user-item').length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getByTestId('setup-jwt-add-user')).toBeTruthy()
    expect(screen.getAllByTestId('setup-jwt-edit-user').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('setup-jwt-revoke-token').length).toBeGreaterThan(0)
  })

  it('displays user roles and permissions', () => {
    render(<SetupJwt />)
    expect(screen.getByText('admin')).toBeTruthy()
    expect(screen.getByText('manager')).toBeTruthy()
    expect(screen.getAllByText('read').length).toBeGreaterThan(0)
    expect(screen.getAllByText('write').length).toBeGreaterThan(0)
    expect(screen.getByText('delete')).toBeTruthy()
  })

  it('displays user status badges', () => {
    render(<SetupJwt />)
    expect(screen.getAllByText('active').length).toBeGreaterThan(0)
    expect(screen.getByText('suspended')).toBeTruthy()
    expect(screen.getByText('pending')).toBeTruthy()
  })
})
