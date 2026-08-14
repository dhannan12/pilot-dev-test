import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication & Access Control')).toBeTruthy()
  })

  it('displays mock users', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('John Admin')).toBeTruthy()
    expect(screen.getByText('Sarah Manager')).toBeTruthy()
    expect(screen.getByText('Mike Editor')).toBeTruthy()
    expect(screen.getByText('Emma Viewer')).toBeTruthy()
    expect(screen.getByText('David Support')).toBeTruthy()
  })

  it('displays tabs for users, roles, and permissions', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText(/Users \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Roles \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Permissions \(\d+\)/)).toBeTruthy()
  })

  it('displays authentication settings', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication')).toBeTruthy()
    expect(screen.getByText('Multi-Factor Auth')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Total Users')).toBeTruthy()
    expect(screen.getByText('Active Users')).toBeTruthy()
    expect(screen.getByText('Total Roles')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
  })
})
