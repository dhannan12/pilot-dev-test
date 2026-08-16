import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementJwt from './ImplementJwt'

describe('ImplementJwt', () => {
  it('renders without crashing', () => {
    render(<ImplementJwt />)
    expect(document.body).toBeTruthy()
  })

  it('displays page title and description', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('JWT Authentication & RBAC')).toBeTruthy()
    expect(screen.getByText(/Manage user authentication tokens/)).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('admin_user')).toBeTruthy()
    expect(screen.getByText('teacher_smith')).toBeTruthy()
    expect(screen.getByText('parent_jones')).toBeTruthy()
    expect(screen.getByText('student_mike')).toBeTruthy()
    expect(screen.getByText('teacher_davis')).toBeTruthy()
  })

  it('displays session statistics', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('Active Sessions')).toBeTruthy()
    expect(screen.getByText('Expired Tokens')).toBeTruthy()
    expect(screen.getByText('Total Users')).toBeTruthy()
  })

  it('displays role permissions section', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('Role Permissions')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementJwt />)
    
    // Main wrapper
    const mainElement = document.querySelector('[data-testid="implementjwt"]')
    expect(mainElement).toBeTruthy()
    
    // List container
    const listElement = document.querySelector('[data-testid="implementjwt-list"]')
    expect(listElement).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="implementjwt-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    const generateButtons = document.querySelectorAll('[data-testid="implementjwt-generate"]')
    expect(generateButtons.length).toBeGreaterThan(0)
    
    const revokeButtons = document.querySelectorAll('[data-testid="implementjwt-revoke"]')
    expect(revokeButtons.length).toBeGreaterThan(0)
    
    // Role select
    const roleSelect = document.querySelector('[data-testid="implementjwt-roleselect"]')
    expect(roleSelect).toBeTruthy()
  })

  it('renders user sessions table with correct headers', () => {
    render(<ImplementJwt />)
    expect(screen.getByText('User')).toBeTruthy()
    expect(screen.getByText('Role')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
    expect(screen.getByText('Actions')).toBeTruthy()
  })
})
