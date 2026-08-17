import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupJwt from './SetupJwt'

describe('SetupJwt', () => {
  it('renders without crashing', () => {
    render(<SetupJwt />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<SetupJwt />)
    expect(screen.getByText('JWT Authentication & RBAC')).toBeInTheDocument()
    expect(screen.getByText('Manage JWT tokens, user roles, and permissions')).toBeInTheDocument()
  })

  it('displays mock user data', () => {
    render(<SetupJwt />)
    expect(screen.getByText('John Admin')).toBeInTheDocument()
    expect(screen.getByText('john@gym.com')).toBeInTheDocument()
    expect(screen.getByText('Sarah Manager')).toBeInTheDocument()
    expect(screen.getByText('Mike Trainer')).toBeInTheDocument()
    expect(screen.getByText('Lisa Member')).toBeInTheDocument()
    expect(screen.getByText('Tom Guest')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(<SetupJwt />)
    
    // Default tab is users
    expect(screen.getByText('User Sessions')).toBeInTheDocument()
    
    // Switch to roles tab
    const rolesTab = screen.getByTestId('setupjwt-roles-tab')
    fireEvent.click(rolesTab)
    expect(screen.getByText('Role Management')).toBeInTheDocument()
    
    // Switch to config tab
    const configTab = screen.getByTestId('setupjwt-config-tab')
    fireEvent.click(configTab)
    expect(screen.getAllByText('JWT Configuration').length).toBeGreaterThan(0)
  })

  it('displays mock roles in roles tab', () => {
    render(<SetupJwt />)
    
    const rolesTab = screen.getByTestId('setupjwt-roles-tab')
    fireEvent.click(rolesTab)
    
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('manager')).toBeInTheDocument()
    expect(screen.getByText('trainer')).toBeInTheDocument()
    expect(screen.getByText('member')).toBeInTheDocument()
  })

  it('displays JWT configuration fields', () => {
    render(<SetupJwt />)
    
    const configTab = screen.getByTestId('setupjwt-config-tab')
    fireEvent.click(configTab)
    
    expect(screen.getByTestId('setupjwt-algorithm')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-expiry')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-refresh-expiry')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-issuer')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<SetupJwt />)
    
    // Main wrapper
    expect(screen.getByTestId('setupjwt')).toBeInTheDocument()
    
    // Tabs
    expect(screen.getByTestId('setupjwt-users-tab')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-roles-tab')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-config-tab')).toBeInTheDocument()
    
    // Buttons on users tab
    expect(screen.getByTestId('setupjwt-add-user')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-users-list')).toBeInTheDocument()
    
    // User items
    const userItems = screen.getAllByTestId('setupjwt-user-item')
    expect(userItems.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getAllByTestId('setupjwt-revoke-token').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('setupjwt-refresh-token').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes in roles tab', () => {
    render(<SetupJwt />)
    
    const rolesTab = screen.getByTestId('setupjwt-roles-tab')
    fireEvent.click(rolesTab)
    
    expect(screen.getByTestId('setupjwt-add-role')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-roles-list')).toBeInTheDocument()
    
    const roleItems = screen.getAllByTestId('setupjwt-role-item')
    expect(roleItems.length).toBeGreaterThan(0)
    
    expect(screen.getByTestId('setupjwt-permissions-list')).toBeInTheDocument()
    
    const permissionItems = screen.getAllByTestId('setupjwt-permission-item')
    expect(permissionItems.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes in config tab', () => {
    render(<SetupJwt />)
    
    const configTab = screen.getByTestId('setupjwt-config-tab')
    fireEvent.click(configTab)
    
    // Form fields
    expect(screen.getByTestId('setupjwt-algorithm')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-expiry')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-refresh-expiry')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-issuer')).toBeInTheDocument()
    
    // Security checkboxes
    expect(screen.getByTestId('setupjwt-require-https')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-enable-refresh')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-revoke-on-password-change')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-log-token-events')).toBeInTheDocument()
    
    // Action buttons
    expect(screen.getByTestId('setupjwt-save-config')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-test-config')).toBeInTheDocument()
    expect(screen.getByTestId('setupjwt-reset-config')).toBeInTheDocument()
  })

  it('allows selecting users', () => {
    render(<SetupJwt />)
    
    const userItems = screen.getAllByTestId('setupjwt-user-item')
    fireEvent.click(userItems[0])
    
    // User should be highlighted (has blue border)
    expect(userItems[0]).toHaveClass('border-blue-500')
  })

  it('allows selecting roles', () => {
    render(<SetupJwt />)
    
    const rolesTab = screen.getByTestId('setupjwt-roles-tab')
    fireEvent.click(rolesTab)
    
    const roleItems = screen.getAllByTestId('setupjwt-role-item')
    fireEvent.click(roleItems[0])
    
    // Role should be highlighted (has blue border)
    expect(roleItems[0]).toHaveClass('border-blue-500')
  })

  it('allows changing JWT configuration fields', () => {
    render(<SetupJwt />)
    
    const configTab = screen.getByTestId('setupjwt-config-tab')
    fireEvent.click(configTab)
    
    const algorithmSelect = screen.getByTestId('setupjwt-algorithm') as HTMLSelectElement
    fireEvent.change(algorithmSelect, { target: { value: 'RS256' } })
    expect(algorithmSelect.value).toBe('RS256')
    
    const expiryInput = screen.getByTestId('setupjwt-expiry') as HTMLInputElement
    fireEvent.change(expiryInput, { target: { value: '48h' } })
    expect(expiryInput.value).toBe('48h')
    
    const issuerInput = screen.getByTestId('setupjwt-issuer') as HTMLInputElement
    fireEvent.change(issuerInput, { target: { value: 'new-issuer' } })
    expect(issuerInput.value).toBe('new-issuer')
  })
})
