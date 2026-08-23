import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthenticationAnd from './SetupAuthenticationAnd'

describe('SetupAuthenticationAnd', () => {
  it('renders without crashing', () => {
    render(<SetupAuthenticationAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Sarah Administrator/i)).toBeTruthy()
    expect(screen.getByText(/Mike Manager/i)).toBeTruthy()
    expect(screen.getByText(/Emma Employee/i)).toBeTruthy()
    expect(screen.getByText(/John Customer/i)).toBeTruthy()
    expect(screen.getByText(/Lisa Guest/i)).toBeTruthy()
  })

  it('displays role information', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Roles & Permissions/i)).toBeTruthy()
    expect(screen.getByText(/All Roles/i)).toBeTruthy()
  })

  it('displays authentication system header', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Authentication & RBAC System/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthenticationAnd />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupauthenticationand"]')).toBeTruthy()
    
    // List containers
    expect(document.querySelector('[data-testid="setupauthenticationand-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthenticationand-roles-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="setupauthenticationand-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    const roleItems = document.querySelectorAll('[data-testid="setupauthenticationand-role-item"]')
    expect(roleItems.length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="setupauthenticationand-add-user"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthenticationand-add-role"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthenticationand-settings"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthenticationand-edit"]')).toBeTruthy()
    
    // Select dropdown
    expect(document.querySelector('[data-testid="setupauthenticationand-role"]')).toBeTruthy()
  })

  it('displays statistics correctly', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText(/Total Users/i)).toBeTruthy()
    expect(screen.getByText(/Active Sessions/i)).toBeTruthy()
    expect(screen.getByText(/Roles Defined/i)).toBeTruthy()
    expect(screen.getByText(/Total Permissions/i)).toBeTruthy()
  })
})
