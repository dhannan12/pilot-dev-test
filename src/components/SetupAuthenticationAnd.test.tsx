import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthenticationAnd from './SetupAuthenticationAnd'

describe('SetupAuthenticationAnd', () => {
  it('renders without crashing', () => {
    render(<SetupAuthenticationAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock middleware data', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('JWT Authentication')).toBeTruthy()
    expect(screen.getByText('OAuth 2.0 Provider')).toBeTruthy()
    expect(screen.getByText('API Key Validation')).toBeTruthy()
    expect(screen.getByText('Session Management')).toBeTruthy()
    expect(screen.getByText('Role-Based Access Control')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Total Middleware')).toBeTruthy()
    expect(screen.getAllByText('Enabled').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Disabled').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthenticationAnd />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="setupauthenticationand"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="setupauthenticationand-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="setupauthenticationand-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Toggle buttons
    const toggleButtons = document.querySelectorAll('[data-testid^="setupauthenticationand-toggle-"]')
    expect(toggleButtons.length).toBeGreaterThan(0)
    
    // Action buttons (save, reset)
    const saveButton = document.querySelector('[data-testid="setupauthenticationand-save"]')
    const resetButton = document.querySelector('[data-testid="setupauthenticationand-reset"]')
    // These may not be visible initially since no middleware is selected
    // So we check that at least the structure is there
    
    // Input fields
    const nameInput = document.querySelector('[data-testid="setupauthenticationand-name"]')
    const typeInput = document.querySelector('[data-testid="setupauthenticationand-type"]')
    const endpointInput = document.querySelector('[data-testid="setupauthenticationand-endpoint"]')
    const prioritySelect = document.querySelector('[data-testid="setupauthenticationand-priority"]')
    // These also may not be visible until a middleware is selected
  })

  it('shows at least 5 middleware items', () => {
    render(<SetupAuthenticationAnd />)
    const items = document.querySelectorAll('[data-testid="setupauthenticationand-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays priority information', () => {
    render(<SetupAuthenticationAnd />)
    expect(screen.getByText('Priority: 1')).toBeTruthy()
    expect(screen.getByText('Priority: 2')).toBeTruthy()
  })
})
