import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetUpAuthentication from './SetUpAuthentication'

describe('SetUpAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetUpAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the authentication system header', () => {
    render(<SetUpAuthentication />)
    expect(screen.getByText('Authentication & Authorization System')).toBeTruthy()
    expect(screen.getByText(/Manage users, roles, and permissions/i)).toBeTruthy()
  })

  it('displays navigation tabs', () => {
    render(<SetUpAuthentication />)
    expect(screen.getByText(/Users \(5\)/i)).toBeTruthy()
    expect(screen.getByText(/Permissions \(5\)/i)).toBeTruthy()
    expect(screen.getByText('Roles')).toBeTruthy()
  })

  it('displays mock user data in table', () => {
    render(<SetUpAuthentication />)
    expect(screen.getByText('Admin User')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Mike Thompson')).toBeTruthy()
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('Jane Smith')).toBeTruthy()
  })

  it('displays user roles', () => {
    render(<SetUpAuthentication />)
    const adminBadges = screen.getAllByText('admin')
    const stylistBadges = screen.getAllByText('stylist')
    const customerBadges = screen.getAllByText('customer')
    expect(adminBadges.length).toBeGreaterThan(0)
    expect(stylistBadges.length).toBeGreaterThan(0)
    expect(customerBadges.length).toBeGreaterThan(0)
  })

  it('displays stats summary', () => {
    render(<SetUpAuthentication />)
    expect(screen.getByText('Total Users')).toBeTruthy()
    expect(screen.getByText('Active Users')).toBeTruthy()
    expect(screen.getByText('Total Roles')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
  })
})
