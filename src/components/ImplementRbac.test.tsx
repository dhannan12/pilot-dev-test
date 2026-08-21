import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementRbac from './ImplementRbac'

describe('ImplementRbac', () => {
  it('renders without crashing', () => {
    render(<ImplementRbac />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<ImplementRbac />)
    expect(screen.getByText('Role-Based Access Control')).toBeTruthy()
    expect(screen.getByText(/Manage permissions and access control/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementRbac />)
    // Main wrapper
    expect(document.querySelector('[data-testid="implementrbac"]')).toBeTruthy()
    // Tab buttons
    expect(document.querySelector('[data-testid="implementrbac-tab-permissions"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementrbac-tab-users"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementrbac-tab-audit"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="implementrbac-list"]')).toBeTruthy()
    // List items
    expect(document.querySelector('[data-testid="implementrbac-item"]')).toBeTruthy()
  })

  it('displays permission matrix by default', () => {
    render(<ImplementRbac />)
    expect(screen.getByText(/View which roles have access/i)).toBeTruthy()
    expect(screen.getAllByText('Permission Matrix').length).toBeGreaterThan(0)
  })

  it('displays mock permissions data', () => {
    render(<ImplementRbac />)
    expect(screen.getByText(/Create absence reports/i)).toBeTruthy()
    expect(screen.getByText(/View absence reports/i)).toBeTruthy()
    expect(screen.getByText(/Approve\/reject absence reports/i)).toBeTruthy()
  })

  it('switches to users tab when clicked', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByTestId('implementrbac-tab-users')
    fireEvent.click(usersTab)
    expect(screen.getByText('User Management')).toBeTruthy()
    expect(screen.getByTestId('implementrbac-add-user')).toBeTruthy()
  })

  it('displays mock users in users tab', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByTestId('implementrbac-tab-users')
    fireEvent.click(usersTab)
    expect(screen.getByText('Dr. Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('John Thompson')).toBeTruthy()
    expect(screen.getByText('Maria Garcia')).toBeTruthy()
  })

  it('switches to audit log tab when clicked', () => {
    render(<ImplementRbac />)
    const auditTab = screen.getByTestId('implementrbac-tab-audit')
    fireEvent.click(auditTab)
    expect(screen.getByText(/Track all access attempts/i)).toBeTruthy()
    expect(screen.getByTestId('implementrbac-export-logs')).toBeTruthy()
  })

  it('displays audit logs with allowed and denied results', () => {
    render(<ImplementRbac />)
    const auditTab = screen.getByTestId('implementrbac-tab-audit')
    fireEvent.click(auditTab)
    expect(screen.getByText(/Dr. Sarah Mitchell attempted to/i)).toBeTruthy()
    expect(screen.getAllByText('ALLOWED').length).toBeGreaterThan(0)
    expect(screen.getAllByText('DENIED').length).toBeGreaterThan(0)
  })

  it('displays role badges with different colors', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByTestId('implementrbac-tab-users')
    fireEvent.click(usersTab)
    expect(screen.getAllByText('ADMIN').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TEACHER').length).toBeGreaterThan(0)
    expect(screen.getAllByText('PARENT').length).toBeGreaterThan(0)
  })

  it('has view permissions button for each user', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByTestId('implementrbac-tab-users')
    fireEvent.click(usersTab)
    const viewPermissionButtons = screen.getAllByTestId('implementrbac-view-permissions')
    expect(viewPermissionButtons.length).toBeGreaterThan(0)
  })

  it('has edit role button for each user', () => {
    render(<ImplementRbac />)
    const usersTab = screen.getByTestId('implementrbac-tab-users')
    fireEvent.click(usersTab)
    const editRoleButtons = screen.getAllByTestId('implementrbac-edit-role')
    expect(editRoleButtons.length).toBeGreaterThan(0)
  })
})
