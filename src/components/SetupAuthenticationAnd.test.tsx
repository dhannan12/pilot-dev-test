import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthenticationAnd from './SetupAuthenticationAnd'

describe('SetupAuthenticationAnd', () => {
  it('renders without crashing', () => {
    render(<SetupAuthenticationAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Authentication & RBAC Setup')).toBeTruthy()
  })

  it('displays all three tabs', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Users \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Roles \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Permissions \(\d+\)/)).toBeTruthy()
  })

  it('displays user data in the users tab', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('jane.smith@example.com')).toBeTruthy()
    expect(screen.getByText('Mike Johnson')).toBeTruthy()
  })

  it('switches to roles tab when clicked', () => {
    render(<SetupAuthenticationAnd />)
    const rolesTab = screen.getByText(/Roles \(\d+\)/)
    fireEvent.click(rolesTab)
    expect(screen.getByText('Role Management')).toBeTruthy()
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Manager')).toBeTruthy()
  })

  it('switches to permissions tab when clicked', () => {
    render(<SetupAuthenticationAnd />)
    const permissionsTab = screen.getByText(/Permissions \(\d+\)/)
    fireEvent.click(permissionsTab)
    expect(screen.getByText('System Permissions')).toBeTruthy()
    expect(screen.getByText('Read')).toBeTruthy()
    expect(screen.getByText('Write')).toBeTruthy()
  })

  it('displays user details modal when view button is clicked', () => {
    render(<SetupAuthenticationAnd />)
    const viewButtons = screen.getAllByText('View')
    fireEvent.click(viewButtons[0])
    expect(screen.getByText('User Details')).toBeTruthy()
  })

  it('closes user details modal when close button is clicked', () => {
    render(<SetupAuthenticationAnd />)
    const viewButtons = screen.getAllByText('View')
    fireEvent.click(viewButtons[0])
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    expect(screen.queryByText('User Details')).toBeFalsy()
  })

  it('displays role details modal when role card is clicked', () => {
    render(<SetupAuthenticationAnd />)
    const rolesTab = screen.getByText(/Roles \(\d+\)/)
    fireEvent.click(rolesTab)
    const adminRole = screen.getByText('Full system access with all permissions')
    fireEvent.click(adminRole.closest('div')!)
    expect(screen.getByText('Role Details')).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Total Users')).toBeTruthy()
    expect(screen.getByText('Active Roles')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
    expect(screen.getByText('Pending Users')).toBeTruthy()
  })

  it('displays action buttons', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Add User')).toBeTruthy()
  })

  it('shows correct number of mock users', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('Jane Smith')).toBeTruthy()
    expect(screen.getByText('Mike Johnson')).toBeTruthy()
    expect(screen.getByText('Sarah Williams')).toBeTruthy()
    expect(screen.getByText('Tom Brown')).toBeTruthy()
    expect(screen.getByText('Emily Davis')).toBeTruthy()
  })
})
