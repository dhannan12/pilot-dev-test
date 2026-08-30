import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays authentication providers by default', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication & RBAC Setup')).toBeTruthy()
    expect(screen.getByText('Email/Password')).toBeTruthy()
    expect(screen.getByText('Google OAuth')).toBeTruthy()
  })

  it('displays mock data for all sections', () => {
    render(<SetupAuthentication />)
    // Check providers (at least 5)
    expect(screen.getByText('Email/Password')).toBeTruthy()
    expect(screen.getByText('Google OAuth')).toBeTruthy()
    expect(screen.getByText('Microsoft Azure AD')).toBeTruthy()
    expect(screen.getByText('GitHub')).toBeTruthy()
    expect(screen.getByText('LDAP')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupAuthentication />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="setupauthentication"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-tab-providers"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-tab-roles"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-tab-users"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-save"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-cancel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-provider-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupauthentication-provider-item"]')).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<SetupAuthentication />)
    expect(screen.getByTestId('setupauthentication-tab-providers')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-tab-roles')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-tab-users')).toBeTruthy()
  })

  it('displays action buttons', () => {
    render(<SetupAuthentication />)
    expect(screen.getByTestId('setupauthentication-save')).toBeTruthy()
    expect(screen.getByTestId('setupauthentication-cancel')).toBeTruthy()
  })
})
