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

  it('displays mock user data', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Dr. Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('sarah.mitchell@clinic.com')).toBeTruthy()
  })

  it('displays all three tabs', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Users \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Roles \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Permissions \(\d+\)/)).toBeTruthy()
  })

  it('switches to roles tab on click', () => {
    render(<SetupAuthenticationAnd />)
    const rolesTab = screen.getByText(/Roles \(\d+\)/)
    fireEvent.click(rolesTab)
    expect(screen.getByText('Role Management')).toBeTruthy()
    expect(screen.getByText('Senior Physiotherapist')).toBeTruthy()
  })

  it('switches to permissions tab on click', () => {
    render(<SetupAuthenticationAnd />)
    const permissionsTab = screen.getByText(/Permissions \(\d+\)/)
    fireEvent.click(permissionsTab)
    expect(screen.getByText('Permission Registry')).toBeTruthy()
  })

  it('displays user status badges', () => {
    render(<SetupAuthenticationAnd />)
    const activeStatus = screen.getAllByText('active')
    expect(activeStatus.length).toBeGreaterThan(0)
  })

  it('filters users based on search input', () => {
    render(<SetupAuthenticationAnd />)
    const searchInput = screen.getByPlaceholderText('Search users...')
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    expect(screen.getByText('Dr. Sarah Mitchell')).toBeTruthy()
  })

  it('displays security overview statistics', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Security Overview')).toBeTruthy()
    expect(screen.getByText('Active Users')).toBeTruthy()
    expect(screen.getByText('Defined Roles')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
  })

  it('expands role details on click', () => {
    render(<SetupAuthenticationAnd />)
    const rolesTab = screen.getByText(/Roles \(\d+\)/)
    fireEvent.click(rolesTab)
    
    const seniorPhysioRole = screen.getByText('Senior Physiotherapist')
    fireEvent.click(seniorPhysioRole)
    
    expect(screen.getByText('Assigned Permissions:')).toBeTruthy()
  })
})
