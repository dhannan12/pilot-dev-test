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
    expect(screen.getByText('Authentication & Access Control')).toBeTruthy()
  })

  it('displays all three tabs', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Users & Roles')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
    expect(screen.getByText('Active Sessions')).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('admin_user')).toBeTruthy()
    expect(screen.getByText('dr_smith')).toBeTruthy()
    expect(screen.getByText('reception_jane')).toBeTruthy()
  })

  it('filters users by role', () => {
    render(<SetupAuthenticationAnd />)
    const doctorButton = screen.getByText('Doctor')
    fireEvent.click(doctorButton)
    expect(screen.getByText('dr_smith')).toBeTruthy()
  })

  it('switches to permissions tab', () => {
    render(<SetupAuthenticationAnd />)
    const permissionsTab = screen.getByText('Permissions')
    fireEvent.click(permissionsTab)
    expect(screen.getByText('Access Control Rules')).toBeTruthy()
    expect(screen.getByText('Manage Users')).toBeTruthy()
  })

  it('displays permission details', () => {
    render(<SetupAuthenticationAnd />)
    const permissionsTab = screen.getByText('Permissions')
    fireEvent.click(permissionsTab)
    expect(screen.getByText('View Medical Records')).toBeTruthy()
    expect(screen.getByText('Manage Appointments')).toBeTruthy()
  })

  it('switches to sessions tab', () => {
    render(<SetupAuthenticationAnd />)
    const sessionsTab = screen.getByText('Active Sessions')
    fireEvent.click(sessionsTab)
    expect(screen.getByText('Active User Sessions')).toBeTruthy()
  })

  it('displays active sessions count', () => {
    render(<SetupAuthenticationAnd />)
    const sessionsTab = screen.getByText('Active Sessions')
    fireEvent.click(sessionsTab)
    expect(screen.getByText('3 Active')).toBeTruthy()
  })

  it('shows login form when test login button is clicked', () => {
    render(<SetupAuthenticationAnd />)
    const testLoginButton = screen.getByText('Test Login')
    fireEvent.click(testLoginButton)
    expect(screen.getByText('Login Test')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
  })

  it('displays security settings', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Security Settings')).toBeTruthy()
    expect(screen.getByText('Two-Factor Authentication')).toBeTruthy()
    expect(screen.getByText('Session Timeout')).toBeTruthy()
    expect(screen.getByText('Password Policy')).toBeTruthy()
  })

  it('shows role filter buttons', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('All Users')).toBeTruthy()
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Receptionist')).toBeTruthy()
    expect(screen.getByText('Patient')).toBeTruthy()
  })
})
