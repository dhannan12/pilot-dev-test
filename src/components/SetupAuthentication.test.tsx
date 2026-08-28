import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form by default', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Welcome Back')).toBeTruthy()
    expect(screen.getByText('Sign in to your account')).toBeTruthy()
  })

  it('displays mock test accounts', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Test Accounts (Demo Only)')).toBeTruthy()
    expect(screen.getByText('john.doe@example.com')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('setupauthentication')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-email')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-password')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-submit')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-toggle')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-list')).toBeTruthy()
    const items = screen.getAllByTestId('setupauthentication-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows registration form when toggled', () => {
    render(<SetupAuthentication />)
    const toggleButton = screen.getByTestId('setupauthentication-toggle')
    fireEvent.click(toggleButton)
    expect(screen.getByText('Create Account')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-username')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-confirmpassword')).toBeTruthy()
  })
})
