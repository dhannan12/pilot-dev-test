import { render, screen } from '@testing-library/react'
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

  it('displays mock users data', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText('Bob Smith')).toBeTruthy()
    expect(screen.getByText('Carol Davis')).toBeTruthy()
    expect(screen.getByText('David Wilson')).toBeTruthy()
    expect(screen.getByText('Emma Brown')).toBeTruthy()
  })

  it('displays user roles', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Manager')).toBeTruthy()
    expect(screen.getAllByText('Developer').length).toBeGreaterThan(0)
    expect(screen.getByText('Viewer')).toBeTruthy()
  })

  it('displays user status badges', () => {
    render(<SetupAuthenticationAnd />)
    const activeElements = screen.getAllByText('active')
    expect(activeElements.length).toBeGreaterThan(0)
    expect(screen.getByText('pending')).toBeTruthy()
  })

  it('displays statistics summary', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Total Users')).toBeTruthy()
    expect(screen.getByText('Roles Defined')).toBeTruthy()
    expect(screen.getAllByText('Permissions').length).toBeGreaterThan(0)
    expect(screen.getByText('Pending Users')).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Users \(/)).toBeTruthy()
    expect(screen.getByText(/Roles \(/)).toBeTruthy()
    expect(screen.getByText(/Permissions \(/)).toBeTruthy()
  })

  it('shows authentication enabled toggle', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Authentication Enabled')).toBeTruthy()
    expect(screen.getByText('Active')).toBeTruthy()
  })
})
