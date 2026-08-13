import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementRbac from './ImplementRbac'

describe('ImplementRbac', () => {
  it('renders without crashing', () => {
    render(<ImplementRbac />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('Role-Based Access Control')).toBeTruthy()
    expect(screen.getByText('Manage roles, permissions, and user access across the platform')).toBeTruthy()
  })

  it('displays stats cards', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('Total Roles')).toBeTruthy()
    expect(screen.getByText('Active Users')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
    expect(screen.getByText('Access Denied (24h)')).toBeTruthy()
  })

  it('displays all tabs', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('roles')).toBeTruthy()
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('permissions')).toBeTruthy()
    expect(screen.getByText('audit')).toBeTruthy()
  })

  it('displays mock roles in roles tab', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Property Manager')).toBeTruthy()
    expect(screen.getByText('Agent')).toBeTruthy()
    expect(screen.getByText('Viewer')).toBeTruthy()
    expect(screen.getByText('Support Staff')).toBeTruthy()
  })

  it('switches to users tab when clicked', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByText('users')
    fireEvent.click(usersTab)
    expect(screen.getByText('User Management')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
  })

  it('switches to permissions tab when clicked', () => {
    render(<ImplementRbac />)
    const permissionsTab = screen.getByText('permissions')
    fireEvent.click(permissionsTab)
    expect(screen.getByText('System Permissions')).toBeTruthy()
    expect(screen.getByText('View Properties')).toBeTruthy()
    expect(screen.getByText('Create Properties')).toBeTruthy()
  })

  it('switches to audit tab when clicked', () => {
    render(<ImplementRbac />)
    const auditTab = screen.getByText('audit')
    fireEvent.click(auditTab)
    expect(screen.getByText('Access Audit Log')).toBeTruthy()
    expect(screen.getByText('Created property listing')).toBeTruthy()
  })

  it('expands role details when clicked', () => {
    render(<ImplementRbac />)
    const adminRole = screen.getByText('Admin')
    fireEvent.click(adminRole.closest('div[class*="border"]')!)
    expect(screen.getByText('Permissions:')).toBeTruthy()
  })

  it('displays user avatars in users tab', () => {
    render(<ImplementRbac />)
    fireEvent.click(screen.getByText('users'))
    expect(screen.getByText('SJ')).toBeTruthy() // Sarah Johnson initials
    expect(screen.getByText('MC')).toBeTruthy() // Michael Chen initials
  })

  it('displays permission actions with color coding', () => {
    render(<ImplementRbac />)
    fireEvent.click(screen.getByText('permissions'))
    // Check that permissions with different actions are displayed
    const readActions = screen.getAllByText('read')
    const createActions = screen.getAllByText('create')
    expect(readActions.length).toBeGreaterThan(0)
    expect(createActions.length).toBeGreaterThan(0)
  })

  it('displays audit log status badges', () => {
    render(<ImplementRbac />)
    fireEvent.click(screen.getByText('audit'))
    const successBadges = screen.getAllByText('success')
    const deniedBadges = screen.getAllByText('denied')
    expect(successBadges.length).toBeGreaterThan(0)
    expect(deniedBadges.length).toBeGreaterThan(0)
  })

  it('displays create role button', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('+ Create Role')).toBeTruthy()
  })

  it('displays add user button in users tab', () => {
    render(<ImplementRbac />)
    fireEvent.click(screen.getByText('users'))
    expect(screen.getByText('+ Add User')).toBeTruthy()
  })

  it('displays user email addresses in users tab', () => {
    render(<ImplementRbac />)
    fireEvent.click(screen.getByText('users'))
    expect(screen.getByText('sarah.johnson@company.com')).toBeTruthy()
    expect(screen.getByText('michael.chen@company.com')).toBeTruthy()
  })
})
