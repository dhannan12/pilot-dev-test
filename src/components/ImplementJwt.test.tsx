import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementJwt from './ImplementJwt'

describe('ImplementJwt', () => {
  it('renders without crashing', () => {
    render(<ImplementJwt />)
    expect(document.body).toBeTruthy()
  })

  it('displays main title and description', () => {
    render(<ImplementJwt />)
    expect(screen.getByText(/JWT Authentication & RBAC/i)).toBeTruthy()
    expect(screen.getByText(/Manage user authentication, roles, and permissions/i)).toBeTruthy()
  })

  it('shows login form initially', () => {
    render(<ImplementJwt />)
    expect(screen.getByTestId('implementjwt-email')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-password')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-login')).toBeTruthy()
  })

  it('has required data-testid attributes on main wrapper', () => {
    render(<ImplementJwt />)
    expect(document.querySelector('[data-testid="implementjwt"]')).toBeTruthy()
  })

  it('has required data-testid attributes on login inputs', () => {
    render(<ImplementJwt />)
    expect(screen.getByTestId('implementjwt-email')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-password')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-login')).toBeTruthy()
  })

  it('has required data-testid attributes on tab navigation', () => {
    render(<ImplementJwt />)
    expect(screen.getByTestId('implementjwt-tab-login')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-tab-users')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-tab-roles')).toBeTruthy()
  })

  it('switches between tabs', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    expect(screen.getByTestId('implementjwt-users-section')).toBeTruthy()
    
    const rolesTab = screen.getByTestId('implementjwt-tab-roles')
    fireEvent.click(rolesTab)
    expect(screen.getByTestId('implementjwt-roles-section')).toBeTruthy()
  })

  it('displays user list in users tab', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    
    expect(screen.getByTestId('implementjwt-user-list')).toBeTruthy()
    const userItems = screen.getAllByTestId('implementjwt-user-item')
    expect(userItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays role definitions in roles tab', () => {
    render(<ImplementJwt />)
    
    const rolesTab = screen.getByTestId('implementjwt-tab-roles')
    fireEvent.click(rolesTab)
    
    expect(screen.getByTestId('implementjwt-role-list')).toBeTruthy()
    const roleItems = screen.getAllByTestId('implementjwt-role-item')
    expect(roleItems.length).toBeGreaterThanOrEqual(5)
  })

  it('allows login with email input', () => {
    render(<ImplementJwt />)
    
    const emailInput = screen.getByTestId('implementjwt-email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'admin@lawfirm.com' } })
    expect(emailInput.value).toBe('admin@lawfirm.com')
  })

  it('shows logout button after login', () => {
    render(<ImplementJwt />)
    
    const emailInput = screen.getByTestId('implementjwt-email')
    const loginButton = screen.getByTestId('implementjwt-login')
    
    fireEvent.change(emailInput, { target: { value: 'admin@lawfirm.com' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByTestId('implementjwt-logout')).toBeTruthy()
  })

  it('has create user form with required fields', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    
    expect(screen.getByTestId('implementjwt-new-user-email')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-new-user-name')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-new-user-role')).toBeTruthy()
    expect(screen.getByTestId('implementjwt-create-user')).toBeTruthy()
  })

  it('allows creating a new user', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    
    const emailInput = screen.getByTestId('implementjwt-new-user-email') as HTMLInputElement
    const nameInput = screen.getByTestId('implementjwt-new-user-name') as HTMLInputElement
    const createButton = screen.getByTestId('implementjwt-create-user')
    
    const initialCount = screen.getAllByTestId('implementjwt-user-item').length
    
    fireEvent.change(emailInput, { target: { value: 'newuser@test.com' } })
    fireEvent.change(nameInput, { target: { value: 'New Test User' } })
    fireEvent.click(createButton)
    
    const newCount = screen.getAllByTestId('implementjwt-user-item').length
    expect(newCount).toBe(initialCount + 1)
  })

  it('has user management controls', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    
    expect(screen.getAllByTestId('implementjwt-change-role').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('implementjwt-toggle-status').length).toBeGreaterThan(0)
  })

  it('displays mock user data', () => {
    render(<ImplementJwt />)
    
    const usersTab = screen.getByTestId('implementjwt-tab-users')
    fireEvent.click(usersTab)
    
    expect(screen.getByText(/Sarah Administrator/i)).toBeTruthy()
    expect(screen.getByText(/John Attorney/i)).toBeTruthy()
    expect(screen.getByText(/Emily Paralegal/i)).toBeTruthy()
  })
})
