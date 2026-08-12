import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupRbac from './SetupRbac'

describe('SetupRbac', () => {
  it('renders without crashing', () => {
    render(<SetupRbac />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupRbac />)
    expect(screen.getByText('RBAC & SSO Configuration')).toBeTruthy()
  })

  it('displays navigation tabs', () => {
    render(<SetupRbac />)
    expect(screen.getByText('Roles')).toBeTruthy()
    expect(screen.getByText('SSO Providers')).toBeTruthy()
    expect(screen.getByText('Permissions')).toBeTruthy()
    expect(screen.getByText('User Mappings')).toBeTruthy()
  })

  it('displays mock roles by default', () => {
    render(<SetupRbac />)
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Legal Reviewer')).toBeTruthy()
    expect(screen.getByText('Document Editor')).toBeTruthy()
    expect(screen.getByText('Viewer')).toBeTruthy()
    expect(screen.getByText('Compliance Officer')).toBeTruthy()
  })

  it('displays role descriptions', () => {
    render(<SetupRbac />)
    expect(screen.getByText('Full system access and configuration')).toBeTruthy()
    expect(screen.getByText('Review and approve legal documents')).toBeTruthy()
  })
})
