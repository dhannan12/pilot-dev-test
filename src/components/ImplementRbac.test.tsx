import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementRbac from './ImplementRbac'

describe('ImplementRbac', () => {
  it('renders without crashing', () => {
    render(<ImplementRbac />)
    expect(document.body).toBeTruthy()
  })

  it('displays RBAC authorization demo title', () => {
    render(<ImplementRbac />)
    expect(screen.getByTestId('implement-rbac-title')).toBeTruthy()
    expect(screen.getByTestId('implement-rbac-title').textContent).toBe('RBAC Authorization Demo')
  })

  it('displays current user information', () => {
    render(<ImplementRbac />)
    expect(screen.getByTestId('current-user-card')).toBeTruthy()
    expect(screen.getByTestId('current-user-name')).toBeTruthy()
    expect(screen.getByTestId('current-user-email')).toBeTruthy()
    expect(screen.getByTestId('current-user-role')).toBeTruthy()
    expect(screen.getByTestId('current-user-token')).toBeTruthy()
  })

  it('displays user switcher with all mock users', () => {
    render(<ImplementRbac />)
    expect(screen.getByTestId('user-switcher')).toBeTruthy()
    expect(screen.getByTestId('user-switch-u1')).toBeTruthy()
    expect(screen.getByTestId('user-switch-u2')).toBeTruthy()
    expect(screen.getByTestId('user-switch-u3')).toBeTruthy()
    expect(screen.getByTestId('user-switch-u4')).toBeTruthy()
    expect(screen.getByTestId('user-switch-u5')).toBeTruthy()
  })

  it('switches user when user button is clicked', () => {
    render(<ImplementRbac />)
    const initialName = screen.getByTestId('current-user-name').textContent
    
    fireEvent.click(screen.getByTestId('user-switch-u2'))
    const newName = screen.getByTestId('current-user-name').textContent
    
    expect(newName).not.toBe(initialName)
    expect(newName).toBe('Sarah Manager')
  })

  it('displays permission action buttons', () => {
    render(<ImplementRbac />)
    expect(screen.getByTestId('permission-actions')).toBeTruthy()
    expect(screen.getByTestId('action-view-job-postings')).toBeTruthy()
    expect(screen.getByTestId('action-create-job-postings')).toBeTruthy()
    expect(screen.getByTestId('action-view-applications')).toBeTruthy()
    expect(screen.getByTestId('action-submit-applications')).toBeTruthy()
    expect(screen.getByTestId('action-view-workforce-reports')).toBeTruthy()
    expect(screen.getByTestId('action-manage-user-roles')).toBeTruthy()
  })

  it('logs authorization attempts when action buttons are clicked', () => {
    render(<ImplementRbac />)
    
    expect(screen.getByTestId('logs-empty')).toBeTruthy()
    
    fireEvent.click(screen.getByTestId('action-view-job-postings'))
    
    expect(screen.getByTestId('logs-list')).toBeTruthy()
    expect(screen.getAllByTestId('log-item').length).toBeGreaterThan(0)
  })

  it('displays permission matrix', () => {
    render(<ImplementRbac />)
    expect(screen.getByTestId('permission-matrix')).toBeTruthy()
    expect(screen.getByTestId('permission-matrix-body')).toBeTruthy()
    expect(screen.getAllByTestId('permission-row').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<ImplementRbac />)
    
    expect(screen.getByTestId('implement-rbac')).toBeTruthy()
    expect(screen.getByTestId('current-user-card')).toBeTruthy()
    expect(screen.getByTestId('permission-actions')).toBeTruthy()
    expect(screen.getByTestId('authorization-logs')).toBeTruthy()
    expect(screen.getByTestId('permission-matrix')).toBeTruthy()
    
    expect(screen.getByTestId('action-view-job-postings')).toBeTruthy()
    expect(screen.getByTestId('action-create-job-postings')).toBeTruthy()
    expect(screen.getByTestId('action-edit-job-postings')).toBeTruthy()
    expect(screen.getByTestId('action-delete-job-postings')).toBeTruthy()
  })

  it('shows different permissions for different roles', () => {
    render(<ImplementRbac />)
    
    expect(screen.getByTestId('current-user-role').textContent).toBe('Employee')
    
    fireEvent.click(screen.getByTestId('user-switch-u2'))
    expect(screen.getByTestId('current-user-role').textContent).toBe('HiringManager')
    
    fireEvent.click(screen.getByTestId('action-create-job-postings'))
    
    expect(screen.getByTestId('logs-list')).toBeTruthy()
  })

  it('displays authorization result correctly', () => {
    render(<ImplementRbac />)
    
    fireEvent.click(screen.getByTestId('action-create-job-postings'))
    
    const logResult = screen.getAllByTestId('log-result')[0]
    expect(logResult.textContent).toBe('DENIED')
    
    fireEvent.click(screen.getByTestId('user-switch-u2'))
    fireEvent.click(screen.getByTestId('action-create-job-postings'))
    
    const logResults = screen.getAllByTestId('log-result')
    expect(logResults[0].textContent).toBe('AUTHORIZED')
  })
})
