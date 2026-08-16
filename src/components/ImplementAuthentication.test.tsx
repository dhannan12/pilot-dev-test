import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementAuthentication from './ImplementAuthentication'

describe('ImplementAuthentication', () => {
  it('renders without crashing', () => {
    render(<ImplementAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the login form initially', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeTruthy()
    expect(screen.getByTestId('implementauthentication-login')).toBeTruthy()
  })

  it('displays mock user credentials', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText(/admin_user/i)).toBeTruthy()
    expect(screen.getByText(/manager_jane/i)).toBeTruthy()
    expect(screen.getByText(/user_john/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementAuthentication />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="implementauthentication"]')).toBeTruthy()
    
    // Login form inputs
    expect(document.querySelector('[data-testid="implementauthentication-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementauthentication-password"]')).toBeTruthy()
    
    // Login button
    expect(document.querySelector('[data-testid="implementauthentication-login"]')).toBeTruthy()
  })

  it('shows authentication and RBAC header', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText(/Authentication & RBAC/i)).toBeTruthy()
    expect(screen.getByText(/Role-Based Access Control System/i)).toBeTruthy()
  })

  it('displays demo credentials hint', () => {
    render(<ImplementAuthentication />)
    expect(screen.getByText(/Demo Credentials:/i)).toBeTruthy()
  })
})
